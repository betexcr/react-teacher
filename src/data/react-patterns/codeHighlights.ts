import type { SolutionHighlight } from '../../lib/solutionHighlights';

/** Per-pattern tooltips for fenced ts/tsx code in react-patterns markdown. */
const bySlug: Record<string, SolutionHighlight[]> = {
  'compound-components': [
    {
      match: 'createContext<TabsContextValue | null>(null)',
      label: 'createContext',
      tip: 'Creates shared tab state — List, Tab, and Panel read the same active id without prop drilling.',
    },
    {
      match: 'useTabsContext()',
      label: 'useTabsContext',
      tip: 'Guard hook throws if a subcomponent renders outside Tabs — catches misuse early in dev.',
    },
    {
      match: 'TabsContext.Provider',
      label: 'Provider',
      tip: 'Parent Tabs owns active state and publishes { active, setActive } to all descendants.',
    },
    {
      match: 'role="tablist"',
      label: 'role="tablist"',
      tip: 'ARIA landmark grouping tab triggers — required for accessible tab widgets.',
    },
    {
      match: 'aria-selected={active === id}',
      label: 'aria-selected',
      tip: 'Screen readers announce which tab is selected; must stay in sync with visible panel.',
    },
    {
      match: 'if (active !== id) return null',
      label: 'conditional panel',
      tip: 'Only mount the active panel — unmounting inactive panels saves DOM work and focus traps.',
    },
    {
      match: 'Tabs.List = TabList',
      label: 'static subcomponents',
      tip: 'Attach parts to Tabs namespace (Tabs.List, Tabs.Tab) for an ergonomic compound API.',
    },
  ],
  'custom-hooks': [
    {
      match: 'export function useGeolocation()',
      label: 'useGeolocation',
      tip: 'Custom hooks must start with use and may call useState/useEffect — same Rules of Hooks as components.',
    },
    {
      match: 'type GeoState =',
      label: 'discriminated union',
      tip: 'Model async states explicitly (idle/loading/error/success) so callers handle every branch safely.',
    },
    {
      match: 'watchPosition(',
      label: 'watchPosition',
      tip: 'Subscription API — fires when coords change; returns watchId used in cleanup.',
    },
    {
      match: 'clearWatch(watchId)',
      label: 'clearWatch',
      tip: 'Effect cleanup stops geolocation updates when the component unmounts — prevents leaks.',
    },
    {
      match: 'geo.status !== \'success\'',
      label: 'status check',
      tip: 'Consumers branch on discriminated status before accessing coords — TypeScript narrows the type.',
    },
  ],
  'container-presentational': [
    {
      match: 'useQuery({',
      label: 'useQuery',
      tip: 'Container layer owns remote data — caching, loading, and refetch live here, not in the view.',
    },
    {
      match: 'queryKey: [\'user\']',
      label: 'queryKey',
      tip: 'Stable cache key — invalidating or refetching user data targets this bucket in TanStack Query.',
    },
    {
      match: 'UserProfileView',
      label: 'presentational',
      tip: 'Pure UI from props — easy to test in Storybook with mock user/loading/error states.',
    },
    {
      match: 'onRetry={refetch}',
      label: 'onRetry',
      tip: 'Events flow up via callback — presentational component never calls fetch directly.',
    },
    {
      match: 'if (loading) return <Skeleton />',
      label: 'loading branch',
      tip: 'Presentational owns display states; container only passes boolean flags from the query.',
    },
  ],
  'provider-context': [
    {
      match: 'createContext<ThemeContextValue | null>(null)',
      label: 'createContext',
      tip: 'Default null signals “no provider” — hook can throw a clear error when misused.',
    },
    {
      match: 'useMemo(',
      label: 'useMemo',
      tip: 'Memoize context value so toggling theme does not recreate the object every parent render.',
    },
    {
      match: 'ThemeContext.Provider',
      label: 'Provider',
      tip: 'Wraps a subtree — every descendant can read theme without intermediate prop passing.',
    },
    {
      match: 'if (!ctx) throw new Error',
      label: 'guard hook',
      tip: 'Custom useTheme hook fails fast outside ThemeProvider — better DX than silent undefined.',
    },
    {
      match: 'setTheme((t) => (t === \'light\' ? \'dark\' : \'light\'))',
      label: 'functional update',
      tip: 'Functional setState reads latest theme when toggling — safe if batching merges updates.',
    },
  ],
  'controlled-uncontrolled': [
    {
      match: 'value={email}',
      label: 'value',
      tip: 'Controlled input — React state is the single source of truth for what appears in the field.',
    },
    {
      match: 'onChange={(e) => setEmail(e.target.value)}',
      label: 'onChange',
      tip: 'Every keystroke flows through setState — enables live validation and dependent UI.',
    },
    {
      match: 'aria-invalid={!valid && email.length > 0}',
      label: 'aria-invalid',
      tip: 'Expose validation state to assistive tech only after the user has typed something.',
    },
    {
      match: 'defaultValue=""',
      label: 'defaultValue',
      tip: 'Uncontrolled — DOM stores the value after mount; React does not re-read every keystroke.',
    },
    {
      match: 'emailRef.current?.value',
      label: 'ref read',
      tip: 'Read uncontrolled input once on submit — fewer re-renders than mirroring every keystroke in state.',
    },
  ],
  composition: [
    {
      match: 'children: ReactNode',
      label: 'children',
      tip: 'Default composition slot — callers nest arbitrary markup inside Card without extra props.',
    },
    {
      match: 'footer?: ReactNode',
      label: 'footer slot',
      tip: 'Named slot pattern — optional region without forcing a rigid children structure.',
    },
    {
      match: '{footer && <footer',
      label: 'conditional slot',
      tip: 'Render optional regions only when provided — keeps DOM lean when footer is omitted.',
    },
    {
      match: '<div className="card-body">{children}</div>',
      label: 'card-body',
      tip: 'Layout shell wraps injected content — styling stays in Card, content stays flexible.',
    },
  ],
  'state-reducer': [
    {
      match: 'useReducer(reducer,',
      label: 'useReducer',
      tip: 'Pairs state with a reducer — complex transitions live in one pure function instead of many setters.',
    },
    {
      match: 'type Action =',
      label: 'Action union',
      tip: 'Discriminated actions document every allowed transition — easy to exhaust in switch.',
    },
    {
      match: 'switch (action.type)',
      label: 'switch',
      tip: 'Reducer must be pure: given state + action, return next state with no side effects.',
    },
    {
      match: 'dispatch({ type: \'NEXT\' })',
      label: 'dispatch',
      tip: 'Components describe intent (NEXT/BACK/FAIL) — reducer decides the resulting step and error.',
    },
    {
      match: 'role="alert"',
      label: 'role="alert"',
      tip: 'Announce wizard errors when reducer sets error state — pairs with FAIL action.',
    },
  ],
  'render-props': [
    {
      match: 'children: (pos: { x: number; y: number }) => ReactNode',
      label: 'render prop type',
      tip: 'Function-as-child receives internal state — caller decides JSX while tracker owns subscription.',
    },
    {
      match: '{children(pos)}',
      label: 'children(pos)',
      tip: 'Parent invokes the render prop with live mouse coords — inversion of control for markup.',
    },
    {
      match: 'window.addEventListener(\'mousemove\', onMove)',
      label: 'mousemove listener',
      tip: 'Effect subscribes once; render prop consumers re-render when pos updates.',
    },
    {
      match: 'function useMousePosition()',
      label: 'useMousePosition',
      tip: 'Hook equivalent — same logic without wrapper component; preferred for new React code.',
    },
  ],
  'higher-order-components': [
    {
      match: 'export function withAuth<P extends WithAuthProps>',
      label: 'withAuth HOC',
      tip: 'Function takes a component, returns a new component that injects auth props and guards.',
    },
    {
      match: 'Omit<P, keyof WithAuthProps>',
      label: 'Omit',
      tip: 'Wrapped component props exclude user — HOC supplies user so callers do not pass it twice.',
    },
    {
      match: '<Wrapped {...(props as P)} user={user} />',
      label: 'prop injection',
      tip: 'HOC renders wrapped component with merged props — classic inversion-of-control pattern.',
    },
    {
      match: 'WithAuthComponent.displayName',
      label: 'displayName',
      tip: 'Names the wrapper in React DevTools — otherwise shows anonymous function component.',
    },
    {
      match: 'const { user, loading } = useAuth()',
      label: 'useAuth hook',
      tip: 'Modern replacement — same auth gate without wrapper nesting or ref-forwarding pain.',
    },
  ],
  'polymorphic-components': [
    {
      match: 'as?: T',
      label: 'as prop',
      tip: 'Choose rendered element — Box as="a" gets link semantics; as="button" for actions.',
    },
    {
      match: 'ComponentPropsWithoutRef<T>',
      label: 'ComponentPropsWithoutRef',
      tip: 'TypeScript merges correct props for the chosen element (href on anchors, type on buttons).',
    },
    {
      match: 'const Component = as ?? \'div\'',
      label: 'Component variable',
      tip: 'Dynamic JSX tag — one styled primitive renders as different HTML elements or components.',
    },
    {
      match: '<Box as="a" href="/docs">',
      label: 'as="a"',
      tip: 'Navigation uses anchor semantics — avoids invalid nesting like button inside link.',
    },
  ],
  'headless-ui': [
    {
      match: 'useId()',
      label: 'useId',
      tip: 'Stable id pairs button with panel across SSR/client — wires aria-controls correctly.',
    },
    {
      match: "'aria-expanded': open",
      label: 'aria-expanded',
      tip: 'Screen readers announce whether the disclosure region is expanded or collapsed.',
    },
    {
      match: "'aria-controls': panelId",
      label: 'aria-controls',
      tip: 'Links the trigger button to the panel id — required for accessible expand/collapse.',
    },
    {
      match: 'buttonProps:',
      label: 'buttonProps',
      tip: 'Headless hook returns prop bags — spread onto your styled button without copying a11y logic.',
    },
    {
      match: 'hidden: !open',
      label: 'hidden',
      tip: 'Native hidden removes collapsed content from accessibility tree when closed.',
    },
  ],
  portals: [
    {
      match: 'createPortal(',
      label: 'createPortal',
      tip: 'Renders React tree into document.body — escapes overflow:hidden and z-index stacking on ancestors.',
    },
    {
      match: 'role="dialog"',
      label: 'role="dialog"',
      tip: 'Identifies modal content region to assistive technology.',
    },
    {
      match: 'aria-modal="true"',
      label: 'aria-modal',
      tip: 'Hints that background content is inert while dialog is open — pair with focus trap in production.',
    },
    {
      match: 'e.key === \'Escape\'',
      label: 'Escape key',
      tip: 'Keyboard dismiss — standard modal UX; remove listener in effect cleanup.',
    },
    {
      match: 'e.stopPropagation()',
      label: 'stopPropagation',
      tip: 'Clicks inside the dialog must not bubble to backdrop handler that would close the modal.',
    },
  ],
  'error-boundaries': [
    {
      match: 'ErrorBoundary',
      label: 'ErrorBoundary',
      tip: 'Catches render/lifecycle errors in children — shows fallback instead of white-screening the app.',
    },
    {
      match: 'FallbackComponent={ChartFallback}',
      label: 'FallbackComponent',
      tip: 'React node rendered when child throws — receives error + resetErrorBoundary for retry UX.',
    },
    {
      match: 'resetErrorBoundary',
      label: 'resetErrorBoundary',
      tip: 'Clears error state and re-renders children — lets user retry after a transient failure.',
    },
    {
      match: 'onError={console.error}',
      label: 'onError',
      tip: 'Hook for logging to Sentry/monitoring — boundary catches; you report upstream.',
    },
    {
      match: 'role="alert"',
      label: 'role="alert',
      tip: 'Fallback should announce failure to screen readers immediately.',
    },
  ],
  'lazy-suspense': [
    {
      match: 'lazy(() => import(',
      label: 'React.lazy',
      tip: 'Dynamic import splits route into a separate chunk — loaded only when the route is visited.',
    },
    {
      match: '<Suspense fallback={<PageSpinner />}>',
      label: 'Suspense',
      tip: 'Shows fallback UI while lazy component chunk downloads — avoids blank screen during load.',
    },
    {
      match: 'aria-busy="true"',
      label: 'aria-busy',
      tip: 'Marks loading region for assistive tech while the route chunk is fetching.',
    },
    {
      match: '<Suspense fallback={<ChartSkeleton />}>',
      label: 'nested Suspense',
      tip: 'Inner boundary loads heavy chart without blocking the outer layout shell from rendering.',
    },
    {
      match: '<HeavyChart />',
      label: 'HeavyChart',
      tip: 'Expensive widget behind its own Suspense — shell paints first, chart streams in after.',
    },
  ],
  'lifting-state-up': [
    {
      match: 'const [celsius, setCelsius] = useState(0)',
      label: 'lifted state',
      tip: 'Common ancestor owns shared value — both siblings stay in sync from one source of truth.',
    },
    {
      match: 'value={celsius}',
      label: 'controlled child',
      tip: 'Child displays lifted state — does not own celsius locally.',
    },
    {
      match: 'onChange={setCelsius}',
      label: 'onChange callback',
      tip: 'Child reports edits upward; parent updates state and re-renders both siblings.',
    },
    {
      match: 'const f = (celsius * 9) / 5 + 32',
      label: 'derived display',
      tip: 'Sibling derives Fahrenheit from shared props — no duplicate state to keep in sync.',
    },
  ],
  'optimistic-ui': [
    {
      match: 'onMutate: async (id) =>',
      label: 'onMutate',
      tip: 'Runs before the request — snapshot cache, apply optimistic patch, return context for rollback.',
    },
    {
      match: 'cancelQueries({ queryKey: [\'todos\'] })',
      label: 'cancelQueries',
      tip: 'Prevents in-flight refetches from overwriting your optimistic cache patch mid-mutation.',
    },
    {
      match: 'qc.setQueryData<Todo[]>',
      label: 'setQueryData',
      tip: 'Immediately toggles todo in cache — UI updates before server responds.',
    },
    {
      match: 'qc.setQueryData([\'todos\'], ctx?.previous)',
      label: 'rollback',
      tip: 'onError restores the snapshot from onMutate — user sees checkbox revert if API fails.',
    },
    {
      match: 'invalidateQueries({ queryKey: [\'todos\'] })',
      label: 'invalidateQueries',
      tip: 'onSettled refetches to reconcile with server truth after success or rollback.',
    },
    {
      match: 'disabled={toggle.isPending}',
      label: 'isPending',
      tip: 'Disable input while mutation runs — prevents double-toggles racing the optimistic patch.',
    },
  ],
};

function sortByMatchLength(highlights: SolutionHighlight[]): SolutionHighlight[] {
  return [...highlights].sort((a, b) => b.match.length - a.match.length);
}

export function getReactPatternHighlights(slug: string): SolutionHighlight[] {
  const list = bySlug[slug];
  return list ? sortByMatchLength(list) : [];
}
