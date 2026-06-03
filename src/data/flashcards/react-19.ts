import type { FlashcardDeck } from './types';

export const react19Deck: FlashcardDeck = {
  "id": "react-19",
  "slug": "react-19",
  "title": "React 19",
  "cards": [
    {
      "question": "What is Actions (React 19)?",
      "explanation": "Async functions used as <form action={fn}> or with useActionState; useTransition marks non-urgent updates (isPending)—not where you register actions.\n\n```tsx\nimport { use } from 'react';\n\nasync function createTodo(formData: FormData) {\n  'use server';\n  await db.todo.create({ title: String(formData.get('title')) });\n}\n\nexport function NewTodoForm() {\n  return (\n    <form action={createTodo}>\n      <input name=\"title\" required />\n      <button type=\"submit\">Add</button>\n    </form>\n  );\n}\n```\n\nPass an async function to form action so React handles pending state and transitions—distinct from startTransition, which marks updates non-urgent rather than wiring form submission."
    },
    {
      "question": "What is useActionState?",
      "explanation": "Returns [state, formAction, isPending]. formAction goes on <form action={formAction}>; replaces many useFormState patterns.\n\n```tsx\nimport { useActionState } from 'react';\n\ntype State = { ok: boolean; message: string } | null;\n\nconst [state, formAction, isPending] = useActionState(saveTodo, null);\n\nreturn (\n  <form action={formAction}>\n    <input name=\"title\" />\n    <button disabled={isPending}>Save</button>\n    {state?.message && <p role=\"status\">{state.message}</p>}\n  </form>\n);\n```\n\nReturns [state, formAction, isPending]—bind formAction to <form action> for progressive enhancement with server-returned validation messages."
    },
    {
      "question": "What is useOptimistic?",
      "explanation": "Shows optimistic UI while async action runs; reverts on error. Pairs with Actions.\n\n```tsx\nimport { useOptimistic } from 'react';\n\nconst [todos, addOptimistic] = useOptimistic(\n  serverTodos,\n  (current, optimistic: Todo) => [...current, { ...optimistic, pending: true }]\n);\n\nasync function add(formData: FormData) {\n  const draft = { id: crypto.randomUUID(), title: String(formData.get('title')) };\n  addOptimistic(draft);\n  await createTodo(formData);\n}\n```\n\nShow tentative UI while an action is in flight; React reverts to the real state if the server rejects the update—pairs naturally with Actions and mutations."
    },
    {
      "question": "What is use() hook?",
      "explanation": "Reads promises or context during render; suspends until promise resolves. Enables promise-as-prop patterns.\n\n```tsx\nimport { use } from 'react';\n\nfunction Comments({ commentsPromise }: { commentsPromise: Promise<Comment[]> }) {\n  const comments = use(commentsPromise);\n  return comments.map((c) => <p key={c.id}>{c.text}</p>);\n}\n```\n\nReads a promise or context during render and suspends until resolved—must sit under a Suspense boundary; enables promise-as-prop without useEffect + useState."
    },
    {
      "question": "What is ref as prop?",
      "explanation": "ref can be passed as a regular prop to function components without forwardRef in React 19.\n\n```tsx\nimport React from 'react';\nimport type { ComponentProps, Ref } from 'react';\n\nfunction TextInput({\n  ref,\n  ...props\n}: React.ComponentProps<'input'> & { ref?: React.Ref<HTMLInputElement> }) {\n  return <input ref={ref} {...props} />;\n}\n```\n\nParents pass ref like any other prop in React 19—drop forwardRef in new code unless you ship a library that must support React 18 consumers."
    },
    {
      "question": "What is Document metadata?",
      "explanation": "```tsx\nimport React from 'react';\n\nfunction BlogPost({ post }: { post: Post }) {\n  return (\n    <>\n      <title>{post.title}</title>\n      <meta name=\"description\" content={post.excerpt} />\n      <article>{post.body}</article>\n    </>\n  );\n}\n```\n\nRender <title> and <meta> in route components; supporting frameworks hoist them to document head without react-helmet for common cases."
    },
    {
      "question": "What is Improved hydration errors?",
      "explanation": "React 19 improves hydration mismatch messages and selective hydration; you still fix server/client HTML differences at the source.\n\n```tsx\nimport { useId } from 'react';\n\n// Bad on server + client mismatch:\n// <span>{Date.now()}</span>\n\nconst id = useId();\nreturn <label htmlFor={id}>Name</label>;\n```\n\nReact 19 surfaces clearer mismatch diagnostics, but the fix is still aligning server HTML with the first client render—random IDs and Date.now() in SSR are frequent culprits."
    },
    {
      "question": "What is Server Components in frameworks?",
      "explanation": "Frameworks (e.g. Next App Router) default routes to Server Components; server code is not in the client bundle, but client boundaries still ship JS + RSC payload.\n\n```tsx\nimport React from 'react';\n\n// app/page.tsx — server by default\nexport default async function Page() {\n  const posts = await fetchPosts();\n  return <PostList posts={posts} />;\n}\n```\n\nNext App Router treats route modules as Server Components by default—only \"use client\" boundaries ship hook/effect code; server logic never enters the client bundle."
    },
    {
      "question": "What is Form reset behavior?",
      "explanation": "Forms can reset uncontrolled fields after action success; better integration with Actions.\n\n```tsx\nimport React from 'react';\n\n<form action={submitContact}>\n  <input name=\"email\" defaultValue=\"\" />\n  <button type=\"submit\">Send</button>\n</form>\n```\n\nAfter a successful action, React can reset uncontrolled fields automatically—reduces manual reset() calls when using native form controls with Actions."
    },
    {
      "question": "What is Context as provider?",
      "explanation": "```tsx\nimport { createContext, useState } from 'react';\n\nconst ThemeContext = createContext<'light' | 'dark'>('light');\n\nexport function App() {\n  const [theme, setTheme] = useState<'light' | 'dark'>('light');\n  return (\n    <ThemeContext value={theme}>\n      <Toolbar onToggle={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))} />\n    </ThemeContext>\n  );\n}\n```\n\nRender <ThemeContext value={theme}> directly—Provider shorthand still works in older examples but the element form is the modern JSX style."
    },
    {
      "question": "What is Cleanup ref callbacks?",
      "explanation": "Ref callbacks may return cleanup function when ref detaches (mirrors effect cleanup).\n\n```tsx\nimport React from 'react';\n\n<div\n  ref={(node) => {\n    if (!node) return;\n    const ro = new ResizeObserver(() => setWidth(node.offsetWidth));\n    ro.observe(node);\n    return () => ro.disconnect();\n  }}\n/>\n```\n\nRef callbacks may return a cleanup function when the node unmounts—mirrors useEffect cleanup for focus traps or measuring observers tied to a DOM node."
    },
    {
      "question": "What is Automatic batching (React 18+)?",
      "explanation": "React batches multiple setStates in events, promises, and timeouts into one render; React 19 continues this behavior—it is not unique to 19.\n\n```tsx\nasync function save() {\n  setSaving(true);\n  await api.save();\n  setSaving(false);\n  setLastSaved(Date.now());\n  // One re-render after await in React 18+\n}\n```\n\nMultiple setStates inside promises, timeouts, and native events batch into one render in React 18+—React 19 continues this; do not rely on synchronous intermediate renders."
    },
    {
      "question": "What is Deprecated: defaultProps on FC?",
      "explanation": "Use default parameters in function signature instead for function components.\n\n```tsx\nimport React from 'react';\n\nfunction Greeting({ name = 'Guest' }: { name?: string }) {\n  return <p>Hello, {name}</p>;\n}\n```\n\nDefault parameters in the function signature replace defaultProps for function components—defaultProps remains relevant for class components only."
    },
    {
      "question": "What is Suspense + streaming?",
      "explanation": "Server streams HTML with placeholders; client hydrates incrementally.\n\n```tsx\nimport { Suspense } from 'react';\n\nexport default function Page() {\n  return (\n    <Suspense fallback={<Skeleton />}>\n      <SlowComments />\n    </Suspense>\n  );\n}\n```\n\nServer streams HTML with Suspense fallbacks first, then fills holes as data resolves—client hydrates incrementally instead of blocking on the slowest query."
    },
    {
      "question": "What is Activity component (React 19.2+)?",
      "explanation": "```tsx\nimport React from 'react';\n\n<Activity mode={tab === 'settings' ? 'visible' : 'hidden'}>\n  <SettingsPanel />\n</Activity>\n```\n\nActivity hidden mode preserves state/DOM but tears down effects—use for pre-rendered tabs or off-screen panels instead of unmounting expensive trees."
    }
  ]
};
