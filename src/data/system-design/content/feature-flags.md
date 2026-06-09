# Feature Flags & A/B Testing

## Problem Statement

Design a client-side feature flag system for a React SPA that:

- **Flags:** Boolean toggles, multivariate experiments (A/B/C), and gradual rollouts
- **No flash:** Avoid UI flicker—flags resolved before first paint or use SSR/inline bootstrap
- **Targeting:** User id, org id, percentage rollout, custom attributes
- **Performance:** Cache flags locally with TTL; stale-while-revalidate on focus
- **Safety:** Kill switch for broken features; default to `false` when SDK unavailable
- **Privacy:** No PII in client-side bucketing keys without consent

## System Architecture

- **Client Layer:** Flag provider, `useFlag()` hook, bootstrap script or edge-injected JSON, analytics exposure events
- **API Layer:** `GET /flags?userId=` or Edge Config / LaunchDarkly-style SDK
- **Data Layer:** Flag definitions, rollout rules, experiment assignment log

```text
Bootstrap (inline JSON or /flags) ──► FlagProvider ──► useFlag('newCheckout')
Exposure event ──► analytics (once per session per experiment)
```

## Key Technical Decisions

### 1. Bootstrap vs. async fetch

**Flash problem:** Component renders `false`, then flag loads `true` → layout shift.

| Strategy | Tradeoff |
|----------|----------|
| Inline bootstrap (`window.__FLAGS__` in HTML) | No flash; requires server/edge embed |
| Blocking root until `flagsReady` | Correct first paint; delays app shell |
| Skeleton placeholder | Fast shell; brief neutral UI for gated routes |

For SPAs on Vercel, fetch flags in parallel with app bundle; hold router until first response or timeout (default all false).

### 2. Deterministic bucketing

Percentage rollout: `hash(userId + flagKey) % 100 < rolloutPercent`—same user always sees same variant (sticky assignment).

Use stable hash (murmur, sha256 truncated)—not `Math.random()` per session.

### 3. Multivariate experiments

Return `variant: 'control' | 'B' | 'C'`. Track exposure once:

```ts
if (!sessionStorage.getItem(`exp:${key}`)) {
  analytics.track('experiment_exposure', { key, variant });
  sessionStorage.setItem(`exp:${key}`, variant);
}
```

### 4. Kill switch priority

`forceOff` in admin overrides all rules—propagate via short TTL cache (30s) for emergencies.

## Implementation: Core Components

### Flag types + provider

```tsx
import { createContext, useContext, useMemo, type ReactNode } from 'react';

type FlagValues = Record<string, boolean | string>;

const FlagContext = createContext<{
  flags: FlagValues;
  ready: boolean;
} | null>(null);

export function FlagProvider({
  flags,
  ready,
  children,
}: {
  flags: FlagValues;
  ready: boolean;
  children: ReactNode;
}) {
  const value = useMemo(() => ({ flags, ready }), [flags, ready]);
  return <FlagContext.Provider value={value}>{children}</FlagContext.Provider>;
}

export function useFlag(key: string, defaultValue = false): boolean {
  const ctx = useContext(FlagContext);
  if (!ctx) throw new Error('useFlag requires FlagProvider');
  const v = ctx.flags[key];
  if (typeof v === 'boolean') return v;
  return defaultValue;
}

export function useVariant(key: string, defaultVariant = 'control'): string {
  const ctx = useContext(FlagContext);
  if (!ctx) return defaultVariant;
  const v = ctx.flags[key];
  return typeof v === 'string' ? v : defaultVariant;
}
```

### Fetch flags with cache + bootstrap

```tsx
import { useQuery } from '@tanstack/react-query';

declare global {
  interface Window {
    __FLAGS__?: Record<string, boolean | string>;
  }
}

async function fetchFlags(): Promise<Record<string, boolean | string>> {
  if (window.__FLAGS__) return window.__FLAGS__;
  const res = await fetch('/api/flags', { credentials: 'include' });
  if (!res.ok) return {};
  return res.json();
}

export function useFlagsBootstrap() {
  return useQuery({
    queryKey: ['flags'],
    queryFn: fetchFlags,
    staleTime: 60_000,
    gcTime: 5 * 60_000,
    retry: 1,
    placeholderData: () => window.__FLAGS__ ?? {},
  });
}

export function AppRoot() {
  const { data: flags = {}, isLoading, isFetched } = useFlagsBootstrap();

  if (isLoading && !window.__FLAGS__) {
    return <div aria-busy="true">Loading…</div>;
  }

  return (
    <FlagProvider flags={flags} ready={isFetched}>
      <AppRoutes />
    </FlagProvider>
  );
}
```

### Gated feature component

```tsx
export function CheckoutPage() {
  const newCheckout = useFlag('newCheckout', false);

  if (newCheckout) return <CheckoutV2 />;
  return <CheckoutLegacy />;
}

export function PricingExperiment() {
  const variant = useVariant('pricingTest', 'control');

  useEffect(() => {
    const key = 'exp:pricingTest';
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, variant);
    analytics.track('experiment_exposure', { experiment: 'pricingTest', variant });
  }, [variant]);

  if (variant === 'B') return <PricingTableAnnual />;
  if (variant === 'C') return <PricingTableUsage />;
  return <PricingTableControl />;
}
```

### Server-side bucketing helper

```ts
function bucket(userId: string, flagKey: string, percent: number): boolean {
  let h = 0;
  const s = `${userId}:${flagKey}`;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h) % 100 < percent;
}

export function evaluateFlags(userId: string, defs: FlagDef[]): Record<string, boolean | string> {
  const out: Record<string, boolean | string> = {};
  for (const def of defs) {
    if (def.forceOff) {
      out[def.key] = false;
      continue;
    }
    if (def.type === 'boolean') {
      out[def.key] = bucket(userId, def.key, def.rolloutPercent ?? 0);
    } else if (def.type === 'multivariate') {
      const slot = Math.abs(hash(userId, def.key)) % def.variants.length;
      out[def.key] = def.variants[slot];
    }
  }
  return out;
}
```

## Performance Optimization

- Single `/flags` request bundles all keys—avoid N requests per flag
- `staleTime` 60s; refetch on focus for kill-switch responsiveness
- Tree-shake unused experiment code with dynamic import when flag true

## Edge Cases and Error Handling

- **SDK timeout:** Default all flags false; log metric
- **Anonymous users:** Bucket by session cookie id
- **Flag removed:** Treat missing key as false
- **SEO pages:** SSR must evaluate same rules server-side for consistent HTML
- **GDPR:** Document bucketing in privacy policy if user ids used

## Interview Talking Points

- Avoid FOUC/FOLB (flash of wrong branch)—bootstrap is the fix
- Difference from env vars (`VITE_*`)—flags change without redeploy
- When to use LaunchDarkly/Statsig vs. in-house (team size, compliance)
