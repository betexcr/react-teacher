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

Create your work in `src/challenges/medium/16-cache-management/` or a sandbox file of your choice.

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

- [React docs – Quick Start](https://react.dev/learn)
- [cache – React Reference](https://react.dev/reference/react)
