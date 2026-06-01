import type { FlashcardDeck } from './types';

export const reactFundamentalsDeck: FlashcardDeck = {
  "id": "react-fundamentals",
  "slug": "fundamentals",
  "title": "React Fundamentals",
  "cards": [
    {
      "question": "What is React and why would you use it over other libraries or frameworks?",
      "explanation": "React is a JavaScript library for building user interfaces. It uses a component-based architecture and a virtual DOM to efficiently update the UI. Created at Meta, it has become a popular choice for web applications due to its performance, large ecosystem, and ease of creating reusable UI components.\n\nCompared to other libraries or frameworks, React often excels in flexibility, a large developer community, and a wide range of third-party packages. It is widely supported and integrates well with routers, state libraries, and build tools, making it a common choice for teams that want a view layer without a monolithic framework.\n\nBecause React focuses on the view layer, you can combine it with different state management and routing solutions. That composability lets teams tailor architecture to product needs instead of adopting a single opinionated stack—an angle interviewers like when discussing migration or greenfield decisions."
    },
    {
      "question": "What is JSX, and how does it relate to React.createElement?",
      "explanation": "JSX is a syntax extension that looks like HTML embedded in JavaScript. The compiler (Babel/SWC) transforms JSX into React.createElement(type, props, ...children) calls—or the automatic JSX runtime equivalent—so React receives plain element objects.\n\nA component must return one expression: a single element, Fragment (<>...</>), array, or null. Fragments group siblings without an extra DOM node. JSX is optional—you can call createElement directly.\n\nTypeScript adds typing for intrinsic elements (div, input) and your components. Interview tip: JSX is syntactic sugar; reconciliation still works on the element objects JSX produces."
    },
    {
      "question": "What is the virtual DOM, and why does React use it?",
      "explanation": "The virtual DOM is a lightweight JavaScript representation of the UI tree. On updates, React builds a new tree, diffs it against the previous one (reconciliation), and applies the minimal set of changes to the real DOM.\n\nThis batching avoids excessive direct DOM manipulation when many components re-render. The approach trades memory and diff work for predictable, declarative updates—especially valuable in large trees with frequent state changes.\n\nModern React also uses the Fiber architecture to prioritize and interrupt work. In interviews, distinguish virtual DOM from \"always faster than the DOM\"—measure real bottlenecks before optimizing."
    },
    {
      "question": "What is the difference between controlled and uncontrolled components?",
      "explanation": "A controlled component has its form value driven by React state: you pass value (or checked) and update via onChange/onInput. React is the single source of truth.\n\nAn uncontrolled component stores value in the DOM; you read it via a ref when needed (e.g., on submit). Controlled inputs enable live validation and dependent UI; uncontrolled can reduce re-renders for simple forms.\n\nReact Hook Form often uses refs internally for performance while still exposing validation APIs—a hybrid pattern worth mentioning when discussing form architecture."
    },
    {
      "question": "What are props in React, and how are they different from state?",
      "explanation": "Props are read-only inputs passed from parent to child. They describe how a child should render or behave. Changing props in a parent triggers a child re-render.\n\nState is owned by the component that declares it and can change over time via setState/useState. Props flow down; state is local unless lifted or shared via context.\n\nFor objects and functions passed as props, referential equality matters for memoization—stable references (useCallback/useMemo) prevent unnecessary child renders."
    },
    {
      "question": "What is state in React, and what happens when you update it?",
      "explanation": "State is mutable data a component owns. Calling the setter from useState or dispatch from useReducer schedules a re-render with the new state.\n\nUpdates may be batched in event handlers and many async cases in React 18+, so multiple setters often produce one render. Use functional updates setCount(c => c + 1) when the next value depends on the previous.\n\nNever mutate state directly—always replace with a new object/array so React detects change. This is foundational for hooks, context, and reducer patterns."
    },
    {
      "question": "Why are keys important when rendering lists?",
      "explanation": "Keys help React identify which items changed, were added, or removed across renders. Stable keys preserve component state and DOM nodes when the list reorders.\n\nUsing array index as key can break when items are inserted, deleted, or reordered—inputs may show wrong values or animations misfire. Prefer stable IDs from your data model.\n\nKeys are hints, not global identifiers—they only need to be unique among siblings. Mention keys in the same breath as reconciliation for a complete interview answer."
    },
    {
      "question": "What does \"lifting state up\" mean?",
      "explanation": "Lifting state up means moving shared state to the closest common ancestor of components that need it, then passing data and callbacks down as props.\n\nThis keeps a single source of truth for synchronized UI (e.g., two panels reflecting the same selection). It is the default pattern before reaching for context or external stores.\n\nIf many distant components need the same state, consider context or a client cache (TanStack Query, Zustand) instead of prop drilling through many layers."
    },
    {
      "question": "Explain one-way data flow in React.",
      "explanation": "Data flows parent → child via props. Children communicate upward by calling functions passed as props (event handlers), not by mutating parent data.\n\nThis unidirectional flow makes updates easier to trace than two-way binding in some older frameworks. Combined with immutable state updates, it supports predictable debugging.\n\nLibraries like Redux formalize one-way flow globally; React itself enforces the pattern at the component tree level."
    },
    {
      "question": "What is reconciliation?",
      "explanation": "Reconciliation is React's process of comparing the new element tree with the previous one and deciding which DOM nodes to create, update, or remove.\n\nIf element types differ at a position, React tears down the old subtree and mounts the new one. Same type → update props and recurse into children.\n\nUnderstanding reconciliation explains why keys, component type stability, and avoiding unnecessary parent remounts matter for performance and state preservation."
    },
    {
      "question": "What is React Strict Mode for?",
      "explanation": "Strict Mode is a development-only wrapper that enables extra checks: double-invoking renders/effects in dev to surface impure side effects, warnings for legacy APIs, and safer ref deprecation notices.\n\nIt does not run twice in production. The double mount helps catch missing effect cleanups and unsafe patterns before shipping.\n\nWrap your app root in <StrictMode> during development; pair with ESLint react-hooks rules for hooks correctness."
    },
    {
      "question": "What is a React Fragment and when should you use it?",
      "explanation": "A Fragment lets you group multiple children without adding an extra DOM node—<>...</> or <Fragment key={...}>.\n\nUse it when a component must return multiple siblings (table rows, list items) or to avoid wrapper divs that break layout/CSS (flex/grid).\n\nFragments can take a key when mapping lists of groups—unlike the shorthand <> syntax, which cannot accept props."
    },
    {
      "question": "What are common patterns for conditional rendering?",
      "explanation": "Early return null for guard clauses; ternary for two branches; && for simple show/hide when the left side is boolean (beware 0 rendering); switch or object maps for many states.\n\nExtract heavy branches into child components so hooks stay valid and trees stay readable. Co-locate loading/error/empty states with data-fetch UI.\n\nFor async data, prefer explicit status enums (idle/loading/error/success) over nested ternaries—easier to test and extend."
    },
    {
      "question": "What is the difference between a React element and a component?",
      "explanation": "An element is a plain object describing UI: { type, props, key }. It is immutable and cheap to create.\n\nA component is a function or class that returns elements (or other renderable nodes). React invokes components during render to obtain their output tree.\n\nConfusing elements with component instances is a common beginner mistake—interviews may ask how createElement, JSX, and Fiber relate to this model."
    },
    {
      "question": "Why should you avoid mutating state directly?",
      "explanation": "React compares state by reference for objects/arrays. Mutating in place keeps the same reference, so React may skip rendering and subscribers miss updates.\n\nUse spread, map, filter, or libraries like Immer for immutable updates. Functional setState helps when the next state depends on the previous.\n\nThe same immutability discipline applies to context values, reducer state, and props derived from state—consistency prevents subtle bugs."
    }
  ]
};
