# Solution: Counter Component

## Approach

A single piece of state holds the count. Event handlers call setCount with either a literal or an updater function.

## Key concepts

- **useState**: Declares state that persists across re-renders and triggers a re-render when updated.
- **Controlled updates**: Derive UI (disabled button) from state instead of mutating the DOM.

## Solution code

```tsx
import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p aria-live="polite">Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
      <button onClick={() => setCount((c) => c - 1)} disabled={count === 0}>
        Decrement
      </button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
```

## Walkthrough

We initialize count to 0. Each button calls setCount. Decrement uses an updater so React always sees the latest count. The decrement button is disabled when count === 0, which is declarative UI.

## Common mistakes

- Calling count-- instead of setCount
- Forgetting disabled on decrement at zero

## Stretch goals

- Add step size input
- Add keyboard shortcuts (+/-)
