# Cache Management

**Difficulty:** medium  
**Topics:** cache, useRef

## Learning goals

- Cache fetch results by key
- Invalidate on demand

## Challenge

Simple in-memory cache Map for API responses. `useCachedFetch(key, fetcher)` returns cached data if fresh (<60s).

## Requirements

1. TTL 60 seconds
2. invalidate(key) function
3. Share cache module-wide

## Starter hint

Implement in **your own** React project (Vite, Next.js, etc.) or a sandbox—e.g. `src/practice/medium/16-cache-management/`. Reference write-ups in this repo live under `challenges/medium/16-cache-management/` (not loaded by the app).

```tsx
const cache = new Map<string, { data: unknown; ts: number }>();
```

## Hints

1. Check Date.now() - ts < TTL
2. useState trigger after cache miss fetch

## Acceptance criteria

- [ ] Second mount uses cache
- [ ] Invalidate refetches

## Resources

- [Referencing Values with Refs](https://react.dev/learn/referencing-values-with-refs)
- [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
- [Caching with useMemo](https://react.dev/reference/react/useMemo)
