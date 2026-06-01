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

Create your work in `src/challenges/easy/11-refactor-to-props/` or a sandbox file of your choice.

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

- [React docs – Quick Start](https://react.dev/learn)
- [props – React Reference](https://react.dev/reference/react)
