import type { FlashcardDeck } from './types';

export const typescriptInReactDeck: FlashcardDeck = {
  "id": "typescript-in-react",
  "slug": "typescript",
  "title": "TypeScript in React",
  "cards": [
    {
      "question": "What is Typing component props?",
      "explanation": "type Props = { title: string; count?: number }; function C({ title, count = 0 }: Props) {}\n\nInterview tip: point to a prop, event, or state shape you typed in a real component and what bug it caught."
    },
    {
      "question": "React.FC vs function signature?",
      "explanation": "Prefer explicit props types on plain functions. Modern @types/react no longer adds implicit children to FC; FC is rarely needed.\n\nInterview tip: point to a prop, event, or state shape you typed in a real component and what bug it caught."
    },
    {
      "question": "What is Typing useState?",
      "explanation": "useState<User | null>(null) infers union; explicit generic when initial value is ambiguous (e.g. []). useState<string[]>([]).\n\nInterview tip: point to a prop, event, or state shape you typed in a real component and what bug it caught."
    },
    {
      "question": "What is Typing events?",
      "explanation": "React.ChangeEvent<HTMLInputElement>, React.MouseEvent<HTMLButtonElement>, FormEvent for forms.\n\nInterview tip: point to a prop, event, or state shape you typed in a real component and what bug it caught."
    },
    {
      "question": "What is Typing children?",
      "explanation": "React.ReactNode accepts anything renderable; React.ReactElement is stricter.\n\nInterview tip: point to a prop, event, or state shape you typed in a real component and what bug it caught."
    },
    {
      "question": "What is Generic components?",
      "explanation": "function List<T>({ items, render }: { items: T[]; render: (item: T) => ReactNode })\n\nInterview tip: point to a prop, event, or state shape you typed in a real component and what bug it caught."
    },
    {
      "question": "What is ComponentProps utility?",
      "explanation": "ComponentProps<typeof Button> extracts props from an existing component for wrappers.\n\nInterview tip: point to a prop, event, or state shape you typed in a real component and what bug it caught."
    },
    {
      "question": "What is Ref typing?",
      "explanation": "useRef<HTMLInputElement>(null); RefObject for DOM; MutableRefObject when .current is assigned imperatively.\n\nInterview tip: point to a prop, event, or state shape you typed in a real component and what bug it caught."
    },
    {
      "question": "What is Discriminated unions in UI?",
      "explanation": "type State = { status: \"loading\" } | { status: \"ok\"; data: T }; switch on status for narrowing.\n\nInterview tip: point to a prop, event, or state shape you typed in a real component and what bug it caught."
    },
    {
      "question": "What is as const?",
      "explanation": "Narrows literals for props variants: const sizes = [\"sm\",\"md\"] as const; type Size = typeof sizes[number].\n\nInterview tip: point to a prop, event, or state shape you typed in a real component and what bug it caught."
    },
    {
      "question": "What is satisfies operator?",
      "explanation": "Ensures object matches type while preserving literal inference: const theme = { ... } satisfies Theme.\n\nInterview tip: point to a prop, event, or state shape you typed in a real component and what bug it caught."
    },
    {
      "question": "What is Typing context?",
      "explanation": "createContext<Auth | null>(null); custom hook throws if null to enforce provider.\n\nInterview tip: point to a prop, event, or state shape you typed in a real component and what bug it caught."
    },
    {
      "question": "What is Ref as prop (React 19)?",
      "explanation": "Function components can accept ref as a normal prop; forwardRef is optional for older React or library interop.\n\nInterview tip: point to a prop, event, or state shape you typed in a real component and what bug it caught."
    },
    {
      "question": "What is Module augmentation?",
      "explanation": "Extend CSS modules or third-party types via declare module \"...\" { }\n\nInterview tip: point to a prop, event, or state shape you typed in a real component and what bug it caught."
    },
    {
      "question": "What is strictNullChecks impact?",
      "explanation": "Forces handling undefined/null; optional chaining and guards in render paths.\n\nInterview tip: point to a prop, event, or state shape you typed in a real component and what bug it caught."
    }
  ]
};
