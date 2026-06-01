# List Virtualization: Manual Virtual Scrolling

**Difficulty:** very-hard  
**Topics:** performance, DOM

## Learning goals

- Render only visible rows
- Maintain scroll height
- Handle variable heights optional

## Challenge

Virtual list of 100,000 items (fixed row height 40px). Compute visible start/end from scrollTop. Absolute-position rows inside tall spacer. No react-window—manual implementation.

## Requirements

1. Smooth scroll
2. O(visible) DOM nodes
3. Scroll to index API
4. Overscan 5 rows

## Starter hint

Create your work in `src/challenges/very-hard/03-list-virtualization/` or a sandbox file of your choice.

```tsx
const itemHeight = 40; const totalHeight = items.length * itemHeight;
```

## Hints

1. startIndex = floor(scrollTop / itemHeight)
2. transform translateY(startIndex * itemHeight)

## Acceptance criteria

- [ ] 100k items scroll smoothly
- [ ] DOM node count ~ viewport/rowHeight

## Resources

- [React docs – Quick Start](https://react.dev/learn)
- [performance – React Reference](https://react.dev/reference/react)
