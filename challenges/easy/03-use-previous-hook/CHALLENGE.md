# usePrevious Hook

**Difficulty:** easy  
**Topics:** useRef, useEffect, custom hooks

## Learning goals

- Store values across renders without triggering re-renders
- Build a reusable custom hook

## Challenge

Implement `usePrevious(value)` that returns the value from the **previous** render (undefined on first render). Use it to show "was X, now Y" for a changing prop or state.

## Requirements

1. Hook signature: function usePrevious<T>(value: T): T | undefined
2. Return undefined on first render
3. After updates, return the prior value

## Starter hint

Create your work in `src/challenges/easy/03-use-previous-hook/` or a sandbox file of your choice.

```tsx
export function usePrevious<T>(value: T): T | undefined {
  // useRef + useEffect
}
```

## Hints

1. useRef can hold mutable .current without causing re-renders
2. Update ref.current in useEffect after paint so render still sees old value

## Acceptance criteria

- [ ] First render undefined
- [ ] Subsequent renders show previous

## Resources

- [React docs – Quick Start](https://react.dev/learn)
- [useRef – React Reference](https://react.dev/reference/react)
