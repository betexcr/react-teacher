import type { FlashcardDeck } from './types';

export const performanceOptimizationDeck: FlashcardDeck = {
  "id": "performance-optimization",
  "slug": "performance",
  "title": "Performance Optimization",
  "cards": [
    {
      "question": "What is React.memo?",
      "explanation": "Skips re-render if props shallow-equal. Needs stable prop references.\n\n```tsx\nconst Chart = React.memo(function Chart({ data }: { data: Point[] }) {\n  return <svg>...</svg>;\n});\n```\n\nInterview tip: name what you measured first (Profiler, Web Vitals, bundle size) before choosing this optimization."
    },
    {
      "question": "What is useMemo?",
      "explanation": "Caches computed value between renders when deps unchanged.\n\n```tsx\nconst visible = useMemo(() => filterRows(rows, query), [rows, query]);\n```\n\nInterview tip: name what you measured first (Profiler, Web Vitals, bundle size) before choosing this optimization."
    },
    {
      "question": "What is useCallback?",
      "explanation": "Caches function identity for stable props to memoized children.\n\n```tsx\nconst handleSelect = useCallback((id: string) => {\n  setSelected(id);\n}, []);\n```\n\nInterview tip: name what you measured first (Profiler, Web Vitals, bundle size) before choosing this optimization."
    },
    {
      "question": "What is Code splitting?",
      "explanation": "```tsx\nconst Settings = lazy(() => import('./Settings'));\n\n<Suspense fallback={<Spinner />}>\n  <Settings />\n</Suspense>\n```\n\nInterview tip: name what you measured first (Profiler, Web Vitals, bundle size) before choosing this optimization."
    },
    {
      "question": "What is Virtualization?",
      "explanation": "Render only visible list rows (react-window, manual windowing) for large lists.\n\nInterview tip: name what you measured first (Profiler, Web Vitals, bundle size) before choosing this optimization."
    },
    {
      "question": "What is Profiler API?",
      "explanation": "```tsx\n<Profiler onRender> reports commit timings (works in prod with overhead); DevTools Profiler is the main dev workflow.\n```\n\nInterview tip: name what you measured first (Profiler, Web Vitals, bundle size) before choosing this optimization."
    },
    {
      "question": "What is Avoid premature optimization?",
      "explanation": "Measure first; memo has cost. Optimize hot paths and proven bottlenecks.\n\nInterview tip: name what you measured first (Profiler, Web Vitals, bundle size) before choosing this optimization."
    },
    {
      "question": "What is Context performance?",
      "explanation": "Split contexts; memoize value; avoid storing fast-changing data in wide context.\n\nInterview tip: name what you measured first (Profiler, Web Vitals, bundle size) before choosing this optimization."
    },
    {
      "question": "What is useDeferredValue?",
      "explanation": "Defers updating non-urgent UI during heavy renders—keeps input responsive.\n\n```tsx\nconst deferredItems = useDeferredValue(items);\n```\n\nInterview tip: name what you measured first (Profiler, Web Vitals, bundle size) before choosing this optimization."
    },
    {
      "question": "What is useTransition?",
      "explanation": "Marks updates as transitions; isPending for loading UI; lower priority re-renders.\n\n```tsx\nconst [isPending, startTransition] = useTransition();\nstartTransition(() => setTab('charts'));\n```\n\nInterview tip: name what you measured first (Profiler, Web Vitals, bundle size) before choosing this optimization."
    },
    {
      "question": "What is Bundle size?",
      "explanation": "Tree-shake, analyze with source-map-explorer, avoid heavy deps on critical path.\n\nInterview tip: name what you measured first (Profiler, Web Vitals, bundle size) before choosing this optimization."
    },
    {
      "question": "What is Keys and reconciliation cost?",
      "explanation": "Bad keys cause remounts; expensive children remount loses DOM/state.\n\nInterview tip: name what you measured first (Profiler, Web Vitals, bundle size) before choosing this optimization."
    },
    {
      "question": "What is Web Vitals?",
      "explanation": "LCP, INP, CLS—optimize assets, fonts, layout shift, long tasks.\n\nInterview tip: name what you measured first (Profiler, Web Vitals, bundle size) before choosing this optimization."
    },
    {
      "question": "What is Server Components perf?",
      "explanation": "Server-only components avoid shipping their implementation JS; pages still load client boundaries, hydration, and RSC payload.\n\nInterview tip: name what you measured first (Profiler, Web Vitals, bundle size) before choosing this optimization."
    },
    {
      "question": "What is Hydration cost?",
      "explanation": "Match server HTML; reduce client-only trees; stream with Suspense.\n\nInterview tip: name what you measured first (Profiler, Web Vitals, bundle size) before choosing this optimization."
    }
  ]
};
