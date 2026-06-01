# Solution: Simple Theme Switcher

## Approach

Theme state drives data attribute; CSS variables switch palettes.

## Key concepts

- **data-theme**: Attribute selectors enable global theming without prop drilling colors.
- **Lazy init**: useState(() => localStorage.getItem(...)) runs once.

## Solution code

```tsx
import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('theme') as Theme) || 'light';
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));
  return { theme, toggle };
}

export function ThemeSwitcher() {
  const { theme, toggle } = useTheme();
  return <button onClick={toggle}>Current: {theme}</button>;
}
```

## Walkthrough

Effect mirrors theme to DOM and storage whenever state changes.

## Common mistakes

- Only styling body inline
- SSR mismatch without default

## Stretch goals

- System prefers-color-scheme
- Three themes
