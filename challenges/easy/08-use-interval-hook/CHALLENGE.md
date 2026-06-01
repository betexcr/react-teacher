# useInterval Hook

**Difficulty:** easy  
**Topics:** useEffect, useRef, custom hooks

## Learning goals

- Encapsulate setInterval logic
- Keep callback fresh without resetting interval unnecessarily

## Challenge

Implement `useInterval(callback, delayMs | null)`. When delay is null, pause. Use it to flip a boolean every second.

## Requirements

1. Pauses when delay is null
2. Clears interval on unmount
3. Callback may change without leaking stale closures (use ref pattern)

## Starter hint

Create your work in `src/challenges/easy/08-use-interval-hook/` or a sandbox file of your choice.

```tsx
export function useInterval(cb: () => void, delay: number | null) {}
```

## Hints

1. Store latest callback in ref updated each render
2. Effect depends on delay only

## Acceptance criteria

- [ ] Ticks regularly
- [ ] Pause works
- [ ] No memory leaks

## Resources

- [React docs – Quick Start](https://react.dev/learn)
- [useEffect – React Reference](https://react.dev/reference/react)
