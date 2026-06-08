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
  'autocomplete-search': [
    {
      match: 'useDebouncedValue(query.trim(), 200)',
      label: 'debounce',
      tip: 'Waits 200ms after typing stops before firing API—cuts request volume dramatically.',
    },
    {
      match: 'abortRef.current?.abort()',
      label: 'AbortController',
      tip: 'Cancels the in-flight suggest request when query changes—prevents stale results winning.',
    },
    {
      match: "queryKey: ['search', debouncedQuery]",
      label: 'queryKey',
      tip: 'React Query caches per query string—repeat searches feel instant for 30s.',
    },
    {
      match: 'placeholderData: (prev) => prev',
      label: 'placeholderData',
      tip: 'Keeps prior results visible while refetching—avoids list flicker on each keystroke.',
    },
    {
      match: 'role="combobox"',
      label: 'combobox',
      tip: 'WAI-ARIA role pairing input with listbox—required for accessible typeahead.',
    },
    {
      match: 'aria-activedescendant',
      label: 'aria-activedescendant',
      tip: 'Points screen readers to the keyboard-highlighted option without moving focus.',
    },
    {
      match: 'enabled: debouncedQuery.length >= 2',
      label: 'enabled guard',
      tip: 'Skip API until minimum query length—reduces noise and matches user intent.',
    },
    {
      match: 'localStorage.setItem(RECENT_KEY',
      label: 'recent searches',
      tip: 'Persist last queries locally—show on focus before user types.',
    },
  ],
  'data-table': [
    {
      match: 'useSearchParams',
      label: 'URL state',
      tip: 'Table sort/filter/page live in URL—shareable admin views and back-button support.',
    },
    {
      match: 'manualPagination: true',
      label: 'manualPagination',
      tip: 'Server returns one page; table does not slice rows client-side.',
    },
    {
      match: 'manualSorting: true',
      label: 'manualSorting',
      tip: 'Sort clicks update URL/API—database sorts 100k rows, not the browser.',
    },
    {
      match: "queryKey: ['users', urlState]",
      label: 'queryKey',
      tip: 'Refetch when any URL table param changes—page, sort, filters stay in sync.',
    },
    {
      match: 'placeholderData: (prev) => prev',
      label: 'placeholderData',
      tip: 'Show previous page while next page loads—smoother pagination UX.',
    },
    {
      match: 'flexRender',
      label: 'flexRender',
      tip: 'TanStack Table helper renders header/cell defs—supports custom sort UI.',
    },
    {
      match: 'aria-sort',
      label: 'aria-sort',
      tip: 'Announce ascending/descending sort state on column headers.',
    },
    {
      match: 'bulk-delete',
      label: 'bulk delete',
      tip: 'POST selected ids to server—never delete row-by-row from the client loop.',
    },
    {
      match: 'next.set(\'page\', \'1\')',
      label: 'reset page',
      tip: 'When filter changes, jump to page 1—avoids empty page 5 after narrowing results.',
    },
  ],
  'file-upload': [
    {
      match: 'onDragOver={(e) => e.preventDefault()}',
      label: 'preventDefault',
      tip: 'Required on dragover—without it the browser will not fire drop events.',
    },
    {
      match: '/api/uploads/init',
      label: 'init upload',
      tip: 'Server mints presigned URL + fields—client never sends file bytes through your API.',
    },
    {
      match: 'xhr.upload.onprogress',
      label: 'onprogress',
      tip: 'XHR upload progress events—fetch API lacks upload progress without ReadableStream hacks.',
    },
    {
      match: 'form.append(\'file\', file)',
      label: 'FormData',
      tip: 'Presigned POST expects policy fields plus file in multipart form to S3.',
    },
    {
      match: '/complete',
      label: 'complete',
      tip: 'Notify backend after S3 upload—triggers virus scan and marks metadata ready.',
    },
    {
      match: 'pollUntilReady',
      label: 'poll scan',
      tip: 'Async processing—client polls until status is ready or rejected.',
    },
    {
      match: 'URL.createObjectURL(file)',
      label: 'object URL',
      tip: 'Instant local image preview before upload finishes—revoke on cleanup.',
    },
    {
      match: 'URL.revokeObjectURL(url)',
      label: 'revokeObjectURL',
      tip: 'Frees blob memory when preview unmounts—prevents leaks on large batches.',
    },
  ],
  'analytics-dashboard': [
    {
      match: 'DateRangeContext',
      label: 'DateRangeContext',
      tip: 'Shared from/to drives every widget—one picker refetches all metrics together.',
    },
    {
      match: "queryKey: ['metrics', 'mrr', range.from, range.to]",
      label: 'queryKey',
      tip: 'Cache keyed by widget + range—changing dates refetches only affected metrics.',
    },
    {
      match: 'staleTime: 60_000',
      label: 'staleTime',
      tip: 'Dashboard data stays fresh for 60s—reduces refetch noise on tab focus.',
    },
    {
      match: 'useQueries({',
      label: 'useQueries',
      tip: 'Parallel independent fetches—one slow widget does not block the grid.',
    },
    {
      match: 'lazy(() => import(',
      label: 'React.lazy',
      tip: 'Code-split heavy chart library—dashboard shell paints before chart JS loads.',
    },
    {
      match: 'WidgetErrorBoundary',
      label: 'error boundary',
      tip: 'Isolate widget failures—sibling tiles keep rendering if one chart throws.',
    },
    {
      match: 'exportCsv',
      label: 'CSV export',
      tip: 'Stream export from server—avoid building huge CSV strings in the browser.',
    },
    {
      match: 'setParams(p, { replace: true })',
      label: 'URL sync',
      tip: 'Date range in URL—shareable dashboard views and back-button support.',
    },
  ],
  'shopping-cart': [
    {
      match: "queryKey: ['cart']",
      label: 'cart queryKey',
      tip: 'Single cache bucket for cart—mutations invalidate to sync totals with server.',
    },
    {
      match: 'onMutate: async (productId)',
      label: 'onMutate',
      tip: 'Optimistic add-to-cart—UI updates before API confirms stock and price.',
    },
    {
      match: 'qc.setQueryData<Cart>([\'cart\'], ctx?.prev)',
      label: 'rollback',
      tip: 'Restore prior cart if add fails (out of stock or price change).',
    },
    {
      match: 'useReducer(reducer,',
      label: 'checkout reducer',
      tip: 'Multi-step checkout as explicit state machine—shipping → payment → review.',
    },
    {
      match: 'loadStripe(',
      label: 'loadStripe',
      tip: 'Loads Stripe.js once—PaymentElement handles PCI-sensitive card fields.',
    },
    {
      match: 'confirmPayment({',
      label: 'confirmPayment',
      tip: 'Confirms PaymentIntent client-side—redirects to return_url on success.',
    },
    {
      match: 'PaymentElement',
      label: 'PaymentElement',
      tip: 'Stripe-hosted inputs—card data never enters your React state.',
    },
  ],
  'notification-center': [
    {
      match: 'aria-live="polite"',
      label: 'aria-live',
      tip: 'Toast region announces new notifications without stealing focus.',
    },
    {
      match: 'setToasts((prev) => [...prev.slice(-2)',
      label: 'toast stack',
      tip: 'Cap visible toasts at 3—older toasts drop off to avoid covering UI.',
    },
    {
      match: "queryKey: ['notifications']",
      label: 'inbox query',
      tip: 'Infinite inbox cache—invalidate when WS push or mark-read fires.',
    },
    {
      match: "new WebSocket('/ws/notifications')",
      label: 'WebSocket',
      tip: 'Real-time push for online users—fallback poll on disconnect.',
    },
    {
      match: 'push({ title: msg.notification.title',
      label: 'toast on push',
      tip: 'High-urgency events surface as toast AND persist in inbox.',
    },
    {
      match: '/notifications/${id}/read',
      label: 'mark read',
      tip: 'PATCH single notification—badge count derived from unread rows.',
    },
    {
      match: 'aria-label={`Notifications${unreadCount',
      label: 'badge a11y',
      tip: 'Bell button announces unread count to screen readers.',
    },
  ],
  'calendar-scheduling': [
    {
      match: "queryKey: ['events', from, to]",
      label: 'range query',
      tip: 'Fetch only visible week—never load entire calendar year client-side.',
    },
    {
      match: 'startOfWeek(anchor)',
      label: 'visible range',
      tip: 'Compute from/to bounds for API—week view loads 7 days of events.',
    },
    {
      match: 'eventStyle(ev)',
      label: 'layout',
      tip: 'Map start/end times to top/height % within day column—core week grid math.',
    },
    {
      match: 'role="grid"',
      label: 'grid role',
      tip: 'Week view as ARIA grid—columns are days, events are focusable cells.',
    },
    {
      match: 'res.status === 409',
      label: '409 conflict',
      tip: 'Server rejects overlapping booking—show conflict message, no silent double-book.',
    },
    {
      match: 'startUtc',
      label: 'UTC storage',
      tip: 'Persist ISO UTC—display with Intl in user local timezone.',
    },
  ],
  'photo-gallery': [
    {
      match: 'IntersectionObserver',
      label: 'IntersectionObserver',
      tip: 'Load thumbnails when tile nears viewport—rootMargin prefetches early.',
    },
    {
      match: 'paddingBottom: `${aspect}%`',
      label: 'aspect ratio box',
      tip: 'Reserve space from width/height metadata—prevents layout shift (CLS).',
    },
    {
      match: 'blurDataUrl',
      label: 'LQIP',
      tip: 'Tiny blur placeholder until thumb loads—improves perceived performance.',
    },
    {
      match: 'useInfiniteQuery({',
      label: 'useInfiniteQuery',
      tip: 'Cursor-paginated media feed—append pages as user scrolls.',
    },
    {
      match: 'createPortal(',
      label: 'lightbox portal',
      tip: 'Full-screen viewer at document.body—escapes overflow:hidden ancestors.',
    },
    {
      match: "e.key === 'Escape'",
      label: 'Escape',
      tip: 'Close lightbox on Escape—standard modal keyboard contract.',
    },
    {
      match: 'document.body.style.overflow = \'hidden\'',
      label: 'scroll lock',
      tip: 'Prevent background scroll while lightbox is open.',
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
