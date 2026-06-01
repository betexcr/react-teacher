# Controlled Input Field

**Difficulty:** easy  
**Topics:** controlled components, forms

## Learning goals

- Bind input value to React state
- Handle onChange correctly

## Challenge

Create a profile form with controlled inputs: name, email, and bio (textarea). Show a live preview card as the user types. Include basic validation messages.

## Requirements

1. All fields controlled (value + onChange)
2. Email shows error if missing @
3. Submit logs JSON (preventDefault)

## Starter hint

Create your work in `src/challenges/easy/05-controlled-input-field/` or a sandbox file of your choice.

```tsx
export function ProfileForm() {
  // name, email, bio state
  return <form onSubmit={...}>...</form>;
}
```

## Hints

1. value={state} onChange={e => setState(e.target.value)}
2. textarea uses same pattern as input

## Acceptance criteria

- [ ] Preview mirrors inputs
- [ ] Validation visible
- [ ] Submit prevented default

## Resources

- [React docs – Quick Start](https://react.dev/learn)
- [controlled components – React Reference](https://react.dev/reference/react)
