# RadioGroup Component

**Difficulty:** medium  
**Topics:** a11y, composition

## Learning goals

- Build accessible radio group
- Manage roving focus optional

## Challenge

Controlled RadioGroup with options `{ value, label, disabled }`. Only one selected. Arrow keys move selection.

## Requirements

1. role="radiogroup"
2. Each option role="radio" aria-checked
3. Controlled value from parent

## Starter hint

Create your work in `src/challenges/medium/13-radiogroup-component/` or a sandbox file of your choice.

```tsx
type Option = { value: string; label: string; disabled?: boolean };
```

## Hints

1. onKeyDown ArrowUp/Down changes value
2. Click sets value

## Acceptance criteria

- [ ] Keyboard navigation
- [ ] ARIA correct

## Resources

- [React docs – Quick Start](https://react.dev/learn)
- [a11y – React Reference](https://react.dev/reference/react)
