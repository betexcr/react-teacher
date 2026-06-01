# Custom State Management Implementation

## Problem Statement

Design a **custom client state store** for a large React application that:

- **Scales:** Supports many feature slices without prop drilling
- **Performance:** Minimizes unnecessary re-renders via fine-grained subscriptions
- **DX:** Offers predictable updates, devtools, and TypeScript inference
- **Interop:** Works with React 18+ concurrent features and SSR hydration
- **Testability:** Pure reducers/selectors easy to unit test outside React

## System Architecture

- **Client Layer:** `createStore`, `useStore(selector)`, middleware pipeline, React `Provider` optional for DI
- **API Layer:** Not required for local UI state; optional sync middleware hits REST for persisted slices
- **Data Layer:** localStorage/sessionStorage adapters, IndexedDB for larger snapshots

```text
dispatch(action) → middleware chain → reducer → notify subscribers → React re-render (selected slice only)
```

## Key Technical Decisions

### 1. Single store vs. multiple stores

A **single root store** with namespaced slices (`state.cart`, `state.user`) simplifies devtools and time-travel. Feature teams own slice reducers composed via `combineReducers`.

Alternative: multiple small stores per domain—better isolation but harder cross-slice transactions.

### 2. Subscription model

**useSyncExternalStore** is the React 18+ correct integration: subscribe on mount, read snapshot, unsubscribe on unmount. Selectors compared with `Object.is` prevent rerenders when unrelated slices change.

### 3. Immutability

Reducers return new state objects; structural sharing keeps memory stable. For large trees, **immer** middleware allows mutable syntax with immutable output.

### 4. Middleware

Compose logging, analytics, persistence, and async thunks:

```ts
type Middleware = (store: StoreApi) => (next: Dispatch) => (action: Action) => unknown;
```

## Implementation: Core Components

```ts
type Listener = () => void;

export function createStore<S, A>(
  reducer: (state: S, action: A) => S,
  initialState: S
) {
  let state = initialState;
  const listeners = new Set<Listener>();

  const getState = () => state;

  const dispatch = (action: A) => {
    state = reducer(state, action);
    listeners.forEach((l) => l());
  };

  const subscribe = (listener: Listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  return { getState, dispatch, subscribe };
}
```

```tsx
import { useSyncExternalStore } from 'react';

export function useStore<S, A, T>(
  store: ReturnType<typeof createStore<S, A>>,
  selector: (state: S) => T
) {
  return useSyncExternalStore(
    store.subscribe,
    () => selector(store.getState()),
    () => selector(store.getState()) // SSR snapshot
  );
}
```

```ts
// Slice example
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.item] };
    default:
      return state;
  }
};
```

## Performance Optimization

- Selector memoization (`reselect`) for derived data (totals, filters)
- Split contexts only when needed; prefer `useSyncExternalStore` over giant Context
- Batch notifications with `unstable_batchedUpdates` or single dispatch tick
- Avoid storing non-serializable values (DOM nodes, sockets) in store
- Shallow compare selected output before triggering React updates

## Edge Cases and Error Handling

- **Stale selectors:** Ensure selector is pure; no closed-over mutable refs
- **SSR hydration mismatch:** Serialize only serializable state; rehydrate in `useEffect` after mount
- **Infinite loops:** Middleware must not dispatch same action synchronously without guard
- **Memory:** Unsubscribe listeners when store disposed in tests/storybook
- **Concurrent rendering:** `useSyncExternalStore` handles tearing; do not read store directly in render without it
