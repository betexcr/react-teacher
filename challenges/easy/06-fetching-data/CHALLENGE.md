# Fetching Data

**Difficulty:** easy  
**Topics:** useEffect, fetch, loading states

## Learning goals

- Fetch on mount
- Model loading / error / success UI

## Challenge

Fetch a list of users from `https://jsonplaceholder.typicode.com/users` (or mock). Show loading spinner, error message, and a list on success.

## Requirements

1. useEffect with cleanup (AbortController)
2. Three UI states: loading, error, data
3. Refetch button

## Starter hint

Create your work in `src/challenges/easy/06-fetching-data/` or a sandbox file of your choice.

```tsx
export function UserList() {
  // loading, error, users
  useEffect(() => { /* fetch */ }, []);
}
```

## Hints

1. Abort fetch in cleanup to avoid setState on unmounted component
2. Empty dependency array = run once on mount

## Acceptance criteria

- [ ] Loading shows first
- [ ] Errors readable
- [ ] Refetch works

## Resources

- [React docs – Quick Start](https://react.dev/learn)
- [useEffect – React Reference](https://react.dev/reference/react)
