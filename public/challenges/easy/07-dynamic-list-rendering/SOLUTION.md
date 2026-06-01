# Solution: Dynamic List Rendering

## Approach

Array of tag objects with unique ids; render with map and key={id}.

## Key concepts

- **key**: Helps React match items across reorders; must be stable per item.
- **Index as key**: Breaks when list order changes—avoid for mutable lists.

## Solution code

```tsx
import { useState } from 'react';

type Tag = { id: string; label: string };

export function TagEditor() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [input, setInput] = useState('');

  const addTag = () => {
    const label = input.trim();
    if (!label) return;
    const exists = tags.some((t) => t.label.toLowerCase() === label.toLowerCase());
    if (exists) return;
    setTags((t) => [...t, { id: crypto.randomUUID(), label }]);
    setInput('');
  };

  const remove = (id: string) => setTags((t) => t.filter((x) => x.id !== id));

  return (
    <div>
      <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addTag()} />
      <button onClick={addTag}>Add</button>
      <ul>
        {tags.map((tag) => (
          <li key={tag.id}>
            {tag.label}
            <button aria-label={`Remove ${tag.label}`} onClick={() => remove(tag.id)}>×</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## Walkthrough

Each tag gets a UUID. map renders li with key=tag.id. Duplicate check normalizes case.

## Common mistakes

- Using index as key when removing from middle
- Forgetting trim on input

## Stretch goals

- Drag to reorder with @dnd-kit
- Max tag count
