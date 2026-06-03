# Portals

## What it is

`createPortal(children, domNode)` renders React children into a **different DOM node** outside the parent hierarchy. Used for modals, tooltips, dropdowns, and toasts so `overflow: hidden` on ancestors does not clip UI.

## When to use

- Overlays that must sit at `document.body` (z-index stacking)
- Breaking out of transformed/scroll containers
- SSR: ensure target node exists (`typeof document !== 'undefined'`)

## Example

```tsx
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';

function Modal({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  const [root, setRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setRoot(document.body);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open || !root) return null;

  return createPortal(
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    root
  );
}
```

## Focus trap

Production modals also trap focus and restore it on close — use a library (Radix Dialog) or `focus-trap-react` rather than rolling your own in interviews unless asked.

## Tradeoffs

- **Pros:** Correct stacking and clipping behavior; events still bubble in React tree
- **Cons:** Portal target must exist; SSR/hydration needs care; a11y requires extra work
- **Interview angle:** React event delegation still works across portal boundary — synthetic events bubble through React hierarchy, not DOM hierarchy
