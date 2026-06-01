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

Implement in **your own** React project (Vite, Next.js, etc.) or a sandbox—e.g. `src/practice/easy/04-event-handling/`. Reference write-ups in this repo live under `challenges/easy/04-event-handling/` (not loaded by the app).

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

- [Responding to Events](https://react.dev/learn/responding-to-events)
- [React event objects](https://react.dev/reference/react-dom/components/common#react-event-object)
- [useState – Reference](https://react.dev/reference/react/useState)
