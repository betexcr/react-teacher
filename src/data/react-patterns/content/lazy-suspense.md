# Lazy Loading & Suspense

## What it is

**Code splitting** loads route or feature bundles on demand via `React.lazy(() => import('./Page'))`. **Suspense** shows fallback UI while the chunk loads (and, with React 19+, can coordinate with data fetching in supported setups).

## When to use

- Large routes (admin dashboards, editors) not needed on first paint
- Third-party widgets that inflate the main bundle
- After measuring — do not lazy-load tiny components blindly

## Example

```tsx
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const SettingsPage = lazy(() => import('./pages/SettingsPage'));
const ReportsPage = lazy(() => import('./pages/ReportsPage'));

function PageSpinner() {
  return <p aria-busy="true">Loading page…</p>;
}

export function AppRoutes() {
  return (
    <Suspense fallback={<PageSpinner />}>
      <Routes>
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/reports" element={<ReportsPage />} />
      </Routes>
    </Suspense>
  );
}
```

## Nested Suspense

Finer-grained boundaries let the shell render while a heavy panel loads:

```tsx
<Suspense fallback={<Shell />}>
  <Layout>
    <Suspense fallback={<ChartSkeleton />}>
      <HeavyChart />
    </Suspense>
  </Layout>
</Suspense>
```

## Tradeoffs

| Aspect | Details |
|--------|---------|
| Pros | Smaller initial JS, faster TTI on landing routes |
| Cons | Waterfall if over-nested; layout shift if fallbacks differ in size; needs error boundary for failed imports |
| Interview angle | Mention `lazy` must be default export; Vite/webpack handle chunk names automatically |

