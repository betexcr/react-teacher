# Share State with Context

**Difficulty:** medium  
**Topics:** Context, lifting state

## Learning goals

- Avoid prop drilling for auth-like state
- Split read/write contexts optional

## Challenge

Auth context: user, login, logout. Navbar shows user; Profile page edits name—all without drilling props.

## Requirements

1. AuthProvider at app root
2. useAuth hook
3. login sets mock user

## Starter hint

Create your work in `src/challenges/medium/18-share-state-with-context/` or a sandbox file of your choice.

```tsx
type User = { id: string; name: string } | null;
```

## Hints

1. Separate AuthDispatch context to limit rerenders (advanced)

## Acceptance criteria

- [ ] Any depth reads user
- [ ] Logout clears

## Resources

- [React docs – Quick Start](https://react.dev/learn)
- [Context – React Reference](https://react.dev/reference/react)
