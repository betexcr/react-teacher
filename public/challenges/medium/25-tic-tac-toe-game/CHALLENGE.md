# Build a Tic-Tac-Toe Game

**Difficulty:** medium  
**Topics:** state, game logic

## Learning goals

- Immutable board updates
- Detect win/draw

## Challenge

Classic tic-tac-toe with move history list and jump to any past move (time travel optional).

## Requirements

1. 3x3 board
2. Alternate X/O
3. Highlight winning line
4. Status message

## Starter hint

Implement in **your own** React project (Vite, Next.js, etc.) or a sandbox—e.g. `src/practice/medium/25-tic-tac-toe-game/`. Reference write-ups in this repo live under `challenges/medium/25-tic-tac-toe-game/` (not loaded by the app).

```tsx
function calculateWinner(squares: (string|null)[])
```

## Hints

1. Copy squares array on each move
2. History: array of boards

## Acceptance criteria

- [ ] Win detected
- [ ] Cannot play after win
- [ ] History jump works

## Resources

- [Tutorial: Tic-Tac-Toe](https://react.dev/learn/tutorial-tic-tac-toe)
- [Managing State](https://react.dev/learn/managing-state)
- [Immutable board updates](https://react.dev/learn/tutorial-tic-tac-toe#checking-for-a-winner)
