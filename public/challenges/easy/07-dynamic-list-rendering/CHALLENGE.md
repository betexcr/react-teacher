# Dynamic List Rendering

**Difficulty:** easy  
**Topics:** lists, keys

## Learning goals

- Render arrays with map
- Choose stable keys

## Challenge

Build a tag editor: input + Add button creates tags; each tag has remove; list renders dynamically. Animate new tags optionally.

## Requirements

1. Use map to render
2. Keys must be stable (id, not index)
3. No duplicate tags (case-insensitive)

## Starter hint

Implement in **your own** React project (Vite, Next.js, etc.) or a sandbox—e.g. `src/practice/easy/07-dynamic-list-rendering/`. Reference write-ups in this repo live under `challenges/easy/07-dynamic-list-rendering/` (not loaded by the app).

```tsx
type Tag = { id: string; label: string };
```

## Hints

1. crypto.randomUUID() or incremental id for keys
2. Filter duplicates before setState

## Acceptance criteria

- [ ] Add/remove work
- [ ] Stable keys
- [ ] Duplicate prevention

## Resources

- [Rendering Lists](https://react.dev/learn/rendering-lists)
- [Keys in lists](https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key)
- [Conditional rendering](https://react.dev/learn/conditional-rendering)
