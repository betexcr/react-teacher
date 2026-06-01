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

Create your work in `src/challenges/medium/14-fallback-ui-class-components/` or a sandbox file of your choice.

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

- [React docs – Quick Start](https://react.dev/learn)
- [ErrorBoundary – React Reference](https://react.dev/reference/react)
