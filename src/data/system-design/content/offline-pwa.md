# Offline-First PWA

## Problem Statement

Design an offline-first Progressive Web App that:

- **Installable:** Web app manifest, service worker, add-to-home-screen
- **Offline read:** Cache shell + API responses; show stale data with “offline” indicator
- **Offline write:** Queue mutations in IndexedDB; replay when connectivity returns
- **Sync:** Background Sync API or manual flush on `online` event
- **Updates:** New service worker activates without breaking in-flight work
- **UX:** Clear online/offline banner; conflict resolution when server state diverged

## System Architecture

- **Client Layer:** Service worker (Workbox or hand-rolled), offline queue, React Query persistence, network status hook
- **API Layer:** Idempotent mutation endpoints, `ETag` / version fields for conflict detection
- **Data Layer:** IndexedDB (idb) for queue + cache; CDN for static assets

```text
Online  ──► fetch ──► API ──► cache response in SW + IDB
Offline ──► read cache ──► UI shows stale badge
Write   ──► enqueue mutation ──► replay on 'online' / sync event
```

## Key Technical Decisions

### 1. Service worker caching strategies

| Asset | Strategy |
|-------|----------|
| App shell (HTML, JS, CSS) | Cache-first, versioned precache on install |
| API GET (feed, profile) | Network-first with cache fallback |
| API POST/PATCH | Network-only; failures go to offline queue |
| Images | Stale-while-revalidate |

Use Workbox `precacheAndRoute` for build assets; avoid caching authenticated responses without `Vary` awareness.

### 2. Offline mutation queue

Each queued item: `{ id, method, url, body, createdAt, retries }`. On `online`:

1. Drain queue FIFO (or priority order)
2. Use `Idempotency-Key: queueItem.id` header
3. On 409 conflict → surface UI for user resolution; do not infinite retry

Store queue in IndexedDB so refresh/tab close does not lose writes.

### 3. React Query + persistence

Persist query cache to IndexedDB (`@tanstack/query-async-storage-persister`) for instant cold start offline. Set `networkMode: 'offlineFirst'` on critical queries.

Show `isFetching && !navigator.onLine` as subtle sync indicator.

### 4. Update flow

New SW installs in `waiting` state—prompt user “Update available” → `skipWaiting()` + reload. Avoid auto-reload mid-form.

## Implementation: Core Components

### Service worker (Workbox precache + runtime)

```js
// sw.js — registered from main.tsx
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies';

precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
  ({ url }) => url.pathname.startsWith('/api/feed'),
  new NetworkFirst({ cacheName: 'api-feed', networkTimeoutSeconds: 5 })
);

registerRoute(
  ({ request }) => request.destination === 'image',
  new StaleWhileRevalidate({ cacheName: 'images' })
);

self.addEventListener('sync', (event) => {
  if (event.tag === 'replay-mutations') {
    event.waitUntil(replayOfflineQueue());
  }
});
```

### Register SW + update prompt

```tsx
import { useEffect, useState } from 'react';

export function useServiceWorker() {
  const [updateReady, setUpdateReady] = useState(false);

  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;

    navigator.serviceWorker.register('/sw.js').then((reg) => {
      reg.addEventListener('updatefound', () => {
        const next = reg.installing;
        next?.addEventListener('statechange', () => {
          if (next.state === 'installed' && navigator.serviceWorker.controller) {
            setUpdateReady(true);
          }
        });
      });
    });
  }, []);

  function applyUpdate() {
    navigator.serviceWorker.ready.then((reg) => reg.waiting?.postMessage({ type: 'SKIP_WAITING' }));
    window.location.reload();
  }

  return { updateReady, applyUpdate };
}
```

### Offline queue (IndexedDB)

```tsx
import { openDB } from 'idb';

const dbPromise = openDB('offline-queue', 1, {
  upgrade(db) {
    db.createObjectStore('mutations', { keyPath: 'id' });
  },
});

type QueuedMutation = {
  id: string;
  method: string;
  url: string;
  body: string;
  createdAt: number;
};

export async function enqueueMutation(m: Omit<QueuedMutation, 'id' | 'createdAt'>) {
  const db = await dbPromise;
  const item: QueuedMutation = {
    ...m,
    id: crypto.randomUUID(),
    createdAt: Date.now(),
  };
  await db.add('mutations', item);
  if ('serviceWorker' in navigator && 'SyncManager' in window) {
    const reg = await navigator.serviceWorker.ready;
    await reg.sync.register('replay-mutations');
  }
  return item.id;
}

export async function replayOfflineQueue() {
  const db = await dbPromise;
  const all = await db.getAll('mutations');
  for (const item of all.sort((a, b) => a.createdAt - b.createdAt)) {
    const res = await fetch(item.url, {
      method: item.method,
      headers: {
        'Content-Type': 'application/json',
        'Idempotency-Key': item.id,
      },
      body: item.body,
    });
    if (res.ok || res.status === 409) await db.delete('mutations', item.id);
  }
}
```

### Network status banner

```tsx
import { useSyncExternalStore } from 'react';

function subscribeOnline(cb: () => void) {
  window.addEventListener('online', cb);
  window.addEventListener('offline', cb);
  return () => {
    window.removeEventListener('online', cb);
    window.removeEventListener('offline', cb);
  };
}

function getOnline() {
  return navigator.onLine;
}

export function OfflineBanner() {
  const online = useSyncExternalStore(subscribeOnline, getOnline, () => true);

  if (online) return null;
  return (
    <div role="status" className="offline-banner">
      You are offline. Changes will sync when reconnected.
    </div>
  );
}
```

## Performance Optimization

- Precache only shell—lazy routes load on demand
- Cap IndexedDB cache size (LRU evict old feed pages)
- Compress queue payloads; batch replay if server supports bulk endpoint
- `navigator.storage.persist()` for reliable quota on mobile

## Edge Cases and Error Handling

- **Partial sync failure:** Stop queue, show “3 actions pending” with retry
- **Auth expired while offline:** Queue holds until online; login modal before replay
- **Safari Background Sync limits:** Fallback to `online` event listener
- **Cache poisoning:** Version cache names on deploy (`api-feed-v2`)
- **HTTPS required:** SW only on secure origins

## Interview Talking Points

- Offline-first vs. offline-capable (read cache only)
- Idempotency keys for safe mutation replay
- Contrast with infinite-scroll IndexedDB segment cache—this guide focuses on writes + SW
