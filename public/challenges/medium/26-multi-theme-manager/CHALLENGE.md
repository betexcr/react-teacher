# Multi-Theme Manager

**Difficulty:** medium  
**Topics:** Context, CSS

## Learning goals

- Combine system + custom themes
- Sync across tabs

## Challenge

Theme manager: light, dark, system, plus custom user theme from color pickers. Listen to storage events for multi-tab sync.

## Requirements

1. system uses matchMedia
2. custom theme saved to localStorage
3. storage event updates other tabs

## Starter hint

Create your work in `src/challenges/medium/26-multi-theme-manager/` or a sandbox file of your choice.

```tsx
type ThemeMode = 'light' | 'dark' | 'system' | 'custom';
```

## Hints

1. window.addEventListener("storage", ...)
2. resolved = system === dark ? dark : light

## Acceptance criteria

- [ ] System tracks OS
- [ ] Tabs stay in sync

## Resources

- [React docs – Quick Start](https://react.dev/learn)
- [Context – React Reference](https://react.dev/reference/react)
