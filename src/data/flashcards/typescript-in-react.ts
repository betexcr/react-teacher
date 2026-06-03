import type { FlashcardDeck } from './types';

export const typescriptInReactDeck: FlashcardDeck = {
  "id": "typescript-in-react",
  "slug": "typescript",
  "title": "TypeScript in React",
  "cards": [
    {
      "question": "What is Typing component props?",
      "explanation": "```tsx\ntype Props = { title: string; count?: number };\n\nfunction Card({ title, count = 0 }: Props) {\n  return <h2>{title} ({count})</h2>;\n}\n```\n\nInterview tip: point to a prop, event, or state shape you typed in a real component and what bug it caught."
    },
    {
      "question": "React.FC vs function signature?",
      "explanation": "Prefer explicit props types on plain functions. Modern @types/react no longer adds implicit children to FC; FC is rarely needed.\n\n```tsx\n// Preferred\nfunction Button({ label }: { label: string }) {\n  return <button>{label}</button>;\n}\n\n// FC rarely needed today\nconst Legacy: React.FC<{ label: string }> = ({ label }) => <button>{label}</button>;\n```\n\nInterview tip: point to a prop, event, or state shape you typed in a real component and what bug it caught."
    },
    {
      "question": "What is Typing useState?",
      "explanation": "```tsx\nconst [user, setUser] = useState<User | null>(null);\nconst [tags, setTags] = useState<string[]>([]);\n```\n\nInterview tip: point to a prop, event, or state shape you typed in a real component and what bug it caught."
    },
    {
      "question": "What is Typing events?",
      "explanation": "```tsx\nfunction onChange(e: React.ChangeEvent<HTMLInputElement>) {\n  setName(e.target.value);\n}\n\nfunction onClick(e: React.MouseEvent<HTMLButtonElement>) {\n  e.preventDefault();\n}\n```\n\nInterview tip: point to a prop, event, or state shape you typed in a real component and what bug it caught."
    },
    {
      "question": "What is Typing children?",
      "explanation": "```tsx\ntype Props = { children: React.ReactNode };\n\nfunction Panel({ children }: Props) {\n  return <section>{children}</section>;\n}\n```\n\nInterview tip: point to a prop, event, or state shape you typed in a real component and what bug it caught."
    },
    {
      "question": "What is Generic components?",
      "explanation": "```tsx\nfunction List<T>({\n  items,\n  render,\n}: {\n  items: T[];\n  render: (item: T) => React.ReactNode;\n}) {\n  return <ul>{items.map((item) => <li key={String(item)}>{render(item)}</li>)}</ul>;\n}\n```\n\nInterview tip: point to a prop, event, or state shape you typed in a real component and what bug it caught."
    },
    {
      "question": "What is ComponentProps utility?",
      "explanation": "```tsx\nimport { Button } from './Button';\n\ntype ButtonProps = React.ComponentProps<typeof Button>;\n\nfunction IconButton(props: ButtonProps) {\n  return <Button {...props} aria-label=\"icon\" />;\n}\n```\n\nInterview tip: point to a prop, event, or state shape you typed in a real component and what bug it caught."
    },
    {
      "question": "What is Ref typing?",
      "explanation": "```tsx\nconst inputRef = useRef<HTMLInputElement>(null);\n\ninputRef.current?.focus();\n```\n\nInterview tip: point to a prop, event, or state shape you typed in a real component and what bug it caught."
    },
    {
      "question": "What is Discriminated unions in UI?",
      "explanation": "```tsx\ntype State =\n  | { status: 'loading' }\n  | { status: 'ok'; data: User[] }\n  | { status: 'error'; message: string };\n\nif (state.status === 'ok') {\n  return <List items={state.data} />;\n}\n```\n\nInterview tip: point to a prop, event, or state shape you typed in a real component and what bug it caught."
    },
    {
      "question": "What is as const?",
      "explanation": "```tsx\nconst sizes = ['sm', 'md', 'lg'] as const;\ntype Size = (typeof sizes)[number];\n```\n\nInterview tip: point to a prop, event, or state shape you typed in a real component and what bug it caught."
    },
    {
      "question": "What is satisfies operator?",
      "explanation": "Ensures object matches type while preserving literal inference: const theme = { ... } satisfies Theme.\n\n```tsx\nconst theme = {\n  color: '#863bff',\n  radius: 8,\n} satisfies Theme;\n```\n\nInterview tip: point to a prop, event, or state shape you typed in a real component and what bug it caught."
    },
    {
      "question": "What is Typing context?",
      "explanation": "```tsx\nconst AuthContext = createContext<Auth | null>(null);\n\nfunction useAuth() {\n  const ctx = useContext(AuthContext);\n  if (!ctx) throw new Error('useAuth requires AuthProvider');\n  return ctx;\n}\n```\n\nInterview tip: point to a prop, event, or state shape you typed in a real component and what bug it caught."
    },
    {
      "question": "What is Ref as prop (React 19)?",
      "explanation": "Function components can accept ref as a normal prop; forwardRef is optional for older React or library interop.\n\n```tsx\nfunction TextInput({ ref, ...props }: { ref?: React.Ref<HTMLInputElement> }) {\n  return <input ref={ref} {...props} />;\n}\n```\n\nInterview tip: point to a prop, event, or state shape you typed in a real component and what bug it caught."
    },
    {
      "question": "What is Module augmentation?",
      "explanation": "Extend CSS modules or third-party types via declare module \"...\" { }\n\n```tsx\ndeclare module '*.module.css' {\n  const classes: { readonly [key: string]: string };\n  export default classes;\n}\n```\n\nInterview tip: point to a prop, event, or state shape you typed in a real component and what bug it caught."
    },
    {
      "question": "What is strictNullChecks impact?",
      "explanation": "Forces handling undefined/null; optional chaining and guards in render paths.\n\n```tsx\nfunction Greeting({ name }: { name?: string }) {\n  return <p>{name?.toUpperCase() ?? 'Guest'}</p>;\n}\n```\n\nInterview tip: point to a prop, event, or state shape you typed in a real component and what bug it caught."
    }
  ]
};
