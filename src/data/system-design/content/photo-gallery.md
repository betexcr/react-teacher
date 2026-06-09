# Photo Gallery / Media Grid

## Problem Statement

Design an Instagram/Pinterest-style photo gallery for a React app that:

- **Grid:** Responsive masonry or uniform grid with consistent gaps
- **Loading:** Lazy-load images via Intersection Observer; blur-up LQIP placeholders
- **Lightbox:** Full-screen viewer with keyboard nav, focus trap, swipe on mobile
- **Infinite scroll:** Cursor-paginated feed of media items
- **Performance:** Avoid layout thrash; decode images off main thread where possible
- **Accessibility:** Alt text, reduced motion respect, Escape closes lightbox

## System Architecture

- **Client Layer:** Media grid, lazy image component, lightbox portal, infinite query
- **API Layer:** `GET /media?cursor=` returning urls + dimensions + blur hash
- **Data Layer:** CDN for variants (thumb, medium, full), metadata in DB

```text
Scroll ──► IntersectionObserver ──► load thumb ──► swap to medium on decode
Click  ──► Portal lightbox ──► preload full size ──► focus trap
```

## Key Technical Decisions

### 1. Masonry vs. uniform grid

| Uniform grid (CSS grid) | Masonry layout |
|-------------------------|----------------|
| Fixed aspect ratio cells | Variable aspect ratios (Pinterest-style) |
| Simple—no layout shift if height known | `columns: 3` CSS or `react-masonry-css` |
| Best when API returns `width` / `height` | Best for mixed photo dimensions |

Prefer **known aspect ratio** from API (`width`, `height`) to reserve space: `padding-bottom: (h/w)*100%`.

### 2. LQIP / blur placeholder

Server returns `blurHash` or tiny base64 thumb. Show blurred background until full image `onLoad`—then crossfade. Reduces perceived load time.

### 3. Lazy loading

Native `loading="lazy"` works for below-fold images. For infinite scroll + fine control, **Intersection Observer** with `rootMargin: '200px'` prefetches before visible.

### 4. Lightbox as portal

Render lightbox in `createPortal(..., document.body)` to escape `overflow: hidden` ancestors. Trap focus, lock body scroll, handle Escape/Arrow keys.

## Implementation: Core Components

### Lazy image with blur-up

```tsx
import { useEffect, useRef, useState } from 'react';

type MediaItem = {
  id: string;
  thumbUrl: string;
  fullUrl: string;
  blurDataUrl?: string;
  width: number;
  height: number;
  alt: string;
};

export function LazyMediaTile({ item, onOpen }: { item: MediaItem; onOpen: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { rootMargin: '200px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const aspect = (item.height / item.width) * 100;

  return (
    <figure
      ref={ref}
      className="media-tile"
      style={{ paddingBottom: `${aspect}%` }}
    >
      {item.blurDataUrl && !loaded && (
        <img src={item.blurDataUrl} alt="" aria-hidden className="media-blur" />
      )}
      {visible && (
        <button type="button" className="media-hit" onClick={onOpen} aria-label={item.alt}>
          <img
            src={item.thumbUrl}
            alt={item.alt}
            onLoad={() => setLoaded(true)}
            className={loaded ? 'media-loaded' : 'media-loading'}
          />
        </button>
      )}
    </figure>
  );
}
```

### Infinite media grid

```tsx
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

async function fetchMediaPage({ pageParam }: { pageParam?: string }) {
  const qs = pageParam ? `?cursor=${encodeURIComponent(pageParam)}` : '';
  const res = await fetch(`/api/media${qs}`);
  return res.json() as Promise<{ items: MediaItem[]; nextCursor: string | null }>;
}

export function MediaGallery() {
  const [lightboxId, setLightboxId] = useState<string | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['media'],
    queryFn: fetchMediaPage,
    getNextPageParam: (last) => last.nextCursor ?? undefined,
    initialPageParam: undefined as string | undefined,
  });

  const items = data?.pages.flatMap((p) => p.items) ?? [];

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !hasNextPage) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && fetchNextPage());
    io.observe(el);
    return () => io.disconnect();
  }, [hasNextPage, fetchNextPage]);

  return (
    <>
      <div className="media-grid">
        {items.map((item) => (
          <LazyMediaTile key={item.id} item={item} onOpen={() => setLightboxId(item.id)} />
        ))}
      </div>
      <div ref={sentinelRef} aria-hidden />
      {isFetchingNextPage && <p>Loading more…</p>}
      {lightboxId && (
        <Lightbox
          item={items.find((i) => i.id === lightboxId)!}
          onClose={() => setLightboxId(null)}
        />
      )}
    </>
  );
}
```

### Lightbox with focus trap

```tsx
import { createPortal } from 'react-dom';
import { useEffect } from 'react';

export function Lightbox({ item, onClose }: { item: MediaItem; onClose: () => void }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return createPortal(
    <div className="lightbox-backdrop" role="dialog" aria-modal="true" aria-label={item.alt}>
      <button type="button" className="lightbox-close" onClick={onClose}>
        Close
      </button>
      <img src={item.fullUrl} alt={item.alt} className="lightbox-image" />
    </div>,
    document.body
  );
}
```

## Performance Optimization

- Serve WebP/AVIF with `<picture>` fallback
- `decoding="async"` on thumbnails
- Limit concurrent full-size preloads in lightbox (current + adjacent only)
- CDN cache-control long TTL on immutable asset URLs with content hash
- `content-visibility: auto` on off-screen grid rows (where supported)

## Edge Cases and Error Handling

- **Broken image:** `onError` → placeholder icon + retry
- **Very tall images:** Cap max height in lightbox with `object-fit: contain`
- **Reduced motion:** Skip crossfade if `prefers-reduced-motion: reduce`
- **Keyboard:** Left/right arrows navigate lightbox sequence
- **Share deep link:** `/photos/:id` opens gallery with lightbox on mount

## Interview Talking Points

- Contrast with video-player guide (progressive download vs. static images)
- CLS prevention via aspect-ratio boxes
- When to use native `loading="lazy"` vs. Intersection Observer
