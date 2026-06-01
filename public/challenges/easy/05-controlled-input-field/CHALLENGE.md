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

Implement in **your own** React project (Vite, Next.js, etc.) or a sandbox—e.g. `src/practice/easy/05-controlled-input-field/`. Reference write-ups in this repo live under `challenges/easy/05-controlled-input-field/` (not loaded by the app).

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

- [Controlled inputs](https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable)
- [Textarea & select (controlled)](https://react.dev/reference/react-dom/components/textarea)
- [Forms – React DOM](https://react.dev/reference/react-dom/components/form)
