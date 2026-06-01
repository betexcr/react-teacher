# Solution: useInterval Hook

## Approach

Dan Abramov pattern: ref for callback, effect sets interval when delay changes.

## Key concepts

- **Declarative interval**: delay null means paused—effect cleans up timer.
- **Ref indirection**: interval always calls ref.current() for latest callback.

## Solution code

```tsx
import { useEffect, useRef } from 'react';

export function useInterval(callback: () => void, delay: number | null) {
  const saved = useRef(callback);
  useEffect(() => {
    saved.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) return;
    const id = setInterval(() => saved.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}

export function Blinker() {
  const [on, setOn] = useState(false);
  useInterval(() => setOn((v) => !v), 1000);
  return <div style={{ opacity: on ? 1 : 0.3 }}>Blink</div>;
}
```

## Walkthrough

Separating callback ref from delay effect avoids resetting timer every render when only callback identity changes.

## Common mistakes

- Including callback in effect deps causing reset every render
- Forgetting clearInterval

## Stretch goals

- useTimeout hook
- Drift correction
