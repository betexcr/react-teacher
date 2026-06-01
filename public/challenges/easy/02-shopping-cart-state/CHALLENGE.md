# Shopping Cart State

**Difficulty:** easy  
**Topics:** useState, arrays, immutability

## Learning goals

- Update array state immutably
- Derive totals from state

## Challenge

Model a mini cart: each item has id, name, price, and quantity. Users can add items, change quantity, and remove items. Show item subtotals and a cart total.

## Requirements

1. Add product increases quantity if id exists, else adds new line
2. Remove deletes the line entirely
3. Quantity cannot go below 1 (or remove item at 0)
4. Display formatted total price

## Starter hint

Implement in **your own** React project (Vite, Next.js, etc.) or a sandbox—e.g. `src/practice/easy/02-shopping-cart-state/`. Reference write-ups in this repo live under `challenges/easy/02-shopping-cart-state/` (not loaded by the app).

```tsx
type Item = { id: string; name: string; price: number; qty: number };

export function ShoppingCart() {
  const [items, setItems] = useState<Item[]>([]);
  // addItem, updateQty, removeItem
  return null;
}
```

## Hints

1. Never mutate items with push or items[i].qty++
2. Use map/filter to produce new arrays
3. total = items.reduce((sum, i) => sum + i.price * i.qty, 0)

## Acceptance criteria

- [ ] Add/merge works
- [ ] Totals correct
- [ ] Remove works

## Resources

- [Updating Arrays in State](https://react.dev/learn/updating-arrays-in-state)
- [useState – Reference](https://react.dev/reference/react/useState)
- [Updating Objects in State](https://react.dev/learn/updating-objects-in-state)
