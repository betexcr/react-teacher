import type { FlashcardDeck } from './types';

export const stylingDeck: FlashcardDeck = {
  "id": "styling",
  "slug": "styling",
  "title": "Styling in React",
  "cards": [
    {
      "question": "What is CSS Modules?",
      "explanation": "import styles from \"./X.module.css\" — locally scoped class names.\n\nInterview tip: note scope (module, utility, CSS-in-JS) and any SSR or token tradeoff you weighed."
    },
    {
      "question": "What is Tailwind CSS?",
      "explanation": "Utility classes in JSX; @apply for extracts; tree-shake unused.\n\nInterview tip: note scope (module, utility, CSS-in-JS) and any SSR or token tradeoff you weighed."
    },
    {
      "question": "What is CSS-in-JS (styled-components)?",
      "explanation": "Styles colocated; runtime cost; Emotion similar; consider zero-runtime alternatives.\n\nInterview tip: note scope (module, utility, CSS-in-JS) and any SSR or token tradeoff you weighed."
    },
    {
      "question": "What is Vanilla Extract?",
      "explanation": "Type-safe CSS-in-TS; zero runtime; build-time extraction.\n\nInterview tip: note scope (module, utility, CSS-in-JS) and any SSR or token tradeoff you weighed."
    },
    {
      "question": "What is Inline styles?",
      "explanation": "style={{ }} object; camelCase props; good for dynamic values only.\n\nInterview tip: note scope (module, utility, CSS-in-JS) and any SSR or token tradeoff you weighed."
    },
    {
      "question": "What is clsx / cn utility?",
      "explanation": "Conditional class merging: cn(\"btn\", isActive && \"active\").\n\nInterview tip: note scope (module, utility, CSS-in-JS) and any SSR or token tradeoff you weighed."
    },
    {
      "question": "What is Design systems?",
      "explanation": "Token-based spacing/color; component library (shadcn, MUI).\n\nInterview tip: note scope (module, utility, CSS-in-JS) and any SSR or token tradeoff you weighed."
    },
    {
      "question": "What is Dark mode?",
      "explanation": "CSS variables + data-theme; prefers-color-scheme; class on html.\n\nInterview tip: note scope (module, utility, CSS-in-JS) and any SSR or token tradeoff you weighed."
    },
    {
      "question": "What is Responsive design?",
      "explanation": "Media queries, container queries, mobile-first breakpoints.\n\nInterview tip: note scope (module, utility, CSS-in-JS) and any SSR or token tradeoff you weighed."
    },
    {
      "question": "What is Global styles?",
      "explanation": "index.css reset; avoid leaking globals—use layers (@layer).\n\nInterview tip: note scope (module, utility, CSS-in-JS) and any SSR or token tradeoff you weighed."
    },
    {
      "question": "What is Animation performance?",
      "explanation": "Prefer transform/opacity; avoid layout thrashing.\n\nInterview tip: note scope (module, utility, CSS-in-JS) and any SSR or token tradeoff you weighed."
    },
    {
      "question": "What is SSR CSS?",
      "explanation": "Collect critical CSS or use zero-runtime to avoid FOUC.\n\nInterview tip: note scope (module, utility, CSS-in-JS) and any SSR or token tradeoff you weighed."
    },
    {
      "question": "What is Tailwind content scanning?",
      "explanation": "v3: content paths in tailwind.config. v4: @source globs in CSS—wrong paths cause missing styles or leftover CSS.\n\nInterview tip: note scope (module, utility, CSS-in-JS) and any SSR or token tradeoff you weighed."
    },
    {
      "question": "What is Component variants?",
      "explanation": "cva() defines variant maps type-safely.\n\nInterview tip: note scope (module, utility, CSS-in-JS) and any SSR or token tradeoff you weighed."
    },
    {
      "question": "What is Scoped vs global?",
      "explanation": "Modules/CSS-in-JS scoped; global for resets and typography base.\n\nInterview tip: note scope (module, utility, CSS-in-JS) and any SSR or token tradeoff you weighed."
    }
  ]
};
