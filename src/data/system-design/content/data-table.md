# Admin Data Table

## Problem Statement

Design a scalable admin data table for SaaS dashboards that supports:

- **Operations:** Server-side sort, filter, pagination, and full-text search across 100k+ rows
- **Performance:** Smooth scrolling with column virtualization for wide/tall grids
- **UX:** Row selection, bulk actions, column resize/reorder, URL-synced state (shareable filtered views)
- **Accessibility:** Sortable headers announce state; checkbox column with select-all semantics
- **Security:** Column-level permissions; never expose PII columns to unauthorized roles

## System Architecture

- **Client Layer:** TanStack Table + React Query, URL search params as source of truth, virtualized body rows
- **API Layer:** `GET /records?sort=&filter=&page=&pageSize=` with cursor or offset pagination, CSV export endpoint
- **Data Layer:** Indexed columns for sort/filter fields, read replicas for reporting queries

```text
URL ?sort=createdAt:desc&status=active&page=2
        │
        ▼
useQuery ──► GET /records ──► { rows[], total, page }
        │
        ▼
TanStack Table (server mode) + optional row virtualizer
```

## Key Technical Decisions

### 1. Server-side vs. client-side table mode

**Server-side** (required at scale): sort/filter/pagination params sent to API; table holds only current page (~50 rows).

**Client-side:** Load all rows once—fine for <500 rows (settings pages, small teams).

Use TanStack Table `manualPagination`, `manualSorting`, `manualFiltering` when server-driven.

### 2. URL as state (shareable views)

Sync `sort`, `filters`, `page`, `pageSize` to `URLSearchParams`. Benefits:

- Refresh preserves view
- Users share links: `/admin/users?status=active&sort=lastLogin:desc`
- Browser back/forward works

Debounce filter text inputs before writing URL (300ms).

### 3. Row selection and bulk actions

- Page-level select all vs. global “select all 10,000 matching filter”
- Store selected ids in Set; bulk DELETE/PATCH sends `{ ids: string[] }`
- Clear selection when filter changes (avoid accidental cross-page deletes)

### 4. Virtualization

For **many rows on one page** (100+), virtualize tbody with `@tanstack/react-virtual`. For **many columns**, horizontal scroll with sticky first column (name/id).

Fixed row height (~48px) simplifies virtualizer math.

## Implementation: Core Components

### URL-synced table state

```tsx
import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';

type TableState = {
  page: number;
  pageSize: number;
  sort: string | null;
  status: string | null;
  q: string;
};

export function useTableUrlState(): [TableState, (patch: Partial<TableState>) => void] {
  const [params, setParams] = useSearchParams();

  const state = useMemo(
    () => ({
      page: Number(params.get('page') ?? 1),
      pageSize: Number(params.get('pageSize') ?? 25),
      sort: params.get('sort'),
      status: params.get('status'),
      q: params.get('q') ?? '',
    }),
    [params]
  );

  function update(patch: Partial<TableState>) {
    const next = new URLSearchParams(params);
    Object.entries(patch).forEach(([k, v]) => {
      if (v === null || v === '' || v === undefined) next.delete(k);
      else next.set(k, String(v));
    });
    if ('status' in patch || 'q' in patch) next.set('page', '1');
    setParams(next, { replace: true });
  }

  return [state, update];
}
```

### Server-driven fetch + TanStack Table

