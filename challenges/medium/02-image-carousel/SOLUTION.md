# Solution: Image Carousel

## Approach

Active index state; effects for timer; keydown listener.

## Key concepts

- **Modulo wrap**: Enables infinite carousel without duplicate slides.

## Solution code

```tsx
import { useEffect, useState } from 'react';

const slides = [
  { src: '/1.jpg', alt: 'Mountains', title: 'Peaks' },
  { src: '/2.jpg', alt: 'Ocean', title: 'Sea' },
];

export function Carousel() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = () => setI((n) => (n + 1) % slides.length);
  const prev = () => setI((n) => (n - 1 + slides.length) % slides.length);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [paused]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const slide = slides[i];
  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <img src={slide.src} alt={slide.alt} />
      <p aria-live="polite">{slide.title}</p>
      <button onClick={prev}>Prev</button>
      <button onClick={next}>Next</button>
      {slides.map((_, idx) => (
        <button key={idx} aria-label={`Go to slide ${idx + 1}`} onClick={() => setI(idx)} />
      ))}
    </div>
  );
}
```

## Walkthrough

Index wraps with modulo; autoplay effect depends on paused flag.

## Common mistakes

- Autoplay without cleanup
- Missing alt text

## Stretch goals

- Touch swipe
- Crossfade transition
