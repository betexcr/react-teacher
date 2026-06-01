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

Create your work in `src/challenges/easy/18-theme-toggle/` or a sandbox file of your choice.

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

- [React docs – Quick Start](https://react.dev/learn)
- [useState – React Reference](https://react.dev/reference/react)
