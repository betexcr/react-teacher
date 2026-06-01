# Solution: Pagination Implementation

## Approach

Page state drives fetch URL; derive totalPages from total count.

## Key concepts

- **Server pagination**: Only load current slice—essential for large data.

## Solution code

```tsx
import { useEffect, useState } from 'react';

export function PaginatedPosts() {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(0);
  const limit = 10;

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`)
      .then((r) => {
        setTotal(Number(r.headers.get('X-Total-Count') || 100));
        return r.json();
      })
      .then(setPosts);
  }, [page]);

  const pages = Math.ceil(total / limit);

  return (
    <div>
      <ul>{posts.map((p: { id: number; title: string }) => <li key={p.id}>{p.title}</li>)}</ul>
      <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>Prev</button>
      <span>{page} / {pages}</span>
      <button disabled={page >= pages} onClick={() => setPage((p) => p + 1)}>Next</button>
    </div>
  );
}
```

## Walkthrough

Effect refetches when page changes; buttons disabled at edges. JSONPlaceholder may omit X-Total-Count—use a sensible fallback total for the demo.

## Common mistakes

- Client slicing huge dataset
- Off-by-one on total pages
- Assuming every API sends X-Total-Count

## Stretch goals

- Page size selector
- Cursor-based pagination
