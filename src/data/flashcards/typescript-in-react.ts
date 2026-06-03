import type { FlashcardDeck } from './types';

export const typescriptInReactDeck: FlashcardDeck = {
  "id": "typescript-in-react",
  "slug": "typescript",
  "title": "TypeScript in React",
  "cards": [
    {
      "question": "What is Typing component props?",
      "explanation": "```tsx\nimport React from 'react';\n\ntype CardProps = {\n  title: string;\n  count?: number;\n};\n\nfunction Card({ title, count = 0 }: CardProps) {\n  return <h2>{title} ({count})</h2>;\n}\n```\n\nA named Props type documents the public API and enables reuse in wrappers; default optional props in the destructuring pattern instead of defaultProps on function components."
    },
    {
      "question": "React.FC vs function signature?",
      "explanation": "Prefer explicit props types on plain functions. Modern @types/react no longer adds implicit children to FC; FC is rarely needed.\n\n```tsx\nimport React from 'react';\nimport type { FC } from 'react';\n\nfunction Button({ label }: { label: string }) {\n  return <button type=\"button\">{label}</button>;\n}\n\n// Rarely needed:\nconst Legacy: React.FC<{ label: string }> = ({ label }) => (\n  <button type=\"button\">{label}</button>\n);\n```\n\nPlain function components with explicit props types are the modern default—React.FC adds little today and historically implied children you might not want."
    },
    {
      "question": "What is Typing useState?",
      "explanation": "```tsx\nimport { useState } from 'react';\n\nconst [user, setUser] = useState<User | null>(null);\nconst [tags, setTags] = useState<string[]>([]);\nconst [status, setStatus] = useState<'idle' | 'busy'>('idle');\n```\n\nPass a generic when the initial value is ambiguous—useState([]) infers never[] unless you write useState<string[]>([]) or useState<User | null>(null)."
    },
    {
      "question": "What is Typing events?",
      "explanation": "```tsx\nimport React from 'react';\nimport type { ChangeEvent } from 'react';\n\nfunction onChange(e: React.ChangeEvent<HTMLInputElement>) {\n  setName(e.currentTarget.value);\n}\n\nfunction onSubmit(e: React.FormEvent<HTMLFormElement>) {\n  e.preventDefault();\n}\n```\n\nUse React.ChangeEvent for inputs, MouseEvent for buttons, and FormEvent for onSubmit—generic element types catch target mistakes at compile time."
    },
    {
      "question": "What is Typing children?",
      "explanation": "```tsx\nimport React from 'react';\nimport type { ReactNode } from 'react';\n\ntype PanelProps = { title: string; children: React.ReactNode };\n\nfunction Panel({ title, children }: PanelProps) {\n  return (\n    <section>\n      <h2>{title}</h2>\n      {children}\n    </section>\n  );\n}\n```\n\nReact.ReactNode accepts strings, numbers, fragments, and portals; React.ReactElement is stricter when you only want a single element child."
    },
    {
      "question": "What is Generic components?",
      "explanation": "```tsx\nimport React from 'react';\nimport type { ReactNode } from 'react';\n\nfunction List<T>({\n  items,\n  render,\n}: {\n  items: T[];\n  render: (item: T) => React.ReactNode;\n}) {\n  return <ul>{items.map((item, i) => <li key={i}>{render(item)}</li>)}</ul>;\n}\n```\n\nGeneric list/table components preserve item type through render props—callers get autocomplete on item without casting from unknown."
    },
    {
      "question": "What is ComponentProps utility?",
      "explanation": "```tsx\nimport React from 'react';\nimport type { ComponentProps, ReactNode } from 'react';\n\ntype IconButtonProps = React.ComponentProps<typeof Button> & {\n  icon: React.ReactNode;\n};\n\nfunction IconButton({ icon, children, ...props }: IconButtonProps) {\n  return (\n    <Button {...props}>\n      {icon}\n      {children}\n    </Button>\n  );\n}\n```\n\nComponentProps<typeof Button> stays in sync when the base component props change—ideal for styled wrappers that forward most props."
    },
    {
      "question": "What is Ref typing?",
      "explanation": "```tsx\nimport { useRef } from 'react';\n\nconst inputRef = useRef<HTMLInputElement>(null);\n\nfunction focus() {\n  inputRef.current?.focus();\n}\n\nreturn <input ref={inputRef} />;\n```\n\nuseRef<HTMLInputElement>(null) for DOM nodes; MutableRefObject when you assign .current yourself; RefObject when React owns updates via ref prop."
    },
    {
      "question": "What is Discriminated unions in UI?",
      "explanation": "```tsx\nimport React from 'react';\n\ntype LoadState =\n  | { status: 'loading' }\n  | { status: 'ok'; data: User[] }\n  | { status: 'error'; message: string };\n\nfunction Users({ state }: { state: LoadState }) {\n  if (state.status === 'loading') return <Spinner />;\n  if (state.status === 'error') return <p>{state.message}</p>;\n  return <List users={state.data} />;\n}\n```\n\nA status field narrows the whole object in if/switch—TypeScript knows data exists only when status is \"ok\", eliminating optional chaining soup."
    },
    {
      "question": "What is as const?",
      "explanation": "```tsx\nimport React from 'react';\n\nconst sizes = ['sm', 'md', 'lg'] as const;\ntype Size = (typeof sizes)[number];\n\nfunction Badge({ size }: { size: Size }) {\n  return <span className={`badge-${size}`} />;\n}\n```\n\nLiteral arrays and objects become readonly unions—perfect for variant props like size=\"sm\" | \"md\" derived from a single source of truth."
    },
    {
      "question": "What is satisfies operator?",
      "explanation": "Ensures object matches type while preserving literal inference: const theme = { ... } satisfies Theme.\n\n```tsx\ntype Theme = { color: string; radius: number };\n\nconst theme = {\n  color: '#863bff',\n  radius: 8,\n} satisfies Theme;\n```\n\nValidates an object against Theme (or similar) while preserving literal types for keys—better than annotating with Theme which widens literals."
    },
    {
      "question": "What is Typing context?",
      "explanation": "```tsx\nimport { createContext, useContext } from 'react';\n\nconst AuthContext = createContext<Auth | null>(null);\n\nfunction useAuth() {\n  const ctx = useContext(AuthContext);\n  if (!ctx) throw new Error('useAuth must be used within AuthProvider');\n  return ctx;\n}\n```\n\nNullable context plus a throwing useAuth hook forces consumers to handle the provider boundary explicitly instead of sprinkling non-null assertions."
    },
    {
      "question": "What is Ref as prop (React 19)?",
      "explanation": "Function components can accept ref as a normal prop; forwardRef is optional for older React or library interop.\n\n```tsx\nimport React from 'react';\nimport type { ComponentProps, Ref } from 'react';\n\ntype InputProps = React.ComponentProps<'input'> & {\n  ref?: React.Ref<HTMLInputElement>;\n};\n\nfunction TextInput({ ref, ...props }: InputProps) {\n  return <input ref={ref} {...props} />;\n}\n```\n\nFunction components can accept ref in props without forwardRef—libraries supporting React 18 may still export forwardRef wrappers for compatibility."
    },
    {
      "question": "What is Module augmentation?",
      "explanation": "Extend CSS modules or third-party types via declare module \"...\" { }\n\n```tsx\ndeclare module '*.module.css' {\n  const classes: { readonly [key: string]: string };\n  export default classes;\n}\n```\n\nExtend third-party or asset modules in a .d.ts file so imports like *.module.css or untyped packages get proper typings project-wide."
    },
    {
      "question": "What is strictNullChecks impact?",
      "explanation": "Forces handling undefined/null; optional chaining and guards in render paths.\n\n```tsx\nimport React from 'react';\n\nfunction Greeting({ name }: { name?: string }) {\n  if (!name) return <p>Hello, guest</p>;\n  return <p>Hello, {name.toUpperCase()}</p>;\n}\n```\n\nWith strictNullChecks, optional props and nullable API fields must be narrowed before use—optional chaining and early returns keep render paths safe."
    }
  ]
};
