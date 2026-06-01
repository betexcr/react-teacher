# Multi-step Form with Branching Logic

**Difficulty:** hard  
**Topics:** forms, state machines

## Learning goals

- Branch steps based on answers
- Validate per branch

## Challenge

Insurance-style wizard: Q1 type (individual/business) branches to different step 2. Business asks company size; individual asks age band. Review step summarizes answers.

## Requirements

1. Branch map in config
2. Cannot skip steps
3. Back preserves branch

## Starter hint

Implement in **your own** React project (Vite, Next.js, etc.) or a sandbox—e.g. `src/practice/hard/02-multi-step-form-branching/`. Reference write-ups in this repo live under `challenges/hard/02-multi-step-form-branching/` (not loaded by the app).

```tsx
const flow = { individual: ['age', 'review'], business: ['size', 'review'] };
```

## Hints

1. Store answers object + currentStepId
2. next() looks up flow[answers.type]

## Acceptance criteria

- [ ] Branches differ
- [ ] Review shows all captured fields

## Resources

- [Managing State](https://react.dev/learn/managing-state)
- [Forms – React DOM](https://react.dev/reference/react-dom/components/form)
- [Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure)
