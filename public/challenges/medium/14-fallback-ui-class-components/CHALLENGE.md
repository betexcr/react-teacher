# Fallback UI (Class Components)

**Difficulty:** medium  
**Topics:** ErrorBoundary, class components

## Learning goals

- Catch render errors with error boundary
- Show fallback UI

## Challenge

Class-based ErrorBoundary wrapping a component that throws. Show fallback with retry button resetting error state.

## Requirements

1. getDerivedStateFromError or componentDidCatch
2. Retry resets state
3. Log error in didCatch

## Starter hint

Implement in **your own** React project (Vite, Next.js, etc.) or a sandbox—e.g. `src/practice/medium/14-fallback-ui-class-components/`. Reference write-ups in this repo live under `challenges/medium/14-fallback-ui-class-components/` (not loaded by the app).

```tsx
class ErrorBoundary extends React.Component
```

## Hints

1. static getDerivedStateFromError() => ({ hasError: true })
2. key prop reset on child to remount

## Acceptance criteria

- [ ] Fallback shows on throw
- [ ] Retry recovers

## Resources

- [Error Boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)
- [Class components – legacy API](https://react.dev/reference/react/Component)
- [React error handling (learn)](https://react.dev/learn/error-boundaries)
