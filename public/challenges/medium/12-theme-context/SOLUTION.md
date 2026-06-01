# Solution: Theme Context

## Approach

Context shares { theme, setTheme }; consumers read via hook.

## Key concepts

- **Context**: Broadcasts value to subtree without intermediate props.

## Solution code

```tsx
import { createContext, useContext, useMemo, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';
type Ctx = { theme: Theme; toggle: () => void };

const ThemeContext = createContext<Ctx | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const value = useMemo(
    () => ({ theme, toggle: () => setTheme((t) => (t === 'light' ? 'dark' : 'light')) }),
    [theme]
  );
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme outside ThemeProvider');
  return ctx;
}

export function ThemedButton() {
  const { theme, toggle } = useTheme();
  return <button data-theme={theme} onClick={toggle}>Toggle ({theme})</button>;
}
```

## Walkthrough

Provider memoizes value; hook enforces correct usage.

## Common mistakes

- New object in Provider value each render
- Overusing context for frequently changing data

## Stretch goals

- Split contexts: theme vs dispatch
- useContextSelector
