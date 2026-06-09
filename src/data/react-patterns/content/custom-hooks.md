# Custom Hooks

## What it is

A custom hook is a function whose name starts with `use` and that may call other hooks. It extracts reusable **stateful logic** — not JSX — so multiple components share the same behavior without copy-paste.

## When to use

- Same fetch/subscription/form logic appears in multiple components
- You want to test logic in isolation (call the hook in a test renderer)
- A component is getting long because of effects and handlers mixed with markup

## Example

```tsx
import { useEffect, useState } from 'react';

type GeoState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; coords: GeolocationCoordinates };

export function useGeolocation() {
  const [state, setState] = useState<GeoState>({ status: 'idle' });

  useEffect(() => {
    if (!navigator.geolocation) {
      setState({ status: 'error', message: 'Geolocation unsupported' });
      return;
    }
    setState({ status: 'loading' });
    const watchId = navigator.geolocation.watchPosition(
      (pos) => setState({ status: 'success', coords: pos.coords }),
      (err) => setState({ status: 'error', message: err.message })
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return state;
}

function WeatherBanner() {
  const geo = useGeolocation();
  if (geo.status !== 'success') return <p>Locating…</p>;
  return <p>Lat: {geo.coords.latitude.toFixed(2)}</p>;
}
```

## Rules

- Only call hooks at the top level of the custom hook (same Rules of Hooks as components)
- Return a stable API: `{ data, error, refetch }` or a tuple `[value, setValue]`
- Name by **behavior** (`useDebouncedValue`, `useMediaQuery`) not by UI

## Tradeoffs

| Aspect | Details |
|--------|---------|
| Pros | DRY logic, colocated tests, composable (hooks calling hooks) |
| Cons | Over-abstracting one-off logic adds indirection; debug stack traces go through more layers |
| Interview angle | Custom hooks replaced many HOC and render-prop use cases in modern React |
