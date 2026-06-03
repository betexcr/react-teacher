import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { enrichCard } from './flashcard-content/enrich.mjs';
import { fundamentalsCards } from './flashcard-content/fundamentals.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '..', 'src', 'data', 'flashcards');

const DECK_SLUGS = {
  'react-fundamentals': 'fundamentals',
  'typescript-in-react': 'typescript',
  'react-19': 'react-19',
  'component-lifecycle': 'lifecycle',
  'performance-optimization': 'performance',
  'application-architecture': 'architecture',
  'design-patterns': 'design-patterns',
  'routing-navigation': 'routing',
  'testing-react': 'testing',
  'data-fetching': 'data-fetching',
  'forms-validation': 'forms',
  'security': 'security',
  'server-components-ssr': 'server-components',
  'tools-build': 'tools',
  'ecosystem-integration': 'ecosystem',
  'next-framework': 'nextjs',
  'react-internals': 'internals',
  'accessibility': 'accessibility',
  'styling': 'styling',
  'hooks': 'hooks',
};

const decks = [
  {
    id: 'react-fundamentals',
    title: 'React Fundamentals',
    cards: [
      { front: 'What is JSX?', back: 'Syntax extension that looks like HTML but compiles to React.createElement calls. It must return a single parent or Fragment.' },
      { front: 'What is the virtual DOM?', back: 'A lightweight JS representation of the UI tree. React diffs it against the previous tree to compute minimal real DOM updates.' },
      { front: 'Controlled vs uncontrolled component?', back: 'Controlled: form value driven by React state (value + onChange). Uncontrolled: DOM holds value; access via ref.' },
      { front: 'What are props?', back: 'Read-only inputs from parent to child. They trigger re-renders when changed (by reference for objects).' },
      { front: 'What is state?', back: 'Mutable data owned by a component. Updating state schedules a re-render. State updates may be batched.' },
      { front: 'Why use keys in lists?', back: 'Keys help React identify which items changed, were added, or removed. Use stable unique IDs, not array index when list mutates.' },
      { front: 'What is lifting state up?', back: 'Moving shared state to the closest common ancestor so sibling components stay in sync via props.' },
      { front: 'One-way data flow?', back: 'Data flows parent → child via props. Children notify parents via callbacks. Predictable debugging.' },
      { front: 'What is reconciliation?', back: "React's process of comparing element trees and updating the DOM. Type changes replace subtrees; same type updates props." },
      { front: 'Strict Mode purpose?', back: 'Dev-only checks: double-invoking effects/render to surface side effects, warns on legacy APIs, helps find unsafe patterns.' },
      { front: 'Fragment?', back: '<Fragment> or <> groups children without extra DOM node.' },
      { front: 'Conditional rendering patterns?', back: 'if/return, ternary, && short-circuit, early return null, switch on enum state.' },
      { front: 'Element vs component?', back: 'Element is a plain object describing UI (type, props). Component is a function/class that returns elements.' },
      { front: 'Why avoid mutating state?', back: 'Mutation skips change detection (same reference). React expects immutable updates to schedule renders correctly.' },
    ],
  },
  {
    id: 'typescript-in-react',
    title: 'TypeScript in React',
    cards: [
      { front: 'Typing component props', back: 'type Props = { title: string; count?: number }; function C({ title, count = 0 }: Props) {}' },
      { front: 'React.FC vs function signature?', back: 'Prefer explicit props types on plain functions. Modern @types/react no longer adds implicit children to FC; FC is rarely needed.' },
      { front: 'Typing useState', back: 'useState<User | null>(null) infers union; explicit generic when initial value is ambiguous (e.g. []). useState<string[]>([]).' },
      { front: 'Typing events', back: 'React.ChangeEvent<HTMLInputElement>, React.MouseEvent<HTMLButtonElement>, FormEvent for forms.' },
      { front: 'Typing children', back: 'React.ReactNode accepts anything renderable; React.ReactElement is stricter.' },
      { front: 'Generic components', back: 'function List<T>({ items, render }: { items: T[]; render: (item: T) => ReactNode })' },
      { front: 'ComponentProps utility', back: 'ComponentProps<typeof Button> extracts props from an existing component for wrappers.' },
      { front: 'Ref typing', back: 'useRef<HTMLInputElement>(null); RefObject for DOM; MutableRefObject when .current is assigned imperatively.' },
      { front: 'Discriminated unions in UI', back: 'type State = { status: "loading" } | { status: "ok"; data: T }; switch on status for narrowing.' },
      { front: 'as const', back: 'Narrows literals for props variants: const sizes = ["sm","md"] as const; type Size = typeof sizes[number].' },
      { front: 'satisfies operator', back: 'Ensures object matches type while preserving literal inference: const theme = { ... } satisfies Theme.' },
      { front: 'Typing context', back: 'createContext<Auth | null>(null); custom hook throws if null to enforce provider.' },
      { front: 'Ref as prop (React 19)', back: 'Function components can accept ref as a normal prop; forwardRef is optional for older React or library interop.' },
      { front: 'Module augmentation', back: 'Extend CSS modules or third-party types via declare module "..." { }' },
      { front: 'strictNullChecks impact', back: 'Forces handling undefined/null; optional chaining and guards in render paths.' },
    ],
  },
  {
    id: 'react-19',
    title: 'React 19',
    cards: [
      { front: 'Actions (React 19)', back: 'Async functions used as <form action={fn}> or with useActionState; useTransition marks non-urgent updates (isPending)—not where you register actions.' },
      { front: 'useActionState', back: 'Returns [state, formAction, isPending]. formAction goes on <form action={formAction}>; replaces many useFormState patterns.' },
      { front: 'useOptimistic', back: 'Shows optimistic UI while async action runs; reverts on error. Pairs with Actions.' },
      { front: 'use() hook', back: 'Reads promises or context during render; suspends until promise resolves. Enables promise-as-prop patterns.' },
      { front: 'ref as prop', back: 'ref can be passed as a regular prop to function components without forwardRef in React 19.' },
      { front: 'Document metadata', back: '<title>, <meta> in components hoist to document head automatically in supporting environments.' },
      { front: 'Improved hydration errors', back: 'React 19 improves hydration mismatch messages and selective hydration; you still fix server/client HTML differences at the source.' },
      { front: 'Server Components in frameworks', back: 'Frameworks (e.g. Next App Router) default routes to Server Components; server code is not in the client bundle, but client boundaries still ship JS + RSC payload.' },
      { front: 'Form reset behavior', back: 'Forms can reset uncontrolled fields after action success; better integration with Actions.' },
      { front: 'Context as provider', back: '<ThemeContext value={theme}> instead of .Provider shorthand in modern React.' },
      { front: 'Cleanup ref callbacks', back: 'Ref callbacks may return cleanup function when ref detaches (mirrors effect cleanup).' },
      { front: 'Automatic batching (React 18+)', back: 'React batches multiple setStates in events, promises, and timeouts into one render; React 19 continues this behavior—it is not unique to 19.' },
      { front: 'Deprecated: defaultProps on FC', back: 'Use default parameters in function signature instead for function components.' },
      { front: 'Suspense + streaming', back: 'Server streams HTML with placeholders; client hydrates incrementally.' },
      { front: 'Activity component (React 19.2+)', back: '<Activity mode="visible|hidden"> hides UI (display:none), tears down effects, preserves state/DOM—successor to experimental Offscreen.' },
    ],
  },
  {
    id: 'component-lifecycle',
    title: 'Component Lifecycle',
    cards: [
      { front: 'Mount phase (function components)', back: 'First render, then useLayoutEffect, then useEffect. useEffect runs after paint.' },
      { front: 'Update phase', back: 'Re-render when state/props/context change; effects re-run if deps changed.' },
      { front: 'Unmount cleanup', back: 'useEffect return function runs on unmount and before re-running effect when deps change.' },
      { front: 'useLayoutEffect vs useEffect', back: 'Layout: synchronous after DOM mutations, before paint—measure DOM. Effect: after paint—subscriptions, fetch.' },
      { front: 'Class componentDidMount equivalent?', back: 'useEffect(() => { ... }, []) runs after paint; in Strict Mode (dev) setup+cleanup run twice to expose missing cleanups.' },
      { front: 'getDerivedStateFromProps equivalent?', back: 'Derive values from props during render, store only user edits, or remount with key—avoid setState in render to mirror props.' },
      { front: 'shouldComponentUpdate equivalent?', back: 'React.memo(Component, arePropsEqual?) skips re-renders; useMemo caches values, not component renders.' },
      { front: 'componentWillUnmount equivalent?', back: 'Return a cleanup function from useEffect or useLayoutEffect.' },
      { front: 'Why no componentWillMount?', back: 'Deprecated for side effects before paint and SSR issues; use render for pure work and effects after commit in function components.' },
      { front: 'Strict Mode double mount', back: 'Dev-only: mount → unmount → remount to test effect cleanup.' },
    ],
  },
  {
    id: 'performance-optimization',
    title: 'Performance Optimization',
    cards: [
      { front: 'React.memo', back: 'Skips re-render if props shallow-equal. Needs stable prop references.' },
      { front: 'useMemo', back: 'Caches computed value between renders when deps unchanged.' },
      { front: 'useCallback', back: 'Caches function identity for stable props to memoized children.' },
      { front: 'Code splitting', back: 'React.lazy + Suspense loads components on demand; route-based splitting with bundler.' },
      { front: 'Virtualization', back: 'Render only visible list rows (react-window, manual windowing) for large lists.' },
      { front: 'Profiler API', back: '<Profiler onRender> reports commit timings (works in prod with overhead); DevTools Profiler is the main dev workflow.' },
      { front: 'Avoid premature optimization', back: 'Measure first; memo has cost. Optimize hot paths and proven bottlenecks.' },
      { front: 'Context performance', back: 'Split contexts; memoize value; avoid storing fast-changing data in wide context.' },
      { front: 'useDeferredValue', back: 'Defers updating non-urgent UI during heavy renders—keeps input responsive.' },
      { front: 'useTransition', back: 'Marks updates as transitions; isPending for loading UI; lower priority re-renders.' },
      { front: 'Bundle size', back: 'Tree-shake, analyze with source-map-explorer, avoid heavy deps on critical path.' },
      { front: 'Keys and reconciliation cost', back: 'Bad keys cause remounts; expensive children remount loses DOM/state.' },
      { front: 'Web Vitals', back: 'LCP, INP, CLS—optimize assets, fonts, layout shift, long tasks.' },
      { front: 'Server Components perf', back: 'Server-only components avoid shipping their implementation JS; pages still load client boundaries, hydration, and RSC payload.' },
      { front: 'Hydration cost', back: 'Match server HTML; reduce client-only trees; stream with Suspense.' },
    ],
  },
  {
    id: 'application-architecture',
    title: 'Application Architecture',
    cards: [
      { front: 'Container vs presentational', back: 'Containers handle data/logic; presentational components are pure UI from props.' },
      { front: 'Feature folders', back: 'Colocate components, hooks, tests per feature instead of type-based folders only.' },
      { front: 'State colocation', back: 'Keep state as low as possible; lift only when multiple consumers need it.' },
      { front: 'URL as state', back: 'Shareable/bookmarkable UI state via route params and searchParams.' },
      { front: 'Global vs local state', back: 'Local default; global for auth, theme, truly cross-app data. Consider React Query for server cache.' },
      { front: 'Error boundaries placement', back: 'Wrap route sections or risky widgets—not every component.' },
      { front: 'Composition root', back: 'App shell wires providers (router, query, theme) once at top.' },
      { front: 'Barrel files tradeoff', back: 'index.ts re-exports simplify imports but can hurt tree-shaking if not careful.' },
      { front: 'API layer separation', back: 'services/api.ts abstracts fetch; hooks consume services.' },
      { front: 'Env configuration', back: 'import.meta.env / process.env for API URLs; never commit secrets.' },
      { front: 'Monorepo with React', back: 'Shared UI package + apps; Turborepo/npm workspaces for builds.' },
      { front: 'Micro-frontends', back: 'Module federation or iframe boundaries; shared design system challenges.' },
      { front: 'DDD in frontend', back: 'Domains map to features; bounded contexts reduce coupling.' },
      { front: 'Testing pyramid', back: 'Many unit, fewer integration, selective E2E for critical flows.' },
      { front: 'Documentation', back: 'Storybook for UI; ADRs for architectural decisions.' },
    ],
  },
  {
    id: 'design-patterns',
    title: 'Design Patterns',
    cards: [
      { front: 'Compound components', back: 'Card.Header, Card.Body share implicit context—flexible API without prop explosion.' },
      { front: 'Render props', back: 'Component receives function child: <DataFetcher render={data => ...} /> — shares logic.' },
      { front: 'Higher-order component (HOC)', back: 'withAuth(Component) wraps and injects props—less common with hooks.' },
      { front: 'Custom hooks pattern', back: 'Primary reuse mechanism: useForm, useAuth encapsulate stateful logic.' },
      { front: 'Provider pattern', back: 'Context supplies tree-wide dependencies (theme, i18n).' },
      { front: 'Controlled component pattern', back: 'Parent owns value; child notifies via onChange—forms, inputs.' },
      { front: 'State reducer pattern', back: 'useReducer for complex transitions; action types document events.' },
      { front: 'Facade pattern', back: 'Simple hook hides complex subsystem (useCheckout over cart+payment APIs).' },
      { front: 'Observer pattern', back: 'Subscriptions in useEffect; event emitters; external store listeners.' },
      { front: 'Strategy pattern', back: 'Swap algorithms via props: validationStrategy, paymentStrategy.' },
      { front: 'Portal pattern', back: 'Modals/tooltips render outside parent DOM hierarchy via createPortal.' },
      { front: 'Slot pattern', back: 'children or named slots (header, footer props) for layout composition.' },
      { front: 'Polymorphic components', back: 'as prop renders as button or anchor with shared styles (Button as="a").' },
      { front: 'Headless UI', back: 'Logic-only hooks/components; consumer supplies styles (Radix, React Aria).' },
      { front: 'Anti-pattern: giant components', back: 'Split by responsibility; extract hooks and subcomponents.' },
    ],
  },
  {
    id: 'routing-navigation',
    title: 'Routing & Navigation',
    cards: [
      { front: 'React Router 7 basics', back: 'createBrowserRouter + RouterProvider, or <BrowserRouter> with Routes/Route element, Link, NavLink, useNavigate (RR 6/7 patterns).' },
      { front: 'Nested routes', back: 'Parent Route with Outlet; child routes render inside parent layout.' },
      { front: 'Dynamic params', back: 'path="users/:id" — useParams() returns { id }.' },
      { front: 'Search params', back: 'useSearchParams() read/write query string; good for filters/pagination.' },
      { front: 'Programmatic navigation', back: 'navigate("/path") or navigate(-1) for history back.' },
      { front: 'Protected routes', back: 'Wrapper checks auth; redirect to login with location state return URL.' },
      { front: 'Lazy routes', back: 'const Page = lazy(() => import("./Page")); wrap Route in Suspense.' },
      { front: '404 handling', back: 'path="*" element={<NotFound />} at end of Routes.' },
      { front: 'Data routers', back: 'createBrowserRouter + loaders/actions for data on navigation (RR 6.4+).' },
      { front: 'Relative links', back: 'Link to="details" resolves relative to parent route path.' },
      { front: 'Index routes', back: 'Default child at parent URL—index route element on parent path.' },
      { front: 'Scroll restoration', back: 'Manual useEffect on pathname or ScrollRestoration in frameworks.' },
      { front: 'Next.js App Router', back: 'File-system routes under app/ with layout.tsx, page.tsx, loading.tsx; Server Components by default, "use client" for boundaries.' },
      { front: 'Deep linking', back: 'URLs reflect app state for sharing; sync tab state to query params.' },
      { front: 'Route-based code splitting', back: 'Each route chunk loads separately—smaller initial bundle.' },
    ],
  },
  {
    id: 'testing-react',
    title: 'Testing React Applications',
    cards: [
      { front: 'Testing Library philosophy', back: 'Test behavior users see—queries by role/label, not implementation details.' },
      { front: 'render vs screen', back: 'render(<App />); screen.getByRole("button", { name: /submit/i }).' },
      { front: 'userEvent vs fireEvent', back: 'userEvent simulates realistic interactions (click, type); prefer over fireEvent.' },
      { front: 'waitFor / findBy', back: 'findBy* async waits for element; waitFor for arbitrary async assertions.' },
      { front: 'Mocking fetch', back: 'msw (Mock Service Worker) intercepts network; or vi.spyOn(global, "fetch").' },
      { front: 'Testing hooks', back: 'renderHook from @testing-library/react; act() wraps state updates.' },
      { front: 'Provider wrappers', back: 'render(ui, { wrapper: ({ children }) => <Provider>{children}</Provider> }).' },
      { front: 'Snapshot testing caution', back: 'Brittle for large trees; prefer explicit assertions on text/roles.' },
      { front: 'E2E with Playwright', back: 'Real browser; test critical paths; slower but high confidence.' },
      { front: 'Accessibility tests', back: 'jest-axe or eslint-plugin-jsx-a11y catch missing labels/roles.' },
      { front: 'Testing async components', back: 'await screen.findByText; assert loading then success states.' },
      { front: 'Mock modules', back: 'vi.mock("./api") in Vitest; jest.mock in Jest.' },
      { front: 'Coverage limits', back: '100% coverage ≠ quality; focus critical paths and edge cases.' },
      { front: 'CI testing', back: 'Run unit in PR; E2E on main or nightly; parallelize shards.' },
      { front: 'Component isolation', back: 'Storybook for visual states; test one component per test file.' },
    ],
  },
  {
    id: 'data-fetching',
    title: 'Data Fetching & Management',
    cards: [
      { front: 'useEffect fetch pitfalls', back: 'Race conditions, no cache, loading flicker—use cleanup/AbortController.' },
      { front: 'TanStack Query benefits', back: 'Caching, deduping, background refetch, staleTime, mutations, optimistic updates.' },
      { front: 'staleTime vs gcTime', back: 'staleTime: how long data is fresh before background refetch; gcTime (formerly cacheTime in v4): how long unused cache stays in memory after unmount.' },
      { front: 'SWR pattern', back: 'Stale-while-revalidate: show cache, revalidate in background.' },
      { front: 'Server state vs client state', back: 'Server: remote cache (Query). Client: UI toggles, form drafts (useState/Zustand).' },
      { front: 'Optimistic updates', back: 'Update UI before server confirms; rollback on error.' },
      { front: 'Pagination patterns', back: 'Offset/limit vs cursor; infinite scroll with useInfiniteQuery.' },
      { front: 'Prefetching', back: 'queryClient.prefetchQuery on hover/route loader for faster navigation.' },
      { front: 'Error handling', back: 'isError, error object, retry, error boundaries for unexpected.' },
      { front: 'Mutations', back: 'useMutation with onSuccess invalidateQueries to refresh lists.' },
      { front: 'GraphQL with React', back: 'Apollo Client or urql: normalized cache, queries, subscriptions.' },
      { front: 'WebSockets', back: 'useEffect subscription; update cache or local state on message.' },
      { front: 'Suspense for data', back: 'Suspense shows fallback while children suspend; React 19 can read promises with use(promise) under a boundary, or use library helpers like useSuspenseQuery.' },
      { front: 'RSC data fetching', back: 'async Server Component fetch—no client waterfall.' },
      { front: 'Request deduplication', back: 'Same key requests merge—built into Query/SWR.' },
    ],
  },
  {
    id: 'forms-validation',
    title: 'Forms & Validation',
    cards: [
      { front: 'Controlled form fields', back: 'value + onChange tied to state; single source of truth.' },
      { front: 'react-hook-form', back: 'Uncontrolled refs + register(); less re-renders; resolver for schema validation.' },
      { front: 'Zod + forms', back: 'Schema defines shape; zodResolver validates; inferred TypeScript types.' },
      { front: 'Field-level vs form-level validation', back: 'onBlur per field UX; submit validates all; display errors map.' },
      { front: 'Touched/dirty flags', back: 'Show errors after interaction; dirty means user changed value.' },
      { front: 'Async validation', back: 'Check username availability on blur; debounce API calls.' },
      { front: 'Form state machines', back: 'Multi-step wizards; branch logic; XState for complex flows.' },
      { front: 'File inputs', back: 'Controlled tricky—often uncontrolled ref or store File in state on change.' },
      { front: 'Native form validation', back: 'required, pattern, constraint validation API—supplement with JS.' },
      { front: 'Accessibility in forms', back: 'label htmlFor, aria-invalid, aria-describedby for errors.' },
      { front: 'Reset form', back: 'setState initial values; RHF reset(); key prop remount trick.' },
      { front: 'Dynamic fields', back: 'useFieldArray (RHF) or array state with map for repeatable sections.' },
      { front: 'Server Actions forms', back: '<form action={serverAction}> can work with minimal JS; pending UI, useActionState, and useOptimistic need client components.' },
      { front: 'Prevent double submit', back: 'Disable button while pending; isSubmitting flag.' },
    ],
  },
  {
    id: 'security',
    title: 'Security Best Practices',
    cards: [
      { front: 'XSS in React', back: 'Default escaping in JSX. Danger: dangerouslySetInnerHTML—sanitize with DOMPurify.' },
      { front: 'CSRF', back: 'Use SameSite cookies, CSRF tokens for cookie-auth forms, avoid credentialed CORS misconfig.' },
      { front: 'Never store secrets in frontend', back: 'API keys in client bundles are public; use server proxy.' },
      { front: 'Auth token storage', back: 'httpOnly cookies preferred over localStorage for XSS resilience.' },
      { front: 'Content Security Policy', back: 'HTTP header restricts script sources; mitigates inline injection.' },
      { front: 'Dependency auditing', back: 'npm audit, Dependabot, lockfile integrity.' },
      { front: 'Open redirects', back: 'Validate redirect URLs against allowlist before navigate( userParam ).' },
      { front: 'JWT in SPA', back: 'Short expiry, refresh rotation, store securely, validate on server only.' },
      { front: 'CORS', back: 'Browser enforces; server sets Access-Control-Allow-Origin—not a substitute for auth.' },
      { front: 'Input validation', back: 'Validate on server always; client validation is UX only.' },
      { front: 'Rate limiting', back: 'Server-side throttling on auth and expensive endpoints.' },
      { front: 'Subresource Integrity', back: 'integrity attribute on CDN scripts to detect tampering.' },
      { front: 'Clickjacking', back: 'X-Frame-Options or CSP frame-ancestors.' },
      { front: 'Sensitive data in URLs', back: 'Avoid tokens in query strings—logged in history/referrers.' },
      { front: 'Supply chain', back: 'Pin deps, review packages, use provenance where available.' },
    ],
  },
  {
    id: 'server-components-ssr',
    title: 'Server Components & SSR',
    cards: [
      { front: 'Server Component', back: 'Runs on server; can async fetch; no hooks/state/events. Code is not client-bundled; output streams as RSC payload alongside client JS.' },
      { front: '"use client"', back: 'Marks client boundary—bundle includes hooks, effects, browser APIs.' },
      { front: 'SSR vs SSG', back: 'SSR: HTML per request. SSG: HTML at build. ISR: revalidate static pages.' },
      { front: 'Hydration', back: 'Client React reconciles with server-rendered HTML (and RSC payload), then makes the UI interactive; markup mismatches cause hydration errors.' },
      { front: 'Streaming SSR', back: 'Send HTML in chunks with Suspense fallbacks—faster TTFB.' },
      { front: 'serialize RSC payload', back: 'Flight protocol streams component tree references to client.' },
      { front: 'When to use client components', back: 'Interactivity, useState, useEffect, browser APIs, most third-party UI libs.' },
      { front: 'Passing data RSC → client', back: 'Serializable props only; no functions unless server actions.' },
      { front: 'Server Actions', back: 'Async functions run on server; invoked from forms/client with secure boundaries.' },
      { front: 'Caching in Next', back: 'fetch { next: { revalidate } }, route segment config, unstable_cache; Next 15+ also Cache Components ("use cache", cacheTag, cacheLife).' },
      { front: 'SEO benefit', back: 'SSR/SSG gives crawlers HTML immediately; CSR can be indexed but is slower/less reliable for content and link previews without SSR/meta pipelines.' },
      { front: 'Environment secrets', back: 'Only server components/route handlers access private env vars.' },
      { front: 'Client-only libraries', back: 'dynamic(() => import(...), { ssr: false }) for chart/map libs.' },
      { front: 'Partial Prerendering', back: 'Static shell + streamed dynamic Suspense holes; experimental in Next 15, evolving toward Cache Components in Next 16+.' },
      { front: 'Waterfalls', back: 'Avoid sequential client fetches; colocate fetch in RSC or parallel Query.' },
    ],
  },
  {
    id: 'tools-build',
    title: 'Tools & Build Pipeline',
    cards: [
      { front: 'Vite', back: 'Dev: native ESM + esbuild.prebundle. Prod: Rollup. Fast HMR.' },
      { front: 'Webpack role', back: 'Bundler: entry graph, loaders, plugins. Slower dev but ecosystem mature.' },
      { front: 'TypeScript in build', back: 'tsc --noEmit for types; esbuild/swc transpile separately in Vite.' },
      { front: 'ESLint + React', back: 'eslint-plugin-react-hooks enforces rules of hooks; react-refresh for HMR safety.' },
      { front: 'Prettier', back: 'Opinionated formatter; integrate with ESLint via eslint-config-prettier.' },
      { front: 'Environment variables', back: 'VITE_ prefix exposed in Vite; never prefix secrets.' },
      { front: 'Source maps', back: 'Production hidden-source-map for Sentry; not exposed publicly.' },
      { front: 'Tree shaking', back: 'ESM side-effect-free imports enable dead code elimination.' },
      { front: 'Bundle analysis', back: 'rollup-plugin-visualizer / webpack-bundle-analyzer find large deps.' },
      { front: 'Vitest', back: 'Vite-native test runner; compatible with Jest API via vi.' },
      { front: 'CI pipeline', back: 'lint → typecheck → test → build; cache node_modules.' },
      { front: 'pnpm vs npm', back: 'pnpm: content-addressable store, strict node_modules—saves disk.' },
      { front: 'Monorepo tools', back: 'Turborepo caches task outputs across packages.' },
      { front: 'HMR', back: 'Hot Module Replacement updates modules without full reload.' },
      { front: 'Docker for SPA', back: 'Multi-stage: build static assets, serve with nginx.' },
    ],
  },
  {
    id: 'ecosystem-integration',
    title: 'React Ecosystem & Integration',
    cards: [
      { front: 'State libraries comparison', back: 'Redux Toolkit: global predictable state. Zustand/Jotai: light client stores. TanStack Query: server/async cache. Recoil is largely unmaintained.' },
      { front: 'Zustand', back: 'Simple store hook; no Provider required; middleware for persist/devtools.' },
      { front: 'Redux Toolkit', back: 'createSlice, configureStore, RTK Query for data—less boilerplate.' },
      { front: 'Framer Motion', back: 'Declarative animations; layout animations; gesture support.' },
      { front: 'React Hook Form + UI libs', back: 'Integrates with MUI/Chakra via Controller for controlled third-party inputs.' },
      { front: 'i18n', back: 'react-i18next: namespaces, interpolation, lazy load translations.' },
      { front: 'MDX', back: 'Markdown + JSX in content pages; compile to components.' },
      { front: 'Micro-frontend integration', back: 'Single-spa, module federation share react singleton.' },
      { front: 'Electron + React', back: 'Renderer process UI; watch IPC security; contextIsolation.' },
      { front: 'React Native architecture', back: 'React renders to native views; New Architecture (Fabric, TurboModules, JSI) replaces the legacy async bridge for most paths.' },
      { front: 'Storybook', back: 'Isolated component dev; visual regression with Chromatic.' },
      { front: 'Design tokens', back: 'Style Dictionary exports to CSS/JS from single source.' },
      { front: 'CMS headless', back: 'Contentful/Sanity data into RSC or static generation.' },
      { front: 'Analytics', back: 'Effect on route change; respect consent; avoid PII in events.' },
    ],
  },
  {
    id: 'next-framework',
    title: 'Next Framework',
    cards: [
      { front: 'App Router vs Pages', back: 'App: app/ dir, layouts, RSC. Pages: pages/ file routing, getServerSideProps legacy.' },
      { front: 'layout.tsx', back: 'Shared UI for a segment; client state in the layout persists across child navigations; Server Components in layouts re-fetch unless cached.' },
      { front: 'loading.tsx', back: 'Instant loading UI via Suspense boundary for route segment.' },
      { front: 'error.tsx', back: 'Client error boundary for route segment; reset() recovers.' },
      { front: 'Metadata API', back: 'export metadata or generateMetadata for SEO tags.' },
      { front: 'Route handlers', back: 'app/api/route.ts — HTTP methods as exported functions.' },
      { front: 'Middleware', back: 'middleware.ts intercepts requests (auth, redirects, headers); defaults to Edge runtime; Node.js runtime supported in some versions—check current Next docs.' },
      { front: 'Image component', back: 'next/image: optimization, lazy load, responsive sizes.' },
      { front: 'Font optimization', back: 'next/font: self-host Google fonts, no layout shift.' },
      { front: 'Dynamic routes', back: '[slug] folders; generateStaticParams for SSG paths.' },
      { front: 'Client navigation', back: 'Link prefetches; soft navigation without full reload.' },
      { front: 'Vercel deployment', back: 'Zero-config for Next; edge functions; env vars per environment.' },
      { front: 'ISR', back: 'revalidate: 60 on fetch/page—regenerate stale pages in background.' },
      { front: 'Parallel routes', back: '@modal slots for simultaneous views (e.g. modal + page).' },
      { front: 'Intercepting routes', back: '(..)photo modal over gallery—URL reflects modal state.' },
    ],
  },
  {
    id: 'react-internals',
    title: 'React Internals',
    cards: [
      { front: 'Fiber architecture', back: 'Unit of work per component; enables incremental rendering and priority.' },
      { front: 'Reconciliation algorithm', back: 'Compares trees; same type updates props; different type tears down subtree.' },
      { front: 'Commit phase', back: 'Apply DOM updates after render phase completes—layout effects, then paint, then passive effects.' },
      { front: 'Lanes / priorities', back: 'React 18+ schedules urgent (input) vs transition updates differently.' },
      { front: 'Double buffering', back: 'Work-in-progress tree swapped on commit; current vs alternate fiber.' },
      { front: 'Hooks linked list', back: 'Hooks stored on fiber in call order—why hooks rules exist.' },
      { front: 'Synthetic events legacy', back: 'React 17+ attaches to root; pooling removed.' },
      { front: 'Batching', back: 'Multiple setStates in event/async batched into one render (React 18 broad).' },
      { front: 'Suspense mechanism', back: 'Throws thenable; nearest boundary shows fallback until resolved.' },
      { front: 'Concurrent rendering', back: 'Render can pause, resume, abandon—for responsiveness.' },
      { front: 'useSyncExternalStore', back: 'Subscribe to external stores safely with tearing prevention in concurrent mode.' },
      { front: 'Activity component', back: 'React 19.2+ <Activity mode="hidden"> deprioritizes hidden UI, preserves state/DOM, runs effect cleanup until shown again.' },
      { front: 'Compiler (React Forget)', back: 'Auto-memoization at compile time—reduces manual memo (check adoption).' },
      { front: 'DevTools', back: 'Fiber inspector, profiler flame charts, component highlights.' },
    ],
  },
  {
    id: 'accessibility',
    title: 'Accessibility',
    cards: [
      { front: 'Semantic HTML first', back: 'button, nav, main, heading hierarchy before ARIA overrides.' },
      { front: 'Accessible name', back: 'Visible text, aria-label, or aria-labelledby must name interactive elements.' },
      { front: 'Keyboard navigation', back: 'All functionality operable via keyboard; visible focus styles.' },
      { front: 'Focus management', back: 'Trap focus in modals; restore focus on close; autofocus intentionally.' },
      { front: 'aria-live', back: 'Announces dynamic updates (polite/assertive) for toasts/status.' },
      { front: 'Color contrast', back: 'WCAG AA: 4.5:1 text; do not rely on color alone for meaning.' },
      { front: 'alt text', back: 'Decorative: alt="". Informative: concise description. Functional images need context.' },
      { front: 'Form labels', back: 'Every input has associated label; placeholders are not labels.' },
      { front: 'Skip links', back: 'Skip to main content link for keyboard users bypassing nav.' },
      { front: 'Reduced motion', back: 'prefers-reduced-motion: reduce disables non-essential animations.' },
      { front: 'Role attribute', back: 'When semantic HTML insufficient: role="dialog", role="tablist", etc.' },
      { front: 'Heading order', back: 'Do not skip levels arbitrarily; one h1 per page typically.' },
      { front: 'Testing a11y', back: 'axe-core automated checks + manual screen reader testing.' },
      { front: 'React Aria / Radix', back: 'Libraries implement WAI-ARIA patterns correctly.' },
      { front: 'Disabled vs aria-disabled', back: 'aria-disabled allows focus for custom widgets; disabled removes from tab order.' },
    ],
  },
  {
    id: 'styling',
    title: 'Styling in React',
    cards: [
      { front: 'CSS Modules', back: 'import styles from "./X.module.css" — locally scoped class names.' },
      { front: 'Tailwind CSS', back: 'Utility classes in JSX; @apply for extracts; tree-shake unused.' },
      { front: 'CSS-in-JS (styled-components)', back: 'Styles colocated; runtime cost; Emotion similar; consider zero-runtime alternatives.' },
      { front: 'Vanilla Extract', back: 'Type-safe CSS-in-TS; zero runtime; build-time extraction.' },
      { front: 'Inline styles', back: 'style={{ }} object; camelCase props; good for dynamic values only.' },
      { front: 'clsx / cn utility', back: 'Conditional class merging: cn("btn", isActive && "active").' },
      { front: 'Design systems', back: 'Token-based spacing/color; component library (shadcn, MUI).' },
      { front: 'Dark mode', back: 'CSS variables + data-theme; prefers-color-scheme; class on html.' },
      { front: 'Responsive design', back: 'Media queries, container queries, mobile-first breakpoints.' },
      { front: 'Global styles', back: 'index.css reset; avoid leaking globals—use layers (@layer).' },
      { front: 'Animation performance', back: 'Prefer transform/opacity; avoid layout thrashing.' },
      { front: 'SSR CSS', back: 'Collect critical CSS or use zero-runtime to avoid FOUC.' },
      { front: 'Tailwind content scanning', back: 'v3: content paths in tailwind.config. v4: @source globs in CSS—wrong paths cause missing styles or leftover CSS.' },
      { front: 'Component variants', back: 'cva() defines variant maps type-safely.' },
      { front: 'Scoped vs global', back: 'Modules/CSS-in-JS scoped; global for resets and typography base.' },
    ],
  },
  {
    id: 'hooks',
    title: 'Hooks',
    cards: [
      { front: 'Rules of Hooks', back: 'Only call at top level; only in React functions—ensures consistent fiber hook order.' },
      { front: 'useState', back: 'State + setter; functional updates; lazy init useState(() => expensive()).' },
      { front: 'useEffect', back: 'Side effects after paint; deps array; cleanup on unmount/re-run.' },
      { front: 'useContext', back: 'Subscribe to nearest Provider value; rerenders when value changes.' },
      { front: 'useReducer', back: '(state, action) => newState; good for complex transitions.' },
      { front: 'useRef', back: 'Mutable .current; DOM refs; values that should not trigger render.' },
      { front: 'useMemo / useCallback', back: 'Cache values/functions when deps stable—use after profiling or to stabilize props for memo children; React Compiler can reduce manual memo.' },
      { front: 'useImperativeHandle', back: 'Customizes the ref value a parent receives; works with ref-as-prop in React 19 or forwardRef for older patterns.' },
      { front: 'useLayoutEffect', back: 'Sync after DOM update before browser paint—measurements.' },
      { front: 'useId', back: 'Stable unique IDs for accessibility associations SSR-safe.' },
      { front: 'useDebugValue', back: 'Label custom hooks in DevTools.' },
      { front: 'Custom hooks', back: 'Extract stateful logic; name with use; can compose other hooks.' },
      { front: 'useTransition', back: 'Mark non-urgent updates; isPending flag.' },
      { front: 'useDeferredValue', back: 'Defer lagging behind urgent state for perf.' },
    ],
  },
];

