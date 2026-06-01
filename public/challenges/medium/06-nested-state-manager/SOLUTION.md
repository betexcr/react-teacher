# Solution: Nested State Manager

## Approach

Spread each ancestor object when changing a nested field.

## Key concepts

- **Structural sharing**: New objects only along the path to the changed leaf.

## Solution code

```tsx
import { useState } from 'react';

type User = {
  profile: { name: string; avatar: string };
  preferences: { notifications: { email: boolean; push: boolean } };
};

export function NestedSettings() {
  const [user, setUser] = useState<User>({
    profile: { name: 'Ada', avatar: '' },
    preferences: { notifications: { email: true, push: false } },
  });

  const setName = (name: string) =>
    setUser((u) => ({ ...u, profile: { ...u.profile, name } }));

  const setEmailNotif = (email: boolean) =>
    setUser((u) => ({
      ...u,
      preferences: {
        ...u.preferences,
        notifications: { ...u.preferences.notifications, email },
      },
    }));

  return (
    <div>
      <input value={user.profile.name} onChange={(e) => setName(e.target.value)} />
      <label>
        <input type="checkbox" checked={user.preferences.notifications.email} onChange={(e) => setEmailNotif(e.target.checked)} />
        Email notifications
      </label>
    </div>
  );
}
```

## Walkthrough

Each setter copies every object from root to the changed property.

## Common mistakes

- user.profile.name = x directly
- Shallow copy missing nested level

## Stretch goals

- use-immer
- Normalized store
