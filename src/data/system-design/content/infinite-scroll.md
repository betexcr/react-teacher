# High-Performance Infinite Scroll Feed

## Problem Statement

Design and implement a high-performance infinite scroll feed system that meets the following requirements:

- **Scale:** Handle 10,000+ items in the feed with smooth scrolling
- **Performance:** Maintain 60fps scroll performance on both desktop and mobile
- **Real-time:** Support instant updates without disrupting user scroll position
- **Memory:** Keep memory usage under 100MB even with large datasets
- **Offline:** Support offline mode with data persistence

## System Architecture

The system is divided into three main layers:

- **Client Layer:** React components, list virtualization, WebSocket management, optimistic UI, and local caching (React Query + IndexedDB)
- **API Layer:** REST endpoints for feed pages, WebSocket server for push updates, rate limiting, and authentication
- **Data Layer:** Primary database, Redis cache for hot feed segments, event bus for fan-out, and analytics

```text
┌─────────────────────────────────────────────────────────┐
│ Client: VirtualizedList, useInfiniteQuery, WS client    │
├─────────────────────────────────────────────────────────┤
│ API: GET /feed?cursor=, WS /feed/live, rate limiter     │
├─────────────────────────────────────────────────────────┤
│ Data: Postgres + Redis + message queue                  │
└─────────────────────────────────────────────────────────┘
```

## Key Technical Decisions

### 1. Pagination Strategy: Cursor vs. Offset

| Offset pagination | Cursor pagination |
|-------------------|-------------------|
| `OFFSET 20 LIMIT 10`—skip N rows | Opaque pointer (`timestamp + id`) for next slice |
| Breaks when items insert at top of live feed | Stable when new posts arrive |
| DB scans skipped rows at depth | Index seek—scales on large tables |

We encode cursors as base64 `{ createdAt, id }` for stable chronological ordering.

### 2. Virtualization

Virtualization renders only rows in the viewport plus a small **overscan** buffer (~5 rows). With 10,000 logical items, the DOM might hold only 10–15 nodes—keeping layout/paint cost flat and memory near ~5MB instead of 500MB+ for full lists.

Tradeoffs:

- Fixed row height (e.g. 100px) simplifies math; dynamic heights need measurement cache
- Absolute positioning inside a tall scroll container avoids reflow on scroll

### 3. Multi-layer Caching

- **Browser:** React Query (stale-while-revalidate), in-memory virtualizer buffer, IndexedDB for offline segments (cap ~50MB)
- **API:** Redis (60s TTL on feed segments), batch WebSocket payloads, 100 req/min/user rate limit
- **Database:** Read replicas, composite index on `(user_id, created_at, id)`, optional materialized views for cold starts

### 4. Real-time Update Strategy

WebSockets beat polling for latency (50–100ms vs 1s+) and battery. On new item:

1. Prepend optimistically if user is at top
2. Otherwise show “N new posts” pill; apply on click to avoid scroll jank
3. Reconnect with exponential backoff (1s → 2s → … cap 30s)

## Implementation: Core Components

### Virtualized feed with infinite loading

```tsx
import { useInfiniteQuery } from '@tanstack/react-query';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';

const ROW_HEIGHT = 100;

async function fetchFeedPage({ pageParam }: { pageParam?: string }) {
  const qs = pageParam ? `?cursor=${encodeURIComponent(pageParam)}` : '';
  const res = await fetch(`/api/feed${qs}`);
  if (!res.ok) throw new Error('Feed fetch failed');
  return res.json() as Promise<{ items: FeedItem[]; nextCursor: string | null }>;
}

export function InfiniteFeed() {
  const parentRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ['feed'],
      queryFn: fetchFeedPage,
      getNextPageParam: (last) => last.nextCursor ?? undefined,
      staleTime: 60_000,
    });

  const items = data?.pages.flatMap((p) => p.items) ?? [];

  const virtualizer = useVirtualizer({
    count: hasNextPage ? items.length + 1 : items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 5,
  });

  const virtualRows = virtualizer.getVirtualItems();

  return (
    <div ref={parentRef} style={{ height: '70vh', overflow: 'auto' }}>
      <div style={{ height: virtualizer.getTotalSize(), position: 'relative' }}>
        {virtualRows.map((row) => {
          const isLoader = row.index >= items.length;
          if (isLoader) {
            if (hasNextPage && !isFetchingNextPage) fetchNextPage();
            return (
              <div key="loader" style={{ position: 'absolute', top: row.start, height: ROW_HEIGHT }}>
                Loading…
              </div>
            );
          }
          const item = items[row.index];
          return (
            <article
              key={item.id}
              style={{
                position: 'absolute',
                top: 0,
                transform: `translateY(${row.start}px)`,
                height: ROW_HEIGHT,
                width: '100%',
              }}
            >
              {item.title}
            </article>
          );
        })}
      </div>
    </div>
  );
}
```

### Real-time handler

```tsx
useEffect(() => {
  const ws = new WebSocket('/ws/feed');
  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data) as { type: 'NEW_POST'; item: FeedItem };
    if (msg.type === 'NEW_POST') {
      queryClient.setQueryData(['feed'], (old: InfiniteData<FeedPage> | undefined) => {
        if (!old) return old;
        const atTop = scrollTopRef.current < 80;
        if (atTop) prependItem(old, msg.item);
        else setPendingCount((n) => n + 1);
        return old;
      });
    }
  };
  return () => ws.close();
}, []);
```

### Offline persistence (IndexedDB)

```tsx
import { openDB } from 'idb';

const dbPromise = openDB('feed-cache', 1, {
  upgrade(db) {
    db.createObjectStore('pages', { keyPath: 'cursor' });
  },
});

export async function cachePage(cursor: string, items: FeedItem[]) {
  const db = await dbPromise;
  await db.put('pages', { cursor, items, savedAt: Date.now() });
}
```

## Performance Optimization

- Virtualize list rows; never mount 10k DOM nodes
- Cursor pagination + indexed `(created_at, id)` columns
- `React.memo` on row component; stable `item.id` keys
- Prefetch next page when within 3 viewports of end
- Debounce scroll handlers; use `passive: true` listeners
- Code-split feed route; lazy-load heavy media in rows
- Compress API payloads (gzip/brotli); paginate at 20–30 items

## Edge Cases and Error Handling

- **Network failure:** Retry with backoff; show inline error row with “Tap to retry”
- **Duplicate posts:** Dedupe by `id` when merging WebSocket + fetch pages
- **Race on fast scroll:** Ignore stale `fetchNextPage` responses via request generation counter
- **Memory leaks:** Abort fetch + close WebSocket in `useEffect` cleanup
- **IndexedDB quota:** LRU-evict oldest pages; fall back to network-only mode
- **Scroll restoration:** Save `scrollTop` + anchor item id when navigating away and back
