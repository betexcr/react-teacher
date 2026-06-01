# Build a Reusable Button Component

**Difficulty:** medium  
**Topics:** components, polymorphism

## Learning goals

- Variants and loading state
- Polymorphic `as` prop optional

## Challenge

Button supports variants primary/ghost/danger, sizes sm/md/lg, loading spinner disabling interaction, and icon slots.

## Requirements

1. aria-busy when loading
2. disabled when loading
3. Variant styles via data attributes or classes

## Starter hint

Create your work in `src/challenges/medium/23-reusable-button-component/` or a sandbox file of your choice.

```tsx
type ButtonProps = { variant?: 'primary' | 'ghost'; loading?: boolean };
```

## Hints

1. className joins variant classes
2. Spinner with aria-hidden

## Acceptance criteria

- [ ] Loading prevents double submit
- [ ] Variants distinct

## Resources

- [React docs – Quick Start](https://react.dev/learn)
- [components – React Reference](https://react.dev/reference/react)
