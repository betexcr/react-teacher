# Advanced Theme Manager

**Difficulty:** medium  
**Topics:** themes, CSS variables

## Learning goals

- Multiple theme presets
- Preview before apply

## Challenge

Theme gallery with presets (ocean, forest, midnight). Preview pane shows components; Apply commits to document.

## Requirements

1. Draft vs applied theme
2. CSS variables per preset
3. Reset to system default

## Starter hint

Create your work in `src/challenges/medium/08-advanced-theme-manager/` or a sandbox file of your choice.

```tsx
const presets = { ocean: { '--bg': '#0af' }, ... };
```

## Hints

1. Draft state in component; Apply copies to context/document
2. matchMedia for system

## Acceptance criteria

- [ ] Preview differs from applied until Apply
- [ ] Reset works

## Resources

- [React docs – Quick Start](https://react.dev/learn)
- [themes – React Reference](https://react.dev/reference/react)
