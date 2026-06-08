# Multi-Tenant SaaS Shell

## Problem Statement

Design the application shell for a multi-tenant B2B SaaS product that:

- **Tenancy:** Users belong to one or more organizations; data scoped by `orgId`
- **Switcher:** Org switcher in header; switching refetches all org-scoped queries
- **AuthZ:** Role per org (owner, admin, member); UI hides actions user cannot perform
- **White-label:** Optional custom logo, primary color, domain per tenant
- **Routing:** URLs include org context (`/app/:orgSlug/...`) or subdomain (`acme.app.com`)
- **Isolation:** No cross-tenant data leaks in cache, localStorage, or API calls

## System Architecture

- **Client Layer:** Org context provider, switcher, theme tokens, scoped React Query keys
- **API Layer:** JWT includes `org_id` claim or `X-Org-Id` header; middleware enforces membership
- **Data Layer:** Row-level security by `org_id` in DB; assets in tenant-prefixed storage paths

```text
Login ──► list orgs ──► select org ──► token scoped to orgId
API   ──► Authorization: Bearer + org header ──► RLS filter
Switch org ──► clear client caches ──► refetch with new orgId
```

## Key Technical Decisions

### 1. Org in URL vs. subdomain

| URL path `/app/:orgSlug` | Subdomain `acme.app.com` |
|--------------------------|---------------------------|
| Single deploy, simpler cookies | Strong tenant branding |
| Shareable links include org | Requires wildcard DNS + SSL |
| Easier local dev | Cookie isolation per subdomain |

Most React SPAs start with **path-based** org slug; enterprise white-label may add custom domains later.

### 2. React Query cache isolation

Always include `orgId` in query keys:

```ts
['projects', orgId]
['billing', orgId]
```

On org switch: `queryClient.removeQueries()` or `clear()` to prevent showing previous tenant's data for one frame.

### 3. Theme / white-label

Store tenant theme on org record: `{ logoUrl, primaryColor, faviconUrl }`. Inject CSS variables at runtime:

```ts
document.documentElement.style.setProperty('--brand-primary', theme.primaryColor);
```

Load logo URL from CDN; fallback to default brand if missing.

### 4. Permission model

`usePermission('billing:write')` checks role matrix for **current org**. Never cache permissions across org switch without re-fetching.

## Implementation: Core Components

### Org context + switcher

```tsx
import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { useQueryClient } from '@tanstack/react-query';

type Org = { id: string; slug: string; name: string; role: 'owner' | 'admin' | 'member' };

type OrgContextValue = {
  org: Org | null;
  orgs: Org[];
  setOrg: (org: Org) => void;
};

const OrgContext = createContext<OrgContextValue | null>(null);

export function OrgProvider({
  orgs,
  initialOrgId,
  children,
}: {
  orgs: Org[];
  initialOrgId: string;
  children: ReactNode;
}) {
  const qc = useQueryClient();
  const [org, setOrgState] = useState(() => orgs.find((o) => o.id === initialOrgId) ?? orgs[0] ?? null);

  function setOrg(next: Org) {
    setOrgState(next);
    localStorage.setItem('lastOrgId', next.id);
    qc.clear();
  }

  const value = useMemo(() => ({ org, orgs, setOrg }), [org, orgs]);

  return <OrgContext.Provider value={value}>{children}</OrgContext.Provider>;
}

export function useOrg() {
  const ctx = useContext(OrgContext);
  if (!ctx) throw new Error('useOrg requires OrgProvider');
  return ctx;
}

export function OrgSwitcher() {
  const { org, orgs, setOrg } = useOrg();

  return (
    <label>
      Organization
      <select
        value={org?.id ?? ''}
        onChange={(e) => {
          const next = orgs.find((o) => o.id === e.target.value);
          if (next) setOrg(next);
        }}
      >
        {orgs.map((o) => (
          <option key={o.id} value={o.id}>
            {o.name}
          </option>
        ))}
      </select>
    </label>
  );
}
```

### Org-scoped API client

```tsx
export function useOrgFetch() {
  const { org } = useOrg();

  return useCallback(
    async (path: string, init: RequestInit = {}) => {
      if (!org) throw new Error('No organization selected');
      const headers = new Headers(init.headers);
      headers.set('X-Org-Id', org.id);
      const res = await fetch(path, { ...init, headers, credentials: 'include' });
      if (res.status === 403) throw new ForbiddenError('Not a member of this org');
      return res;
    },
    [org]
  );
}

export function useProjects() {
  const { org } = useOrg();
  const orgFetch = useOrgFetch();

  return useQuery({
    queryKey: ['projects', org?.id],
    enabled: !!org,
    queryFn: async () => {
      const res = await orgFetch('/api/projects');
      return res.json();
    },
  });
}
```

### Tenant theme provider

```tsx
type TenantTheme = { primaryColor: string; logoUrl: string | null };

export function TenantThemeProvider({ theme, children }: { theme: TenantTheme; children: ReactNode }) {
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--brand-primary', theme.primaryColor);
    return () => root.style.removeProperty('--brand-primary');
  }, [theme.primaryColor]);

  return (
    <div data-tenant-theme>
      {theme.logoUrl && <img src={theme.logoUrl} alt="" className="tenant-logo" />}
      {children}
    </div>
  );
}

export function useTenantTheme(orgId: string | undefined) {
  return useQuery({
    queryKey: ['tenant-theme', orgId],
    enabled: !!orgId,
    queryFn: async () => {
      const res = await fetch(`/api/orgs/${orgId}/theme`);
      return res.json() as Promise<TenantTheme>;
    },
  });
}
```

### Route guard by role

```tsx
import { Navigate, Outlet } from 'react-router-dom';

export function RequireRole({ allow }: { allow: Org['role'][] }) {
  const { org } = useOrg();
  if (!org) return <Navigate to="/select-org" replace />;
  if (!allow.includes(org.role)) return <Navigate to="/app/forbidden" replace />;
  return <Outlet />;
}
```

## Performance Optimization

- Prefetch org list at login once; theme per org on switch
- Memoize permission checks per org+role
- CDN cache tenant logos with long TTL (immutable URLs)

## Edge Cases and Error Handling

- **Removed from org mid-session:** 403 on next API call → force org switch modal
- **Last org deleted:** Redirect to create/join org flow
- **Deep link wrong org:** Server 404 or redirect to user's default org
- **localStorage lastOrgId invalid:** Fall back to first membership
- **Custom domain:** Resolve tenant from host header server-side; pass theme in SSR

## Interview Talking Points

- Why `queryClient.clear()` on org switch (cache bleed is a security bug)
- Row-level security vs. app-layer checks (defense in depth)
- Contrast with auth-system guide (identity) — this guide is **tenant boundary + shell UX**
