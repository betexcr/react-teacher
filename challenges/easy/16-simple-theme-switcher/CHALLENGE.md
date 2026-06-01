# Simple Theme Switcher

**Difficulty:** easy  
**Topics:** useState, CSS variables

## Learning goals

- Toggle light/dark with state
- Apply theme via class or data attribute

## Challenge

App shell with theme toggle. Persist choice in localStorage. Apply `data-theme` on document root.

## Requirements

1. Two themes minimum
2. Persist to localStorage
3. Initial read avoids flash when possible

## Starter hint

Implement in **your own** React project (Vite, Next.js, etc.) or a sandbox—e.g. `src/practice/easy/16-simple-theme-switcher/`. Reference write-ups in this repo live under `challenges/easy/16-simple-theme-switcher/` (not loaded by the app).

```tsx
type Theme = 'light' | 'dark';
```

## Hints

1. useEffect sync document.documentElement.dataset.theme
2. Read localStorage in lazy useState initializer

## Acceptance criteria

- [ ] Toggle works
- [ ] Persists across refresh
- [ ] Styles change globally

## Resources

- [useState – Reference](https://react.dev/reference/react/useState)
- [CSS custom properties (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [Conditional rendering](https://react.dev/learn/conditional-rendering)
