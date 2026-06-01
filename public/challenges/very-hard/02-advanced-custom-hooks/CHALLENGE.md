# Advanced Custom Hooks

**Difficulty:** very-hard  
**Topics:** custom hooks, composition

## Learning goals

- Compose smaller hooks into advanced API
- Handle edge cases and SSR

## Challenge

Build `useMediaQuery`, `useLocalStorage`, and compose them into `usePrefersDarkMode` that syncs theme to localStorage and system preference with zero flash.

## Requirements

1. useMediaQuery(list) with matchMedia + listener
2. useLocalStorage key with JSON parse/stringify
3. Composed hook: system | light | dark with persistence

## Starter hint

Create your work in `src/challenges/very-hard/02-advanced-custom-hooks/` or a sandbox file of your choice.

```tsx
export function useMediaQuery(query: string) {}
```

## Hints

1. SSR: default false until useEffect
2. storage event for cross-tab

## Acceptance criteria

- [ ] Hooks reusable
- [ ] No hydration mismatch
- [ ] System changes propagate

## Resources

- [React docs – Quick Start](https://react.dev/learn)
- [custom hooks – React Reference](https://react.dev/reference/react)
