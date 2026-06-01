# Solution: Share State with Context

## Approach

Provider stores user + actions object.

## Key concepts

- **Provider pattern**: Centralizes cross-cutting session state.

## Solution code

```tsx
import { createContext, useContext, useState, ReactNode } from 'react';

type User = { id: string; name: string };
type Auth = {
  user: User | null;
  login: (name: string) => void;
  logout: () => void;
};

const AuthContext = createContext<Auth | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const value: Auth = {
    user,
    login: (name) => setUser({ id: '1', name }),
    logout: () => setUser(null),
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth requires AuthProvider');
  return ctx;
}
```

## Walkthrough

login/logout mutate user; consumers re-render when context value changes.

## Common mistakes

- Putting entire app in one context with fast-changing values
- Not memoizing value

## Stretch goals

- Persist session
- JWT decode mock
