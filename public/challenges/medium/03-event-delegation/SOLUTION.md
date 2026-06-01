# Solution: Event Delegation

## Approach

Native event bubbling + closest to find actionable element.

## Key concepts

- **Event delegation**: Parent handles events from children—fewer listeners, dynamic-friendly.

## Solution code

```tsx
import { useState } from 'react';

type Item = { id: string; label: string };

export function DelegatedList() {
  const [items, setItems] = useState<Item[]>([{ id: '1', label: 'Alpha' }]);

  const onListClick = (e: React.MouseEvent<HTMLUListElement>) => {
    const target = (e.target as HTMLElement).closest<HTMLElement>('[data-action]');
    if (!target) return;
    const id = target.dataset.id!;
    const action = target.dataset.action;
    if (action === 'delete') setItems((xs) => xs.filter((x) => x.id !== id));
    if (action === 'select') alert(`Selected ${id}`);
  };

  return (
    <div>
      <button onClick={() => setItems((xs) => [...xs, { id: crypto.randomUUID(), label: 'New' }])}>Add</button>
      <ul onClick={onListClick}>
        {items.map((item) => (
          <li key={item.id} data-id={item.id}>
            {item.label}
            <button data-id={item.id} data-action="select">Select</button>
            <button data-id={item.id} data-action="delete">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## Walkthrough

React synthetic events still bubble; closest finds button with data attributes.

## Common mistakes

- Attaching per-item listeners in useEffect
- Not checking closest null

## Stretch goals

- Virtualized list with delegation
- Touch events
