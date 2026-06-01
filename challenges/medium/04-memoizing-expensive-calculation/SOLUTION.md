# Solution: Memoizing Expensive Calculation

## Approach

useMemo caches last result until n changes.

## Key concepts

- **useMemo**: Caches a computed value; not for side effects.

## Solution code

```tsx
import { useMemo, useState } from 'react';

function fib(n: number): number {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}

export function FibDemo() {
  const [n, setN] = useState(35);
  const [unrelated, setUnrelated] = useState(0);

  const result = useMemo(() => fib(n), [n]);

  return (
    <div>
      <input type="range" min={25} max={40} value={n} onChange={(e) => setN(Number(e.target.value))} />
      <p>fib({n}) = {result}</p>
      <button onClick={() => setUnrelated((u) => u + 1)}>Rerender ({unrelated})</button>
    </div>
  );
}
```

## Walkthrough

Bumping unrelated counter does not re-run fib because deps unchanged.

## Common mistakes

- useMemo with missing deps
- Memoizing cheap ops (no benefit)

## Stretch goals

- useDeferredValue
- Web worker
