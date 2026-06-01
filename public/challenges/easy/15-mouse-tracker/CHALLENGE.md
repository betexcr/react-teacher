# MouseTracker

**Difficulty:** easy  
**Topics:** events, useEffect

## Learning goals

- Listen to window events
- Clean up listeners

## Challenge

Track cursor position relative to a box. Show coordinates and whether pointer is inside the box.

## Requirements

1. mousemove on window or container
2. Cleanup on unmount
3. Visual dot follows cursor inside box

## Starter hint

Create your work in `src/challenges/easy/15-mouse-tracker/` or a sandbox file of your choice.

```tsx
const [pos, setPos] = useState({ x: 0, y: 0 });
```

## Hints

1. getBoundingClientRect for relative coords
2. onMouseMove on div vs window

## Acceptance criteria

- [ ] Coords accurate
- [ ] Inside/outside indicator
- [ ] Listener removed

## Resources

- [React docs – Quick Start](https://react.dev/learn)
- [events – React Reference](https://react.dev/reference/react)
