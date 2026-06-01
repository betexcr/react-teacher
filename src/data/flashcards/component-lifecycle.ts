import type { FlashcardDeck } from './types';

export const componentLifecycleDeck: FlashcardDeck = {
  "id": "component-lifecycle",
  "slug": "lifecycle",
  "title": "Component Lifecycle",
  "cards": [
    {
      "question": "What is Mount phase (function components)?",
      "explanation": "First render, then useLayoutEffect, then useEffect. useEffect runs after paint.\n\nIn Component Lifecycle interviews, connect this to a concrete scenario: what user problem were you solving, and how did this concept keep the UI predictable or maintainable? Strong answers name tradeoffs—not only what the API does.\n\nReact's ecosystem (routing, data libraries, testing tools) assumes you understand this idea. Mention how it interacts with hooks, rendering, or TypeScript where relevant, and contrast with naive DOM manipulation or class-heavy patterns when helpful."
    },
    {
      "question": "What is Update phase?",
      "explanation": "Re-render when state/props/context change; effects re-run if deps changed.\n\nIn Component Lifecycle interviews, connect this to a concrete scenario: what user problem were you solving, and how did this concept keep the UI predictable or maintainable? Strong answers name tradeoffs—not only what the API does.\n\nReact's ecosystem (routing, data libraries, testing tools) assumes you understand this idea. Mention how it interacts with hooks, rendering, or TypeScript where relevant, and contrast with naive DOM manipulation or class-heavy patterns when helpful."
    },
    {
      "question": "What is Unmount cleanup?",
      "explanation": "useEffect return function runs on unmount and before re-running effect when deps change.\n\nIn Component Lifecycle interviews, connect this to a concrete scenario: what user problem were you solving, and how did this concept keep the UI predictable or maintainable? Strong answers name tradeoffs—not only what the API does.\n\nReact's ecosystem (routing, data libraries, testing tools) assumes you understand this idea. Mention how it interacts with hooks, rendering, or TypeScript where relevant, and contrast with naive DOM manipulation or class-heavy patterns when helpful."
    },
    {
      "question": "What is useLayoutEffect vs useEffect?",
      "explanation": "Layout: synchronous after DOM mutations, before paint—measure DOM. Effect: after paint—subscriptions, fetch.\n\nIn Component Lifecycle interviews, connect this to a concrete scenario: what user problem were you solving, and how did this concept keep the UI predictable or maintainable? Strong answers name tradeoffs—not only what the API does.\n\nReact's ecosystem (routing, data libraries, testing tools) assumes you understand this idea. Mention how it interacts with hooks, rendering, or TypeScript where relevant, and contrast with naive DOM manipulation or class-heavy patterns when helpful."
    },
    {
      "question": "Class componentDidMount equivalent?",
      "explanation": "useEffect(() => { ... }, []) runs after paint; in Strict Mode (dev) setup+cleanup run twice to expose missing cleanups.\n\nIn Component Lifecycle interviews, connect this to a concrete scenario: what user problem were you solving, and how did this concept keep the UI predictable or maintainable? Strong answers name tradeoffs—not only what the API does.\n\nReact's ecosystem (routing, data libraries, testing tools) assumes you understand this idea. Mention how it interacts with hooks, rendering, or TypeScript where relevant, and contrast with naive DOM manipulation or class-heavy patterns when helpful."
    },
    {
      "question": "getDerivedStateFromProps equivalent?",
      "explanation": "Derive values from props during render, store only user edits, or remount with key—avoid setState in render to mirror props.\n\nIn Component Lifecycle interviews, connect this to a concrete scenario: what user problem were you solving, and how did this concept keep the UI predictable or maintainable? Strong answers name tradeoffs—not only what the API does.\n\nReact's ecosystem (routing, data libraries, testing tools) assumes you understand this idea. Mention how it interacts with hooks, rendering, or TypeScript where relevant, and contrast with naive DOM manipulation or class-heavy patterns when helpful."
    },
    {
      "question": "shouldComponentUpdate equivalent?",
      "explanation": "React.memo(Component, arePropsEqual?) skips re-renders; useMemo caches values, not component renders.\n\nIn Component Lifecycle interviews, connect this to a concrete scenario: what user problem were you solving, and how did this concept keep the UI predictable or maintainable? Strong answers name tradeoffs—not only what the API does.\n\nReact's ecosystem (routing, data libraries, testing tools) assumes you understand this idea. Mention how it interacts with hooks, rendering, or TypeScript where relevant, and contrast with naive DOM manipulation or class-heavy patterns when helpful."
    },
    {
      "question": "componentWillUnmount equivalent?",
      "explanation": "Return a cleanup function from useEffect or useLayoutEffect.\n\nIn Component Lifecycle interviews, connect this to a concrete scenario: what user problem were you solving, and how did this concept keep the UI predictable or maintainable? Strong answers name tradeoffs—not only what the API does.\n\nReact's ecosystem (routing, data libraries, testing tools) assumes you understand this idea. Mention how it interacts with hooks, rendering, or TypeScript where relevant, and contrast with naive DOM manipulation or class-heavy patterns when helpful."
    },
    {
      "question": "Why no componentWillMount?",
      "explanation": "Deprecated for side effects before paint and SSR issues; use render for pure work and effects after commit in function components.\n\nIn Component Lifecycle interviews, connect this to a concrete scenario: what user problem were you solving, and how did this concept keep the UI predictable or maintainable? Strong answers name tradeoffs—not only what the API does.\n\nReact's ecosystem (routing, data libraries, testing tools) assumes you understand this idea. Mention how it interacts with hooks, rendering, or TypeScript where relevant, and contrast with naive DOM manipulation or class-heavy patterns when helpful."
    },
    {
      "question": "What is Strict Mode double mount?",
      "explanation": "Dev-only: mount → unmount → remount to test effect cleanup.\n\nIn Component Lifecycle interviews, connect this to a concrete scenario: what user problem were you solving, and how did this concept keep the UI predictable or maintainable? Strong answers name tradeoffs—not only what the API does.\n\nReact's ecosystem (routing, data libraries, testing tools) assumes you understand this idea. Mention how it interacts with hooks, rendering, or TypeScript where relevant, and contrast with naive DOM manipulation or class-heavy patterns when helpful."
    }
  ]
};
