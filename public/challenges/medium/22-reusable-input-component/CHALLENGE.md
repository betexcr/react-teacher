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

Create your work in `src/challenges/medium/22-reusable-input-component/` or a sandbox file of your choice.

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

- [React docs – Quick Start](https://react.dev/learn)
- [components – React Reference](https://react.dev/reference/react)
