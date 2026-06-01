# Memoizing Expensive Calculation

**Difficulty:** medium  
**Topics:** useMemo

## Learning goals

- Skip recomputation when deps unchanged
- Identify expensive pure functions

## Challenge

Given a slow `fibonacci(n)` and slider input n, display result. Without useMemo UI stutters; with useMemo it is smooth. Compare both modes.

## Requirements

1. useMemo around fib(n)
2. Deps [n]
3. Show elapsed ms optional

## Starter hint

Create your work in `src/challenges/medium/04-memoizing-expensive-calculation/` or a sandbox file of your choice.

```tsx
function fib(n: number): number { /* iterative slow */ }
```

## Hints

1. useMemo(() => fib(n), [n])
2. Do not call fib directly in render without memo

## Acceptance criteria

- [ ] Memoized path smooth
- [ ] Changing unrelated state does not recompute

## Resources

- [React docs – Quick Start](https://react.dev/learn)
- [useMemo – React Reference](https://react.dev/reference/react)
