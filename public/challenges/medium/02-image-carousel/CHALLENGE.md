# Image Carousel

**Difficulty:** medium  
**Topics:** state, effects, a11y

## Learning goals

- Cycle slides with prev/next
- Optional autoplay with pause on hover

## Challenge

Carousel with images, indicators, prev/next, keyboard arrows, and autoplay every 5s (pause on hover/focus).

## Requirements

1. Wrap index with modulo
2. aria-live polite for slide title
3. Autoplay cleanup

## Starter hint

Implement in **your own** React project (Vite, Next.js, etc.) or a sandbox—e.g. `src/practice/medium/02-image-carousel/`. Reference write-ups in this repo live under `challenges/medium/02-image-carousel/` (not loaded by the app).

```tsx
const slides = [{ src, alt, title }];
```

## Hints

1. index = (index + 1) % slides.length
2. useEffect interval when autoplay enabled

## Acceptance criteria

- [ ] Navigation works
- [ ] Autoplay pauses
- [ ] Keyboard support

## Resources

- [Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects)
- [useState – Reference](https://react.dev/reference/react/useState)
- [ARIA: carousel pattern](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/)