const processedDecks = decks.map((d) => ({
  id: d.id,
  slug: DECK_SLUGS[d.id] ?? d.id,
  title: d.title,
  cards:
    d.id === 'react-fundamentals'
      ? fundamentalsCards
      : d.cards.map((c) => enrichCard(d.title, d.id, c.front, c.back, c.code)),
}));

fs.mkdirSync(outDir, { recursive: true });

fs.writeFileSync(
  path.join(outDir, 'types.ts'),
  `export type Flashcard = {
  question: string;
  explanation: string;
};

export type FlashcardDeck = {
  id: string;
  slug: string;
  title: string;
  cards: Flashcard[];
};
`
);

function toExportName(id) {
  return id.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
}

const deckFiles = processedDecks.map((d) => {
  const constName = toExportName(d.id);
  const content = `import type { FlashcardDeck } from './types';

export const ${constName}Deck: FlashcardDeck = ${JSON.stringify(d, null, 2)};
`;
  fs.writeFileSync(path.join(outDir, `${d.id}.ts`), content);
  return { id: d.id, exportName: `${constName}Deck`, count: d.cards.length };
});

const imports = deckFiles.map((d) => `import { ${d.exportName} } from './${d.id}';`).join('\n');
const registry = deckFiles.map((d) => `  ${d.exportName},`).join('\n');

fs.writeFileSync(
  path.join(outDir, 'index.ts'),
  `${imports}

export * from './types';

export const flashcardDecks = [
${registry}
];

export function getDeckById(id: string) {
  return flashcardDecks.find((d) => d.id === id);
}

export function getDeckBySlug(slug: string) {
  return flashcardDecks.find((d) => d.slug === slug);
}
`
);

console.log(
  `Generated ${processedDecks.length} decks, ${processedDecks.reduce((n, d) => n + d.cards.length, 0)} cards total.`
);
