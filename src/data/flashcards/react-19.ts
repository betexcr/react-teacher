import type { FlashcardDeck } from './types';

export const react19Deck: FlashcardDeck = {
  "id": "react-19",
  "slug": "react-19",
  "title": "React 19",
  "cards": [
    {
      "question": "What is Actions (React 19)?",
      "explanation": "Async functions used as <form action={fn}> or with useActionState; useTransition marks non-urgent updates (isPending)—not where you register actions.\n\nInterview tip: say whether you used this in a form, navigation, or data flow—and what older pattern it replaced."
    },
    {
      "question": "What is useActionState?",
      "explanation": "Returns [state, formAction, isPending]. formAction goes on <form action={formAction}>; replaces many useFormState patterns.\n\nInterview tip: say whether you used this in a form, navigation, or data flow—and what older pattern it replaced."
    },
    {
      "question": "What is useOptimistic?",
      "explanation": "Shows optimistic UI while async action runs; reverts on error. Pairs with Actions.\n\nInterview tip: say whether you used this in a form, navigation, or data flow—and what older pattern it replaced."
    },
    {
      "question": "What is use() hook?",
      "explanation": "Reads promises or context during render; suspends until promise resolves. Enables promise-as-prop patterns.\n\nInterview tip: say whether you used this in a form, navigation, or data flow—and what older pattern it replaced."
    },
    {
      "question": "What is ref as prop?",
      "explanation": "ref can be passed as a regular prop to function components without forwardRef in React 19.\n\nInterview tip: say whether you used this in a form, navigation, or data flow—and what older pattern it replaced."
    },
    {
      "question": "What is Document metadata?",
      "explanation": "<title>, <meta> in components hoist to document head automatically in supporting environments.\n\nInterview tip: say whether you used this in a form, navigation, or data flow—and what older pattern it replaced."
    },
    {
      "question": "What is Improved hydration errors?",
      "explanation": "React 19 improves hydration mismatch messages and selective hydration; you still fix server/client HTML differences at the source.\n\nInterview tip: say whether you used this in a form, navigation, or data flow—and what older pattern it replaced."
    },
    {
      "question": "What is Server Components in frameworks?",
      "explanation": "Frameworks (e.g. Next App Router) default routes to Server Components; server code is not in the client bundle, but client boundaries still ship JS + RSC payload.\n\nInterview tip: say whether you used this in a form, navigation, or data flow—and what older pattern it replaced."
    },
    {
      "question": "What is Form reset behavior?",
      "explanation": "Forms can reset uncontrolled fields after action success; better integration with Actions.\n\nInterview tip: say whether you used this in a form, navigation, or data flow—and what older pattern it replaced."
    },
    {
      "question": "What is Context as provider?",
      "explanation": "<ThemeContext value={theme}> instead of .Provider shorthand in modern React.\n\nInterview tip: say whether you used this in a form, navigation, or data flow—and what older pattern it replaced."
    },
    {
      "question": "What is Cleanup ref callbacks?",
      "explanation": "Ref callbacks may return cleanup function when ref detaches (mirrors effect cleanup).\n\nInterview tip: say whether you used this in a form, navigation, or data flow—and what older pattern it replaced."
    },
    {
      "question": "What is Automatic batching (React 18+)?",
      "explanation": "React batches multiple setStates in events, promises, and timeouts into one render; React 19 continues this behavior—it is not unique to 19.\n\nInterview tip: say whether you used this in a form, navigation, or data flow—and what older pattern it replaced."
    },
    {
      "question": "What is Deprecated: defaultProps on FC?",
      "explanation": "Use default parameters in function signature instead for function components.\n\nInterview tip: say whether you used this in a form, navigation, or data flow—and what older pattern it replaced."
    },
    {
      "question": "What is Suspense + streaming?",
      "explanation": "Server streams HTML with placeholders; client hydrates incrementally.\n\nInterview tip: say whether you used this in a form, navigation, or data flow—and what older pattern it replaced."
    },
    {
      "question": "What is Activity component (React 19.2+)?",
      "explanation": "<Activity mode=\"visible|hidden\"> hides UI (display:none), tears down effects, preserves state/DOM—successor to experimental Offscreen.\n\nInterview tip: say whether you used this in a form, navigation, or data flow—and what older pattern it replaced."
    }
  ]
};
