import type { FlashcardDeck } from './types';

export const reactInternalsDeck: FlashcardDeck = {
  "id": "react-internals",
  "slug": "internals",
  "title": "React Internals",
  "cards": [
    {
      "question": "What is Fiber architecture?",
      "explanation": "Unit of work per component; enables incremental rendering and priority.\n\nInterview tip: connect to render/commit, Fiber, or scheduling—keep it high level unless they go deeper."
    },
    {
      "question": "What is Reconciliation algorithm?",
      "explanation": "Compares trees; same type updates props; different type tears down subtree.\n\nInterview tip: connect to render/commit, Fiber, or scheduling—keep it high level unless they go deeper."
    },
    {
      "question": "What is Commit phase?",
      "explanation": "Apply DOM updates after render phase completes—layout effects, then paint, then passive effects.\n\nInterview tip: connect to render/commit, Fiber, or scheduling—keep it high level unless they go deeper."
    },
    {
      "question": "What is Lanes / priorities?",
      "explanation": "React 18+ schedules urgent (input) vs transition updates differently.\n\nInterview tip: connect to render/commit, Fiber, or scheduling—keep it high level unless they go deeper."
    },
    {
      "question": "What is Double buffering?",
      "explanation": "Work-in-progress tree swapped on commit; current vs alternate fiber.\n\nInterview tip: connect to render/commit, Fiber, or scheduling—keep it high level unless they go deeper."
    },
    {
      "question": "What is Hooks linked list?",
      "explanation": "Hooks stored on fiber in call order—why hooks rules exist.\n\n```tsx\n// Same component, same hook order every render\nuseState();\nuseEffect();\nuseContext(ThemeContext);\n```\n\nInterview tip: connect to render/commit, Fiber, or scheduling—keep it high level unless they go deeper."
    },
    {
      "question": "What is Synthetic events legacy?",
      "explanation": "React 17+ attaches to root; pooling removed.\n\nInterview tip: connect to render/commit, Fiber, or scheduling—keep it high level unless they go deeper."
    },
    {
      "question": "What is Batching?",
      "explanation": "Multiple setStates in event/async batched into one render (React 18 broad).\n\nInterview tip: connect to render/commit, Fiber, or scheduling—keep it high level unless they go deeper."
    },
    {
      "question": "What is Suspense mechanism?",
      "explanation": "Throws thenable; nearest boundary shows fallback until resolved.\n\nInterview tip: connect to render/commit, Fiber, or scheduling—keep it high level unless they go deeper."
    },
    {
      "question": "What is Concurrent rendering?",
      "explanation": "Render can pause, resume, abandon—for responsiveness.\n\nInterview tip: connect to render/commit, Fiber, or scheduling—keep it high level unless they go deeper."
    },
    {
      "question": "What is useSyncExternalStore?",
      "explanation": "Subscribe to external stores safely with tearing prevention in concurrent mode.\n\nInterview tip: connect to render/commit, Fiber, or scheduling—keep it high level unless they go deeper."
    },
    {
      "question": "What is Activity component?",
      "explanation": "React 19.2+ <Activity mode=\"hidden\"> deprioritizes hidden UI, preserves state/DOM, runs effect cleanup until shown again.\n\nInterview tip: connect to render/commit, Fiber, or scheduling—keep it high level unless they go deeper."
    },
    {
      "question": "What is Compiler (React Forget)?",
      "explanation": "Auto-memoization at compile time—reduces manual memo (check adoption).\n\nInterview tip: connect to render/commit, Fiber, or scheduling—keep it high level unless they go deeper."
    },
    {
      "question": "What is DevTools?",
      "explanation": "Fiber inspector, profiler flame charts, component highlights.\n\nInterview tip: connect to render/commit, Fiber, or scheduling—keep it high level unless they go deeper."
    }
  ]
};
