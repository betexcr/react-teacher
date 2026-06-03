# Compound Components

## What it is

Compound components are a set of related components that share implicit state through React Context. The parent owns the state; children (`Tabs.List`, `Tabs.Trigger`, `Tabs.Panel`) read and update it via context instead of prop drilling.

Consumers compose the API like HTML: structure and order stay flexible while behavior stays coordinated.

## When to use

- UI kits: tabs, accordions, selects, menus, radio groups
- You want an ergonomic JSX API without one giant props object
- Multiple child parts must stay in sync (active tab, open panel, selected value)

## Example

```tsx
import { createContext, useContext, useState, type ReactNode } from 'react';

type TabsContextValue = {
  active: string;
  setActive: (id: string) => void;
};

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('Tabs.* must be used inside <Tabs>');
  return ctx;
}

function Tabs({ defaultId, children }: { defaultId: string; children: ReactNode }) {
  const [active, setActive] = useState(defaultId);
  return (
    <TabsContext.Provider value={{ active, setActive }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

function TabList({ children }: { children: ReactNode }) {
  return <div role="tablist">{children}</div>;
}

function Tab({ id, children }: { id: string; children: ReactNode }) {
  const { active, setActive } = useTabsContext();
  return (
    <button role="tab" aria-selected={active === id} onClick={() => setActive(id)}>
      {children}
    </button>
  );
}

function Panel({ id, children }: { id: string; children: ReactNode }) {
  const { active } = useTabsContext();
  if (active !== id) return null;
  return <div role="tabpanel">{children}</div>;
}

Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.Panel = Panel;

// Usage
<Tabs defaultId="profile">
  <Tabs.List>
    <Tabs.Tab id="profile">Profile</Tabs.Tab>
    <Tabs.Tab id="billing">Billing</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel id="profile">…</Tabs.Panel>
  <Tabs.Panel id="billing">…</Tabs.Panel>
</Tabs>
```

## Tradeoffs

- **Pros:** Flexible layout, small public API surface, matches Radix/shadcn mental model
- **Cons:** Requires context discipline; static subcomponents (`Tabs.List`) need clear docs
- **Interview angle:** Contrast with a single `<Tabs items={…} />` — compound components trade one prop blob for composability