```tsx
import { useQuery } from '@tanstack/react-query';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
} from '@tanstack/react-table';

type UserRow = { id: string; name: string; email: string; status: string; createdAt: string };

async function fetchUsers(state: TableState) {
  const qs = new URLSearchParams({
    page: String(state.page),
    pageSize: String(state.pageSize),
    ...(state.sort ? { sort: state.sort } : {}),
    ...(state.status ? { status: state.status } : {}),
    ...(state.q ? { q: state.q } : {}),
  });
  const res = await fetch(`/api/users?${qs}`);
  if (!res.ok) throw new Error('Failed to load users');
  return res.json() as Promise<{ rows: UserRow[]; total: number }>;
}

const columns: ColumnDef<UserRow>[] = [
  { accessorKey: 'name', header: 'Name', enableSorting: true },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'status', header: 'Status' },
  { accessorKey: 'createdAt', header: 'Created', enableSorting: true },
];

export function UsersTable() {
  const [urlState, setUrlState] = useTableUrlState();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['users', urlState],
    queryFn: () => fetchUsers(urlState),
    placeholderData: (prev) => prev,
  });

  const table = useReactTable({
    data: data?.rows ?? [],
    columns,
    pageCount: data ? Math.ceil(data.total / urlState.pageSize) : -1,
    state: {
      pagination: { pageIndex: urlState.page - 1, pageSize: urlState.pageSize },
      sorting: urlState.sort
        ? [{ id: urlState.sort.split(':')[0], desc: urlState.sort.endsWith(':desc') }]
        : [],
    },
    manualPagination: true,
    manualSorting: true,
    onPaginationChange: (updater) => {
      const next = typeof updater === 'function'
        ? updater({ pageIndex: urlState.page - 1, pageSize: urlState.pageSize })
        : updater;
      setUrlState({ page: next.pageIndex + 1, pageSize: next.pageSize });
    },
    onSortingChange: (updater) => {
      const current = urlState.sort
        ? [{ id: urlState.sort.split(':')[0], desc: urlState.sort.endsWith(':desc') }]
        : [];
      const next = typeof updater === 'function' ? updater(current) : updater;
      const s = next[0];
      setUrlState({ sort: s ? `${s.id}:${s.desc ? 'desc' : 'asc'}` : null });
    },
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <p aria-busy="true">Loading users…</p>;
  if (isError) return <button onClick={() => refetch()}>Retry</button>;

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((hg) => (
          <tr key={hg.id}>
            {hg.headers.map((header) => (
              <th key={header.id} aria-sort={header.column.getIsSorted() || undefined}>
                {flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

### Row selection + bulk delete

```tsx
import { useState } from 'react';

export function BulkActions({ selectedIds }: { selectedIds: Set<string> }) {
  const [pending, setPending] = useState(false);

  async function bulkDelete() {
    if (!confirm(`Delete ${selectedIds.size} users?`)) return;
    setPending(true);
    try {
      await fetch('/api/users/bulk-delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: [...selectedIds] }),
      });
    } finally {
      setPending(false);
    }
  }

  if (selectedIds.size === 0) return null;
  return (
    <div role="toolbar" aria-label="Bulk actions">
      <span>{selectedIds.size} selected</span>
      <button disabled={pending} onClick={bulkDelete}>Delete</button>
    </div>
  );
}
```

## Performance Optimization

- Server pagination default 25–50 rows; never load full dataset
- `placeholderData` prevents table flash on page change
- Index DB columns used in sort/filter (`status`, `created_at`)
- Virtualize tbody when pageSize > 100
- Debounce search input before updating URL `q`
- CSV export streams server-side (`Content-Disposition: attachment`)—do not build 100k rows in browser

## Edge Cases and Error Handling

- **Empty filter results:** Clear empty state with “Reset filters” link
- **Concurrent edits:** Optimistic row update or refetch on window focus (`refetchOnWindowFocus`)
- **Permission denied column:** Omit from `columns` array based on `usePermissions()`
- **Select all matching:** Second confirm modal with count from server (`GET /users/count?filter=`)
- **Invalid URL params:** Clamp page to `[1, pageCount]`, fallback sort to default

## Interview Talking Points

- Explain **why server-side** is mandatory at 100k rows (memory, initial load, sort cost)
- Compare offset vs cursor pagination for tables (offset OK for page numbers; cursor for infinite admin scroll)
- Mention TanStack Table vs. rolling your own sort/filter state
