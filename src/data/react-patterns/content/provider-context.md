# Provider / Context

## What it is

React Context passes a value through the tree without prop drilling at every level. A **Provider** component sets the value; descendants read it with `useContext` or a custom hook wrapper.

## When to use

- Theme, locale, auth session, feature flags — “global” to a subtree
- Many distant components need the same read-mostly value
- You want to avoid passing the same props through 5+ intermediate components

## Example

```tsx
import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

type Theme = 'light' | 'dark';

type ThemeContextValue = {
  theme: Theme;
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const value = useMemo(
    () => ({
      theme,
      toggle: () => setTheme((t) => (t === 'light' ? 'dark' : 'light')),
    }),
    [theme]
  );
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme requires ThemeProvider');
  return ctx;
}

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return <button onClick={toggle}>Current: {theme}</button>;
}
```

## Performance notes

- Context updates re-render **all** consumers unless you split contexts (theme vs dispatch) or memoize children
- Do not put rapidly changing values (keystrokes, scroll) in wide context — use local state or external stores

## Tradeoffs

| Aspect | Details |
|--------|---------|
| Pros | Eliminates prop drilling; ergonomic with custom hooks |
| Cons | Easy to overuse; debugging “who changed context?” is harder than explicit props |
| Interview angle | Context is not a state manager — pair with `useReducer`, TanStack Query, or Zustand for complex updates |

