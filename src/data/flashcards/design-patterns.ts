import type { FlashcardDeck } from './types';

export const designPatternsDeck: FlashcardDeck = {
  "id": "design-patterns",
  "slug": "design-patterns",
  "title": "Design Patterns",
  "cards": [
    {
      "question": "What is Compound components?",
      "explanation": "Card.Header, Card.Body share implicit context—flexible API without prop explosion.\n\nInterview tip: give a component API example—why compound components, render props, or a hook beat prop drilling."
    },
    {
      "question": "What is Render props?",
      "explanation": "Component receives function child: <DataFetcher render={data => ...} /> — shares logic.\n\nInterview tip: give a component API example—why compound components, render props, or a hook beat prop drilling."
    },
    {
      "question": "What is Higher-order component (HOC)?",
      "explanation": "withAuth(Component) wraps and injects props—less common with hooks.\n\nInterview tip: give a component API example—why compound components, render props, or a hook beat prop drilling."
    },
    {
      "question": "What is Custom hooks pattern?",
      "explanation": "Primary reuse mechanism: useForm, useAuth encapsulate stateful logic.\n\nInterview tip: give a component API example—why compound components, render props, or a hook beat prop drilling."
    },
    {
      "question": "What is Provider pattern?",
      "explanation": "Context supplies tree-wide dependencies (theme, i18n).\n\nInterview tip: give a component API example—why compound components, render props, or a hook beat prop drilling."
    },
    {
      "question": "What is Controlled component pattern?",
      "explanation": "Parent owns value; child notifies via onChange—forms, inputs.\n\nInterview tip: give a component API example—why compound components, render props, or a hook beat prop drilling."
    },
    {
      "question": "What is State reducer pattern?",
      "explanation": "useReducer for complex transitions; action types document events.\n\nInterview tip: give a component API example—why compound components, render props, or a hook beat prop drilling."
    },
    {
      "question": "What is Facade pattern?",
      "explanation": "Simple hook hides complex subsystem (useCheckout over cart+payment APIs).\n\nInterview tip: give a component API example—why compound components, render props, or a hook beat prop drilling."
    },
    {
      "question": "What is Observer pattern?",
      "explanation": "Subscriptions in useEffect; event emitters; external store listeners.\n\nInterview tip: give a component API example—why compound components, render props, or a hook beat prop drilling."
    },
    {
      "question": "What is Strategy pattern?",
      "explanation": "Swap algorithms via props: validationStrategy, paymentStrategy.\n\nInterview tip: give a component API example—why compound components, render props, or a hook beat prop drilling."
    },
    {
      "question": "What is Portal pattern?",
      "explanation": "Modals/tooltips render outside parent DOM hierarchy via createPortal.\n\nInterview tip: give a component API example—why compound components, render props, or a hook beat prop drilling."
    },
    {
      "question": "What is Slot pattern?",
      "explanation": "children or named slots (header, footer props) for layout composition.\n\nInterview tip: give a component API example—why compound components, render props, or a hook beat prop drilling."
    },
    {
      "question": "What is Polymorphic components?",
      "explanation": "as prop renders as button or anchor with shared styles (Button as=\"a\").\n\nInterview tip: give a component API example—why compound components, render props, or a hook beat prop drilling."
    },
    {
      "question": "What is Headless UI?",
      "explanation": "Logic-only hooks/components; consumer supplies styles (Radix, React Aria).\n\nInterview tip: give a component API example—why compound components, render props, or a hook beat prop drilling."
    },
    {
      "question": "What is Anti-pattern: giant components?",
      "explanation": "Split by responsibility; extract hooks and subcomponents.\n\nInterview tip: give a component API example—why compound components, render props, or a hook beat prop drilling."
    }
  ]
};
