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

Create your work in `src/challenges/medium/07-state-history-manager/` or a sandbox file of your choice.

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

- [React docs – Quick Start](https://react.dev/learn)
- [useReducer – React Reference](https://react.dev/reference/react)
