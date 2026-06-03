# Higher-Order Components (HOC)

## What it is

A **higher-order component** is a function that takes a component and returns a new component with extra props or behavior. Pattern from pre-hooks React for cross-cutting concerns: auth, logging, data fetching.

## When to use today

- Maintaining legacy code that wraps components with `withRouter`, `connect`, etc.
- Interview questions comparing HOC vs hooks vs composition
- Rare new cases: enhancing third-party class components you cannot rewrite

## Example

```tsx
import type { ComponentType } from 'react';
import { useAuth } from './useAuth';

type WithAuthProps = { user: User };

export function withAuth<P extends WithAuthProps>(Wrapped: ComponentType<P>) {
  function WithAuthComponent(props: Omit<P, keyof WithAuthProps>) {
    const { user, loading } = useAuth();
    if (loading) return <p>Loading…</p>;
    if (!user) return <p>Please sign in</p>;
    return <Wrapped {...(props as P)} user={user} />;
  }
  WithAuthComponent.displayName = `withAuth(${Wrapped.displayName ?? Wrapped.name})`;
  return WithAuthComponent;
}

const Dashboard = withAuth(function Dashboard({ user }: WithAuthProps) {
  return <h1>Hello, {user.name}</h1>;
});
```

## Modern replacement

```tsx
function Dashboard() {
  const { user, loading } = useAuth();
  if (loading) return <p>Loading…</p>;
  if (!user) return <p>Please sign in</p>;
  return <h1>Hello, {user.name}</h1>;
}
```

Or extract `useRequireAuth()` hook shared across routes.

## Tradeoffs

- **Pros:** Reusable enhancement, single place for auth/logging
- **Cons:** Prop name collisions, ref forwarding (`forwardRef`), DevTools nesting, harder TypeScript inference
- **Interview angle:** Hooks won for most HOC use cases; know HOC for reading older codebases
