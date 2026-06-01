# Solution: Build a Reusable Tabs Component

## Approach

Context shares active index and setIndex; compound subcomponents.

## Key concepts

- **WAI-ARIA Tabs**: tablist > tab + tabpanel linkage via ids.

## Solution code

```tsx
import { createContext, useContext, useState, ReactNode } from 'react';

const Ctx = createContext<{ index: number; setIndex: (i: number) => void } | null>(null);

export function Tabs({ children, index: controlled, onChange }: { children: ReactNode; index?: number; onChange?: (i: number) => void }) {
  const [internal, setInternal] = useState(0);
  const index = controlled ?? internal;
  const setIndex = (i: number) => {
    onChange?.(i);
    if (controlled === undefined) setInternal(i);
  };
  return <Ctx.Provider value={{ index, setIndex }}>{children}</Ctx.Provider>;
}

export function TabList({ children }: { children: ReactNode }) {
  return <div role="tablist">{children}</div>;
}

export function Tab({ i, children }: { i: number; children: ReactNode }) {
  const ctx = useContext(Ctx)!;
  return (
    <button role="tab" aria-selected={ctx.index === i} onClick={() => ctx.setIndex(i)}>
      {children}
    </button>
  );
}

export function TabPanel({ i, children }: { i: number; children: ReactNode }) {
  const ctx = useContext(Ctx)!;
  if (ctx.index !== i) return null;
  return <div role="tabpanel">{children}</div>;
}
```

## Walkthrough

Controlled index prop overrides internal state; panels conditionally render.

## Common mistakes

- All panels visible
- Missing aria roles

## Stretch goals

- Lazy mount panels
- Vertical tabs
