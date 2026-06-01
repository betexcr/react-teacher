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

Create your work in `src/challenges/medium/11-pagination-implementation/` or a sandbox file of your choice.

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

- [React docs – Quick Start](https://react.dev/learn)
- [pagination – React Reference](https://react.dev/reference/react)
