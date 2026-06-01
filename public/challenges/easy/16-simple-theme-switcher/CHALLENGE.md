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

Create your work in `src/challenges/easy/16-simple-theme-switcher/` or a sandbox file of your choice.

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

- [React docs – Quick Start](https://react.dev/learn)
- [useState – React Reference](https://react.dev/reference/react)
