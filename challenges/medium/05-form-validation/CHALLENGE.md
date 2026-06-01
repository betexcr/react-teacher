# Form Validation

**Difficulty:** medium  
**Topics:** forms, validation

## Learning goals

- Validate on blur and submit
- Show field-level errors

## Challenge

Registration form: username (3+ chars), email, password (8+ with number), confirm password match. Disable submit until valid.

## Requirements

1. Touched state per field
2. Errors only after blur or submit
3. Confirm password match rule

## Starter hint

Create your work in `src/challenges/medium/05-form-validation/` or a sandbox file of your choice.

```tsx
type Errors = Partial<Record<'username' | 'email' | 'password' | 'confirm', string>>;
```

## Hints

1. validate(values) returns errors object
2. onBlur sets touched[field]=true

## Acceptance criteria

- [ ] Errors accurate
- [ ] Submit blocked when invalid

## Resources

- [React docs – Quick Start](https://react.dev/learn)
- [forms – React Reference](https://react.dev/reference/react)
