import type { FlashcardDeck } from './types';

export const hooksDeck: FlashcardDeck = {
  "id": "hooks",
  "slug": "hooks",
  "title": "Hooks",
  "cards": [
    {
      "question": "What is Rules of Hooks?",
      "explanation": "Only call at top level; only in React functions—ensures consistent fiber hook order.\n\n```tsx\nimport { useState } from 'react';\n\nfunction Counter() {\n  const [n, setN] = useState(0);\n\n  if (n > 99) return <p>Max</p>;\n  // Never: if (n > 0) { const [x] = useState(0); }\n\n  return <button onClick={() => setN((c) => c + 1)}>{n}</button>;\n}\n```\n\nHooks must run in the same order every render—calling them inside loops, conditions, or nested functions breaks the fiber hook list and causes subtle bugs."
    },
    {
      "question": "What is useState?",
      "explanation": "```tsx\nimport { useState } from 'react';\n\nconst [count, setCount] = useState(0);\nsetCount((c) => c + 1);\n\nconst [items] = useState(() => buildInitialItemsFromStorage());\n```\n\nFunctional updates read the latest state when batching multiple setters; lazy init useState(() => …) runs once and avoids expensive work on every render."
    },
    {
      "question": "What is useEffect?",
      "explanation": "Side effects after paint; deps array; cleanup on unmount/re-run.\n\n```tsx\nimport { useEffect } from 'react';\n\nuseEffect(() => {\n  const ctrl = new AbortController();\n  fetch(`/api/user/${userId}`, { signal: ctrl.signal })\n    .then((r) => r.json())\n    .then(setUser);\n  return () => ctrl.abort();\n}, [userId]);\n```\n\nEffects run after paint—use them for subscriptions and fetches, not for synchronous DOM reads that must happen before the browser paints."
    },
    {
      "question": "What is useContext?",
      "explanation": "Subscribe to nearest Provider value; rerenders when value changes.\n\n```tsx\nimport { createContext, useContext } from 'react';\n\nconst ThemeContext = createContext<'light' | 'dark'>('light');\n\nfunction Toolbar() {\n  const theme = useContext(ThemeContext);\n  return <header className={theme === 'dark' ? 'dark' : ''}>…</header>;\n}\n```\n\nAny consumer re-renders when the provider value changes—split contexts or memoize the value object to avoid broadcasting unrelated updates."
    },
    {
      "question": "What is useReducer?",
      "explanation": "(state, action) => newState; good for complex transitions.\n\n```tsx\nimport { useReducer } from 'react';\n\ntype Action = { type: 'inc' } | { type: 'dec' };\n\nfunction reducer(state: number, action: Action) {\n  switch (action.type) {\n    case 'inc': return state + 1;\n    case 'dec': return state - 1;\n    default: return state;\n  }\n}\n\nconst [count, dispatch] = useReducer(reducer, 0);\n```\n\nWhen the next state depends on a typed action, reducers document transitions better than many useState calls—especially for wizards and carts."
    },
    {
      "question": "What is useRef?",
      "explanation": "Mutable .current; DOM refs; values that should not trigger render.\n\n```tsx\nimport { useRef } from 'react';\n\nconst inputRef = useRef<HTMLInputElement>(null);\nconst renders = useRef(0);\nrenders.current += 1;\n\nreturn <input ref={inputRef} onFocus={() => inputRef.current?.select()} />;\n```\n\nUpdating ref.current does not trigger a re-render—ideal for DOM nodes, timers, and mutable values that should survive renders without appearing in state."
    },
    {
      "question": "What is useMemo / useCallback?",
      "explanation": "Cache values/functions when deps stable—use after profiling or to stabilize props for memo children; React Compiler can reduce manual memo.\n\n```tsx\nimport { useCallback, useMemo } from 'react';\n\nconst sorted = useMemo(() => [...items].sort(compare), [items]);\nconst onSelect = useCallback((id: string) => setSelected(id), []);\n\nreturn <MemoRow items={sorted} onSelect={onSelect} />;\n```\n\nStabilize referential equality for memoized children; avoid sprinkling memo everywhere—profile first, and let React Compiler reduce manual memo where adopted."
    },
    {
      "question": "What is useImperativeHandle?",
      "explanation": "Customizes the ref value a parent receives; works with ref-as-prop in React 19 or forwardRef for older patterns.\n\n```tsx\nimport React from 'react';\nimport type { Ref } from 'react';\n\nfunction TextInput({ ref }: { ref?: React.Ref<{ focus: () => void }> }) {\n  const inner = useRef<HTMLInputElement>(null);\n\n  useImperativeHandle(ref, () => ({\n    focus() {\n      inner.current?.focus();\n    },\n  }));\n\n  return <input ref={inner} />;\n}\n```\n\nExpose a narrow imperative API (focus, scrollIntoView) to parents while keeping implementation private—works with ref-as-prop in React 19 or forwardRef for older trees."
    },
    {
      "question": "What is useLayoutEffect?",
      "explanation": "Sync after DOM update before browser paint—measurements.\n\n```tsx\nimport { useLayoutEffect, useRef, useState } from 'react';\n\nconst ref = useRef<HTMLDivElement>(null);\nconst [height, setHeight] = useState(0);\n\nuseLayoutEffect(() => {\n  setHeight(ref.current?.getBoundingClientRect().height ?? 0);\n}, [items]);\n\nreturn <div ref={ref} style={{ minHeight: height }}>{children}</div>;\n```\n\nRuns synchronously after DOM updates and before paint—use for measurements and layout that must complete before users see a flash of wrong layout."
    },
    {
      "question": "What is useId?",
      "explanation": "Stable unique IDs for accessibility associations SSR-safe.\n\n```tsx\nimport { useId } from 'react';\n\nconst id = useId();\n\nreturn (\n  <>\n    <label htmlFor={id}>Email</label>\n    <input id={id} name=\"email\" type=\"email\" />\n  </>\n);\n```\n\nGenerates stable ids across SSR and client hydration—pair label htmlFor with input id without collisions when multiple instances mount."
    },
    {
      "question": "What is useDebugValue?",
      "explanation": "Label custom hooks in DevTools.\n\n```tsx\nimport { useDebugValue, useSyncExternalStore } from 'react';\n\nfunction useOnlineStatus() {\n  const online = useSyncExternalStore(subscribeOnline, () => navigator.onLine);\n  useDebugValue(online ? 'Online' : 'Offline');\n  return online;\n}\n```\n\nLabels custom hook state in React DevTools—only runs in development and should stay cheap because it executes on every render of consuming components."
    },
    {
      "question": "What is Custom hooks?",
      "explanation": "Extract stateful logic; name with use; can compose other hooks.\n\n```tsx\nimport { useCallback, useState } from 'react';\n\nfunction useToggle(initial = false) {\n  const [on, setOn] = useState(initial);\n  const toggle = useCallback(() => setOn((v) => !v), []);\n  const set = useCallback((v: boolean) => setOn(v), []);\n  return { on, toggle, set };\n}\n```\n\nExtract stateful logic into use* functions so components stay presentational—compose smaller hooks instead of one mega-hook that knows every feature."
    },
    {
      "question": "What is useTransition?",
      "explanation": "Mark non-urgent updates; isPending flag.\n\n```tsx\nimport { useState, useTransition } from 'react';\n\nconst [tab, setTab] = useState('home');\nconst [isPending, startTransition] = useTransition();\n\nfunction selectTab(next: string) {\n  startTransition(() => setTab(next));\n}\n\nreturn (\n  <>\n    <TabBar active={tab} onSelect={selectTab} />\n    {isPending && <Spinner />}\n    <TabPanel id={tab} />\n  </>\n);\n```\n\nMark non-urgent updates so typing stays responsive while heavy tab switches or filters re-render in the background with isPending feedback."
    },
    {
      "question": "What is useDeferredValue?",
      "explanation": "Defer lagging behind urgent state for perf.\n\n```tsx\nimport { useDeferredValue, useMemo, useState } from 'react';\n\nconst [query, setQuery] = useState('');\nconst deferredQuery = useDeferredValue(query);\nconst filtered = useMemo(\n  () => filterProducts(products, deferredQuery),\n  [products, deferredQuery]\n);\n\nreturn (\n  <>\n    <input value={query} onChange={(e) => setQuery(e.target.value)} />\n    <List items={filtered} stale={deferredQuery !== query} />\n  </>\n);\n```\n\nKeeps the UI responsive by letting expensive derived UI lag one frame behind fast-changing input—pair with memoized filtering of large lists."
    }
  ]
};
