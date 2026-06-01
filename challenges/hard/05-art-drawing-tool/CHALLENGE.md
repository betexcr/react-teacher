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

Implement in **your own** React project (Vite, Next.js, etc.) or a sandbox—e.g. `src/practice/hard/05-art-drawing-tool/`. Reference write-ups in this repo live under `challenges/hard/05-art-drawing-tool/` (not loaded by the app).

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

- [Manipulating the DOM with Refs](https://react.dev/learn/manipulating-the-dom-with-refs)
- [Canvas API (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [Responding to Events](https://react.dev/learn/responding-to-events)
