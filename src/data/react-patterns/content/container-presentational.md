# Container / Presentational

## What it is

Split components into:

- **Container (smart):** fetches data, owns state, wires event handlers
- **Presentational (dumb):** pure UI from props; no data fetching or global side effects

Data flows down; events flow up via callbacks.

## When to use

- Screens mixing network logic with large JSX trees
- You want to test UI in Storybook without mocking APIs
- Same presentational view might be fed by different data sources

## Example

```tsx
import { useQuery } from '@tanstack/react-query';

function UserPageContainer() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['user'],
    queryFn: fetchCurrentUser,
  });

  return (
    <UserProfileView
      user={data}
      loading={isLoading}
      error={isError ? 'Could not load profile' : null}
      onRetry={refetch}
    />
  );
}

function UserProfileView({
  user,
  loading,
  error,
  onRetry,
}: {
  user?: User;
  loading: boolean;
  error: string | null;
  onRetry: () => void;
}) {
  if (loading) return <Skeleton />;
  if (error) return <ErrorPanel message={error} onRetry={onRetry} />;
  return (
    <article>
      <h1>{user!.name}</h1>
      <p>{user!.email}</p>
    </article>
  );
}
```

## Modern twist

Custom hooks often absorb the “container” role (`useUser()`), leaving a single component file that calls the hook and renders UI. The **separation of concerns** remains; only the file split changes.

## Tradeoffs

| Aspect | Details |
|--------|---------|
| Pros | Testable UI, clear data boundaries, reusable views |
| Cons | Extra files/boilerplate; strict splits can fight colocation preferences |
| Interview angle | Mention hooks as the modern container layer without abandoning the idea |
