# Todo List Manager

**Difficulty:** medium  
**Topics:** useState, filtering, CRUD

## Learning goals

- CRUD on a collection
- Filter tabs (all/active/done)

## Challenge

Full todo app: add, toggle complete, delete, filter All/Active/Completed, and show remaining count.

## Requirements

1. Unique id per todo
2. Filters work
3. Footer shows items left
4. Clear completed button

## Starter hint

Create your work in `src/challenges/medium/01-todo-list-manager/` or a sandbox file of your choice.

```tsx
type Todo = { id: string; text: string; done: boolean };
```

## Hints

1. Derive filtered list: todos.filter(...)
2. Toggle with map immutably

## Acceptance criteria

- [ ] All CRUD works
- [ ] Filters correct
- [ ] Clear completed

## Resources

- [React docs – Quick Start](https://react.dev/learn)
- [useState – React Reference](https://react.dev/reference/react)
