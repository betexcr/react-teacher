# useReducer Implementation

**Difficulty:** medium  
**Topics:** useReducer

## Learning goals

- Model complex transitions
- Keep reducers pure

## Challenge

Shopping checkout flow: cart items, step (cart → shipping → payment), and discounts. All transitions via reducer.

## Requirements

1. Actions: ADD_ITEM, SET_STEP, APPLY_COUPON
2. Reducer is pure
3. useReducer with optional init

## Starter hint

Create your work in `src/challenges/medium/10-use-reducer-implementation/` or a sandbox file of your choice.

```tsx
type State = { step: number; items: Item[]; coupon: string | null };
```

## Hints

1. switch(action.type)
2. Keep side effects outside reducer

## Acceptance criteria

- [ ] All transitions via dispatch
- [ ] State consistent

## Resources

- [React docs – Quick Start](https://react.dev/learn)
- [useReducer – React Reference](https://react.dev/reference/react)
