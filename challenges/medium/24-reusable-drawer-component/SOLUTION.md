# Solution: Build a Reusable Drawer Component

## Approach

Portal + dialog semantics + effect for focus management.

## Key concepts

- **Portal**: Renders outside parent DOM hierarchy—ideal for modals.

## Solution code

```tsx
import { createPortal } from 'react-dom';
import { useEffect, useRef } from 'react';

export function Drawer({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    ref.current?.focus();
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="overlay" onClick={onClose}>
      <div
        className="drawer"
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        ref={ref}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}
```

## Walkthrough

Portal mounts overlay at body; stopPropagation keeps drawer clicks from closing.

## Common mistakes

- No focus return
- Forgetting aria-modal

## Stretch goals

- Headless UI Dialog
- Animate with CSS transitions
