# Event Handling

**Difficulty:** easy  
**Topics:** SyntheticEvent, handlers

## Learning goals

- Use React synthetic events
- Pass parameters to handlers safely

## Challenge

Build a keypad UI: clicking digits appends to a display; Clear wipes it; Backspace removes one character. Support both click and keyboard (optional).

## Requirements

1. Use onClick handlers
2. Prevent default only when needed
3. Display builds a string buffer

## Starter hint

Create your work in `src/challenges/easy/04-event-handling/` or a sandbox file of your choice.

```tsx
export function Keypad() {
  const [display, setDisplay] = useState('');
  // handleDigit(d: string), handleClear, handleBackspace
}
```

## Hints

1. React events are SyntheticEvent wrappers
2. Use e.preventDefault() for form-like behavior inside forms

## Acceptance criteria

- [ ] Digits append
- [ ] Clear and backspace work

## Resources

- [React docs – Quick Start](https://react.dev/learn)
- [SyntheticEvent – React Reference](https://react.dev/reference/react)
