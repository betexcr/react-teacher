# Solution: useToggle Hook

## Approach

useState plus useCallback wrappers for ergonomic boolean control.

## Key concepts

- **Custom hook**: Extract reusable stateful logic; name starts with use.
- **useCallback**: Stable function identities for memoized children.

## Solution code

```tsx
import { useCallback, useState } from 'react';

export function useToggle(initial = false) {
  const [value, setValue] = useState(initial);

  const toggle = useCallback(() => setValue((v) => !v), []);
  const on = useCallback(() => setValue(true), []);
  const off = useCallback(() => setValue(false), []);
  const set = useCallback((v: boolean) => setValue(v), []);

  return [value, { toggle, on, off, set }] as const;
}

export function CollapsiblePanel() {
  const [open, { toggle, off }] = useToggle(false);
  return (
    <div>
      <button onClick={toggle}>{open ? 'Hide' : 'Show'}</button>
      {open && (
        <section>
          <p>Content</p>
          <button onClick={off}>Close</button>
        </section>
      )}
    </div>
  );
}
```

## Walkthrough

Hook encapsulates boolean state and verbs; panel consumes destructured API.

## Common mistakes

- Returning new object every render without memo (breaks memo children)
- Naming hook Toggle without use prefix

## Stretch goals

- Add toggleWithAnimation delay
- useToggle with reducer
