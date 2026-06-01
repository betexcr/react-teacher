# Refactor to Props

**Difficulty:** easy  
**Topics:** props, lifting state

## Learning goals

- Identify hardcoded data
- Make components reusable via props

## Challenge

You are given a monolithic `UserCard` with hardcoded name/avatar/role. Refactor into presentational `UserCard` + container that passes props. Add optional `onFollow` callback.

## Requirements

1. No hardcoded user data inside UserCard
2. Prop types for name, avatarUrl, role
3. onFollow optional

## Starter hint

Implement in **your own** React project (Vite, Next.js, etc.) or a sandbox—e.g. `src/practice/easy/11-refactor-to-props/`. Reference write-ups in this repo live under `challenges/easy/11-refactor-to-props/` (not loaded by the app).

```tsx
// Before: function UserCard() { return <div>Jane Doe</div> }
```

## Hints

1. Split data (container) from UI (presentational)
2. Default props for optional fields

## Acceptance criteria

- [ ] Two users render from array
- [ ] Follow button calls callback

## Resources

- [Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component)
- [Sharing State Between Components](https://react.dev/learn/sharing-state-between-components)
- [Thinking in React](https://react.dev/learn/thinking-in-react)
