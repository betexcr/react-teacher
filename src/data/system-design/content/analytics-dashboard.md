# Analytics Dashboard

## Problem Statement

Design a metrics dashboard for a SaaS admin product that:

- **Composition:** Multiple independent widgets (KPI cards, line/bar charts, tables) on one page
- **Time range:** Global date picker affects all widgets; presets (7d, 30d, custom)
- **Performance:** Parallel fetches per widget; skeleton per tile; lazy-load heavy chart libraries
- **Permissions:** Hide revenue widgets for non-admin roles
- **Export:** CSV download per widget or full dashboard snapshot
- **Reliability:** Partial failure—one widget error must not break the whole page

## System Architecture

- **Client Layer:** Dashboard layout grid, shared `DateRangeProvider`, per-widget React Query hooks, chart code-splitting
- **API Layer:** `GET /metrics/:widgetId?from=&to=` with role checks, aggregated rollups in DB/cache
- **Data Layer:** Time-series store (ClickHouse/Timescale), nightly rollups, Redis cache for hot ranges

```text
DateRangeContext (from, to)
        │
        ├── useQuery(['mrr', range])     ──► KPI tile
        ├── useQuery(['signups', range]) ──► Line chart
        └── useQuery(['top-users', range]) ──► Table widget
```

## Key Technical Decisions

### 1. Shared date range vs. per-widget range

| Global (shared) range | Per-widget range |
|-----------------------|------------------|
| One picker updates all widgets | Each tile owns its date picker |
| URL-sync `?from=&to=` for shareable views | Compare periods side-by-side |
| Recommended for exec dashboards | Use only when tiles need different windows |

### 2. Parallel independent queries

Each widget owns its `useQuery` with `queryKey: ['metrics', widgetId, from, to]`. Benefits:

- One slow widget does not block others
- React Query caches per widget—changing range refetches only what is mounted
- Easy to add/remove tiles without central reducer

Use `useQueries` for dynamic widget lists from layout config.

### 3. Chart library boundaries

Code-split chart library (`recharts`, `visx`, `chart.js`) per widget route or lazy `React.lazy(() => import('./RevenueChart'))`. Dashboard shell renders instantly; charts stream in.

Keep chart components dumb: `{ data, loading, error }` props only.

### 4. Skeleton and error isolation

Wrap each widget in an error boundary + suspense fallback:

```tsx
<WidgetErrorBoundary widgetId="mrr">
  <Suspense fallback={<ChartSkeleton />}>
    <MrrWidget range={range} />
  </Suspense>
</WidgetErrorBoundary>
```

Failed widget shows inline retry; siblings keep working.

## Implementation: Core Components

### Date range context + URL sync

```tsx
import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';

type DateRange = { from: string; to: string };

const DateRangeContext = createContext<{
  range: DateRange;
  setRange: (r: DateRange) => void;
} | null>(null);

export function DateRangeProvider({ children }: { children: ReactNode }) {
  const [params, setParams] = useSearchParams();

  const range = useMemo(
    () => ({
      from: params.get('from') ?? defaultFrom(),
      to: params.get('to') ?? defaultTo(),
    }),
    [params]
  );

  function setRange(next: DateRange) {
    const p = new URLSearchParams(params);
    p.set('from', next.from);
    p.set('to', next.to);
    setParams(p, { replace: true });
  }

  return (
    <DateRangeContext.Provider value={{ range, setRange }}>
      {children}
    </DateRangeContext.Provider>
  );
}

export function useDateRange() {
  const ctx = useContext(DateRangeContext);
  if (!ctx) throw new Error('useDateRange requires DateRangeProvider');
  return ctx;
}

function defaultFrom() {
  const d = new Date();
  d.setDate(d.getDate() - 30);
  return d.toISOString().slice(0, 10);
}

function defaultTo() {
  return new Date().toISOString().slice(0, 10);
}
```

### KPI widget with React Query

