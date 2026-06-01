# Pagination Implementation

**Difficulty:** medium  
**Topics:** pagination, fetch

## Learning goals

- Client or server pagination
- Accessible page controls

## Challenge

Fetch paginated posts (?_page=&_limit=) from JSONPlaceholder. Show page numbers, prev/next, and total pages.

## Requirements

1. Track page and pageSize
2. Disable prev on page 1
3. Show loading per page

## Starter hint

Implement in **your own** React project (Vite, Next.js, etc.) or a sandbox—e.g. `src/practice/medium/11-pagination-implementation/`. Reference write-ups in this repo live under `challenges/medium/11-pagination-implementation/` (not loaded by the app).

```tsx
const [page, setPage] = useState(1);
```

## Hints

1. API returns X-Total-Count header or fetch total separately
2. useEffect depends on [page]

## Acceptance criteria

- [ ] Page changes refetch
- [ ] Bounds respected

## Resources

- [Fetching data with Effects](https://react.dev/learn/synchronizing-with-effects#fetching-data)
- [useEffect – Reference](https://react.dev/reference/react/useEffect)
- [Managing State](https://react.dev/learn/managing-state)
