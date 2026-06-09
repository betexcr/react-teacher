# WebSocket-based Chat Application

## Problem Statement

Build a real-time chat application that supports:

- **Scale:** Thousands of concurrent connections per room
- **Latency:** Message delivery under 200ms p95
- **Ordering:** Per-room causal ordering; display pending/sent/delivered states
- **Presence:** Online/offline and typing indicators
- **History:** Paginated message history with cursor pagination
- **Resilience:** Reconnect, offline queue, and duplicate suppression

## System Architecture

- **Client Layer:** React chat UI, WebSocket client, optimistic message list, virtualized history
- **API Layer:** WebSocket gateway, REST for history/upload, auth, rate limits per user
- **Data Layer:** Message store (partitioned by `roomId`), Redis pub/sub for horizontal WS scale, presence in Redis TTL keys

```text
Browser WS ──► Gateway ──► Redis channel room:123 ──► All gateway instances
REST GET /rooms/123/messages?cursor= ──► Postgres
```

## Key Technical Decisions

### 1. WebSocket vs. SSE

| WebSocket | SSE |
|-----------|-----|
| Bidirectional—client and server send anytime | Server-to-client only |
| Typing indicators, acks, presence | Simpler protocol, auto-reconnect |
| Ideal for chat rooms | Fine for live feeds without client sends |

### 2. Message identity and ordering

Client generates **UUID** per message for idempotency. Server assigns monotonic `sequence` per room. UI sorts by `sequence`; show clock skew tolerance with server timestamp.

### 3. Optimistic UI

Insert message as `status: 'sending'` immediately; replace with server ack or mark `failed` with retry. Dedupe by `clientId` when echo arrives.

### 4. Horizontal scaling

Sticky sessions optional if using Redis pub/sub: any gateway can publish/subscribe to `room:{id}` channels.

## Implementation: Core Components

```tsx
type ChatMessage = {
  id: string;
  clientId: string;
  roomId: string;
  body: string;
  sequence: number;
  status: 'sending' | 'sent' | 'failed';
};

export function useChat(roomId: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(`/ws?room=${roomId}`);
    wsRef.current = ws;

    ws.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      setMessages((prev) => mergeByClientId(prev, msg));
    };

    const backoff = { attempt: 0 };
    ws.onclose = () => {
      const delay = Math.min(30_000, 1000 * 2 ** backoff.attempt++);
      setTimeout(() => { /* reconnect */ }, delay);
    };

    return () => ws.close();
  }, [roomId]);

  const send = (body: string) => {
    const clientId = crypto.randomUUID();
    const optimistic: ChatMessage = {
      id: clientId,
      clientId,
      roomId,
      body,
      sequence: -1,
      status: 'sending',
    };
    setMessages((m) => [...m, optimistic]);
    wsRef.current?.send(JSON.stringify({ type: 'SEND', clientId, body }));
  };

  return { messages, send };
}
```

```ts
// Typing indicator — throttle 300ms
const emitTyping = useMemo(
  () => throttle(() => ws.send(JSON.stringify({ type: 'TYPING' })), 300),
  [ws]
);
```

## Performance Optimization

- Virtualize message list for long histories
- Batch `TYPING` events; debounce presence heartbeats (30s TTL on server)
- Compress WS payloads; cap message size server-side
- Load history in pages of 50 with cursor on `sequence`
- `React.memo` on `MessageRow` with `message.id` key

## Edge Cases and Error Handling

- **Reconnect storm:** Exponential backoff + jitter; resume from last known `sequence`
- **Duplicate delivery:** Idempotent insert on `(room_id, client_id)` unique index
- **Out-of-order:** Buffer out-of-window messages briefly or resort on `sequence`
- **Large attachments:** Upload via REST; message body references `mediaUrl` only
- **Moderation:** Server-side block list; never render unescaped HTML in messages
