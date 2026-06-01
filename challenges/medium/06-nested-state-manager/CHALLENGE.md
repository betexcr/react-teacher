# Nested State Manager

**Difficulty:** medium  
**Topics:** immutable updates, nested objects

## Learning goals

- Update deeply nested state safely
- Use spread at each level

## Challenge

Settings panel: `user.profile.name`, `user.profile.avatar`, `user.preferences.notifications.email`. Update one leaf without mutating siblings.

## Requirements

1. Immutable updates at arbitrary depth
2. Helper updateProfile(path, value) optional
3. UI reflects nested structure

## Starter hint

Create your work in `src/challenges/medium/06-nested-state-manager/` or a sandbox file of your choice.

```tsx
const [user, setUser] = useState({ profile: { name: '', avatar: '' }, preferences: { notifications: { email: true } } });
```

## Hints

1. setUser(u => ({ ...u, profile: { ...u.profile, name: v } }))
2. Consider useImmer for ergonomics

## Acceptance criteria

- [ ] Leaf updates isolated
- [ ] No mutation warnings

## Resources

- [React docs – Quick Start](https://react.dev/learn)
- [immutable updates – React Reference](https://react.dev/reference/react)
