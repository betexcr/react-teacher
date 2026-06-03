import type { FlashcardDeck } from './types';

export const accessibilityDeck: FlashcardDeck = {
  "id": "accessibility",
  "slug": "accessibility",
  "title": "Accessibility",
  "cards": [
    {
      "question": "What is Semantic HTML first?",
      "explanation": "button, nav, main, heading hierarchy before ARIA overrides.\n\n```tsx\n<nav aria-label=\"Main\">\n  <button type=\"button\">Save</button>\n</nav>\n```\n\nInterview tip: describe the assistive-tech or keyboard path—what a screen reader or tab user experiences."
    },
    {
      "question": "What is Accessible name?",
      "explanation": "Visible text, aria-label, or aria-labelledby must name interactive elements.\n\n```tsx\n<button aria-label=\"Close dialog\">×</button>\n```\n\nInterview tip: describe the assistive-tech or keyboard path—what a screen reader or tab user experiences."
    },
    {
      "question": "What is Keyboard navigation?",
      "explanation": "All functionality operable via keyboard; visible focus styles.\n\nInterview tip: describe the assistive-tech or keyboard path—what a screen reader or tab user experiences."
    },
    {
      "question": "What is Focus management?",
      "explanation": "Trap focus in modals; restore focus on close; autofocus intentionally.\n\n```tsx\nuseEffect(() => {\n  dialogRef.current?.focus();\n  return () => triggerRef.current?.focus();\n}, []);\n```\n\nInterview tip: describe the assistive-tech or keyboard path—what a screen reader or tab user experiences."
    },
    {
      "question": "What is aria-live?",
      "explanation": "Announces dynamic updates (polite/assertive) for toasts/status.\n\n```tsx\n<div aria-live=\"polite\" role=\"status\">{toastMessage}</div>\n```\n\nInterview tip: describe the assistive-tech or keyboard path—what a screen reader or tab user experiences."
    },
    {
      "question": "What is Color contrast?",
      "explanation": "WCAG AA: 4.5:1 text; do not rely on color alone for meaning.\n\nInterview tip: describe the assistive-tech or keyboard path—what a screen reader or tab user experiences."
    },
    {
      "question": "What is alt text?",
      "explanation": "Decorative: alt=\"\". Informative: concise description. Functional images need context.\n\nInterview tip: describe the assistive-tech or keyboard path—what a screen reader or tab user experiences."
    },
    {
      "question": "What is Form labels?",
      "explanation": "Every input has associated label; placeholders are not labels.\n\n```tsx\n<label htmlFor=\"email\">Email</label>\n<input id=\"email\" name=\"email\" type=\"email\" />\n```\n\nInterview tip: describe the assistive-tech or keyboard path—what a screen reader or tab user experiences."
    },
    {
      "question": "What is Skip links?",
      "explanation": "Skip to main content link for keyboard users bypassing nav.\n\nInterview tip: describe the assistive-tech or keyboard path—what a screen reader or tab user experiences."
    },
    {
      "question": "What is Reduced motion?",
      "explanation": "prefers-reduced-motion: reduce disables non-essential animations.\n\nInterview tip: describe the assistive-tech or keyboard path—what a screen reader or tab user experiences."
    },
    {
      "question": "What is Role attribute?",
      "explanation": "When semantic HTML insufficient: role=\"dialog\", role=\"tablist\", etc.\n\nInterview tip: describe the assistive-tech or keyboard path—what a screen reader or tab user experiences."
    },
    {
      "question": "What is Heading order?",
      "explanation": "Do not skip levels arbitrarily; one h1 per page typically.\n\nInterview tip: describe the assistive-tech or keyboard path—what a screen reader or tab user experiences."
    },
    {
      "question": "What is Testing a11y?",
      "explanation": "axe-core automated checks + manual screen reader testing.\n\nInterview tip: describe the assistive-tech or keyboard path—what a screen reader or tab user experiences."
    },
    {
      "question": "What is React Aria / Radix?",
      "explanation": "Libraries implement WAI-ARIA patterns correctly.\n\nInterview tip: describe the assistive-tech or keyboard path—what a screen reader or tab user experiences."
    },
    {
      "question": "What is Disabled vs aria-disabled?",
      "explanation": "aria-disabled allows focus for custom widgets; disabled removes from tab order.\n\nInterview tip: describe the assistive-tech or keyboard path—what a screen reader or tab user experiences."
    }
  ]
};