```tsx
import { useQuery } from '@tanstack/react-query';
import { useDateRange } from './DateRangeProvider';

async function fetchMrr(from: string, to: string) {
  const res = await fetch(`/api/metrics/mrr?from=${from}&to=${to}`);
  if (!res.ok) throw new Error('MRR fetch failed');
  return res.json() as Promise<{ value: number; deltaPct: number }>;
}

export function MrrWidget() {
  const { range } = useDateRange();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['metrics', 'mrr', range.from, range.to],
    queryFn: () => fetchMrr(range.from, range.to),
    staleTime: 60_000,
  });

  if (isLoading) return <div className="widget-skeleton" aria-busy="true" />;
  if (isError) return <button onClick={() => refetch()}>Retry MRR</button>;

  return (
    <article className="kpi-widget">
      <h3>Monthly recurring revenue</h3>
      <p className="kpi-value">${data.value.toLocaleString()}</p>
      <p className={data.deltaPct >= 0 ? 'positive' : 'negative'}>
        {data.deltaPct >= 0 ? '↑' : '↓'} {Math.abs(data.deltaPct)}% vs prior period
      </p>
    </article>
  );
}
```

### Parallel widgets with useQueries

```tsx
import { useQueries } from '@tanstack/react-query';
import { useDateRange } from './DateRangeProvider';

const WIDGET_DEFS = [
  { id: 'signups', path: '/api/metrics/signups' },
  { id: 'churn', path: '/api/metrics/churn' },
  { id: 'active-users', path: '/api/metrics/active-users' },
] as const;

export function DashboardGrid() {
  const { range } = useDateRange();

  const results = useQueries({
    queries: WIDGET_DEFS.map((w) => ({
      queryKey: ['metrics', w.id, range.from, range.to],
      queryFn: async () => {
        const res = await fetch(`${w.path}?from=${range.from}&to=${range.to}`);
        if (!res.ok) throw new Error(`${w.id} failed`);
        return res.json();
      },
      staleTime: 60_000,
    })),
  });

  return (
    <div className="dashboard-grid">
      {WIDGET_DEFS.map((w, i) => {
        const q = results[i];
        if (q.isLoading) return <WidgetSkeleton key={w.id} title={w.id} />;
        if (q.isError) return <WidgetError key={w.id} onRetry={() => q.refetch()} />;
        return <WidgetCard key={w.id} id={w.id} data={q.data} />;
      })}
    </div>
  );
}
```

### Lazy-loaded chart + CSV export

```tsx
import { lazy, Suspense } from 'react';

const SignupsChart = lazy(() => import('./SignupsChart'));

export function SignupsWidget() {
  const { range } = useDateRange();
  const { data, isLoading } = useQuery({
    queryKey: ['metrics', 'signups-series', range.from, range.to],
    queryFn: () => fetchSignupsSeries(range),
  });

  async function exportCsv() {
    const res = await fetch(
      `/api/metrics/signups/export?from=${range.from}&to=${range.to}`
    );
    const blob = await res.blob();
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `signups-${range.from}-${range.to}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  return (
    <article>
      <header>
        <h3>Signups over time</h3>
        <button type="button" onClick={exportCsv}>Export CSV</button>
      </header>
      {isLoading ? (
        <ChartSkeleton />
      ) : (
        <Suspense fallback={<ChartSkeleton />}>
          <SignupsChart points={data.points} />
        </Suspense>
      )}
    </article>
  );
}
```

## Performance Optimization

- `staleTime` 60s for dashboards—avoid refetch storm on tab focus
- Prefetch adjacent date presets on picker hover
- Server pre-aggregates daily rollups—API returns hundreds of points, not millions of events
- Virtualize long leaderboard tables inside widgets
- Memoize chart data transforms with `useMemo`

## Edge Cases and Error Handling

- **Invalid date range:** `from > to` → swap or show validation error
- **Timezone:** Store UTC server-side; format with `Intl.DateTimeFormat` in user's locale
- **Empty data:** Zero state copy, not broken chart axes
- **Partial permissions:** Filter widget config array by `usePermissions()` before render
- **Rate limits:** Backoff + toast when metrics API returns 429
- **Large CSV:** Stream export from server; do not build CSV string in browser for 1M rows

## Interview Talking Points

- Contrast dashboard orchestration vs. building a global Redux metrics store
- Explain why independent queries beat one mega `/dashboard` endpoint (caching, failure isolation)
- Mention real-time dashboards: WebSocket push vs. polling for live KPIs
