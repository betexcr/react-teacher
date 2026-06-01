# useAsync Hook

**Difficulty:** medium  
**Topics:** custom hooks, async

## Learning goals

- Normalize async state machine
- Handle race conditions

## Challenge

Implement `useAsync(asyncFn, deps)` returning `{ status, data, error, execute, reset }`.

## Requirements

1. Statuses: idle | pending | success | error
2. Ignore stale responses
3. execute() triggers fetch

## Starter hint

Create your work in `src/challenges/medium/09-use-async-hook/` or a sandbox file of your choice.

```tsx
export function useAsync<T>(fn: () => Promise<T>, deps: unknown[]) {}
```

## Hints

1. Increment requestId ref on each execute
2. Compare before setState

## Acceptance criteria

- [ ] Race safe
- [ ] Reset clears
- [ ] Deps change refetches optional

## Resources

- [React docs – Quick Start](https://react.dev/learn)
- [custom hooks – React Reference](https://react.dev/reference/react)
