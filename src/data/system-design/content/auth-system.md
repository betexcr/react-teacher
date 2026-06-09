# Role-based Authentication System

## Problem Statement

Design authentication and authorization for a multi-tenant React app:

- **AuthN:** Secure login (email/password, OAuth), session or JWT handling, refresh rotation
- **AuthZ:** Role-based access control (RBAC)—roles, permissions, route guards
- **Security:** CSRF protection, XSS-safe token storage, rate limiting, audit logs
- **UX:** Protected routes, loading states, silent refresh, logout everywhere
- **Scale:** Stateless API instances with centralized session store or signed JWTs

## System Architecture

- **Client Layer:** Auth context, protected routes, token refresh interceptor, permission hooks
- **API Layer:** `/auth/login`, `/auth/refresh`, `/auth/logout`, middleware `requirePermission('posts:write')`
- **Data Layer:** Users, roles, permissions tables; refresh token store; Redis session denylist

```text
Login ──► Access JWT (15m) + HttpOnly refresh cookie (7d)
Request ──► Bearer access token ──► Permission middleware ──► Handler
```

## Key Technical Decisions

### 1. JWT vs. server sessions

| JWT access tokens | Server sessions (Redis) |
|-------------------|-------------------------|
| Horizontal scale—no session lookup per request | Simple revocation on logout |
| Hard to revoke instantly | Requires shared session store or sticky sessions |
| Pair with short TTL + refresh token | Strong fit when revoke-now matters |

Hybrid: short JWT + `jti` blocklist in Redis for logout.

### 2. Token storage

- **Access token:** Memory only (module variable) or sessionStorage—never localStorage if XSS risk is high
- **Refresh token:** HttpOnly, Secure, SameSite=Strict cookie

### 3. RBAC model

```ts
type Permission = `${Resource}:${Action}`; // e.g. 'billing:read'
type Role = { id: string; permissions: Permission[] };
```

Users have many roles; effective permissions = union. Cache permissions in JWT claims with short TTL or fetch `/me` on boot.

### 4. Route protection

```tsx
function RequirePermission({ perm, children }: { perm: Permission; children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <Spinner />;
  if (!user?.permissions.includes(perm)) return <Navigate to="/403" replace />;
  return children;
}
```

## Implementation: Core Components

```ts
// API middleware
export function requirePermission(perm: Permission) {
  return (req: Request, res: Response, next: NextFunction) => {
    const claims = verifyAccessToken(req.headers.authorization);
    if (!claims.permissions.includes(perm)) {
      return res.status(403).json({ error: 'FORBIDDEN' });
    }
    next();
  };
}
```

```tsx
// Silent refresh
async function apiFetch(input: RequestInfo, init?: RequestInit) {
  let res = await fetch(input, withAuth(init));
  if (res.status === 401) {
    await refreshAccessToken();
    res = await fetch(input, withAuth(init));
  }
  return res;
}
```

## Performance Optimization

- Cache `/me` in React Query with `staleTime: 5m`
- Permission check is O(1) Set lookup on client
- Minimize JWT payload size—permission ids not full objects
- CDN-cache public routes only

## Edge Cases and Error Handling

- **Expired refresh:** Force re-login; clear in-memory access token
- **Token theft:** Rotate refresh on use; detect reuse and revoke family
- **CSRF on cookie refresh:** Double-submit cookie or SameSite + custom header
- **Role change mid-session:** Short access TTL; refetch `/me` on focus
- **OAuth state:** Validate `state` param; PKCE for public clients
