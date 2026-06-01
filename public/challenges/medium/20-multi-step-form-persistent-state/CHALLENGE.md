# Multi-step Form with Persistent State

**Difficulty:** medium  
**Topics:** forms, state

## Learning goals

- Preserve answers across steps
- Validate per step

## Challenge

3-step wizard (account → profile → review). Back keeps data. Persist draft to sessionStorage.

## Requirements

1. Single form state object
2. Per-step validation gate
3. sessionStorage restore on mount

## Starter hint

Create your work in `src/challenges/medium/20-multi-step-form-persistent-state/` or a sandbox file of your choice.

```tsx
type FormData = { email: string; name: string; plan: string };
```

## Hints

1. useEffect save JSON.stringify(form)
2. step++ only if validateStep(step) empty

## Acceptance criteria

- [ ] Back preserves
- [ ] Refresh restores draft

## Resources

- [React docs – Quick Start](https://react.dev/learn)
- [forms – React Reference](https://react.dev/reference/react)
