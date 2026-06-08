# Email Client

## Problem Statement

Design a Gmail-style email client in React that:

- **Layout:** Three-pane shell—sidebar labels, virtualized thread list, reading pane
- **Threading:** Group messages by `threadId`; show latest snippet + participant count
- **Labels:** Many-to-many tags (not just folders); filter list by active label
- **Actions:** Archive, star, mark read/unread with optimistic updates
- **Search:** Full-text search across threads with debounced query (reuse typeahead patterns)
- **Compose:** Draft autosave, send with attachment boundary, discard confirm

## System Architecture

- **Client Layer:** Thread list (virtualized), thread detail, label sidebar, compose modal, search bar
- **API Layer:** REST or GraphQL—`GET /threads?label=&cursor=`, `GET /threads/:id`, `PATCH /threads/:id`, `POST /messages`
- **Data Layer:** Thread table + message table; label join table; search index (Elasticsearch or Postgres FTS)

```text
Label click ──► URL ?label=inbox ──► infinite query threads
Thread click ──► prefetch messages ──► reading pane + mark read (optimistic)
Compose ──► debounced draft PATCH ──► POST /messages on send
```

## Key Technical Decisions

### 1. Threads vs. flat messages

UI lists **threads** (conversation units). Each thread has `threadId`, `subject`, `snippet`, `lastMessageAt`, `participants[]`, `labelIds[]`, `unreadCount`.

Opening a thread fetches **messages** ordered by `sentAt`. Keeps list payload small—no bodies in index.

### 2. Labels vs. folders

Gmail model: labels are tags—a thread can be `INBOX` + `IMPORTANT` simultaneously. "Archive" = remove `INBOX` label, not delete.

Active filter = intersection of selected labels. Store filter in URL: `/mail?label=inbox` for shareable state.

### 3. Optimistic mutations

Mark-read and archive should feel instant. TanStack Query `onMutate` snapshots cache, applies optimistic patch, rolls back on error.

Invalidate thread list + detail on settle for server truth.

### 4. Virtualized thread list

10k threads cannot render as DOM nodes. `@tanstack/react-virtual` with fixed row height (~72px) or dynamic measure for variable snippets.

Pair with **infinite scroll** cursor pagination—same pattern as Twitter feed but tabular rows.

## Implementation: Core Components

### Thread list with infinite query

