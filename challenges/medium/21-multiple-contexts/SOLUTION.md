# Solution: Multiple Contexts

## Approach

Separate contexts for orthogonal concerns.

## Key concepts

- **Provider composition**: Nest providers; each concern isolated.

## Solution code

```tsx
const LocaleContext = createContext<'en' | 'es'>('en');
const ThemeContext = createContext<'light' | 'dark'>('light');

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<'en' | 'es'>('en');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  return (
    <ThemeContext.Provider value={theme}>
      <LocaleContext.Provider value={locale}>
        {children}
        <button onClick={() => setLocale((l) => (l === 'en' ? 'es' : 'en'))}>Lang</button>
        <button onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}>Theme</button>
      </LocaleContext.Provider>
    </ThemeContext.Provider>
  );
}
```

## Walkthrough

Independent state in AppProviders; children subscribe only to contexts they use.

## Common mistakes

- One mega context object causing all consumers to rerender
- Wrong provider order when dependencies exist

## Stretch goals

- Context selector
- i18n library integration
