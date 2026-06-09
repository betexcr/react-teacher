# Real-time Collaboration Editor

## Problem Statement

Design a Google Docs–style collaborative document editor:

- **Concurrency:** Multiple users edit simultaneously without lost updates
- **Latency:** Local edits appear instantly (<16ms); remote edits within 100–200ms
- **Consistency:** Eventually consistent document state across clients
- **Presence:** Cursors, selections, and user avatars per collaborator
- **Durability:** Periodic snapshots + operation log for recovery
- **Scale:** Support large documents via structural splitting (optional)

## System Architecture

- **Client Layer:** Rich text editor (ProseMirror/Slate), CRDT or OT client, awareness protocol, offline buffer
- **API Layer:** WebSocket sync channel, REST for snapshot load/save, auth and document ACL
- **Data Layer:** Operation log append-only store, periodic snapshots, S3 for large assets

```text
Local edit → CRDT/OT op → WS broadcast → Peers apply → Convergent doc state
Awareness  → separate Yjs awareness / custom presence channel (ephemeral)
```

## Key Technical Decisions

### 1. CRDT vs. Operational Transform (OT)

| Operational Transform (OT) | CRDT (Yjs, Automerge) |
|----------------------------|------------------------|
| Central server transforms concurrent ops | Merge without central ordering |
| Classic Google Docs model | Great for offline and P2P |
| Harder peer-to-peer | Larger metadata overhead |

For React apps, **Yjs + y-prosemirror** is a common production choice.

### 2. Awareness (cursors)

Ephemeral data—do not persist. Broadcast `{ userId, cursor, selection, color }` at 10–15Hz max, throttled.

### 3. Persistence strategy

- Append ops to log for replay
- Snapshot every N ops or M minutes for fast cold start
- Compaction job merges log into snapshot

### 4. Authorization

Document token scopes: `read`, `comment`, `write`. WS handshake validates token before joining room `doc:{id}`.

## Implementation: Core Components

```tsx
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { useEffect, useState } from 'react';

export function CollaborativeEditor({ docId, user }: { docId: string; user: User }) {
  const [ydoc] = useState(() => new Y.Doc());
  const ytext = ydoc.getText('content');

  useEffect(() => {
    const provider = new WebsocketProvider('wss://api.example.com/collab', docId, ydoc);
    provider.awareness.setLocalStateField('user', {
      name: user.name,
      color: user.color,
    });
    return () => provider.destroy();
  }, [docId, ydoc, user]);

  // Bind ytext to ProseMirror/Slate via binding library
  return <ProseMirrorEditor ytext={ytext} awareness={provider.awareness} />;
}
```

```ts
// Server: validate op size, rate limit, ACL
ws.on('message', (raw) => {
  const msg = parse(raw);
  if (msg.byteLength > 64_000) return ws.close(1009, 'too large');
  if (!canWrite(socket.user, docId)) return;
  broadcastToRoom(docId, raw, socket);
});
```

## Performance Optimization

- Debounce persistence snapshots (not every keystroke)
- Split document into Yjs subdocuments for very large docs
- Lazy-load comment threads sidebar
- Binary encode Yjs updates (not JSON) on wire
- GC old CRDT tombstones via server compaction

## Edge Cases and Error Handling

- **Offline editing:** Queue ops locally; merge on reconnect (CRDT strength)
- **Conflict on title rename:** Use separate Y.Map for metadata
- **Malicious peer:** Server validates schema of ops; size limits
- **Version rollback:** Admin restore from snapshot; broadcast `RESET` carefully
- **Cursor leaks:** Clear awareness on disconnect / heartbeat timeout
