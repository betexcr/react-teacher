import type { FlashcardDeck } from './types';

export const componentLifecycleDeck: FlashcardDeck = {
  "id": "component-lifecycle",
  "slug": "lifecycle",
  "title": "Component Lifecycle",
  "cards": [
    {
      "question": "What is Mount phase (function components)?",
      "explanation": "First render, then useLayoutEffect, then useEffect.\n\n```tsx\nimport { useEffect, useLayoutEffect } from 'react';\n\nfunction Widget() {\n  useLayoutEffect(() => {\n    measure();\n  }, []);\n\n  useEffect(() => {\n    const unsub = subscribe();\n    return unsub;\n  }, []);\n\n  return <div ref={boxRef} />;\n}\n```\n\nFirst render commits DOM, then useLayoutEffect runs before paint, then useEffect after paint—choose layout vs passive effects based on whether users can see intermediate layout."
    },
    {
      "question": "What is Update phase?",
      "explanation": "Re-render when state/props/context change; effects re-run if deps changed.\n\n```tsx\nimport { useEffect } from 'react';\n\nuseEffect(() => {\n  document.title = `${count} items`;\n}, [count]);\n```\n\nState, prop, or context changes trigger re-render; effects re-run only when dependency values change—stale closures often mean a missing dep, not a broken effect."
    },
    {
      "question": "What is Unmount cleanup?",
      "explanation": "```tsx\nimport { useEffect } from 'react';\n\nuseEffect(() => {\n  const id = window.setInterval(tick, 1000);\n  return () => clearInterval(id);\n}, []);\n```\n\nReturn a cleanup function from useEffect to clear timers, abort fetches, and remove listeners—cleanup also runs before re-running the effect when deps change."
    },
    {
      "question": "What is useLayoutEffect vs useEffect?",
      "explanation": "Layout: synchronous after DOM mutations, before paint—measure DOM. Effect: after paint—subscriptions, fetch.\n\n```tsx\nimport { useEffect, useLayoutEffect } from 'react';\n\nuseLayoutEffect(() => {\n  setTooltipWidth(ref.current?.offsetWidth ?? 0);\n}, [label]);\n\nuseEffect(() => {\n  analytics.track('view', { id });\n}, [id]);\n```\n\nuseLayoutEffect blocks paint—use for DOM measurement; useEffect is for work that can wait until after paint without visible flicker."
    },
    {
      "question": "Class componentDidMount equivalent?",
      "explanation": "```tsx\nimport { useEffect } from 'react';\n\nuseEffect(() => {\n  const ctrl = new AbortController();\n  fetchStats({ signal: ctrl.signal }).then(setStats);\n  return () => ctrl.abort();\n}, []);\n```\n\nuseEffect(fn, []) runs after paint on mount; Strict Mode in dev double-invokes setup+cleanup to expose missing teardown—not duplicate production mounts."
    },
    {
      "question": "getDerivedStateFromProps equivalent?",
      "explanation": "Derive values from props during render, store only user edits, or remount with key—avoid setState in render to mirror props.\n\n```tsx\nimport { useMemo } from 'react';\n\nfunction SearchResults({ query, results }: { query: string; results: Item[] }) {\n  const filtered = useMemo(() => match(results, query), [results, query]);\n  return <List items={filtered} />;\n}\n```\n\nDerive display values from props during render; store only user edits in state, or remount with key when you need a full reset—avoid setState in render to mirror props."
    },
    {
      "question": "shouldComponentUpdate equivalent?",
      "explanation": "```tsx\nimport { memo } from 'react';\n\nconst Row = memo(function Row({ item }: { item: Item }) {\n  return <td>{item.name}</td>;\n}, (prev, next) => prev.item.id === next.item.id);\n```\n\nReact.memo shallow-compares props to skip re-render; custom arePropsEqual helps when parents pass new object literals that are semantically equal."
    },
    {
      "question": "componentWillUnmount equivalent?",
      "explanation": "Return a cleanup function from useEffect or useLayoutEffect.\n\n```tsx\nimport { useEffect } from 'react';\n\nuseEffect(() => {\n  window.addEventListener('resize', onResize);\n  return () => window.removeEventListener('resize', onResize);\n}, [onResize]);\n```\n\nThe function returned from useEffect or useLayoutEffect is the unmount (and pre-re-run) hook—put all teardown there, not in a separate ad-hoc pattern."
    },
    {
      "question": "Why no componentWillMount?",
      "explanation": "```tsx\nimport { useEffect } from 'react';\n\n// Prefer:\nuseEffect(() => {\n  syncExternalStore();\n}, []);\n\n// Not: side effects during render\n```\n\nPre-paint side effects in classes caused SSR mismatches and double-fetch bugs—function components do pure render work, then effects after commit."
    },
    {
      "question": "What is Strict Mode double mount?",
      "explanation": "Dev-only: mount → unmount → remount to test effect cleanup.\n\n```tsx\nimport { StrictMode } from 'react';\n\n<StrictMode>\n  <App />\n</StrictMode>\n```\n\nDevelopment-only remount simulates navigation away and back—if effects leak listeners without cleanup, you will see duplicated subscriptions in dev."
    }
  ]
};
