# Memo Usage: Prevent Unnecessary Re-renders

**Difficulty:** medium  
**Topics:** React.memo, useCallback, useMemo

## Learning goals

- Identify avoidable child re-renders
- Stabilize props

## Challenge

Parent with fast-updating counter and expensive child list. Use React.memo + useCallback so list only rerenders when items change.

## Requirements

1. React.memo on child
2. Stable onItemClick with useCallback
3. Demonstrate with console.log render counts

## Starter hint

Implement in **your own** React project (Vite, Next.js, etc.) or a sandbox—e.g. `src/practice/medium/19-memo-prevent-rerenders/`. Reference write-ups in this repo live under `challenges/medium/19-memo-prevent-rerenders/` (not loaded by the app).

```tsx
const List = React.memo(function List(...) {});
```

## Hints

1. Deps [items] for callback
2. Do not inline objects as props

## Acceptance criteria

- [ ] Counter updates do not rerender list
- [ ] Item change does rerender

## Resources

- [memo – Reference](https://react.dev/reference/react/memo)
- [useCallback – Reference](https://react.dev/reference/react/useCallback)
- [useMemo – Reference](https://react.dev/reference/react/useMemo)
