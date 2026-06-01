# Theme Toggle

**Difficulty:** easy  
**Topics:** useState, toggle UI

## Learning goals

- Binary toggle pattern
- Accessible switch semantics

## Challenge

Build an accessible theme toggle switch (not just a button) using `role="switch"` and `aria-checked`. Pair with icon sun/moon.

## Requirements

1. Keyboard operable (Space/Enter)
2. aria-checked reflects state
3. Visual switch animation

## Starter hint

Implement in **your own** React project (Vite, Next.js, etc.) or a sandbox—e.g. `src/practice/easy/18-theme-toggle/`. Reference write-ups in this repo live under `challenges/easy/18-theme-toggle/` (not loaded by the app).

```tsx
<button role="switch" aria-checked={dark}>
```

## Hints

1. onKeyDown for Space
2. Toggle with click

## Acceptance criteria

- [ ] ARIA correct
- [ ] Keyboard works
- [ ] Theme applies

## Resources

- [useState – Reference](https://react.dev/reference/react/useState)
- [Conditional rendering](https://react.dev/learn/conditional-rendering)
- [Styling with class names](https://react.dev/learn/adding-interactivity#updating-the-dom-based-on-state)
