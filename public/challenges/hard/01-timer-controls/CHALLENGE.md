# Timer Controls

**Difficulty:** hard  
**Topics:** useReducer, effects, refs

## Learning goals

- Pause/resume/reset timer
- Accurate elapsed time with drift handling

## Challenge

Build a stopwatch with start, pause, reset, and lap recording. Elapsed time must stay accurate when pausing (do not keep interval running while paused).

## Requirements

1. Lap list with timestamps
2. Pause freezes elapsed
3. Reset clears laps
4. Display mm:ss.cs

## Starter hint

Create your work in `src/challenges/hard/01-timer-controls/` or a sandbox file of your choice.

```tsx
type State = { running: boolean; elapsed: number; laps: number[] };
```

## Hints

1. Store startTimestamp and accumulated offset
2. requestAnimationFrame or 10ms interval only when running

## Acceptance criteria

- [ ] Pause accurate
- [ ] Laps recorded
- [ ] Reset works

## Resources

- [React docs – Quick Start](https://react.dev/learn)
- [useReducer – React Reference](https://react.dev/reference/react)
