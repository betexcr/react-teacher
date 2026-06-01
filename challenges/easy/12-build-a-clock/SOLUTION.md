# Solution: Build a Clock

## Approach

Store Date in state; interval sets new Date(); format derived with options.

## Key concepts

- **Timer in useEffect**: Always return cleanup clearing interval.
- **Derived formatting**: Format from `now` during render, not separate string state.

## Solution code

```tsx
import { useEffect, useState } from 'react';

export function Clock() {
  const [now, setNow] = useState(() => new Date());
  const [use24h, setUse24h] = useState(true);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const time = new Intl.DateTimeFormat(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: !use24h,
  }).format(now);

  return (
    <div>
      <time dateTime={now.toISOString()}>{time}</time>
      <button onClick={() => setUse24h((v) => !v)}>{use24h ? '24h' : '12h'}</button>
    </div>
  );
}
```

## Walkthrough

Single source of truth `now`. Intl handles padding and AM/PM.

## Common mistakes

- Storing formatted string in state (drift)
- Not clearing interval

## Stretch goals

- Analog SVG hands
- Timezone selector
