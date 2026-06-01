# Solution: Multi-Theme Manager

## Approach

Resolve effective theme; persist mode; storage listener for sync.

## Key concepts

- **storage event**: Fires in other tabs when localStorage changes.

## Solution code

```tsx
import { useEffect, useState } from 'react';

type Mode = 'light' | 'dark' | 'system';

export function MultiThemeManager() {
  const [mode, setMode] = useState<Mode>(() => (localStorage.getItem('mode') as Mode) || 'system');

  useEffect(() => {
    localStorage.setItem('mode', mode);
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const dark = mode === 'dark' || (mode === 'system' && mq.matches);
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'mode' && e.newValue) setMode(e.newValue as Mode);
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [mode]);

  return (
    <select value={mode} onChange={(e) => setMode(e.target.value as Mode)}>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="system">System</option>
    </select>
  );
}
```

## Walkthrough

Effective theme derives from mode + system preference; storage event keeps tabs aligned.

## Common mistakes

- Only listening in same tab
- Not updating when OS theme changes

## Stretch goals

- Custom CSS variables from color picker
- Theme export JSON
