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

Create your work in `src/challenges/easy/07-dynamic-list-rendering/` or a sandbox file of your choice.

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

- [React docs – Quick Start](https://react.dev/learn)
- [lists – React Reference](https://react.dev/reference/react)
