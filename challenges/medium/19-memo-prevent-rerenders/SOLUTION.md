# Solution: Memo Usage: Prevent Unnecessary Re-renders

## Approach

Memo child; memoize callbacks and derived data passed as props.

## Key concepts

- **React.memo**: Shallow compare props; skip render if equal.
- **Referential equality**: New function/object props break memo.

## Code highlights

- `onClick={() => setCount((c) => c + 1)}` — **increment click** — In "Memo Usage: Prevent Unnecessary Re-renders", this adds 1 using the latest state. Counter clicks do not change items or onSelect reference—List skips render.
- `const [count, setCount] = useState(0)` — **count state** — In "Memo Usage: Prevent Unnecessary Re-renders", `count` is the value the UI shows. It starts at 0. `setCount` updates it when the user interacts. Counter clicks do not change items or onSelect reference—List skips render.
- `onClick={() => onSelect(i)}` — **onClick** — In "Memo Usage: Prevent Unnecessary Re-renders", this runs when the user clicks this button. Counter clicks do not change items or onSelect reference—List skips render.
- `key={i}` — **key** — In "Memo Usage: Prevent Unnecessary Re-renders", helps React track each list row — use a stable id (i), not the array index, when items can reorder.
- `memo(` — **memo** — In "Memo Usage: Prevent Unnecessary Re-renders": Shallow compare props; skip render if equal.

## Solution code

```tsx
import { memo, useCallback, useState } from 'react';

const List = memo(function List({ items, onSelect }: { items: string[]; onSelect: (i: string) => void }) {
  console.log('List render');
  return (
    <ul>
      {items.map((i) => (
        <li key={i}><button onClick={() => onSelect(i)}>{i}</button></li>
      ))}
    </ul>
  );
});

export function MemoDemo() {
  const [count, setCount] = useState(0);
  const [items] = useState(['a', 'b', 'c']);
  const onSelect = useCallback((i: string) => alert(i), []);
  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>{count}</button>
      <List items={items} onSelect={onSelect} />
    </div>
  );
}
```

## Walkthrough

Counter clicks do not change items or onSelect reference—List skips render.

## Common mistakes

- Memo without stable props (useless)
- Memo everything (premature)

## Stretch goals

- Profiler comparison
- context selector libraries
