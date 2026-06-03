import type { FlashcardDeck } from './types';

export const performanceOptimizationDeck: FlashcardDeck = {
  "id": "performance-optimization",
  "slug": "performance",
  "title": "Performance Optimization",
  "cards": [
    {
      "question": "What is React.memo?",
      "explanation": "Skips re-render if props shallow-equal. Needs stable prop references.\n\n```tsx\nimport { memo } from 'react';\n\nconst Chart = memo(function Chart({ data }: { data: Point[] }) {\n  return <svg>{data.map(drawPoint)}</svg>;\n});\n```\n\nMemo skips re-render when props are shallow-equal—useless if parents pass inline objects/functions every render unless those deps are stabilized."
    },
    {
      "question": "What is useMemo?",
      "explanation": "Caches computed value between renders when deps unchanged.\n\n```tsx\nimport { useMemo } from 'react';\n\nconst visible = useMemo(\n  () => rows.filter((r) => r.name.includes(query)),\n  [rows, query]\n);\n```\n\nCaches a computed value between renders when deps are unchanged—not for side effects; misuse adds comparison overhead without measurable win."
    },
    {
      "question": "What is useCallback?",
      "explanation": "Caches function identity for stable props to memoized children.\n\n```tsx\nimport { useCallback } from 'react';\n\nconst onSave = useCallback((id: string) => {\n  dispatch({ type: 'save', id });\n}, [dispatch]);\n```\n\nPreserves function identity so memoized children do not re-render solely because a new inline handler was created each parent render."
    },
    {
      "question": "What is Code splitting?",
      "explanation": "```tsx\nimport { Suspense, lazy } from 'react';\n\nconst Settings = lazy(() => import('./Settings'));\n\nfunction App() {\n  return (\n    <Suspense fallback={<Spinner />}>\n      <Settings />\n    </Suspense>\n  );\n}\n```\n\nSplit routes and heavy widgets with lazy + Suspense so initial JS stays small—pair with route-based chunks from your bundler for automatic boundaries."
    },
    {
      "question": "What is Virtualization?",
      "explanation": "Render only visible list rows (react-window, manual windowing) for large lists.\n\n```tsx\nimport { FixedSizeList } from 'react-window';\nimport React from 'react';\n\n<FixedSizeList height={400} itemCount={items.length} itemSize={48} width=\"100%\">\n  {({ index, style }) => <Row style={style} item={items[index]} />}\n</FixedSizeList>\n```\n\nRender only visible rows for 10k+ item lists—constant DOM size beats memoizing thousands of mounted nodes you cannot see."
    },
    {
      "question": "What is Profiler API?",
      "explanation": "```tsx\nimport React from 'react';\n\n<Profiler id=\"Checkout\" onRender={(id, phase, actualDuration) => {\n  if (actualDuration > 16) console.warn(id, phase, actualDuration);\n}}>\n  <Checkout />\n</Profiler>\n```\n\nonRender logs commit durations in production-capable builds—use DevTools Profiler for interactive flame charts; API helps correlate commits with user actions."
    },
    {
      "question": "What is Avoid premature optimization?",
      "explanation": "Measure first; memo has cost. Optimize hot paths and proven bottlenecks.\n\n```tsx\nimport React from 'react';\n\n// Start simple:\nfunction List({ items }: { items: Item[] }) {\n  return items.map((i) => <Row key={i.id} item={i} />);\n}\n```\n\nMeasure with Profiler or Web Vitals before memoizing—unnecessary memo/useCallback adds memory and comparison cost on every render."
    },
    {
      "question": "What is Context performance?",
      "explanation": "Split contexts; memoize value; avoid storing fast-changing data in wide context.\n\n```tsx\nimport { createContext } from 'react';\n\nconst ThemeContext = createContext(themeLight);\nconst CartContext = createContext(cartEmpty);\n\n// Avoid one MegaContext with { theme, cart, user, ... }\n```\n\nA single context value that changes often forces every consumer to re-render—split by domain (theme vs cart) or pass selectors via external store patterns."
    },
    {
      "question": "What is useDeferredValue?",
      "explanation": "Defers updating non-urgent UI during heavy renders—keeps input responsive.\n\n```tsx\nimport { useDeferredValue, useMemo } from 'react';\n\nconst deferredItems = useDeferredValue(items);\nconst filtered = useMemo(() => filter(deferredItems, q), [deferredItems, q]);\n```\n\nDefers expensive list filtering so typing stays at full frame rate while the heavy derived view catches up one beat behind."
    },
    {
      "question": "What is useTransition?",
      "explanation": "Marks updates as transitions; isPending for loading UI; lower priority re-renders.\n\n```tsx\nimport { useTransition } from 'react';\n\nconst [isPending, startTransition] = useTransition();\n\nstartTransition(() => setView('analytics'));\n```\n\nMarks tab switches and chart updates as transitions so urgent input updates preempt long renders—surface isPending for subtle loading affordances."
    },
    {
      "question": "What is Bundle size?",
      "explanation": "Tree-shake, analyze with source-map-explorer, avoid heavy deps on critical path.\n\n```tsx\nimport { lazy } from 'react';\n\nconst Editor = lazy(() => import('./RichEditor'));\n```\n\nImport ESM paths, analyze bundles, and defer heavy chart/editor packages to lazy routes—server components also remove server-only code from client JS."
    },
    {
      "question": "What is Keys and reconciliation cost?",
      "explanation": "Bad keys cause remounts; expensive children remount loses DOM/state.\n\n```tsx\nimport React from 'react';\n\n{items.map((item) => (\n  <ExpensiveRow key={item.id} item={item} />\n))}\n```\n\nUnstable keys (array index on reorder) remount DOM and reset internal state—expensive child trees amplify the cost beyond a simple list item swap."
    },
    {
      "question": "What is Web Vitals?",
      "explanation": "LCP, INP, CLS—optimize assets, fonts, layout shift, long tasks.\n\n```tsx\n// Defer non-critical work:\nstartTransition(() => setShowCharts(true));\n```\n\nOptimize LCP (hero image/font), INP (long tasks blocking input), and CLS (layout shift from async content)—React perf tuning should map to these metrics."
    },
    {
      "question": "What is Server Components perf?",
      "explanation": "Server-only components avoid shipping their implementation JS; pages still load client boundaries, hydration, and RSC payload.\n\n```tsx\nimport React from 'react';\n\nexport default async function Page() {\n  const data = await db.query();\n  return <ClientChart summary={data.summary} />;\n}\n```\n\nServer Components never ship their implementation to the browser—client boundaries still pay for hydration and RSC payload size on interactive islands."
    },
    {
      "question": "What is Hydration cost?",
      "explanation": "Match server HTML; reduce client-only trees; stream with Suspense.\n\n```tsx\nimport { Suspense } from 'react';\n\n<Suspense fallback={<Skeleton />}>\n  <ClientWidget />\n</Suspense>\n```\n\nMismatch forces client re-render; reduce client-only branches in SSR HTML and stream slow sections behind Suspense to shorten time-to-interactive."
    }
  ]
};
