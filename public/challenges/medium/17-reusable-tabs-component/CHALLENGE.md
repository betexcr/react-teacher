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

Create your work in `src/challenges/medium/17-reusable-tabs-component/` or a sandbox file of your choice.

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

- [React docs – Quick Start](https://react.dev/learn)
- [composition – React Reference](https://react.dev/reference/react)
