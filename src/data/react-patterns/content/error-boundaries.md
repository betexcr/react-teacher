# Error Boundaries

## What it is

An error boundary catches **JavaScript errors in child render/lifecycle** and shows fallback UI instead of crashing the whole app. In modern React apps, use `react-error-boundary` rather than class components.

Errors in event handlers, async code, or SSR are **not** caught — handle those with try/catch or error state.

## When to use

- Isolate risky widgets (charts, third-party embeds) from the rest of the page
- Route-level or feature-level fallbacks with retry
- Log errors to monitoring (Sentry) in `onError`

## Example

```tsx
import { ErrorBoundary } from 'react-error-boundary';

function ChartFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div role="alert">
      <p>Chart failed: {error.message}</p>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function Dashboard() {
  return (
    <ErrorBoundary FallbackComponent={ChartFallback} onError={console.error}>
      <SalesChart />
    </ErrorBoundary>
  );
}
```

## Granularity

Place boundaries at **route** or **feature** boundaries — not around every leaf component. Too many boundaries hide systemic bugs; too few white-screen the app.

## Tradeoffs

- **Pros:** Resilient UX, localized recovery
- **Cons:** No hook equivalent yet; does not catch event/async errors
- **Interview angle:** Pair with route error elements (React Router) and Suspense for loading — different failure modes
