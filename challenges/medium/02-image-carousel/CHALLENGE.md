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

Create your work in `src/challenges/medium/02-image-carousel/` or a sandbox file of your choice.

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

- [React docs – Quick Start](https://react.dev/learn)
- [state – React Reference](https://react.dev/reference/react)
