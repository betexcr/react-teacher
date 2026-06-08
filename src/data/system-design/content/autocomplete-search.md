# Search Autocomplete (Typeahead)

## Problem Statement

Design a search autocomplete component (Google/Notion-style typeahead) that:

- **Responsiveness:** Debounced queries feel instant without hammering the API
- **Correctness:** Stale responses never overwrite fresher results; in-flight requests cancel on new input
- **Accessibility:** Full keyboard navigation (ArrowUp/Down, Enter, Escape) with ARIA combobox/listbox roles
- **UX:** Highlight matching substrings, show recent searches, empty/loading/error states
- **Scale:** Cache popular queries client-side; server supports prefix search with ranking

## System Architecture

- **Client Layer:** Combobox input, debounced fetch hook, result list, recent-search persistence (localStorage), React Query cache
- **API Layer:** `GET /search/suggest?q=` with rate limiting, prefix index (Elasticsearch/Postgres trigram), auth-scoped results
- **Data Layer:** Search index, query analytics, optional Redis cache for hot prefixes

```text
Keystroke ──► debounce 200ms ──► AbortController ──► GET /search/suggest?q=
                                      │
                                      ▼
                              React Query cache + render listbox
```

## Key Technical Decisions

### 1. Debounce vs. throttle

**Debounce** waits until the user pauses typing (e.g. 200ms)—ideal for search APIs where each character would otherwise trigger a request.

**Throttle** fires at fixed intervals—better for scroll/resize, not typeahead.

Skip debounce on Enter or when selecting a recent search (immediate fetch).

### 2. Request cancellation and stale guards

When query changes from `"re"` to `"rea"`, abort the `"re"` fetch via `AbortController`. Also track a **request generation** counter so late responses that slip through still get discarded.

### 3. Caching strategy

- **React Query:** `queryKey: ['search', q]` with `staleTime: 30_000` for repeat queries
- **Recent searches:** localStorage array (max 8), dedupe on insert
- **Server:** Redis cache for top prefixes (TTL 60s)

### 4. Accessibility (WAI-ARIA combobox)

- Input: `role="combobox"`, `aria-expanded`, `aria-controls`, `aria-activedescendant`
- List: `role="listbox"`, options `role="option"` with `aria-selected`
- Arrow keys move active index; Enter selects; Escape closes list

## Implementation: Core Components

### Debounced search hook with abort

```tsx
import { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(id);
  }, [value, delayMs]);
  return debounced;
}

async function fetchSuggestions(q: string, signal: AbortSignal) {
  const res = await fetch(`/api/search/suggest?q=${encodeURIComponent(q)}`, { signal });
  if (!res.ok) throw new Error('Search failed');
  return res.json() as Promise<{ id: string; label: string; href: string }[]>;
}

export function useSearchSuggestions(query: string) {
  const debouncedQuery = useDebouncedValue(query.trim(), 200);
  const abortRef = useRef<AbortController | null>(null);

  return useQuery({
    queryKey: ['search', debouncedQuery],
    queryFn: async () => {
      abortRef.current?.abort();
      abortRef.current = new AbortController();
      return fetchSuggestions(debouncedQuery, abortRef.current.signal);
    },
    enabled: debouncedQuery.length >= 2,
    staleTime: 30_000,
    placeholderData: (prev) => prev,
  });
}
```

### Combobox with keyboard navigation

```tsx
import { useId, useRef, useState } from 'react';
import { useSearchSuggestions } from './useSearchSuggestions';

export function SearchAutocomplete() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const listId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: results = [], isFetching, isError } = useSearchSuggestions(query);
  const showList = open && query.length >= 2;

  function onKeyDown(e: React.KeyboardEvent) {
    if (!showList) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      window.location.href = results[activeIndex].href;
    } else if (e.key === 'Escape') {
      setOpen(false);
      setActiveIndex(-1);
    }
  }

  return (
    <div className="search-combobox">
      <input
        ref={inputRef}
        role="combobox"
        aria-expanded={showList}
        aria-controls={listId}
        aria-activedescendant={activeIndex >= 0 ? `${listId}-opt-${activeIndex}` : undefined}
        aria-autocomplete="list"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
          setActiveIndex(-1);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
        placeholder="Search…"
      />
      {showList && (
        <ul id={listId} role="listbox" className="search-listbox">
          {isFetching && <li aria-live="polite">Searching…</li>}
          {isError && <li role="alert">Search unavailable</li>}
          {!isFetching && results.length === 0 && <li>No results</li>}
          {results.map((item, i) => (
            <li
              key={item.id}
              id={`${listId}-opt-${i}`}
              role="option"
              aria-selected={i === activeIndex}
              onMouseEnter={() => setActiveIndex(i)}
            >
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

### Recent searches (localStorage)

```tsx
const RECENT_KEY = 'search-recent';
const MAX_RECENT = 8;

export function loadRecent(): string[] {
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY) ?? '[]');
  } catch {
    return [];
  }
}

export function pushRecent(term: string) {
  const next = [term, ...loadRecent().filter((t) => t !== term)].slice(0, MAX_RECENT);
  localStorage.setItem(RECENT_KEY, JSON.stringify(next));
}
```

## Performance Optimization

- Debounce 150–300ms; skip for pasted full queries if length > 10
- Abort in-flight requests on query change
- `placeholderData` keeps previous results visible while refetching (no flicker)
- Server: prefix index, limit 8 results, gzip responses
- Prefetch on focus for empty query → show recent only (no API)

## Edge Cases and Error Handling

- **Empty query:** Show recent searches, hide listbox or mark `aria-expanded={false}`
- **Special characters:** EncodeURIComponent on `q`; server sanitize for SQL/injection
- **Race conditions:** AbortController + ignore responses where `q !== debouncedQuery`
- **Offline:** Show cached React Query results + “Offline” badge
- **Click outside:** Close listbox; preserve input value
- **Mobile:** Ensure 44px tap targets; avoid zoom-on-focus (font-size ≥ 16px)

## Interview Talking Points

- Contrast with infinite scroll: typeahead is **small result set**, **low latency**, **keyboard-first**
- Mention Elasticsearch/`tsvector` vs. client-side Fuse.js for small datasets
- Discuss when to move to dedicated search service vs. Postgres `ILIKE`
