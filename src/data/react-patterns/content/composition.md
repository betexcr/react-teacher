# Composition (Children & Slots)

## What it is

React favors **composition** over class inheritance. Build UIs by nesting components and passing `children` or named slots (extra props like `header`, `footer`) instead of extending base classes.

## When to use

- Layout shells (`Card`, `Modal`, `Page`)
- Optional regions (toolbar, actions, empty state)
- Wrapping behavior around arbitrary child trees (error boundaries, providers)

## Example

```tsx
import type { ReactNode } from 'react';

function Card({
  title,
  children,
  footer,
}: {
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <section className="card">
      <header><h2>{title}</h2></header>
      <div className="card-body">{children}</div>
      {footer && <footer className="card-footer">{footer}</footer>}
    </section>
  );
}

function App() {
  return (
    <Card
      title="Invoice #42"
      footer={<button>Download PDF</button>}
    >
      <p>Total: $120.00</p>
    </Card>
  );
}
```

## `children` as a function

Sometimes the parent must inject state into children — that becomes the **render props** pattern (see that guide). Plain `children` stays the default for static structure.

## Tradeoffs

- **Pros:** Flexible API, no fragile inheritance chains, easy to wrap third-party components
- **Cons:** Slot prop explosion if you add too many named regions — consider compound components instead
- **Interview angle:** “Prefer composition” is React’s answer to OOP inheritance for UI
