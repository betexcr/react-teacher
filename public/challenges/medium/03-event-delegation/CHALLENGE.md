# Event Delegation

**Difficulty:** medium  
**Topics:** events, DOM

## Learning goals

- Handle events on parent for dynamic children
- Use data attributes to identify targets

## Challenge

Render a dynamic list of buttons (add/remove). Use **one** click handler on `<ul>` to detect which item was clicked via `event.target` and `data-id`.

## Requirements

1. Single listener on list container
2. Works for newly added items without rebinding
3. Delete vs select actions

## Starter hint

Create your work in `src/challenges/medium/03-event-delegation/` or a sandbox file of your choice.

```tsx
<ul onClick={handleListClick}>
```

## Hints

1. if (!(e.target instanceof HTMLElement)) return
2. const id = target.closest("[data-id]")?.getAttribute("data-id")

## Acceptance criteria

- [ ] One delegated handler
- [ ] Dynamic items work

## Resources

- [React docs – Quick Start](https://react.dev/learn)
- [events – React Reference](https://react.dev/reference/react)
