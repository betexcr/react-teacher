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

Create your work in `src/challenges/hard/02-multi-step-form-branching/` or a sandbox file of your choice.

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

- [React docs – Quick Start](https://react.dev/learn)
- [forms – React Reference](https://react.dev/reference/react)
