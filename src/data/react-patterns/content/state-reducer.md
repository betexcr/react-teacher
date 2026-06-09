# State Reducer

## What it is

Encapsulate complex state transitions in a **reducer** function `(state, action) => nextState`. Components dispatch **actions** instead of scattering ad-hoc `setState` calls. `useReducer` is built in; the same idea powers libraries like React Hook Form’s internal state machine.

## When to use

- Many related fields update together (wizard steps, multi-step checkout)
- Next state depends on elaborate rules (game logic, form validation machine)
- You want logged/testable transitions (`{ type: 'NEXT_STEP' }`)

## Example

```tsx
import { useReducer } from 'react';

type Step = 'cart' | 'shipping' | 'payment' | 'done';

type State = { step: Step; error: string | null };
type Action =
  | { type: 'NEXT' }
  | { type: 'BACK' }
  | { type: 'FAIL'; message: string }
  | { type: 'RESET' };

const order: Step[] = ['cart', 'shipping', 'payment', 'done'];

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'NEXT': {
      const i = order.indexOf(state.step);
      return { step: order[Math.min(i + 1, order.length - 1)], error: null };
    }
    case 'BACK': {
      const i = order.indexOf(state.step);
      return { step: order[Math.max(i - 1, 0)], error: null };
    }
    case 'FAIL':
      return { ...state, error: action.message };
    case 'RESET':
      return { step: 'cart', error: null };
    default:
      return state;
  }
}

function CheckoutWizard() {
  const [state, dispatch] = useReducer(reducer, { step: 'cart', error: null });

  return (
    <div>
      <p>Step: {state.step}</p>
      {state.error && <p role="alert">{state.error}</p>}
      <button onClick={() => dispatch({ type: 'BACK' })}>Back</button>
      <button onClick={() => dispatch({ type: 'NEXT' })}>Next</button>
    </div>
  );
}
```

## Tradeoffs

| Aspect | Details |
|--------|---------|
| Pros | Predictable transitions, easy to unit test reducer in isolation |
| Cons | Boilerplate for trivial `useState` cases; action types need discipline |
| Interview angle | Compare to Redux — same reducer idea, smaller scope with `useReducer` |
