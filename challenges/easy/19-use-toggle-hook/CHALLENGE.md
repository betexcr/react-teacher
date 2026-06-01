# useToggle Hook

**Difficulty:** easy  
**Topics:** custom hooks, useState, useCallback

## Learning goals

- Return stable API for boolean toggling
- Support imperative set/on/off

## Challenge

Implement `useToggle(initial)` returning `[value, { toggle, set, on, off }]`. Use it in a panel show/hide demo.

## Requirements

1. toggle flips boolean
2. on sets true, off sets false
3. set accepts boolean directly
4. Memoize handlers with useCallback

## Starter hint

Create your work in `src/challenges/easy/19-use-toggle-hook/` or a sandbox file of your choice.

```tsx
export function useToggle(initial = false) {}
```

## Hints

1. useCallback depends on [] if using functional setState
2. Return tuple or object—document API

## Acceptance criteria

- [ ] All methods work
- [ ] Handlers stable across renders

## Resources

- [React docs – Quick Start](https://react.dev/learn)
- [custom hooks – React Reference](https://react.dev/reference/react)
