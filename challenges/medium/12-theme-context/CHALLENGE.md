# Theme Context

**Difficulty:** medium  
**Topics:** Context API

## Learning goals

- Provide theme via context
- Consume with custom hook

## Challenge

Create ThemeProvider, useTheme hook, and themed Button/Text children without prop drilling.

## Requirements

1. Context default safe
2. Provider holds theme + toggle
3. useTheme throws outside provider (optional)

## Starter hint

Create your work in `src/challenges/medium/12-theme-context/` or a sandbox file of your choice.

```tsx
const ThemeContext = createContext(null);
```

## Hints

1. useMemo value object to avoid rerenders
2. export function useTheme() { const ctx = useContext...}

## Acceptance criteria

- [ ] Deep tree consumes theme
- [ ] Toggle updates all

## Resources

- [React docs – Quick Start](https://react.dev/learn)
- [Context API – React Reference](https://react.dev/reference/react)
