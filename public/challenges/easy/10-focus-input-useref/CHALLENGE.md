# Focus an Input with useRef

**Difficulty:** easy  
**Topics:** useRef, DOM

## Learning goals

- Access DOM nodes imperatively
- Focus inputs programmatically

## Challenge

Login form: autofocus email on mount; "Forgot password?" focuses email; successful validation focuses password field.

## Requirements

1. useRef<HTMLInputElement>(null)
2. Call .focus() in handlers or useEffect
3. Do not store DOM in useState

## Starter hint

Create your work in `src/challenges/easy/10-focus-input-useref/` or a sandbox file of your choice.

```tsx
const emailRef = useRef<HTMLInputElement>(null);
```

## Hints

1. ref={emailRef} on input
2. Optional: useEffect(() => emailRef.current?.focus(), [])

## Acceptance criteria

- [ ] Mount focus works
- [ ] Button focuses correct field

## Resources

- [React docs – Quick Start](https://react.dev/learn)
- [useRef – React Reference](https://react.dev/reference/react)
