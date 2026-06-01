# Complex Drag-and-Drop Kanban Board

## Problem Statement

Implement a Kanban board (columns + cards) with:

- **Interactions:** Drag cards within/between columns, reorder columns
- **Performance:** 60fps drag on boards with 500+ cards (virtualization)
- **Collaboration:** Optional multi-user moves with conflict handling
- **Persistence:** Optimistic updates with server reconciliation
- **Accessibility:** Keyboard moves and screen reader announcements
- **UX:** Auto-scroll while dragging, drop indicators, undo

## System Architecture

- **Client Layer:** `@dnd-kit/core` drag layer, column/card components, virtualized lists per column
- **API Layer:** REST `PATCH /boards/:id` for card moves, WebSocket for live updates (optional)
- **Data Layer:** Board graph stored as columns[] with ordered card ids; moves are transactional

```text
onDragEnd → optimistic local state → PATCH move → ack or rollback
```

## Key Technical Decisions

### 1. dnd-kit vs. HTML5 DnD

**@dnd-kit** provides accessible sensors (pointer, keyboard), collision detection, and custom drag overlays—better than raw HTML5 DnD for complex boards.

### 2. Data model

```ts
type Board = {
  columns: { id: string; title: string; cardIds: string[] }[];
  cards: Record<string, { id: string; title: string }>;
};
```

Store cards in a map for O(1) lookup; columns hold ordered id arrays for easy reorder.

### 3. Optimistic moves

Apply `arrayMove` locally on drag end; send `{ cardId, fromColumn, toColumn, index }` to server. On 409, revert to last known good snapshot.

### 4. Virtualization per column

When a column has 100+ cards, wrap card list in `@tanstack/react-virtual`—drag sensors still work with `DragOverlay` rendering the active card.

## Implementation: Core Components

```tsx
import {
  DndContext,
  DragOverlay,
  closestCorners,
  type DragEndEvent,
} from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';

function onDragEnd(event: DragEndEvent, board: Board, setBoard: (b: Board) => void) {
  const { active, over } = event;
  if (!over) return;

  const next = moveCard(board, String(active.id), String(over.id));
  setBoard(next); // optimistic
  api.moveCard(next.movePayload).catch(() => setBoard(board)); // rollback
}

export function KanbanBoard() {
  const [board, setBoard] = useState<Board>(initial);
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragStart={(e) => setActiveId(String(e.active.id))}
      onDragEnd={(e) => {
        onDragEnd(e, board, setBoard);
        setActiveId(null);
      }}
    >
      <div className="columns">
        {board.columns.map((col) => (
          <Column key={col.id} column={col} cards={col.cardIds.map((id) => board.cards[id])} />
        ))}
      </div>
      <DragOverlay>
        {activeId ? <CardPreview card={board.cards[activeId]} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
```

```ts
function moveCard(board: Board, activeId: string, overId: string): Board {
  // Resolve source/destination column + index from overId (card or column droppable)
  // Return new board with arrayMove on cardIds
}
```

## Performance Optimization

- `React.memo` on `Card`; pass only `card.id` + title
- DragOverlay single floating card—do not re-render all cards during drag
- Auto-scroll with `AutoScrollActivator` from dnd-kit modifiers
- Debounce persistence 100ms for rapid reorders within same column
- Web Worker for WIP limit analytics (optional)

## Edge Cases and Error Handling

- **Drop on self:** No-op
- **Concurrent move:** Server returns latest board revision; client merges or reloads
- **Touch + scroll:** `touch-action` and `PointerSensor` activation constraint (8px distance)
- **Keyboard DnD:** `@dnd-kit` keyboard coordinates; announce “Card X moved to column Y”
- **Empty column:** Minimum height drop zone always visible
