import type { FlashcardDeck } from './types';

export const reactInternalsDeck: FlashcardDeck = {
  "id": "react-internals",
  "slug": "internals",
  "title": "React Internals",
  "cards": [
    {
      "question": "What is Fiber architecture?",
      "explanation": "Unit of work per component; enables incremental rendering and priority.\n\n```tsx\nimport React from 'react';\n\n// Conceptual: fiber holds type, props, child, sibling, return pointers\nfunction App() {\n  return <Layout><Page /></Layout>;\n}\n```\n\nEach component instance is a fiber node—React can pause, resume, and prioritize work units instead of blocking the main thread on large trees."
    },
    {
      "question": "What is Reconciliation algorithm?",
      "explanation": "Compares trees; same type updates props; different type tears down subtree.\n\n```tsx\nimport React from 'react';\n\n// <div key=\"a\" /> → <span key=\"a\" /> remounts\n// <Row key={id} /> → <Row key={id} /> updates props\n```\n\nSame element type at a position updates props in place; different types tear down the subtree—why changing component from div to span resets state."
    },
    {
      "question": "What is Commit phase?",
      "explanation": "Apply DOM updates after render phase completes—layout effects, then paint, then passive effects.\n\n```tsx\nimport { useEffect, useLayoutEffect } from 'react';\n\n// Order: render → commit DOM → useLayoutEffect → paint → useEffect\n```\n\nAfter render, commit applies DOM mutations, runs useLayoutEffect, paints, then passive useEffect—errors in layout effects block paint."
    },
    {
      "question": "What is Lanes / priorities?",
      "explanation": "React 18+ schedules urgent (input) vs transition updates differently.\n\n```tsx\nstartTransition(() => setFiltered(hugeComputation(query)));\n```\n\nReact 18 schedules urgent updates (typing) in higher-priority lanes than transitions—startTransition lowers priority so input stays snappy."
    },
    {
      "question": "What is Double buffering?",
      "explanation": "Work-in-progress tree swapped on commit; current vs alternate fiber.\n\n```tsx\n// current ↔ alternate fiber pointers swap at commit\n```\n\nWork-in-progress fiber tree swaps with current on commit—enables interrupted renders without mutating the live tree users see mid-frame."
    },
    {
      "question": "What is Hooks linked list?",
      "explanation": "Hooks stored on fiber in call order—why hooks rules exist.\n\n```tsx\nimport { useContext, useEffect, useState } from 'react';\n\nfunction Example() {\n  const [a] = useState(0);\n  useEffect(() => {}, []);\n  const theme = useContext(ThemeContext);\n  return null;\n}\n```\n\nHooks are stored on the fiber in call order—conditional hooks shift indices and corrupt state, which is why the rules of hooks exist."
    },
    {
      "question": "What is Synthetic events legacy?",
      "explanation": "React 17+ attaches to root; pooling removed.\n\n```tsx\ndocument.addEventListener('click', onDocClick);\n// vs React onClick on elements\n```\n\nReact 17+ delegates to the root container, not document—event pooling was removed; native listeners on DOM nodes still fire separately."
    },
    {
      "question": "What is Batching?",
      "explanation": "Multiple setStates in event/async batched into one render (React 18 broad).\n\n```tsx\nfunction onClick() {\n  setA(1);\n  setB(2);\n  // One re-render\n}\n```\n\nMultiple setStates in the same event or many async contexts batch to one render in React 18+—do not read DOM expecting intermediate renders."
    },
    {
      "question": "What is Suspense mechanism?",
      "explanation": "Throws thenable; nearest boundary shows fallback until resolved.\n\n```tsx\nimport { Suspense } from 'react';\n\n<Suspense fallback={<Spinner />}>\n  <ChildThatSuspends />\n</Suspense>\n```\n\nWhen a child throws a thenable, React walks up to the nearest Suspense boundary and shows fallback until the promise resolves."
    },
    {
      "question": "What is Concurrent rendering?",
      "explanation": "Render can pause, resume, abandon—for responsiveness.\n\n```tsx\nimport { useTransition } from 'react';\n\nconst [isPending, startTransition] = useTransition();\nstartTransition(() => setTab('heavy'));\n```\n\nRender work can be interrupted for higher-priority updates—enables transitions and keeps input responsive during expensive trees."
    },
    {
      "question": "What is useSyncExternalStore?",
      "explanation": "Subscribe to external stores safely with tearing prevention in concurrent mode.\n\n```tsx\nimport { useSyncExternalStore } from 'react';\n\nconst value = useSyncExternalStore(\n  subscribeToStore,\n  () => store.getState(),\n  () => store.getServerState()\n);\n```\n\nSubscribes to external stores with getServerSnapshot for SSR—prevents tearing when concurrent rendering reads changing external state."
    },
    {
      "question": "What is Activity component?",
      "explanation": "React 19.2+ <Activity mode=\"hidden\"> deprioritizes hidden UI, preserves state/DOM, runs effect cleanup until shown again.\n\n```tsx\nimport React from 'react';\n\n<Activity mode={active ? 'visible' : 'hidden'}>\n  <HeavyPanel />\n</Activity>\n```\n\nReact 19.2+ Activity hidden mode keeps DOM/state but runs effect cleanup until visible again—alternative to unmounting off-screen tabs."
    },
    {
      "question": "What is Compiler (React Forget)?",
      "explanation": "Auto-memoization at compile time—reduces manual memo (check adoption).\n\n```tsx\nimport React from 'react';\n\n// Compiler may memoize automatically:\nfunction List({ items }: { items: Item[] }) {\n  return items.map((i) => <Row key={i.id} item={i} />);\n}\n```\n\nCompile-time auto-memoization reduces hand-written memo/useCallback—adoption is incremental; measure before deleting existing memos blindly."
    },
    {
      "question": "What is DevTools?",
      "explanation": "Fiber inspector, profiler flame charts, component highlights.\n\n```tsx\n// React DevTools → Profiler → record interaction → inspect commits\n```\n\nProfiler flame charts show which components committed slowly—pair with why-did-you-render style debugging only after identifying hot commits."
    }
  ]
};
