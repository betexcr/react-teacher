# Solution: Multi-step Form with Persistent State

## Approach

One state blob; step index; storage sync effect.

## Key concepts

- **Wizard state**: Keep one source of truth—not one state per step.

## Solution code

```tsx
import { useEffect, useState } from 'react';

type FormData = { email: string; name: string; plan: string };
const KEY = 'wizard';

export function Wizard() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(() => {
    const raw = sessionStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : { email: '', name: '', plan: 'free' };
  });

  useEffect(() => {
    sessionStorage.setItem(KEY, JSON.stringify(data));
  }, [data]);

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  return (
    <div>
      {step === 0 && (
        <input value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
      )}
      {step === 1 && (
        <input value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
      )}
      {step === 2 && <pre>{JSON.stringify(data, null, 2)}</pre>}
      {step > 0 && <button onClick={back}>Back</button>}
      {step < 2 && <button onClick={next}>Next</button>}
    </div>
  );
}
```

## Walkthrough

All fields live in data; step only controls which inputs render.

## Common mistakes

- Separate useState per step losing data
- Not parsing storage safely

## Stretch goals

- Zod per-step schemas
- Animate transitions
