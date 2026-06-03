import type { FlashcardDeck } from './types';

export const hooksDeck: FlashcardDeck = {
  "id": "hooks",
  "slug": "hooks",
  "title": "Hooks",
  "cards": [
    {
      "question": "What is Rules of Hooks?",
      "explanation": "Only call at top level; only in React functions—ensures consistent fiber hook order.\n\n```tsx\nfunction Counter() {\n  const [n, setN] = useState(0); // ✓ top level\n\n  if (n > 10) return null;\n  // const [x, setX] = useState(0); // ✗ hook after conditional\n  return <button onClick={() => setN(n + 1)}>{n}</button>;\n}\n```\n\nInterview tip: cite a hook composition or rules-of-hooks mistake you debugged—not only the API definition."
    },
    {
      "question": "What is useState?",
      "explanation": "```tsx\nconst [count, setCount] = useState(0);\nsetCount((c) => c + 1);\n\nconst [data] = useState(() => expensiveInit());\n```\n\nInterview tip: cite a hook composition or rules-of-hooks mistake you debugged—not only the API definition."
    },
    {
      "question": "What is useEffect?",
      "explanation": "Side effects after paint; deps array; cleanup on unmount/re-run.\n\n```tsx\nuseEffect(() => {\n  const ctrl = new AbortController();\n  fetch('/api/user', { signal: ctrl.signal })\n    .then((r) => r.json())\n    .then(setUser);\n  return () => ctrl.abort();\n}, [userId]);\n```\n\nInterview tip: cite a hook composition or rules-of-hooks mistake you debugged—not only the API definition."
    },
    {
      "question": "What is useContext?",
      "explanation": "Subscribe to nearest Provider value; rerenders when value changes.\n\n```tsx\nconst ThemeContext = createContext<'light' | 'dark'>('light');\n\nfunction Toolbar() {\n  const theme = useContext(ThemeContext);\n  return <div className={theme}>...</div>;\n}\n```\n\nInterview tip: cite a hook composition or rules-of-hooks mistake you debugged—not only the API definition."
    },
    {
      "question": "What is useReducer?",
      "explanation": "(state, action) => newState; good for complex transitions.\n\n```tsx\nconst [state, dispatch] = useReducer(reducer, { count: 0 });\n\ndispatch({ type: 'increment' });\n```\n\nInterview tip: cite a hook composition or rules-of-hooks mistake you debugged—not only the API definition."
    },
    {
      "question": "What is useRef?",
      "explanation": "Mutable .current; DOM refs; values that should not trigger render.\n\n```tsx\nconst inputRef = useRef<HTMLInputElement>(null);\nconst renderCount = useRef(0);\n\nrenderCount.current += 1; // does not re-render\n```\n\nInterview tip: cite a hook composition or rules-of-hooks mistake you debugged—not only the API definition."
    },
    {
      "question": "What is useMemo / useCallback?",
      "explanation": "Cache values/functions when deps stable—use after profiling or to stabilize props for memo children; React Compiler can reduce manual memo.\n\n```tsx\nconst sorted = useMemo(() => items.sort(compare), [items]);\nconst onSave = useCallback(() => save(id), [id]);\n```\n\nInterview tip: cite a hook composition or rules-of-hooks mistake you debugged—not only the API definition."
    },
    {
      "question": "What is useImperativeHandle?",
      "explanation": "Customizes the ref value a parent receives; works with ref-as-prop in React 19 or forwardRef for older patterns.\n\n```tsx\nuseImperativeHandle(ref, () => ({\n  focus() {\n    inputRef.current?.focus();\n  },\n}));\n```\n\nInterview tip: cite a hook composition or rules-of-hooks mistake you debugged—not only the API definition."
    },
    {
      "question": "What is useLayoutEffect?",
      "explanation": "Sync after DOM update before browser paint—measurements.\n\n```tsx\nuseLayoutEffect(() => {\n  const width = ref.current?.getBoundingClientRect().width;\n  setTooltipWidth(width);\n}, []);\n```\n\nInterview tip: cite a hook composition or rules-of-hooks mistake you debugged—not only the API definition."
    },
    {
      "question": "What is useId?",
      "explanation": "Stable unique IDs for accessibility associations SSR-safe.\n\n```tsx\nconst id = useId();\n<label htmlFor={id}>Email</label>\n<input id={id} type=\"email\" />\n```\n\nInterview tip: cite a hook composition or rules-of-hooks mistake you debugged—not only the API definition."
    },
    {
      "question": "What is useDebugValue?",
      "explanation": "Label custom hooks in DevTools.\n\n```tsx\nfunction useOnlineStatus() {\n  const online = useSyncExternalStore(subscribe, getSnapshot);\n  useDebugValue(online ? 'Online' : 'Offline');\n  return online;\n}\n```\n\nInterview tip: cite a hook composition or rules-of-hooks mistake you debugged—not only the API definition."
    },
    {
      "question": "What is Custom hooks?",
      "explanation": "Extract stateful logic; name with use; can compose other hooks.\n\n```tsx\nfunction useToggle(initial = false) {\n  const [on, setOn] = useState(initial);\n  const toggle = useCallback(() => setOn((v) => !v), []);\n  return { on, toggle };\n}\n```\n\nInterview tip: cite a hook composition or rules-of-hooks mistake you debugged—not only the API definition."
    },
    {
      "question": "What is useTransition?",
      "explanation": "Mark non-urgent updates; isPending flag.\n\n```tsx\nconst [isPending, startTransition] = useTransition();\n\nstartTransition(() => {\n  setTab(nextTab);\n});\n```\n\nInterview tip: cite a hook composition or rules-of-hooks mistake you debugged—not only the API definition."
    },
    {
      "question": "What is useDeferredValue?",
      "explanation": "Defer lagging behind urgent state for perf.\n\n```tsx\nconst deferredQuery = useDeferredValue(query);\nconst filtered = useMemo(() => filter(items, deferredQuery), [items, deferredQuery]);\n```\n\nInterview tip: cite a hook composition or rules-of-hooks mistake you debugged—not only the API definition."
    }
  ]
};
