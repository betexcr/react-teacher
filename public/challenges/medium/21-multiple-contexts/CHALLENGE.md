# Multiple Contexts

**Difficulty:** medium  
**Topics:** Context

## Learning goals

- Compose multiple providers
- Avoid unnecessary coupling

## Challenge

App uses ThemeContext and LocaleContext (en/es). Components may consume one or both. Order providers correctly.

## Requirements

1. Nested providers
2. Hooks useTheme + useLocale
3. Changing locale does not reset theme

## Starter hint

Create your work in `src/challenges/medium/21-multiple-contexts/` or a sandbox file of your choice.

```tsx
export function AppProviders({ children }) { ... }
```

## Hints

1. Combine in AppProviders component
2. Memoize context values separately

## Acceptance criteria

- [ ] Both contexts work
- [ ] Independent updates

## Resources

- [React docs – Quick Start](https://react.dev/learn)
- [Context – React Reference](https://react.dev/reference/react)
