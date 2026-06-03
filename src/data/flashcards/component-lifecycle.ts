import type { FlashcardDeck } from './types';

export const componentLifecycleDeck: FlashcardDeck = {
  "id": "component-lifecycle",
  "slug": "lifecycle",
  "title": "Component Lifecycle",
  "cards": [
    {
      "question": "What is Mount phase (function components)?",
      "explanation": "First render, then useLayoutEffect, then useEffect. useEffect runs after paint.\n\nInterview tip: map this to mount/update/unmount in a component you shipped, including cleanup you actually wrote."
    },
    {
      "question": "What is Update phase?",
      "explanation": "Re-render when state/props/context change; effects re-run if deps changed.\n\nInterview tip: map this to mount/update/unmount in a component you shipped, including cleanup you actually wrote."
    },
    {
      "question": "What is Unmount cleanup?",
      "explanation": "useEffect return function runs on unmount and before re-running effect when deps change.\n\nInterview tip: map this to mount/update/unmount in a component you shipped, including cleanup you actually wrote."
    },
    {
      "question": "What is useLayoutEffect vs useEffect?",
      "explanation": "Layout: synchronous after DOM mutations, before paint—measure DOM. Effect: after paint—subscriptions, fetch.\n\nInterview tip: map this to mount/update/unmount in a component you shipped, including cleanup you actually wrote."
    },
    {
      "question": "Class componentDidMount equivalent?",
      "explanation": "useEffect(() => { ... }, []) runs after paint; in Strict Mode (dev) setup+cleanup run twice to expose missing cleanups.\n\nInterview tip: map this to mount/update/unmount in a component you shipped, including cleanup you actually wrote."
    },
    {
      "question": "getDerivedStateFromProps equivalent?",
      "explanation": "Derive values from props during render, store only user edits, or remount with key—avoid setState in render to mirror props.\n\nInterview tip: map this to mount/update/unmount in a component you shipped, including cleanup you actually wrote."
    },
    {
      "question": "shouldComponentUpdate equivalent?",
      "explanation": "React.memo(Component, arePropsEqual?) skips re-renders; useMemo caches values, not component renders.\n\nInterview tip: map this to mount/update/unmount in a component you shipped, including cleanup you actually wrote."
    },
    {
      "question": "componentWillUnmount equivalent?",
      "explanation": "Return a cleanup function from useEffect or useLayoutEffect.\n\nInterview tip: map this to mount/update/unmount in a component you shipped, including cleanup you actually wrote."
    },
    {
      "question": "Why no componentWillMount?",
      "explanation": "Deprecated for side effects before paint and SSR issues; use render for pure work and effects after commit in function components.\n\nInterview tip: map this to mount/update/unmount in a component you shipped, including cleanup you actually wrote."
    },
    {
      "question": "What is Strict Mode double mount?",
      "explanation": "Dev-only: mount → unmount → remount to test effect cleanup.\n\nInterview tip: map this to mount/update/unmount in a component you shipped, including cleanup you actually wrote."
    }
  ]
};
