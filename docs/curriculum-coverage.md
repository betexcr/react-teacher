# Curriculum coverage (interview themes → content IDs)

Maps common React interview themes to ReactTeacher content identifiers (challenge slugs, flashcard deck IDs, pattern slugs, system-design slugs, JS Basics topics).

## 1. JavaScript fundamentals

| Content type | IDs |
|--------------|-----|
| JS Basics topics | 0–19 (types → modules/async intro) |
| Easy challenges | `01-counter-component`, `05-controlled-input-field`, `07-dynamic-list-rendering` |
| Flashcard decks | `fundamentals`, `lifecycle`, `typescript` |

## 2. React core (components, props, state)

| Content type | IDs |
|--------------|-----|
| JS Basics topics | 14–17 (objects, arrays, map/filter, destructuring) |
| Easy challenges | `02-shopping-cart-state`, `04-event-handling`, `09-component-composition`, `11-refactor-to-props` |
| Flashcard decks | `fundamentals`, `hooks` |
| Patterns | `lifting-state-up`, `composition`, `controlled-uncontrolled` |

## 3. Hooks & effects

| Content type | IDs |
|--------------|-----|
| Easy challenges | `03-use-previous-hook`, `08-use-interval-hook`, `10-focus-input-useref`, `19-use-toggle-hook` |
| Medium challenges | `09-use-async-hook`, `10-use-reducer-implementation`, `19-memo-prevent-rerenders` |
| Flashcard decks | `hooks`, `react-19` |
| Patterns | `custom-hooks`, `provider-context` |

## 4. Performance & rendering

| Content type | IDs |
|--------------|-----|
| Easy challenges | `14-performance-monitoring` |
| Medium challenges | `04-memoizing-expensive-calculation`, `19-memo-prevent-rerenders` |
| Hard challenges | `03-prevent-unnecessary-rerenders` |
| Flashcard decks | `performance`, `internals` |
| Patterns | `lazy-suspense`, `optimistic-ui` |

## 5. Forms, validation & UX patterns

| Content type | IDs |
|--------------|-----|
| Easy challenges | `05-controlled-input-field`, `16-simple-theme-switcher`, `18-theme-toggle` |
| Medium challenges | `05-form-validation`, `20-multi-step-form-persistent-state`, `22-reusable-input-component` |
| Flashcard decks | `forms` |
| Patterns | `compound-components`, `headless-ui`, `polymorphic-components` |

## 6. Data fetching & async UI

| Content type | IDs |
|--------------|-----|
| Easy challenges | `06-fetching-data` |
| Medium challenges | `09-use-async-hook`, `15-handling-api-errors`, `16-cache-management` |
| Flashcard decks | `data-fetching` |
| Patterns | `optimistic-ui`, `error-boundaries` |
| System design | `infinite-scroll`, `autocomplete-search` |

## 7. Routing, SSR & meta-frameworks

| Content type | IDs |
|--------------|-----|
| Flashcard decks | `routing`, `server-components`, `nextjs` |
| Patterns | `lazy-suspense`, `portals` |
| System design | `offline-pwa` |

## 8. State management at scale

| Content type | IDs |
|--------------|-----|
| Medium challenges | `06-nested-state-manager`, `07-state-history-manager`, `12-theme-context`, `21-multiple-contexts` |
| Flashcard decks | `architecture`, `design-patterns` |
| Patterns | `provider-context`, `state-reducer`, `container-presentational` |
| System design | `state-store`, `shopping-cart`, `feature-flags` |

## 9. Testing & quality

| Content type | IDs |
|--------------|-----|
| Easy challenges | `14-performance-monitoring` |
| Medium challenges | `14-fallback-ui-class-components` |
| Flashcard decks | `testing`, `accessibility`, `security` |

## 10. Frontend system design (UI-heavy)

| Content type | IDs |
|--------------|-----|
| System design | `data-table`, `form-builder`, `chat-application`, `kanban-board`, `photo-gallery`, `video-player`, `calendar-scheduling`, `notification-center`, `multi-tenant-saas`, `maps-location`, `email-client`, `analytics-dashboard`, `google-docs-clone`, `file-upload`, `auth-system` |
| Patterns | `render-props`, `higher-order-components`, `error-boundaries` |

## 11. Advanced React & architecture interviews

| Content type | IDs |
|--------------|-----|
| Hard / very-hard challenges | `03-prevent-unnecessary-rerenders`, `02-advanced-custom-hooks`, `03-list-virtualization` |
| Flashcard decks | `internals`, `ecosystem`, `tools` |
| Patterns | `higher-order-components`, `render-props`, `compound-components` |

## Suggested study order

1. **JS Basics** guided tutorial → easy challenges (counter, cart, controlled input)
2. **Flashcards**: fundamentals → hooks → data-fetching
3. **Patterns**: custom-hooks → provider-context → error-boundaries
4. **Medium challenges**: useReducer, memoization, form validation
5. **System design**: infinite-scroll → state-store → data-table → chat-application
