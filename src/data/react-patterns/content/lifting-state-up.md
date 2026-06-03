# Lifting State Up

## What it is

When two sibling components need the same data, **move state to their closest common ancestor** and pass value + updaters down as props. One component owns the truth; others stay controlled.

## When to use

- Siblings must stay in sync (filters + list, Fahrenheit + Celsius inputs)
- Before reaching for context or global store — start local, lift only when needed
- Form sections that share validation state

## Example

```tsx
import { useState } from 'react';

function CelsiusInput({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (
    <label>
      °C
      <input type="number" value={value} onChange={(e) => onChange(Number(e.target.value))} />
    </label>
  );
}

function FahrenheitDisplay({ celsius }: { celsius: number }) {
  const f = (celsius * 9) / 5 + 32;
  return <p>{f.toFixed(1)} °F</p>;
}

function TemperatureConverter() {
  const [celsius, setCelsius] = useState(0);

  return (
    <>
      <CelsiusInput value={celsius} onChange={setCelsius} />
      <FahrenheitDisplay celsius={celsius} />
    </>
  );
}
```

## When to stop lifting

If props pass through many layers (**prop drilling**), consider context or a colocated store. If only one branch needs the state, keep it lower.

## Tradeoffs

- **Pros:** Single source of truth, easy data flow tracing
- **Cons:** Middle components pass props they do not use — refactor to context or composition
- **Interview angle:** Foundation for controlled components and one-way data flow in React
