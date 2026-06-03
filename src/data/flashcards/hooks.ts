import type { FlashcardDeck } from './types';

export const hooksDeck: FlashcardDeck = {
  "id": "hooks",
  "slug": "hooks",
  "title": "Hooks",
  "cards": [
    {
      "question": "What is Rules of Hooks?",
      "explanation": "Only call at top level; only in React functions—ensures consistent fiber hook order.\n\nInterview tip: cite a hook composition or rules-of-hooks mistake you debugged—not only the API definition."
    },
    {
      "question": "What is useState?",
      "explanation": "State + setter; functional updates; lazy init useState(() => expensive()).\n\nInterview tip: cite a hook composition or rules-of-hooks mistake you debugged—not only the API definition."
    },
    {
      "question": "What is useEffect?",
      "explanation": "Side effects after paint; deps array; cleanup on unmount/re-run.\n\nInterview tip: cite a hook composition or rules-of-hooks mistake you debugged—not only the API definition."
    },
    {
      "question": "What is useContext?",
      "explanation": "Subscribe to nearest Provider value; rerenders when value changes.\n\nInterview tip: cite a hook composition or rules-of-hooks mistake you debugged—not only the API definition."
    },
    {
      "question": "What is useReducer?",
      "explanation": "(state, action) => newState; good for complex transitions.\n\nInterview tip: cite a hook composition or rules-of-hooks mistake you debugged—not only the API definition."
    },
    {
      "question": "What is useRef?",
      "explanation": "Mutable .current; DOM refs; values that should not trigger render.\n\nInterview tip: cite a hook composition or rules-of-hooks mistake you debugged—not only the API definition."
    },
    {
      "question": "What is useMemo / useCallback?",
      "explanation": "Cache values/functions when deps stable—use after profiling or to stabilize props for memo children; React Compiler can reduce manual memo.\n\nInterview tip: cite a hook composition or rules-of-hooks mistake you debugged—not only the API definition."
    },
    {
      "question": "What is useImperativeHandle?",
      "explanation": "Customizes the ref value a parent receives; works with ref-as-prop in React 19 or forwardRef for older patterns.\n\nInterview tip: cite a hook composition or rules-of-hooks mistake you debugged—not only the API definition."
    },
    {
      "question": "What is useLayoutEffect?",
      "explanation": "Sync after DOM update before browser paint—measurements.\n\nInterview tip: cite a hook composition or rules-of-hooks mistake you debugged—not only the API definition."
    },
    {
      "question": "What is useId?",
      "explanation": "Stable unique IDs for accessibility associations SSR-safe.\n\nInterview tip: cite a hook composition or rules-of-hooks mistake you debugged—not only the API definition."
    },
    {
      "question": "What is useDebugValue?",
      "explanation": "Label custom hooks in DevTools.\n\nInterview tip: cite a hook composition or rules-of-hooks mistake you debugged—not only the API definition."
    },
    {
      "question": "What is Custom hooks?",
      "explanation": "Extract stateful logic; name with use; can compose other hooks.\n\nInterview tip: cite a hook composition or rules-of-hooks mistake you debugged—not only the API definition."
    },
    {
      "question": "What is useTransition?",
      "explanation": "Mark non-urgent updates; isPending flag.\n\nInterview tip: cite a hook composition or rules-of-hooks mistake you debugged—not only the API definition."
    },
    {
      "question": "What is useDeferredValue?",
      "explanation": "Defer lagging behind urgent state for perf.\n\nInterview tip: cite a hook composition or rules-of-hooks mistake you debugged—not only the API definition."
    }
  ]
};
