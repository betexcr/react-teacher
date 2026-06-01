# Build a Reusable Drawer Component

**Difficulty:** medium  
**Topics:** portals, a11y

## Learning goals

- Slide-over panel with focus trap
- Close on escape and overlay click

## Challenge

Drawer opens from right; portals to document.body; traps focus; restores focus on close.

## Requirements

1. createPortal
2. role dialog aria-modal
3. Escape closes
4. Focus trap basic

## Starter hint

Create your work in `src/challenges/medium/24-reusable-drawer-component/` or a sandbox file of your choice.

```tsx
import { createPortal } from 'react-dom';
```

## Hints

1. useEffect focus first element
2. return focus to trigger on close

## Acceptance criteria

- [ ] Portal renders
- [ ] Escape closes
- [ ] Overlay click closes

## Resources

- [React docs – Quick Start](https://react.dev/learn)
- [portals – React Reference](https://react.dev/reference/react)
