# Build a Reusable Tabs Component

**Difficulty:** medium  
**Topics:** composition, a11y

## Learning goals

- Tabs with keyboard support
- Controlled or uncontrolled mode

## Challenge

Tabs, TabList, Tab, TabPanels pattern. Support controlled `activeIndex` and default uncontrolled.

## Requirements

1. aria-selected on tabs
2. Arrow keys switch tabs
3. Only active panel visible

## Starter hint

Implement in **your own** React project (Vite, Next.js, etc.) or a sandbox—e.g. `src/practice/medium/17-reusable-tabs-component/`. Reference write-ups in this repo live under `challenges/medium/17-reusable-tabs-component/` (not loaded by the app).

```tsx
const TabsContext = createContext(...);
```

## Hints

1. Tablist role tablist, tab role tab
2. tabpanel role tabpanel

## Acceptance criteria

- [ ] Keyboard works
- [ ] Controlled mode works

## Resources

- [Passing JSX as children](https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children)
- [ARIA: tabs pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)
- [Accessibility in React](https://react.dev/learn/accessibility)
