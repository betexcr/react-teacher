# Temperature Converter

**Difficulty:** easy  
**Topics:** controlled inputs, derived state

## Learning goals

- Keep single source of truth
- Convert C ↔ F bidirectionally

## Challenge

Two linked inputs: Celsius and Fahrenheit. Editing one updates the other using conversion formulas. Handle empty input gracefully.

## Requirements

1. F = C * 9/5 + 32
2. Editing C updates F and vice versa
3. Allow temporary empty field without NaN display

## Starter hint

Create your work in `src/challenges/easy/17-temperature-converter/` or a sandbox file of your choice.

```tsx
// Pick one canonical unit or track "last edited" field
```

## Hints

1. Store { value: string, unit: "C" | "F" } for last edited field
2. Or store celsius number | null and derive fahrenheit

## Acceptance criteria

- [ ] Bidirectional sync
- [ ] No infinite loops
- [ ] Empty allowed

## Resources

- [React docs – Quick Start](https://react.dev/learn)
- [controlled inputs – React Reference](https://react.dev/reference/react)
