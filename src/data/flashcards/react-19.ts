import type { FlashcardDeck } from './types';

export const react19Deck: FlashcardDeck = {
  "id": "react-19",
  "slug": "react-19",
  "title": "React 19",
  "cards": [
    {
      "question": "What is Actions (React 19)?",
      "explanation": "Async functions used as <form action={fn}> or with useActionState; useTransition marks non-urgent updates (isPending)—not where you register actions.\n\n```tsx\nasync function createTodo(formData: FormData) {\n  'use server';\n  await db.todo.create({ title: formData.get('title') });\n}\n\n<form action={createTodo}>...</form>\n```\n\nInterview tip: say whether you used this in a form, navigation, or data flow—and what older pattern it replaced."
    },
    {
      "question": "What is useActionState?",
      "explanation": "Returns [state, formAction, isPending]. formAction goes on <form action={formAction}>; replaces many useFormState patterns.\n\n```tsx\nconst [state, formAction, isPending] = useActionState(saveTodo, null);\n\n<form action={formAction}>\n  <button disabled={isPending}>Save</button>\n</form>\n```\n\nInterview tip: say whether you used this in a form, navigation, or data flow—and what older pattern it replaced."
    },
    {
      "question": "What is useOptimistic?",
      "explanation": "Shows optimistic UI while async action runs; reverts on error. Pairs with Actions.\n\n```tsx\nconst [optimistic, addOptimistic] = useOptimistic(\n  todos,\n  (state, newTodo) => [...state, { ...newTodo, pending: true }]\n);\n```\n\nInterview tip: say whether you used this in a form, navigation, or data flow—and what older pattern it replaced."
    },
    {
      "question": "What is use() hook?",
      "explanation": "Reads promises or context during render; suspends until promise resolves. Enables promise-as-prop patterns.\n\n```tsx\nfunction Comments({ commentsPromise }: { commentsPromise: Promise<Comment[]> }) {\n  const comments = use(commentsPromise);\n  return comments.map((c) => <p key={c.id}>{c.text}</p>);\n}\n```\n\nInterview tip: say whether you used this in a form, navigation, or data flow—and what older pattern it replaced."
    },
    {
      "question": "What is ref as prop?",
      "explanation": "ref can be passed as a regular prop to function components without forwardRef in React 19.\n\n```tsx\nfunction TextInput({ ref, ...props }: { ref?: Ref<HTMLInputElement> }) {\n  return <input ref={ref} {...props} />;\n}\n```\n\nInterview tip: say whether you used this in a form, navigation, or data flow—and what older pattern it replaced."
    },
    {
      "question": "What is Document metadata?",
      "explanation": "```tsx\nfunction Page() {\n  return (\n    <>\n      <title>Dashboard</title>\n      <meta name=\"description\" content=\"User dashboard\" />\n      <main>...</main>\n    </>\n  );\n}\n```\n\nInterview tip: say whether you used this in a form, navigation, or data flow—and what older pattern it replaced."
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
      "explanation": "```tsx\n<ThemeContext value={theme}>\n  <App />\n</ThemeContext>\n```\n\nInterview tip: say whether you used this in a form, navigation, or data flow—and what older pattern it replaced."
    },
    {
      "question": "What is Cleanup ref callbacks?",
      "explanation": "Ref callbacks may return cleanup function when ref detaches (mirrors effect cleanup).\n\n```tsx\nref={(node) => {\n  node?.focus();\n  return () => cleanup(node);\n}}\n```\n\nInterview tip: say whether you used this in a form, navigation, or data flow—and what older pattern it replaced."
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
      "explanation": "```tsx\n<Activity mode=\"visible|hidden\"> hides UI (display:none), tears down effects, preserves state/DOM—successor to experimental Offscreen.\n```\n\nInterview tip: say whether you used this in a form, navigation, or data flow—and what older pattern it replaced."
    }
  ]
};
