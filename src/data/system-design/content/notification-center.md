# Notification Center

## Problem Statement

Design an in-app notification system that supports:

- **Delivery:** Real-time push via WebSocket with polling fallback
- **Surfaces:** Toast queue (ephemeral) + persistent inbox (bell dropdown / full page)
- **State:** Unread counts, mark read/unread, mark all read, delete
- **Grouping:** Collapse “5 comments on your post” into one digest row
- **Preferences:** Per-channel mute (email vs in-app), do-not-disturb hours
- **Scale:** Paginated inbox, dedupe by event id, badge sync across tabs

## System Architecture

- **Client Layer:** Toast provider, notification context, inbox list, WebSocket client, `BroadcastChannel` for cross-tab badge sync
- **API Layer:** `GET /notifications?cursor=`, `PATCH /notifications/:id/read`, WS `/notifications/live`
- **Data Layer:** Notifications table `(user_id, type, payload, read_at, group_key)`, fan-out from event bus

```text
Event bus ──► notification service ──► WS push to online users
                                   ──► store row for offline users
Client    ──► toast for high-priority ──► inbox for history
```

## Key Technical Decisions

### 1. Toast vs. inbox

| Toast | Inbox |
|-------|-------|
| Ephemeral (3–5s auto dismiss) | Persistent until user acts |
| High urgency (payment failed) | Browsable history |
| Max 3 visible stack | Paginated, searchable |

Route to both: toast for immediate attention, always write inbox row for audit.

### 2. WebSocket vs. polling

| WebSocket | Polling fallback |
|-----------|------------------|
| Sub-100ms badge updates when online | Every 60s or on `visibilitychange` focus |
| Push new notifications instantly | Works through restrictive proxies |
| Requires reconnect + dedupe by `eventId` | Higher latency; simpler infrastructure |

Include `eventId` in payload; client ignores duplicates.

### 3. Unread badge sync

Use `BroadcastChannel('notifications')` so marking read in one tab updates badge in others. Alternatively, rely on React Query invalidation + `storage` event on a shared `localStorage` version counter.

### 4. Grouping / digest

Server sets `groupKey: "comment:post_123"`. Client collapses rows with same key in UI: “Alice and 4 others commented.” Expand to show individuals on click.

## Implementation: Core Components

### Toast queue provider

```tsx
import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';

type Toast = { id: string; title: string; body?: string; variant?: 'info' | 'error' };

const ToastContext = createContext<{
  push: (t: Omit<Toast, 'id'>) => void;
} | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const push = useCallback((t: Omit<Toast, 'id'>) => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev.slice(-2), { ...t, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((x) => x.id !== id));
    }, 4000);
  }, []);

  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      <div className="toast-stack" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} role="status" className={`toast toast--${t.variant ?? 'info'}`}>
            <strong>{t.title}</strong>
            {t.body && <p>{t.body}</p>}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast requires ToastProvider');
  return ctx;
}
```

### Inbox with React Query + WebSocket

```tsx
import { useEffect } from 'react';
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';

type Notification = {
  id: string;
  title: string;
  body: string;
  readAt: string | null;
  createdAt: string;
};

async function fetchNotifications({ pageParam }: { pageParam?: string }) {
  const qs = pageParam ? `?cursor=${encodeURIComponent(pageParam)}` : '';
  const res = await fetch(`/api/notifications${qs}`);
  return res.json() as Promise<{ items: Notification[]; nextCursor: string | null }>;
}

export function useNotifications() {
  const qc = useQueryClient();
  const { push } = useToast();

  const inbox = useInfiniteQuery({
    queryKey: ['notifications'],
    queryFn: fetchNotifications,
    getNextPageParam: (last) => last.nextCursor ?? undefined,
    initialPageParam: undefined as string | undefined,
  });

  useEffect(() => {
    const ws = new WebSocket('/ws/notifications');
    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data) as { type: 'NEW'; notification: Notification };
      if (msg.type === 'NEW') {
        qc.invalidateQueries({ queryKey: ['notifications'] });
        push({ title: msg.notification.title, body: msg.notification.body });
      }
    };
    return () => ws.close();
  }, [qc, push]);

  const markRead = useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/notifications/${id}/read`, { method: 'PATCH' }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['notifications'] }),
  });

  const unreadCount =
    inbox.data?.pages
      .flatMap((p) => p.items)
      .filter((n) => !n.readAt).length ?? 0;

  return { inbox, markRead, unreadCount };
}
```

### Notification bell + dropdown

```tsx
export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const { inbox, markRead, unreadCount } = useNotifications();
  const items = inbox.data?.pages.flatMap((p) => p.items) ?? [];

  return (
    <div className="notif-bell">
      <button
        aria-expanded={open}
        aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ''}`}
        onClick={() => setOpen((v) => !v)}
      >
        🔔
        {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
      </button>
      {open && (
        <ul role="menu" className="notif-dropdown">
          {items.map((n) => (
            <li key={n.id} role="none">
              <button
                role="menuitem"
                className={n.readAt ? '' : 'unread'}
                onClick={() => markRead.mutate(n.id)}
              >
                <strong>{n.title}</strong>
                <span>{n.body}</span>
              </button>
            </li>
          ))}
          {inbox.hasNextPage && (
            <button onClick={() => inbox.fetchNextPage()}>Load more</button>
          )}
        </ul>
      )}
    </div>
  );
}
```

## Performance Optimization

- Infinite scroll inbox with cursor pagination
- Debounce “mark all read” batch PATCH
- Do not toast low-priority events when DND enabled (check preferences context)
- WS reconnect with exponential backoff

## Edge Cases and Error Handling

- **Duplicate events:** Dedupe client-side by `notification.id`
- **Offline:** Queue toasts not possible—show inbox on next fetch
- **Permission denied:** Hide push-specific UI; inbox still works
- **Tab sync:** BroadcastChannel on mark-read
- **Empty inbox:** Friendly zero state with illustration

## Interview Talking Points

- Contrast with chat (threaded conversation vs. one-way alerts)
- Push notification permission flow (browser API) vs. in-app only
- Retention policy: auto-archive notifications older than 90 days
