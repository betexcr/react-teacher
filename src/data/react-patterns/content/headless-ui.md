# Headless UI

## What it is

**Headless** components expose behavior, state, and accessibility — keyboard handlers, ARIA attributes, focus management — without imposing markup or styles. You bring the DOM and CSS (Tailwind, CSS modules, etc.).

Examples: Radix UI primitives, React Aria, Downshift, Headless UI (Tailwind Labs).

## When to use

- Building a design system with custom visuals
- Full control over DOM structure for accessibility audits
- Avoid fighting opinionated CSS from component libraries

## Example (conceptual toggle)

```tsx
import { useState, useId } from 'react';

export function useDisclosure(initial = false) {
  const [open, setOpen] = useState(initial);
  const panelId = useId();
  return {
    open,
    toggle: () => setOpen((v) => !v),
    close: () => setOpen(false),
    buttonProps: {
      'aria-expanded': open,
      'aria-controls': panelId,
      onClick: () => setOpen((v) => !v),
    },
    panelProps: {
      id: panelId,
      hidden: !open,
    },
  };
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const { open, buttonProps, panelProps } = useDisclosure();

  return (
    <div className="faq-item">
      <button type="button" className="faq-trigger" {...buttonProps}>
        {question}
      </button>
      {!panelProps.hidden && (
        <div className="faq-panel" {...panelProps}>
          {answer}
        </div>
      )}
    </div>
  );
}
```

## Tradeoffs

| Aspect | Details |
|--------|---------|
| Pros | Accessible defaults, full styling freedom, shared logic across products |
| Cons | More wiring than batteries-included UI kits; you own visual polish |
| Interview angle | Headless + compound components is how modern libraries (shadcn/ui) are built |

