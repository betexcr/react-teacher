# Optimistic UI

## What it is

Update the UI **immediately** as if the server request succeeded, then **roll back or reconcile** if it fails. Users perceive instant feedback — critical for likes, toggles, drag-and-drop, and chat send.

## When to use

- Low-risk mutations where retry is acceptable
- Actions users repeat often (favorite, complete todo, reorder list)
- Pair with TanStack Query `onMutate` / `onError` or SWR `mutate` optimistic data

## Example (TanStack Query)

```tsx
import { useMutation, useQueryClient } from '@tanstack/react-query';

type Todo = { id: string; title: string; done: boolean };

function useToggleTodo() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.toggleTodo(id),
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: ['todos'] });
      const previous = qc.getQueryData<Todo[]>(['todos']);
      qc.setQueryData<Todo[]>(['todos'], (old = []) =>
        old.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
      );
      return { previous };
    },
    onError: (_err, _id, ctx) => {
      qc.setQueryData(['todos'], ctx?.previous);
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ['todos'] });
    },
  });
}

function TodoRow({ todo }: { todo: Todo }) {
  const toggle = useToggleTodo();
  return (
    <label>
      <input
        type="checkbox"
        checked={todo.done}
        disabled={toggle.isPending}
        onChange={() => toggle.mutate(todo.id)}
      />
      {todo.title}
    </label>
  );
}
```

## UX details

- Disable or show spinner on the specific row while pending
- Toast on rollback: “Could not save — reverted”
- For high-stakes actions (payments), avoid optimism or show explicit confirm

## Tradeoffs

| Aspect | Details |
|--------|---------|
| Pros | Snappy UX, fewer loading spinners |
| Cons | Rollback can confuse users; conflict resolution gets hard with concurrent edits |
| Interview angle | Contrast with pessimistic UI (wait for server) and true offline-first (CRDTs) |

