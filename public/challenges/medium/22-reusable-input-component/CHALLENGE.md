# Build a Reusable Input Component

**Difficulty:** medium  
**Topics:** components, forwardRef

## Learning goals

- Support labels, errors, icons
- Forward refs to native input

## Challenge

Input with label, hint, error message, optional left icon, sizes, and disabled state. Works in forms with ref forwarding.

## Requirements

1. forwardRef to input element
2. id/htmlFor wiring
3. aria-describedby for hint/error

## Starter hint

Implement in **your own** React project (Vite, Next.js, etc.) or a sandbox—e.g. `src/practice/medium/22-reusable-input-component/`. Reference write-ups in this repo live under `challenges/medium/22-reusable-input-component/` (not loaded by the app).

```tsx
export const Input = forwardRef<HTMLInputElement, InputProps>(...)
```

## Hints

1. const id = useId()
2. aria-invalid={!!error}

## Acceptance criteria

- [ ] Ref focuses input
- [ ] A11y wired

## Resources

- [forwardRef – Reference](https://react.dev/reference/react/forwardRef)
- [Controlled inputs](https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable)
- [Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component)
