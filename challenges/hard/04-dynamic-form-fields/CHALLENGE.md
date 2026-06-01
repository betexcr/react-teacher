# Dynamic Form Fields

**Difficulty:** hard  
**Topics:** forms, arrays

## Learning goals

- Add/remove field groups
- Validate dynamically

## Challenge

Form builder: users add "field rows" choosing type (text, number, select). Each row has label + validation rules. Submit outputs JSON schema of the form.

## Requirements

1. Add/remove rows
2. Per-row type selector changes control
3. Validate all rows on submit

## Starter hint

Create your work in `src/challenges/hard/04-dynamic-form-fields/` or a sandbox file of your choice.

```tsx
type FieldRow = { id: string; type: 'text' | 'number' | 'select'; label: string; options?: string };
```

## Hints

1. useFieldArray pattern with map
2. validate(rows) returns errors keyed by id

## Acceptance criteria

- [ ] Dynamic types render correct input
- [ ] Submit blocked if invalid

## Resources

- [React docs – Quick Start](https://react.dev/learn)
- [forms – React Reference](https://react.dev/reference/react)
