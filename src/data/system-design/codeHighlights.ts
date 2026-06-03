import type { SolutionHighlight } from '../../lib/solutionHighlights';

/** Per-problem tooltips for fenced ts/tsx code in system-design markdown. */
const bySlug: Record<string, SolutionHighlight[]> = {
  'infinite-scroll': [
    {
      match: 'useInfiniteQuery',
      label: 'useInfiniteQuery',
      tip: 'Pages feed data in chunks; getNextPageParam chains cursor-based pages without refetching the whole feed.',
    },
    {
      match: 'getNextPageParam',
      label: 'getNextPageParam',
      tip: 'Returns the next cursor from the last page (or undefined when the feed ends).',
    },
    {
      match: 'useVirtualizer',
      label: 'useVirtualizer',
      tip: 'Renders only visible rows plus overscan—keeps DOM size flat for 10k+ logical items.',
    },
    {
      match: 'overscan: 5',
      label: 'overscan',
      tip: 'Extra rows above/below the viewport reduce blank flashes during fast scroll.',
    },
    {
      match: 'fetchNextPage',
      label: 'fetchNextPage',
      tip: 'Triggered when the virtual loader row enters view—loads the next cursor page.',
    },
    {
      match: 'pageParam',
      label: 'pageParam',
      tip: 'Opaque cursor passed to the API (e.g. encoded createdAt + id) for stable pagination.',
    },
    {
      match: 'new WebSocket',
      label: 'WebSocket',
      tip: 'Push path for new posts—lower latency than polling; pair with reconnect/backoff.',
    },
    {
      match: 'setQueryData',
      label: 'setQueryData',
      tip: 'Patches the React Query cache when a live message arrives—prepend or bump a pending count.',
    },
    {
      match: 'openDB',
      label: 'IndexedDB (idb)',
      tip: 'Persists feed pages offline; key pages by cursor for replay when the network is down.',
    },
  ],
  'form-builder': [
    {
      match: 'discriminatedUnion',
      label: 'discriminatedUnion',
      tip: 'Zod validates each field shape by its type tag—safe for dynamic form schemas.',
    },
    {
      match: 'zodResolver',
      label: 'zodResolver',
      tip: 'Connects the runtime Zod schema to react-hook-form validation.',
    },
    {
      match: 'mode: \'onBlur\'',
      label: 'onBlur validation',
      tip: 'Validates after the user leaves a field—less noisy than validating every keystroke.',
    },
    {
      match: 'isVisible(field, values)',
      label: 'conditional visibility',
      tip: 'Hides fields when when-rules fail; unregister hidden values so they are not submitted.',
    },
    {
      match: 'expectedVersion',
      label: 'expectedVersion',
      tip: 'Optimistic concurrency—reject patches when the client’s version is stale (409 conflict).',
    },
    {
      match: 'status(409)',
      label: '409 CONFLICT',
      tip: 'Tells collaborators to refresh the form definition before retrying the patch.',
    },
    {
      match: 'watch()',
      label: 'watch',
      tip: 'Re-evaluates visibility rules as the user edits watched fields.',
    },
  ],
  'state-store': [
    {
      match: 'createStore',
      label: 'createStore',
      tip: 'Minimal store: getState, dispatch, subscribe—same pub/sub shape as Redux without the boilerplate.',
    },
    {
      match: 'useSyncExternalStore',
      label: 'useSyncExternalStore',
      tip: 'Official React hook to subscribe to an external store and avoid tearing in concurrent rendering.',
    },
    {
      match: 'listeners.forEach',
      label: 'notify subscribers',
      tip: 'After each dispatch, every listener re-runs—components select slices via selectors.',
    },
    {
      match: 'type Middleware',
      label: 'middleware',
      tip: 'Wraps dispatch for logging, analytics, persistence, or async thunks.',
    },
    {
      match: 'store.subscribe',
      label: 'subscribe',
      tip: 'Returns an unsubscribe function—useSyncExternalStore passes this to React.',
    },
  ],
  'chat-application': [
    {
      match: 'clientId',
      label: 'clientId',
      tip: 'Stable id generated on the client so optimistic rows merge with the server ack.',
    },
    {
      match: "status: 'sending'",
      label: 'message status',
      tip: 'Optimistic UI shows sending until the server assigns sequence and sent state.',
    },
    {
      match: 'mergeByClientId',
      label: 'mergeByClientId',
      tip: 'Replaces the optimistic row when the server echoes the same clientId.',
    },
    {
      match: 'new WebSocket',
      label: 'WebSocket',
      tip: 'Room-scoped channel for messages and presence; close on unmount to avoid leaks.',
    },
    {
      match: '2 ** backoff.attempt',
      label: 'exponential backoff',
      tip: 'Reconnect delay doubles each attempt, capped—standard pattern for flaky networks.',
    },
    {
      match: 'throttle',
      label: 'throttle',
      tip: 'Limits typing-indicator spam to ~300ms—protects server and other clients.',
    },
  ],
  'auth-system': [
    {
      match: 'Permission',
      label: 'Permission',
      tip: 'Resource:action string (e.g. billing:read)—union roles to get effective permissions.',
    },
    {
      match: 'RequirePermission',
      label: 'RequirePermission',
      tip: 'Route guard: wait for auth, then redirect to 403 if the permission is missing.',
    },
    {
      match: 'verifyAccessToken',
      label: 'verifyAccessToken',
      tip: 'API middleware decodes JWT and checks claims before calling next().',
    },
    {
      match: 'refreshAccessToken',
      label: 'silent refresh',
      tip: 'On 401, refresh tokens once then retry the original fetch—keeps UX seamless.',
    },
    {
      match: 'res.status === 401',
      label: '401 handling',
      tip: 'Signals an expired access token—trigger refresh instead of showing a generic error.',
    },
    {
      match: 'status(403)',
      label: '403 FORBIDDEN',
      tip: 'Authenticated but not authorized—distinct from 401 unauthenticated.',
    },
  ],
  'google-docs-clone': [
    {
      match: 'new Y.Doc()',
      label: 'Y.Doc',
      tip: 'CRDT document—merges concurrent edits without a central sequence lock.',
    },
    {
      match: 'WebsocketProvider',
      label: 'WebsocketProvider',
      tip: 'Syncs Yjs updates over the network; destroy on unmount to free sockets.',
    },
    {
      match: 'awareness',
      label: 'awareness',
      tip: 'Ephemeral presence (cursor, name, color)—not part of the persisted document.',
    },
    {
      match: "getText('content')",
      label: 'Y.Text',
      tip: 'Shared text type bound to the editor surface (ProseMirror/Slate binding).',
    },
    {
      match: 'canWrite',
      label: 'ACL check',
      tip: 'Server rejects ops when the user lacks write access—never trust the client alone.',
    },
  ],
  'video-player': [
    {
      match: 'new Hls(',
      label: 'Hls.js',
      tip: 'Adaptive streaming for browsers without native HLS—attach to a video element.',
    },
    {
      match: 'maxBufferLength: 30',
      label: 'buffer cap',
      tip: 'Limits how far ahead to buffer—balances smooth playback vs memory.',
    },
    {
      match: 'waiting',
      label: 'waiting event',
      tip: 'Fired when playback stalls for data—drive a buffering UI state.',
    },
    {
      match: 'sendBeacon',
      label: 'sendBeacon',
      tip: 'Fire-and-forget analytics on quartiles—works even as the user navigates away.',
    },
    {
      match: 'currentTime',
      label: 'currentTime',
      tip: 'Seek target and progress numerator—pair with duration for scrubber position.',
    },
    {
      match: 'playsInline',
      label: 'playsInline',
      tip: 'Prevents iOS from forcing fullscreen for inline players.',
    },
  ],
  'kanban-board': [
    {
      match: 'DndContext',
      label: 'DndContext',
      tip: 'Root drag-and-drop context—wires sensors, collision detection, and drag end.',
    },
    {
      match: 'closestCorners',
      label: 'closestCorners',
      tip: 'Collision algorithm suited to Kanban columns and card drop targets.',
    },
    {
      match: 'DragOverlay',
      label: 'DragOverlay',
      tip: 'Floating preview of the dragged card—decoupled from list layout while dragging.',
    },
    {
      match: 'arrayMove',
      label: 'arrayMove',
      tip: 'Immutable reorder of cardIds within a column after a drop.',
    },
    {
      match: 'setBoard(next); // optimistic',
      label: 'optimistic update',
      tip: 'UI updates immediately; rollback to previous board if the API fails.',
    },
    {
      match: 'SortableContext',
      label: 'SortableContext',
      tip: 'Declares a sortable list strategy (here vertical) for cards inside a column.',
    },
  ],
};

function sortByMatchLength(highlights: SolutionHighlight[]): SolutionHighlight[] {
  return [...highlights].sort((a, b) => b.match.length - a.match.length);
}

export function getSystemDesignHighlights(slug: string): SolutionHighlight[] {
  const list = bySlug[slug];
  return list ? sortByMatchLength(list) : [];
}
