import type { FlashcardDeck } from './types';

export const react19Deck: FlashcardDeck = {
  "id": "react-19",
  "slug": "react-19",
  "title": "React 19",
  "cards": [
    {
      "question": "What is Actions (React 19)?",
      "explanation": "Async functions used as <form action={fn}> or with useActionState; useTransition marks non-urgent updates (isPending)—not where you register actions.\n\nIn React 19 interviews, connect this to a concrete scenario: what user problem were you solving, and how did this concept keep the UI predictable or maintainable? Strong answers name tradeoffs—not only what the API does.\n\nReact's ecosystem (routing, data libraries, testing tools) assumes you understand this idea. Mention how it interacts with hooks, rendering, or TypeScript where relevant, and contrast with naive DOM manipulation or class-heavy patterns when helpful."
    },
    {
      "question": "What is useActionState?",
      "explanation": "Returns [state, formAction, isPending]. formAction goes on <form action={formAction}>; replaces many useFormState patterns.\n\nIn React 19 interviews, connect this to a concrete scenario: what user problem were you solving, and how did this concept keep the UI predictable or maintainable? Strong answers name tradeoffs—not only what the API does.\n\nReact's ecosystem (routing, data libraries, testing tools) assumes you understand this idea. Mention how it interacts with hooks, rendering, or TypeScript where relevant, and contrast with naive DOM manipulation or class-heavy patterns when helpful."
    },
    {
      "question": "What is useOptimistic?",
      "explanation": "Shows optimistic UI while async action runs; reverts on error. Pairs with Actions.\n\nIn React 19 interviews, connect this to a concrete scenario: what user problem were you solving, and how did this concept keep the UI predictable or maintainable? Strong answers name tradeoffs—not only what the API does.\n\nReact's ecosystem (routing, data libraries, testing tools) assumes you understand this idea. Mention how it interacts with hooks, rendering, or TypeScript where relevant, and contrast with naive DOM manipulation or class-heavy patterns when helpful."
    },
    {
      "question": "What is use() hook?",
      "explanation": "Reads promises or context during render; suspends until promise resolves. Enables promise-as-prop patterns.\n\nIn React 19 interviews, connect this to a concrete scenario: what user problem were you solving, and how did this concept keep the UI predictable or maintainable? Strong answers name tradeoffs—not only what the API does.\n\nReact's ecosystem (routing, data libraries, testing tools) assumes you understand this idea. Mention how it interacts with hooks, rendering, or TypeScript where relevant, and contrast with naive DOM manipulation or class-heavy patterns when helpful."
    },
    {
      "question": "What is ref as prop?",
      "explanation": "ref can be passed as a regular prop to function components without forwardRef in React 19.\n\nIn React 19 interviews, connect this to a concrete scenario: what user problem were you solving, and how did this concept keep the UI predictable or maintainable? Strong answers name tradeoffs—not only what the API does.\n\nReact's ecosystem (routing, data libraries, testing tools) assumes you understand this idea. Mention how it interacts with hooks, rendering, or TypeScript where relevant, and contrast with naive DOM manipulation or class-heavy patterns when helpful."
    },
    {
      "question": "What is Document metadata?",
      "explanation": "<title>, <meta> in components hoist to document head automatically in supporting environments.\n\nIn React 19 interviews, connect this to a concrete scenario: what user problem were you solving, and how did this concept keep the UI predictable or maintainable? Strong answers name tradeoffs—not only what the API does.\n\nReact's ecosystem (routing, data libraries, testing tools) assumes you understand this idea. Mention how it interacts with hooks, rendering, or TypeScript where relevant, and contrast with naive DOM manipulation or class-heavy patterns when helpful."
    },
    {
      "question": "What is Improved hydration errors?",
      "explanation": "React 19 improves hydration mismatch messages and selective hydration; you still fix server/client HTML differences at the source.\n\nIn React 19 interviews, connect this to a concrete scenario: what user problem were you solving, and how did this concept keep the UI predictable or maintainable? Strong answers name tradeoffs—not only what the API does.\n\nReact's ecosystem (routing, data libraries, testing tools) assumes you understand this idea. Mention how it interacts with hooks, rendering, or TypeScript where relevant, and contrast with naive DOM manipulation or class-heavy patterns when helpful."
    },
    {
      "question": "What is Server Components in frameworks?",
      "explanation": "Frameworks (e.g. Next App Router) default routes to Server Components; server code is not in the client bundle, but client boundaries still ship JS + RSC payload.\n\nIn React 19 interviews, connect this to a concrete scenario: what user problem were you solving, and how did this concept keep the UI predictable or maintainable? Strong answers name tradeoffs—not only what the API does.\n\nReact's ecosystem (routing, data libraries, testing tools) assumes you understand this idea. Mention how it interacts with hooks, rendering, or TypeScript where relevant, and contrast with naive DOM manipulation or class-heavy patterns when helpful."
    },
    {
      "question": "What is Form reset behavior?",
      "explanation": "Forms can reset uncontrolled fields after action success; better integration with Actions.\n\nIn React 19 interviews, connect this to a concrete scenario: what user problem were you solving, and how did this concept keep the UI predictable or maintainable? Strong answers name tradeoffs—not only what the API does.\n\nReact's ecosystem (routing, data libraries, testing tools) assumes you understand this idea. Mention how it interacts with hooks, rendering, or TypeScript where relevant, and contrast with naive DOM manipulation or class-heavy patterns when helpful."
    },
    {
      "question": "What is Context as provider?",
      "explanation": "<ThemeContext value={theme}> instead of .Provider shorthand in modern React.\n\nIn React 19 interviews, connect this to a concrete scenario: what user problem were you solving, and how did this concept keep the UI predictable or maintainable? Strong answers name tradeoffs—not only what the API does.\n\nReact's ecosystem (routing, data libraries, testing tools) assumes you understand this idea. Mention how it interacts with hooks, rendering, or TypeScript where relevant, and contrast with naive DOM manipulation or class-heavy patterns when helpful."
    },
    {
      "question": "What is Cleanup ref callbacks?",
      "explanation": "Ref callbacks may return cleanup function when ref detaches (mirrors effect cleanup).\n\nIn React 19 interviews, connect this to a concrete scenario: what user problem were you solving, and how did this concept keep the UI predictable or maintainable? Strong answers name tradeoffs—not only what the API does.\n\nReact's ecosystem (routing, data libraries, testing tools) assumes you understand this idea. Mention how it interacts with hooks, rendering, or TypeScript where relevant, and contrast with naive DOM manipulation or class-heavy patterns when helpful."
    },
    {
      "question": "What is Automatic batching (React 18+)?",
      "explanation": "React batches multiple setStates in events, promises, and timeouts into one render; React 19 continues this behavior—it is not unique to 19.\n\nIn React 19 interviews, connect this to a concrete scenario: what user problem were you solving, and how did this concept keep the UI predictable or maintainable? Strong answers name tradeoffs—not only what the API does.\n\nReact's ecosystem (routing, data libraries, testing tools) assumes you understand this idea. Mention how it interacts with hooks, rendering, or TypeScript where relevant, and contrast with naive DOM manipulation or class-heavy patterns when helpful."
    },
    {
      "question": "What is Deprecated: defaultProps on FC?",
      "explanation": "Use default parameters in function signature instead for function components.\n\nIn React 19 interviews, connect this to a concrete scenario: what user problem were you solving, and how did this concept keep the UI predictable or maintainable? Strong answers name tradeoffs—not only what the API does.\n\nReact's ecosystem (routing, data libraries, testing tools) assumes you understand this idea. Mention how it interacts with hooks, rendering, or TypeScript where relevant, and contrast with naive DOM manipulation or class-heavy patterns when helpful."
    },
    {
      "question": "What is Suspense + streaming?",
      "explanation": "Server streams HTML with placeholders; client hydrates incrementally.\n\nIn React 19 interviews, connect this to a concrete scenario: what user problem were you solving, and how did this concept keep the UI predictable or maintainable? Strong answers name tradeoffs—not only what the API does.\n\nReact's ecosystem (routing, data libraries, testing tools) assumes you understand this idea. Mention how it interacts with hooks, rendering, or TypeScript where relevant, and contrast with naive DOM manipulation or class-heavy patterns when helpful."
    },
    {
      "question": "What is Activity component (React 19.2+)?",
      "explanation": "<Activity mode=\"visible|hidden\"> hides UI (display:none), tears down effects, preserves state/DOM—successor to experimental Offscreen.\n\nIn React 19 interviews, connect this to a concrete scenario: what user problem were you solving, and how did this concept keep the UI predictable or maintainable? Strong answers name tradeoffs—not only what the API does.\n\nReact's ecosystem (routing, data libraries, testing tools) assumes you understand this idea. Mention how it interacts with hooks, rendering, or TypeScript where relevant, and contrast with naive DOM manipulation or class-heavy patterns when helpful."
    }
  ]
};
