# Prevent Unnecessary Re-renders

**Difficulty:** hard  
**Topics:** memo, context, profiling

## Learning goals

- Optimize a intentionally slow tree
- Measure before/after

## Challenge

Parent updates unrelated state every 100ms. Optimize children with memo, useMemo, useCallback, and split contexts so only relevant subtrees rerender.

## Requirements

1. Demonstrate >50% render reduction
2. Document which optimization applied where
3. Use React DevTools Profiler notes in comments

## Starter hint

Create your work in `src/challenges/hard/03-prevent-unnecessary-rerenders/` or a sandbox file of your choice.

```tsx
// SlowChild renders 500 divs
```

## Hints

1. Split ThemeContext: value vs dispatch
2. memo list items with stable keys

## Acceptance criteria

- [ ] Profiler shows fewer child commits
- [ ] Functionality unchanged

## Resources

- [React docs – Quick Start](https://react.dev/learn)
- [memo – React Reference](https://react.dev/reference/react)
