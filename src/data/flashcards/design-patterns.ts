import type { FlashcardDeck } from './types';

export const designPatternsDeck: FlashcardDeck = {
  "id": "design-patterns",
  "slug": "design-patterns",
  "title": "Design Patterns",
  "cards": [
    {
      "question": "What is Compound components?",
      "explanation": "Card.Header, Card.Body share implicit context—flexible API without prop explosion.\n\n```tsx\nimport React from 'react';\nimport type { ReactNode } from 'react';\n\nconst TabsContext = createContext<{ active: number; setActive: (i: number) => void } | null>(null);\n\nfunction Tabs({ children }: { children: React.ReactNode }) {\n  const [active, setActive] = useState(0);\n  return <TabsContext value={{ active, setActive }}>{children}</TabsContext>;\n}\n\nfunction Tab({ index, children }: { index: number; children: React.ReactNode }) {\n  const ctx = useContext(TabsContext)!;\n  return (\n    <button aria-selected={ctx.active === index} onClick={() => ctx.setActive(index)}>\n      {children}\n    </button>\n  );\n}\n```\n\nTabs.List / Tabs.Panel share implicit context so consumers compose layout without prop drilling ten booleans—API stays flexible like native HTML."
    },
    {
      "question": "What is Render props?",
      "explanation": "Component receives function child: <DataFetcher render={data => ...} /> — shares logic.\n\n```tsx\nimport React from 'react';\nimport type { ReactNode } from 'react';\n\nfunction MouseTracker({ render }: { render: (pos: { x: number; y: number }) => React.ReactNode }) {\n  const [pos, setPos] = useState({ x: 0, y: 0 });\n  useEffect(() => {\n    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });\n    window.addEventListener('mousemove', move);\n    return () => window.removeEventListener('mousemove', move);\n  }, []);\n  return <>{render(pos)}</>;\n}\n```\n\nPass a function child to share data-fetching or subscription logic while letting callers own markup—precursor pattern to custom hooks."
    },
    {
      "question": "What is Higher-order component (HOC)?",
      "explanation": "withAuth(Component) wraps and injects props—less common with hooks.\n\n```tsx\nimport React from 'react';\nimport type { ComponentType } from 'react';\n\nfunction withAuth<P>(Component: React.ComponentType<P & { user: User }>) {\n  return function Authed(props: P) {\n    const user = useAuth();\n    if (!user) return <LoginPrompt />;\n    return <Component {...props} user={user} />;\n  };\n}\n```\n\nWrap components to inject cross-cutting props (auth, analytics)—prefer hooks today unless you need to enhance class components or legacy libraries."
    },
    {
      "question": "What is Custom hooks pattern?",
      "explanation": "Primary reuse mechanism: useForm, useAuth encapsulate stateful logic.\n\n```tsx\nimport { useState } from 'react';\nimport { useForm } from 'react-hook-form';\n\nfunction useForm<T extends Record<string, string>>(initial: T) {\n  const [values, setValues] = useState(initial);\n  const set = (key: keyof T, value: string) =>\n    setValues((v) => ({ ...v, [key]: value }));\n  return { values, set };\n}\n```\n\nuseForm, useMediaQuery, and usePagination bundle state + effects—multiple components share behavior without inheritance or render-prop nesting."
    },
    {
      "question": "What is Provider pattern?",
      "explanation": "Context supplies tree-wide dependencies (theme, i18n).\n\n```tsx\nimport React from 'react';\nimport type { ReactNode } from 'react';\n\nconst I18nContext = createContext<TranslateFn>(defaultT);\n\nfunction I18nProvider({ children }: { children: React.ReactNode }) {\n  const t = useMemo(() => createTranslator(locale), [locale]);\n  return <I18nContext value={t}>{children}</I18nContext>;\n}\n```\n\nContext providers inject theme, locale, or auth without prop drilling—keep provider values stable or memoized to limit subtree re-renders."
    },
    {
      "question": "What is Controlled component pattern?",
      "explanation": "Parent owns value; child notifies via onChange—forms, inputs.\n\n```tsx\nimport { useState } from 'react';\n\nfunction Parent() {\n  const [email, setEmail] = useState('');\n  return (\n    <input\n      value={email}\n      onChange={(e) => setEmail(e.target.value)}\n      aria-invalid={!email.includes('@')}\n    />\n  );\n}\n```\n\nParent owns value state; child is a thin input that fires onChange—enables instant validation and dependent fields across the form."
    },
    {
      "question": "What is State reducer pattern?",
      "explanation": "```tsx\ntype Action =\n  | { type: 'add'; item: LineItem }\n  | { type: 'remove'; id: string };\n\nfunction cartReducer(state: Cart, action: Action): Cart {\n  switch (action.type) {\n    case 'add': return { items: [...state.items, action.item] };\n    case 'remove': return { items: state.items.filter((i) => i.id !== action.id) };\n    default: return state;\n  }\n}\n```\n\nuseReducer with typed actions documents every transition—checkout flows and wizards benefit more than a cluster of related useState calls."
    },
    {
      "question": "What is Facade pattern?",
      "explanation": "Simple hook hides complex subsystem (useCheckout over cart+payment APIs).\n\n```tsx\nfunction useCheckout() {\n  const cart = useCart();\n  const tax = useTaxQuote(cart.items);\n  const pay = usePayment();\n  return { total: cart.subtotal + tax, submit: pay.charge };\n}\n```\n\nA single useCheckout hook hides cart, tax, and payment modules—UI calls one API while internals can refactor without touching pages."
    },
    {
      "question": "What is Observer pattern?",
      "explanation": "Subscriptions in useEffect; event emitters; external store listeners.\n\n```tsx\nimport { useEffect } from 'react';\n\nuseEffect(() => {\n  const off = bus.on('cart:updated', setCount);\n  return off;\n}, []);\n```\n\nSubscribe in useEffect to external stores, event buses, or media queries; return unsubscribe on cleanup to avoid leaks under Strict Mode."
    },
    {
      "question": "What is Strategy pattern?",
      "explanation": "Swap algorithms via props: validationStrategy, paymentStrategy.\n\n```tsx\nimport React from 'react';\n\nfunction CheckoutForm({ validate }: { validate: (v: Form) => Errors }) {\n  const errors = validate(values);\n  return <Form errors={errors} />;\n}\n```\n\nSwap validation or pricing algorithms via props without branching inside the component—keeps Open/Closed principle for A/B payment providers."
    },
    {
      "question": "What is Portal pattern?",
      "explanation": "Modals/tooltips render outside parent DOM hierarchy via createPortal.\n\n```tsx\nimport React from 'react';\nimport { createPortal } from 'react-dom';\n\nreturn createPortal(\n  <div role=\"dialog\" aria-modal=\"true\">{children}</div>,\n  document.getElementById('modal-root')!\n);\n```\n\nRender modals and tooltips into document.body so overflow:hidden ancestors do not clip them—focus trap logic still belongs in the modal component."
    },
    {
      "question": "What is Slot pattern?",
      "explanation": "children or named slots (header, footer props) for layout composition.\n\n```tsx\nimport React from 'react';\nimport type { ReactNode } from 'react';\n\nfunction Card({ header, children, footer }: {\n  header?: React.ReactNode;\n  children: React.ReactNode;\n  footer?: React.ReactNode;\n}) {\n  return (\n    <article>\n      {header && <header>{header}</header>}\n      <div>{children}</div>\n      {footer && <footer>{footer}</footer>}\n    </article>\n  );\n}\n```\n\nNamed slots via header/footer props or children composition replace boolean showHeader props—layout components stay predictable."
    },
    {
      "question": "What is Polymorphic components?",
      "explanation": "as prop renders as button or anchor with shared styles (Button as=\"a\").\n\n```tsx\nimport React from 'react';\nimport type { ComponentPropsWithoutRef, ElementType } from 'react';\n\ntype Props<T extends React.ElementType> = {\n  as?: T;\n} & React.ComponentPropsWithoutRef<T>;\n\nfunction Text<T extends React.ElementType = 'span'>({ as, ...props }: Props<T>) {\n  const Comp = as ?? 'span';\n  return <Comp {...props} />;\n}\n```\n\nAn as prop renders Button styles on <a> or <button> while preserving correct props typing via generics—one styled primitive, many semantics."
    },
    {
      "question": "What is Headless UI?",
      "explanation": "Logic-only hooks/components; consumer supplies styles (Radix, React Aria).\n\n```tsx\nimport * as Dialog from '@radix-ui/react-dialog';\nimport React from 'react';\n\n<Dialog.Root>\n  <Dialog.Trigger>Open</Dialog.Trigger>\n  <Dialog.Portal>\n    <Dialog.Content>…</Dialog.Content>\n  </Dialog.Portal>\n</Dialog.Root>\n```\n\nRadix and React Aria ship behavior and accessibility; you supply CSS—faster than reimplementing focus traps and aria for every design system."
    },
    {
      "question": "What is Anti-pattern: giant components?",
      "explanation": "Split by responsibility; extract hooks and subcomponents.\n\n```tsx\nimport React from 'react';\n\nfunction CheckoutPage() {\n  const checkout = useCheckout();\n  return (\n    <>\n      <CheckoutSummary {...checkout} />\n      <PaymentForm onSubmit={checkout.submit} />\n    </>\n  );\n}\n```\n\n500-line components mix fetch, form, and layout—extract hooks and subcomponents when you need scroll to understand one responsibility."
    }
  ]
};
