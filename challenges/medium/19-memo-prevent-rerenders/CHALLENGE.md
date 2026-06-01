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

Create your work in `src/challenges/medium/19-memo-prevent-rerenders/` or a sandbox file of your choice.

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

- [React docs – Quick Start](https://react.dev/learn)
- [React.memo – React Reference](https://react.dev/reference/react)
