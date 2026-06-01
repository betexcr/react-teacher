# Connect Four

**Difficulty:** very-hard  
**Topics:** game logic, minimax optional

## Learning goals

- Implement 7x6 board
- Win detection
- Two-player or vs AI

## Challenge

Full Connect Four: drop discs in columns, gravity fills lowest slot, detect 4 in a row (horizontal/vertical/diagonal). Optional: minimax AI opponent.

## Requirements

1. Valid move only in non-full column
2. Highlight winning cells
3. Reset game
4. Turn indicator

## Starter hint

Create your work in `src/challenges/very-hard/01-connect-four/` or a sandbox file of your choice.

```tsx
const ROWS = 6, COLS = 7;
```

## Hints

1. Check win from last move only in 4 directions
2. Board as 2D array or flat with index math

## Acceptance criteria

- [ ] Win/draw detected
- [ ] Illegal moves prevented

## Resources

- [React docs – Quick Start](https://react.dev/learn)
- [game logic – React Reference](https://react.dev/reference/react)
