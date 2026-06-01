# State History Manager

**Difficulty:** medium  
**Topics:** useReducer, undo

## Learning goals

- Implement undo/redo stack
- Separate present from past/future

## Challenge

Canvas-like editor storing shapes array. Support Undo, Redo, and new actions that push history.

## Requirements

1. Undo restores previous state
2. Redo only after undo
3. New action clears redo stack

## Starter hint

Implement in **your own** React project (Vite, Next.js, etc.) or a sandbox—e.g. `src/practice/medium/07-state-history-manager/`. Reference write-ups in this repo live under `challenges/medium/07-state-history-manager/` (not loaded by the app).

```tsx
type HistoryState<T> = { past: T[]; present: T; future: T[] };
```

## Hints

1. Reducer with UNDO, REDO, SET actions
2. On SET: past.push(present), present=new, future=[]

## Acceptance criteria

- [ ] Undo/redo correct
- [ ] Branching history cleared

## Resources

- [Extracting State Logic into a Reducer](https://react.dev/learn/extracting-state-logic-into-a-reducer)
- [useReducer – Reference](https://react.dev/reference/react/useReducer)
- [Managing State](https://react.dev/learn/managing-state)
