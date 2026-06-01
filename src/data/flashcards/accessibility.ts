import type { FlashcardDeck } from './types';

export const accessibilityDeck: FlashcardDeck = {
  "id": "accessibility",
  "slug": "accessibility",
  "title": "Accessibility",
  "cards": [
    {
      "question": "What is Semantic HTML first?",
      "explanation": "button, nav, main, heading hierarchy before ARIA overrides.\n\nIn Accessibility interviews, connect this to a concrete scenario: what user problem were you solving, and how did this concept keep the UI predictable or maintainable? Strong answers name tradeoffs—not only what the API does.\n\nReact's ecosystem (routing, data libraries, testing tools) assumes you understand this idea. Mention how it interacts with hooks, rendering, or TypeScript where relevant, and contrast with naive DOM manipulation or class-heavy patterns when helpful."
    },
    {
      "question": "What is Accessible name?",
      "explanation": "Visible text, aria-label, or aria-labelledby must name interactive elements.\n\nIn Accessibility interviews, connect this to a concrete scenario: what user problem were you solving, and how did this concept keep the UI predictable or maintainable? Strong answers name tradeoffs—not only what the API does.\n\nReact's ecosystem (routing, data libraries, testing tools) assumes you understand this idea. Mention how it interacts with hooks, rendering, or TypeScript where relevant, and contrast with naive DOM manipulation or class-heavy patterns when helpful."
    },
    {
      "question": "What is Keyboard navigation?",
      "explanation": "All functionality operable via keyboard; visible focus styles.\n\nIn Accessibility interviews, connect this to a concrete scenario: what user problem were you solving, and how did this concept keep the UI predictable or maintainable? Strong answers name tradeoffs—not only what the API does.\n\nReact's ecosystem (routing, data libraries, testing tools) assumes you understand this idea. Mention how it interacts with hooks, rendering, or TypeScript where relevant, and contrast with naive DOM manipulation or class-heavy patterns when helpful."
    },
    {
      "question": "What is Focus management?",
      "explanation": "Trap focus in modals; restore focus on close; autofocus intentionally.\n\nIn Accessibility interviews, connect this to a concrete scenario: what user problem were you solving, and how did this concept keep the UI predictable or maintainable? Strong answers name tradeoffs—not only what the API does.\n\nReact's ecosystem (routing, data libraries, testing tools) assumes you understand this idea. Mention how it interacts with hooks, rendering, or TypeScript where relevant, and contrast with naive DOM manipulation or class-heavy patterns when helpful."
    },
    {
      "question": "What is aria-live?",
      "explanation": "Announces dynamic updates (polite/assertive) for toasts/status.\n\nIn Accessibility interviews, connect this to a concrete scenario: what user problem were you solving, and how did this concept keep the UI predictable or maintainable? Strong answers name tradeoffs—not only what the API does.\n\nReact's ecosystem (routing, data libraries, testing tools) assumes you understand this idea. Mention how it interacts with hooks, rendering, or TypeScript where relevant, and contrast with naive DOM manipulation or class-heavy patterns when helpful."
    },
    {
      "question": "What is Color contrast?",
      "explanation": "WCAG AA: 4.5:1 text; do not rely on color alone for meaning.\n\nIn Accessibility interviews, connect this to a concrete scenario: what user problem were you solving, and how did this concept keep the UI predictable or maintainable? Strong answers name tradeoffs—not only what the API does.\n\nReact's ecosystem (routing, data libraries, testing tools) assumes you understand this idea. Mention how it interacts with hooks, rendering, or TypeScript where relevant, and contrast with naive DOM manipulation or class-heavy patterns when helpful."
    },
    {
      "question": "What is alt text?",
      "explanation": "Decorative: alt=\"\". Informative: concise description. Functional images need context.\n\nIn Accessibility interviews, connect this to a concrete scenario: what user problem were you solving, and how did this concept keep the UI predictable or maintainable? Strong answers name tradeoffs—not only what the API does.\n\nReact's ecosystem (routing, data libraries, testing tools) assumes you understand this idea. Mention how it interacts with hooks, rendering, or TypeScript where relevant, and contrast with naive DOM manipulation or class-heavy patterns when helpful."
    },
    {
      "question": "What is Form labels?",
      "explanation": "Every input has associated label; placeholders are not labels.\n\nIn Accessibility interviews, connect this to a concrete scenario: what user problem were you solving, and how did this concept keep the UI predictable or maintainable? Strong answers name tradeoffs—not only what the API does.\n\nReact's ecosystem (routing, data libraries, testing tools) assumes you understand this idea. Mention how it interacts with hooks, rendering, or TypeScript where relevant, and contrast with naive DOM manipulation or class-heavy patterns when helpful."
    },
    {
      "question": "What is Skip links?",
      "explanation": "Skip to main content link for keyboard users bypassing nav.\n\nIn Accessibility interviews, connect this to a concrete scenario: what user problem were you solving, and how did this concept keep the UI predictable or maintainable? Strong answers name tradeoffs—not only what the API does.\n\nReact's ecosystem (routing, data libraries, testing tools) assumes you understand this idea. Mention how it interacts with hooks, rendering, or TypeScript where relevant, and contrast with naive DOM manipulation or class-heavy patterns when helpful."
    },
    {
      "question": "What is Reduced motion?",
      "explanation": "prefers-reduced-motion: reduce disables non-essential animations.\n\nIn Accessibility interviews, connect this to a concrete scenario: what user problem were you solving, and how did this concept keep the UI predictable or maintainable? Strong answers name tradeoffs—not only what the API does.\n\nReact's ecosystem (routing, data libraries, testing tools) assumes you understand this idea. Mention how it interacts with hooks, rendering, or TypeScript where relevant, and contrast with naive DOM manipulation or class-heavy patterns when helpful."
    },
    {
      "question": "What is Role attribute?",
      "explanation": "When semantic HTML insufficient: role=\"dialog\", role=\"tablist\", etc.\n\nIn Accessibility interviews, connect this to a concrete scenario: what user problem were you solving, and how did this concept keep the UI predictable or maintainable? Strong answers name tradeoffs—not only what the API does.\n\nReact's ecosystem (routing, data libraries, testing tools) assumes you understand this idea. Mention how it interacts with hooks, rendering, or TypeScript where relevant, and contrast with naive DOM manipulation or class-heavy patterns when helpful."
    },
    {
      "question": "What is Heading order?",
      "explanation": "Do not skip levels arbitrarily; one h1 per page typically.\n\nIn Accessibility interviews, connect this to a concrete scenario: what user problem were you solving, and how did this concept keep the UI predictable or maintainable? Strong answers name tradeoffs—not only what the API does.\n\nReact's ecosystem (routing, data libraries, testing tools) assumes you understand this idea. Mention how it interacts with hooks, rendering, or TypeScript where relevant, and contrast with naive DOM manipulation or class-heavy patterns when helpful."
    },
    {
      "question": "What is Testing a11y?",
      "explanation": "axe-core automated checks + manual screen reader testing.\n\nIn Accessibility interviews, connect this to a concrete scenario: what user problem were you solving, and how did this concept keep the UI predictable or maintainable? Strong answers name tradeoffs—not only what the API does.\n\nReact's ecosystem (routing, data libraries, testing tools) assumes you understand this idea. Mention how it interacts with hooks, rendering, or TypeScript where relevant, and contrast with naive DOM manipulation or class-heavy patterns when helpful."
    },
    {
      "question": "What is React Aria / Radix?",
      "explanation": "Libraries implement WAI-ARIA patterns correctly.\n\nIn Accessibility interviews, connect this to a concrete scenario: what user problem were you solving, and how did this concept keep the UI predictable or maintainable? Strong answers name tradeoffs—not only what the API does.\n\nReact's ecosystem (routing, data libraries, testing tools) assumes you understand this idea. Mention how it interacts with hooks, rendering, or TypeScript where relevant, and contrast with naive DOM manipulation or class-heavy patterns when helpful."
    },
    {
      "question": "What is Disabled vs aria-disabled?",
      "explanation": "aria-disabled allows focus for custom widgets; disabled removes from tab order.\n\nIn Accessibility interviews, connect this to a concrete scenario: what user problem were you solving, and how did this concept keep the UI predictable or maintainable? Strong answers name tradeoffs—not only what the API does.\n\nReact's ecosystem (routing, data libraries, testing tools) assumes you understand this idea. Mention how it interacts with hooks, rendering, or TypeScript where relevant, and contrast with naive DOM manipulation or class-heavy patterns when helpful."
    }
  ]
};
