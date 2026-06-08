# Calendar & Scheduling

## Problem Statement

Design a calendar scheduling UI (Calendly/Google Calendar-style) that supports:

- **Views:** Month, week, and day layouts with responsive switching
- **Timezones:** Store UTC; display in user's local zone with clear labels for cross-timezone invites
- **Events:** Create/edit/delete, drag-to-reschedule, recurring rules (RRULE)
- **Conflicts:** Detect overlapping events; block double-booking for resource calendars
- **Performance:** Render 500+ events without jank—virtualize or bucket by visible range
- **Accessibility:** Keyboard navigation between days/slots; announce moves to screen readers

## System Architecture

- **Client Layer:** View router, event layout engine, drag sensors, timezone context
- **API Layer:** `GET /events?from=&to=`, `POST/PATCH /events`, conflict check endpoint
- **Data Layer:** Events table (start/end UTC, rrule, timezone, resource_id), materialized occurrences for queries

```text
Visible range (week) ──► GET /events?from&to ──► layout events in grid columns
Drag drop           ──► PATCH /events/:id { start, end } ──► conflict check
```

## Key Technical Decisions

### 1. Store UTC, display local

Persist `startUtc` / `endUtc` in ISO 8601. Render with:

```ts
new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(startUtc));
```

For multi-timezone meetings, show secondary line: “9:00 AM your time · 2:00 PM for guest (London).”

### 2. Recurring events (RRULE)

Store master event with `rrule: "FREQ=WEEKLY;BYDAY=MO,WE"`. Expand occurrences server-side for range queries or use a library like `rrule` client-side for the visible window only.

Editing one instance → `RECURRENCE-ID` exception row; edit series → update master.

### 3. Layout algorithm (week view)

Divide day column into slots (e.g. 30min). For each event:

1. Convert start/end to minutes from midnight
2. Compute `top` and `height` as percentages of day column
3. Assign **columns** for overlaps—greedy lane packing so concurrent events sit side-by-side

### 4. Drag to reschedule

Use `@dnd-kit` or pointer events: on drag end, snap to nearest slot grid, PATCH new start/end, rollback if 409 conflict.

## Implementation: Core Components

### Fetch events for visible range

```tsx
import { useQuery } from '@tanstack/react-query';

type CalendarEvent = {
  id: string;
  title: string;
  startUtc: string;
  endUtc: string;
  color?: string;
};

function startOfWeek(d: Date) {
  const x = new Date(d);
  x.setDate(x.getDate() - x.getDay());
  x.setHours(0, 0, 0, 0);
  return x;
}

function endOfWeek(d: Date) {
  const x = startOfWeek(d);
  x.setDate(x.getDate() + 7);
  return x;
}

export function useWeekEvents(anchor: Date) {
  const from = startOfWeek(anchor).toISOString();
  const to = endOfWeek(anchor).toISOString();

  return useQuery({
    queryKey: ['events', from, to],
    queryFn: async () => {
      const res = await fetch(`/api/events?from=${from}&to=${to}`);
      if (!res.ok) throw new Error('Events fetch failed');
      return res.json() as Promise<CalendarEvent[]>;
    },
    staleTime: 30_000,
  });
}
```

### Week grid layout

```tsx
const DAY_START = 8 * 60; // 8:00 AM in minutes
const DAY_END = 20 * 60;  // 8:00 PM
const DAY_SPAN = DAY_END - DAY_START;

function eventStyle(ev: CalendarEvent) {
  const start = new Date(ev.startUtc);
  const end = new Date(ev.endUtc);
  const startMin = start.getHours() * 60 + start.getMinutes();
  const endMin = end.getHours() * 60 + end.getMinutes();
  const top = ((startMin - DAY_START) / DAY_SPAN) * 100;
  const height = ((endMin - startMin) / DAY_SPAN) * 100;
  return { top: `${top}%`, height: `${Math.max(height, 2)}%` };
}

export function WeekView({ events }: { events: CalendarEvent[] }) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="week-grid" role="grid" aria-label="Week view">
      {days.map((label, dayIndex) => (
        <div key={label} role="gridcell" className="week-day-column">
          <header>{label}</header>
          <div className="week-day-body">
            {events
              .filter((ev) => new Date(ev.startUtc).getDay() === dayIndex)
              .map((ev) => (
                <button
                  key={ev.id}
                  type="button"
                  className="calendar-event"
                  style={eventStyle(ev)}
                  aria-label={`${ev.title}, ${formatTime(ev.startUtc)} to ${formatTime(ev.endUtc)}`}
                >
                  {ev.title}
                </button>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
```

### Conflict detection before save

```tsx
async function createEvent(input: { startUtc: string; endUtc: string; resourceId?: string }) {
  const res = await fetch('/api/events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (res.status === 409) {
    const body = await res.json();
    throw new ConflictError(body.conflicts);
  }
  if (!res.ok) throw new Error('Create failed');
  return res.json();
}

export function EventForm({ onSaved }: { onSaved: () => void }) {
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    try {
      await createEvent({
        startUtc: String(fd.get('startUtc')),
        endUtc: String(fd.get('endUtc')),
      });
      onSaved();
    } catch (err) {
      if (err instanceof ConflictError) {
        setError('This slot overlaps another booking.');
      } else {
        setError('Could not save event.');
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <p role="alert">{error}</p>}
      {/* fields */}
      <button type="submit">Save</button>
    </form>
  );
}
```

## Performance Optimization

- Fetch only visible range—never load entire year client-side
- Memoize `eventStyle` per event id + range
- Virtualize month cells if rendering dense multi-day chips
- Debounce drag PATCH until drop (not every pixel)

## Edge Cases and Error Handling

- **DST jumps:** Use timezone-aware library; test spring forward / fall back weeks
- **All-day events:** Separate flag; span full day row without minute math
- **Cross-midnight events:** Split rendering across two day columns or clamp to day boundary
- **Mobile:** Switch to agenda list view under 768px
- **Leap seconds / TZ database updates:** Server is source of truth for slot availability

## Interview Talking Points

- UTC storage vs. floating local times (floating breaks on DST)
- RRULE expansion strategies (server precompute vs. client on demand)
- Compare calendar drag with Kanban drag (time grid snapping vs. column drops)
