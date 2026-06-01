# Component Composition

**Difficulty:** easy  
**Topics:** children, composition

## Learning goals

- Use children and slots pattern
- Avoid prop drilling for layout

## Challenge

Build a `Card` with `Card.Header`, `Card.Body`, and `Card.Footer` using composition (compound components or named exports). Consume it to show an article preview.

## Requirements

1. Flexible layout via children
2. Card applies shared border/padding
3. Subcomponents optional

## Starter hint

Create your work in `src/challenges/easy/09-component-composition/` or a sandbox file of your choice.

```tsx
export function Card({ children }: { children: React.ReactNode }) {}
```

## Hints

1. Attach static properties: Card.Header = function Header...
2. Or pass slots: header={<.../>}

## Acceptance criteria

- [ ] Composable API
- [ ] Article example renders

## Resources

- [React docs – Quick Start](https://react.dev/learn)
- [children – React Reference](https://react.dev/reference/react)
