import type { FlashcardDeck } from './types';

export const componentLifecycleDeck: FlashcardDeck = {
  "id": "component-lifecycle",
  "slug": "lifecycle",
  "title": "Component Lifecycle",
  "cards": [
    {
      "question": "What is Mount phase (function components)?",
      "explanation": "First render, then useLayoutEffect, then useEffect.\n\n```tsx\n// render → commit DOM → useLayoutEffect → paint → useEffect\nfunction Widget() {\n  useLayoutEffect(() => measure(), []);\n  useEffect(() => subscribe(), []);\n  return <div />;\n}\n```\n\nInterview tip: map this to mount/update/unmount in a component you shipped, including cleanup you actually wrote."
    },
    {
      "question": "What is Update phase?",
      "explanation": "Re-render when state/props/context change; effects re-run if deps changed.\n\n```tsx\nuseEffect(() => {\n  fetchUser(userId);\n}, [userId]); // re-runs when userId changes\n```\n\nInterview tip: map this to mount/update/unmount in a component you shipped, including cleanup you actually wrote."
    },
    {
      "question": "What is Unmount cleanup?",
      "explanation": "```tsx\nuseEffect(() => {\n  const id = setInterval(tick, 1000);\n  return () => clearInterval(id);\n}, []);\n```\n\nInterview tip: map this to mount/update/unmount in a component you shipped, including cleanup you actually wrote."
    },
    {
      "question": "What is useLayoutEffect vs useEffect?",
      "explanation": "Layout: synchronous after DOM mutations, before paint—measure DOM. Effect: after paint—subscriptions, fetch.\n\n```tsx\nuseLayoutEffect(() => {\n  setHeight(ref.current?.offsetHeight ?? 0);\n}, []);\n\nuseEffect(() => {\n  document.title = `${count} items`;\n}, [count]);\n```\n\nInterview tip: map this to mount/update/unmount in a component you shipped, including cleanup you actually wrote."
    },
    {
      "question": "Class componentDidMount equivalent?",
      "explanation": "```tsx\nuseEffect(() => { ... }, []) runs after paint; in Strict Mode (dev) setup+cleanup run twice to expose missing cleanups.\n```\n\nInterview tip: map this to mount/update/unmount in a component you shipped, including cleanup you actually wrote."
    },
    {
      "question": "getDerivedStateFromProps equivalent?",
      "explanation": "Derive values from props during render, store only user edits, or remount with key—avoid setState in render to mirror props.\n\nInterview tip: map this to mount/update/unmount in a component you shipped, including cleanup you actually wrote."
    },
    {
      "question": "shouldComponentUpdate equivalent?",
      "explanation": "```tsx\nconst Row = React.memo(function Row({ item }: { item: Item }) {\n  return <td>{item.name}</td>;\n});\n```\n\nInterview tip: map this to mount/update/unmount in a component you shipped, including cleanup you actually wrote."
    },
    {
      "question": "componentWillUnmount equivalent?",
      "explanation": "Return a cleanup function from useEffect or useLayoutEffect.\n\nInterview tip: map this to mount/update/unmount in a component you shipped, including cleanup you actually wrote."
    },
    {
      "question": "Why no componentWillMount?",
      "explanation": "```tsx\nDeprecated for side effects before paint and SSR issues; use render for pure work and effects after commit in function components.\n```\n\nInterview tip: map this to mount/update/unmount in a component you shipped, including cleanup you actually wrote."
    },
    {
      "question": "What is Strict Mode double mount?",
      "explanation": "Dev-only: mount → unmount → remount to test effect cleanup.\n\nInterview tip: map this to mount/update/unmount in a component you shipped, including cleanup you actually wrote."
    }
  ]
};
