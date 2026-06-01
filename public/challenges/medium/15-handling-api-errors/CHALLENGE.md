# Handling API Errors

**Difficulty:** medium  
**Topics:** fetch, errors

## Learning goals

- Map HTTP status to user messages
- Retry transient failures

## Challenge

Data hook that distinguishes 404 vs 500 vs network error. UI shows message and Retry for 5xx.

## Requirements

1. Typed error object
2. Max 3 retries with backoff
3. 404 shows not found UI

## Starter hint

Create your work in `src/challenges/medium/15-handling-api-errors/` or a sandbox file of your choice.

```tsx
class ApiError extends Error { status: number }
```

## Hints

1. if (!res.ok) throw new ApiError(res.status)
2. exponential backoff setTimeout

## Acceptance criteria

- [ ] Statuses mapped
- [ ] Retry limited

## Resources

- [React docs – Quick Start](https://react.dev/learn)
- [fetch – React Reference](https://react.dev/reference/react)
