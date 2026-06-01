# Solution: Fetching Data

## Approach

Track status in state; effect triggers fetch; abort on unmount or refetch.

## Key concepts

- **useEffect**: Synchronize with external systems (network).
- **AbortController**: Cancel in-flight fetch when component unmounts.

## Solution code

```tsx
import { useEffect, useState, useCallback } from 'react';

type User = { id: number; name: string; email: string };

export function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback((signal?: AbortSignal) => {
    setLoading(true);
    setError(null);
    fetch('https://jsonplaceholder.typicode.com/users', { signal })
      .then((r) => {
        if (!r.ok) throw new Error(r.statusText);
        return r.json();
      })
      .then(setUsers)
      .catch((e) => {
        if (e.name !== 'AbortError') setError(e.message);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const ac = new AbortController();
    load(ac.signal);
    return () => ac.abort();
  }, [load]);

  if (loading) return <p>Loading…</p>;
  if (error) return <p role="alert">Error: {error}</p>;

  return (
    <div>
      <button onClick={() => load()}>Refetch</button>
      <ul>
        {users.map((u) => (
          <li key={u.id}>{u.name} — {u.email}</li>
        ))}
      </ul>
    </div>
  );
}
```

## Walkthrough

load centralizes fetch logic. Effect creates AbortController per mount. Refetch calls load without aborting unless you add that.

## Common mistakes

- Missing dependency warnings ignored blindly
- No loading state (flash of empty)

## Stretch goals

- React Query / SWR
- Pagination
