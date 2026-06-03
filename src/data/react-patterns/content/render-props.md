# Render Props

## What it is

A component receives a **function prop** (often `render` or `children`) and calls it with internal state so the parent decides what to render.

Before hooks, this shared logic between components; today custom hooks cover most cases, but render props still appear in libraries and interviews.

## When to use

- Legacy codebases or libraries (React Router’s old `Route render`, Downshift patterns)
- You need to inject state into JSX without context
- A hook would feel awkward because markup must wrap the consumer tightly

## Example

```tsx
import { useEffect, useState, type ReactNode } from 'react';

type MouseTrackerProps = {
  children: (pos: { x: number; y: number }) => ReactNode;
};

function MouseTracker({ children }: MouseTrackerProps) {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return <>{children(pos)}</>;
}

function App() {
  return (
    <MouseTracker>
      {({ x, y }) => (
        <p>
          Cursor: {x}, {y}
        </p>
      )}
    </MouseTracker>
  );
}
```

## Hook equivalent

```tsx
function useMousePosition() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);
  return pos;
}
```

## Tradeoffs

- **Pros:** Flexible rendering, explicit data injection
- **Cons:** Callback nesting (“wrapper hell”); hooks are usually cleaner today
- **Interview angle:** Know render props historically; prefer custom hooks for new code unless API demands JSX injection
