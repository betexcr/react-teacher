# Solution: Shopping Cart State

## Approach

Keep cart as an array. Each operation returns a new array reference so React detects the change.

## Key concepts

- **Immutable updates**: Copy-on-write patterns (map, filter, spread) keep state predictable.
- **Derived data**: Compute totals during render instead of storing redundant state.

## Solution code

```tsx
import { useState } from 'react';

type Item = { id: string; name: string; price: number; qty: number };

export function ShoppingCart() {
  const [items, setItems] = useState<Item[]>([]);

  const addItem = (product: Omit<Item, 'qty'>) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id: string, qty: number) => {
    setItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const removeItem = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div>
      <ul>
        {items.map((i) => (
          <li key={i.id}>
            {i.name} × {i.qty} — ${(i.price * i.qty).toFixed(2)}
            <button onClick={() => updateQty(i.id, i.qty - 1)}>-</button>
            <button onClick={() => updateQty(i.id, i.qty + 1)}>+</button>
            <button onClick={() => removeItem(i.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <p>Total: ${total.toFixed(2)}</p>
      <button onClick={() => addItem({ id: '1', name: 'Apple', price: 1.5 })}>
        Add Apple
      </button>
    </div>
  );
}
```

## Walkthrough

addItem checks for duplicates with find, then either maps to bump qty or spreads a new entry. updateQty filters out zero-qty lines. total is derived each render.

## Common mistakes

- Mutating item.qty directly
- Storing total in state and forgetting to sync

## Stretch goals

- Persist cart to localStorage
- Support coupons
