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

Create your work in `src/challenges/medium/25-tic-tac-toe-game/` or a sandbox file of your choice.

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

- [React docs – Quick Start](https://react.dev/learn)
- [state – React Reference](https://react.dev/reference/react)
