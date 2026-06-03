import type { FlashcardDeck } from './types';

export const reactFundamentalsDeck: FlashcardDeck = {
  "id": "react-fundamentals",
  "slug": "fundamentals",
  "title": "React Fundamentals",
  "cards": [
    {
      "question": "What is React and why would you use it over other libraries or frameworks?",
      "explanation": "React is a JavaScript library for building user interfaces. It uses a component-based architecture and a virtual DOM to efficiently update the UI.\n\n```tsx\nimport React from 'react';\n\nfunction Welcome({ name }: { name: string }) {\n  return <h1>Hello, {name}</h1>;\n}\n\ncreateRoot(document.getElementById('root')!).render(<Welcome name=\"Ada\" />);\n```\n\nTeams pick React for its large ecosystem and composable view layer—you pair it with your own router, data library, and meta-framework rather than adopting one monolithic stack."
    },
    {
      "question": "What is JSX, and how does it relate to React.createElement?",
      "explanation": "JSX is a syntax extension that looks like HTML embedded in JavaScript. The compiler (Babel/SWC) transforms JSX into React.createElement(type, props, ...children) calls—or the automatic JSX runtime equivalent—so React receives plain element objects.\n\n```tsx\nimport React from 'react';\n\nconst element = <h1 className=\"title\">Hello</h1>;\n// Compiles to: React.createElement(\"h1\", { className: \"title\" }, \"Hello\");\n```\n\nA component must return one expression: a single element, Fragment (<>...</>), array, or null. Fragments group siblings without an extra DOM node. JSX is optional—you can call createElement directly.\n\nTypeScript adds typing for intrinsic elements (div, input) and your components. JSX is syntactic sugar; reconciliation still works on the element objects JSX produces."
    },
    {
      "question": "What is the virtual DOM, and why does React use it?",
      "explanation": "The virtual DOM is a lightweight JavaScript representation of the UI tree. On updates, React builds a new tree, diffs it against the previous one (reconciliation), and applies the minimal set of changes to the real DOM.\n\n```tsx\nimport { useState } from 'react';\n\nfunction Counter() {\n  const [n, setN] = useState(0);\n  // You describe the whole UI; React diffs and patches the DOM\n  return <button onClick={() => setN((c) => c + 1)}>{n}</button>;\n}\n```\n\nFiber lets React pause and resume diff work—virtual DOM is not \"always faster than direct DOM\"; it batches declarative updates so you avoid hand-tuning every node."
    },
    {
      "question": "What is the difference between controlled and uncontrolled components?",
      "explanation": "A controlled component has its form value driven by React state: you pass value (or checked) and update via onChange/onInput. React is the single source of truth.\n\n```tsx\nimport { useRef, useState } from 'react';\n\nconst [email, setEmail] = useState(\"\");\n<input value={email} onChange={(e) => setEmail(e.target.value)} />\n\nconst inputRef = useRef<HTMLInputElement>(null);\n<input ref={inputRef} defaultValue=\"\" /> // uncontrolled\n```\n\nAn uncontrolled component stores value in the DOM; you read it via a ref when needed (e.g., on submit). Controlled inputs enable live validation and dependent UI; uncontrolled can reduce re-renders for simple forms.\n\nReact Hook Form often uses refs internally for performance while still exposing validation APIs—a hybrid pattern worth mentioning when discussing form architecture."
    },
    {
      "question": "What are props in React, and how are they different from state?",
      "explanation": "Props are read-only inputs passed from parent to child. They describe how a child should render or behave. Changing props in a parent triggers a child re-render.\n\n```tsx\nimport { useState } from 'react';\n\nfunction Parent() {\n  const [count, setCount] = useState(0);\n  return <Child count={count} onIncrement={() => setCount((c) => c + 1)} />;\n}\n```\n\nState is owned by the component that declares it and can change over time via setState/useState. Props flow down; state is local unless lifted or shared via context.\n\nFor objects and functions passed as props, referential equality matters for memoization—stable references (useCallback/useMemo) prevent unnecessary child renders."
    },
    {
      "question": "What is state in React, and what happens when you update it?",
      "explanation": "State is mutable data a component owns. Calling the setter schedules a re-render with the new state.\n\n```tsx\nimport { useState } from 'react';\n\nconst [count, setCount] = useState(0);\n\nsetCount(count + 1);\nsetCount((c) => c + 1); // preferred when next value depends on previous\n```\n\nUpdates batch in events and many async cases in React 18+, so multiple setters often produce one render. Never mutate objects in place—replace with new references so React detects change."
    },
    {
      "question": "Why are keys important when rendering lists?",
      "explanation": "Keys help React identify which items changed, were added, or removed across renders. Stable keys preserve component state and DOM nodes when the list reorders.\n\n```tsx\nimport React from 'react';\n\n{todos.map((todo) => (\n  <TodoRow key={todo.id} todo={todo} />\n))}\n```\n\nUsing array index as key can break when items are inserted, deleted, or reordered—inputs may show wrong values or animations misfire. Prefer stable IDs from your data model.\n\nKeys are hints, not global identifiers—they only need to be unique among siblings. Mention keys in the same breath as reconciliation for a complete interview answer."
    },
    {
      "question": "What does \"lifting state up\" mean?",
      "explanation": "Move shared state to the closest common ancestor, then pass value and callbacks down as props.\n\n```tsx\nimport { useState } from 'react';\n\nfunction App() {\n  const [celsius, setCelsius] = useState(0);\n  return (\n    <>\n      <Thermometer value={celsius} onChange={setCelsius} />\n      <FahrenheitDisplay celsius={celsius} />\n    </>\n  );\n}\n```\n\nUse this before context or global stores when only a small subtree needs the same value—keeps data flow easy to follow."
    },
    {
      "question": "Explain one-way data flow in React.",
      "explanation": "Data flows parent → child via props. Children communicate upward by calling functions passed as props (event handlers), not by mutating parent data.\n\n```tsx\nimport { useState } from 'react';\n\nfunction Parent() {\n  const [text, setText] = useState('');\n  return <Child value={text} onChange={setText} />;\n}\n\nfunction Child({ value, onChange }: { value: string; onChange: (v: string) => void }) {\n  return <input value={value} onChange={(e) => onChange(e.target.value)} />;\n}\n```\n\nThe child never writes to parent state directly—only invokes onChange—so you can trace every update from a single owner."
    },
    {
      "question": "What is reconciliation?",
      "explanation": "Reconciliation is React's process of comparing the new element tree with the previous one and deciding which DOM nodes to create, update, or remove.\n\n```tsx\nimport React from 'react';\n\n// Same type → update props in place\nreturn <input value={name} onChange={onName} />;\n\n// Different type → unmount old subtree, mount new one (state lost)\nreturn showForm ? <Form /> : <Summary />;\n\n// Keys tell React which list item is which after reorder\nitems.map((item) => <Row key={item.id} item={item} />);\n```\n\nChanging element type at a slot destroys internal state—stable keys preserve row state when lists reorder."
    },
    {
      "question": "What is React Strict Mode for?",
      "explanation": "Strict Mode is a development-only wrapper that double-invokes renders and effects to expose impure side effects.\n\n```tsx\nimport { StrictMode } from 'react';\n\ncreateRoot(document.getElementById('root')!).render(\n  <StrictMode>\n    <App />\n  </StrictMode>\n);\n```\n\nProduction builds mount once—if cleanup is missing, dev double-mount surfaces the bug before release."
    },
    {
      "question": "What is a React Fragment and when should you use it?",
      "explanation": "A Fragment lets you group multiple children without adding an extra DOM node—<>...</> or <Fragment key={...}>.\n\n```tsx\nimport React from 'react';\n\nreturn (\n  <>\n    <Title />\n    <Content />\n  </>\n);\n```\n\nUse it when a component must return multiple siblings (table rows, list items) or to avoid wrapper divs that break layout/CSS (flex/grid).\n\nFragments can take a key when mapping lists of groups—unlike the shorthand <> syntax, which cannot accept props."
    },
    {
      "question": "What are common patterns for conditional rendering?",
      "explanation": "Early return null for guard clauses; ternary for two branches; && for simple show/hide when the left side is boolean (beware 0 rendering); switch or object maps for many states.\n\n```tsx\nimport React from 'react';\n\nif (!user) return null;\nreturn isEditing ? <Form /> : <View />;\n{error && <Alert>{error}</Alert>}\n```\n\nExtract heavy branches into child components so hooks stay valid and trees stay readable. Co-locate loading/error/empty states with data-fetch UI.\n\nFor async data, prefer explicit status enums (idle/loading/error/success) over nested ternaries—easier to test and extend."
    },
    {
      "question": "What is the difference between a React element and a component?",
      "explanation": "An element is a plain object describing UI: { type, props, key }. It is immutable and cheap to create.\n\n```tsx\nimport React from 'react';\n\n// Element: plain object (what JSX compiles to)\nconst el = { type: 'button', props: { children: 'Save' } };\n\n// Component: function React calls during render\nfunction SaveButton({ label }: { label: string }) {\n  return <button>{label}</button>;\n}\n\n// <SaveButton label=\"Save\" /> creates an element whose type is SaveButton\nconst usage = <SaveButton label=\"Save\" />;\n```\n\nReact calls your component function to get elements—it does not store a long-lived \"instance\" for function components the way class components did."
    },
    {
      "question": "Why should you avoid mutating state directly?",
      "explanation": "React compares state by reference for objects and arrays—mutation keeps the same reference, so React may skip rendering.\n\n```tsx\n// ❌ mutates in place\nitems.push(newItem);\nsetItems(items);\n\n// ✓ new array reference\nsetItems([...items, newItem]);\n```\n\nThe same rule applies to context values and reducer state—immutable updates keep time-travel debugging and memoization reliable."
    }
  ]
};