```tsx
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';

type ThreadSummary = {
  id: string;
  subject: string;
  snippet: string;
  lastMessageAt: string;
  unreadCount: number;
  starred: boolean;
  participants: string[];
};

async function fetchThreads(label: string, cursor?: string) {
  const params = new URLSearchParams({ label, limit: '50' });
  if (cursor) params.set('cursor', cursor);
  const res = await fetch(`/api/threads?${params}`);
  if (!res.ok) throw new Error('Failed to load threads');
  return res.json() as Promise<{ items: ThreadSummary[]; nextCursor?: string }>;
}

export function ThreadList({ label, selectedId, onSelect }: {
  label: string;
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  const parentRef = useRef<HTMLDivElement>(null);
  const qc = useQueryClient();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['threads', label],
    queryFn: ({ pageParam }) => fetchThreads(label, pageParam),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (last) => last.nextCursor,
  });

  const threads = data?.pages.flatMap((p) => p.items) ?? [];

  const virtualizer = useVirtualizer({
    count: threads.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 72,
    overscan: 8,
  });

  const markRead = useMutation({
    mutationFn: (threadId: string) =>
      fetch(`/api/threads/${threadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ unreadCount: 0 }),
      }),
    onMutate: async (threadId) => {
      await qc.cancelQueries({ queryKey: ['threads', label] });
      const prev = qc.getQueryData(['threads', label]);
      qc.setQueryData(['threads', label], (old: typeof data) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            items: page.items.map((t) =>
              t.id === threadId ? { ...t, unreadCount: 0 } : t
            ),
          })),
        };
      });
      return { prev };
    },
    onError: (_err, _id, ctx) => {
      if (ctx?.prev) qc.setQueryData(['threads', label], ctx.prev);
    },
  });

  return (
    <div ref={parentRef} className="thread-list-scroll">
      <div style={{ height: virtualizer.getTotalSize(), position: 'relative' }}>
        {virtualizer.getVirtualItems().map((row) => {
          const thread = threads[row.index];
          if (row.index >= threads.length - 5 && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
          return (
            <button
              key={thread.id}
              type="button"
              className={thread.id === selectedId ? 'thread-row selected' : 'thread-row'}
              style={{
                position: 'absolute',
                top: row.start,
                height: row.size,
                width: '100%',
              }}
              onClick={() => {
                onSelect(thread.id);
                if (thread.unreadCount > 0) markRead.mutate(thread.id);
              }}
            >
              <span className={thread.unreadCount ? 'subject unread' : 'subject'}>
                {thread.subject}
              </span>
              <span className="snippet">{thread.snippet}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
```

### Reading pane + message thread

```tsx
import { useQuery } from '@tanstack/react-query';

type Message = {
  id: string;
  from: string;
  to: string[];
  bodyHtml: string;
  sentAt: string;
};

export function ThreadReader({ threadId }: { threadId: string }) {
  const { data: messages = [], isLoading } = useQuery({
    queryKey: ['messages', threadId],
    queryFn: async () => {
      const res = await fetch(`/api/threads/${threadId}/messages`);
      if (!res.ok) throw new Error('Failed to load messages');
      return res.json() as Promise<Message[]>;
    },
    staleTime: 60_000,
  });

  if (isLoading) return <div className="reader-skeleton">Loading…</div>;

  return (
    <article className="thread-reader">
      {messages.map((msg) => (
        <section key={msg.id} className="message-block">
          <header>
            <strong>{msg.from}</strong>
            <time dateTime={msg.sentAt}>{new Date(msg.sentAt).toLocaleString()}</time>
          </header>
          <div
            className="message-body"
            dangerouslySetInnerHTML={{ __html: msg.bodyHtml }}
          />
        </section>
      ))}
    </article>
  );
}
```

### Compose with draft autosave

```tsx
import { useEffect, useRef, useState } from 'react';

export function ComposeModal({ draftId }: { draftId: string }) {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const timerRef = useRef<number>();

  useEffect(() => {
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      fetch(`/api/drafts/${draftId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to, subject, body }),
      });
    }, 800);
    return () => window.clearTimeout(timerRef.current);
  }, [draftId, to, subject, body]);

  async function send() {
    await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to, subject, body, draftId }),
    });
  }

  return (
    <form className="compose" onSubmit={(e) => { e.preventDefault(); send(); }}>
      <input value={to} onChange={(e) => setTo(e.target.value)} placeholder="To" />
      <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject" />
      <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={12} />
      <button type="submit">Send</button>
    </form>
  );
}
```

## Performance Optimization

- Virtualize thread list; never mount off-screen rows
- Thread summaries only in list API—lazy-load bodies on open
- Prefetch `messages` on thread row hover (`queryClient.prefetchQuery`)
- Debounce draft saves (800ms) and search (200ms)
- Sanitize HTML bodies (DOMPurify) before `dangerouslySetInnerHTML`

## Edge Cases and Error Handling

- **Concurrent label changes:** Server wins on refetch; optimistic rollback on 409
- **Send failure:** Keep compose open, show retry; draft already persisted
- **Empty states:** No threads in label, no selection, search no results
- **Large attachments:** Upload via presigned URL (see file-upload guide); link in send payload
- **Keyboard:** `j`/`k` navigate threads, `e` archive, `/` focus search—optional power-user layer

## Tradeoffs

| Approach | Pros | Cons |
|----------|------|------|
| Label tags (Gmail) | Flexible multi-folder membership | Harder mental model than single folder |
| IMAP sync client | Real provider integration | Complex idle/sync; overkill for interview |
| Flat message list | Simpler data model | Poor UX for long conversations |

## Interview Talking Points

- Threading is a **data model** choice—`threadId` on every message enables list/detail split
- Overlap with chat: both have real-time potential, but email is **async**, **search-heavy**, **label-filtered**
- Overlap with autocomplete: search bar reuses debounce + abort; difference is full-text index not prefix suggest
- Mention **push vs. poll** for new mail—WebSocket badge count or periodic `GET /threads?since=`
