# Art Drawing Tool

**Difficulty:** hard  
**Topics:** canvas, refs, events

## Learning goals

- Draw on canvas with mouse/touch
- Color and brush size
- Clear and export PNG

## Challenge

HTML canvas drawing app: pencil tool, color picker, brush size slider, eraser, clear canvas, download PNG. Handle mouse down/move/up and touch events.

## Requirements

1. Smooth strokes
2. Device pixel ratio scaling
3. Export via toDataURL

## Starter hint

Create your work in `src/challenges/hard/05-art-drawing-tool/` or a sandbox file of your choice.

```tsx
const canvasRef = useRef<HTMLCanvasElement>(null);
```

## Hints

1. Scale canvas width/height by devicePixelRatio
2. lineTo on mousemove with lineCap round

## Acceptance criteria

- [ ] Draws smoothly
- [ ] Export downloads file
- [ ] Clear works

## Resources

- [React docs – Quick Start](https://react.dev/learn)
- [canvas – React Reference](https://react.dev/reference/react)
