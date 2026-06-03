import type { FlashcardDeck } from './types';

export const accessibilityDeck: FlashcardDeck = {
  "id": "accessibility",
  "slug": "accessibility",
  "title": "Accessibility",
  "cards": [
    {
      "question": "What is Semantic HTML first?",
      "explanation": "button, nav, main, heading hierarchy before ARIA overrides.\n\n```tsx\nimport React from 'react';\n\n<nav aria-label=\"Main\">\n  <ul>\n    <li><a href=\"/\">Home</a></li>\n  </ul>\n</nav>\n<button type=\"button\">Save</button>\n```\n\nUse button for actions, nav for navigation, and headings in order—ARIA should reinforce semantics, not replace a div pretending to be a button."
    },
    {
      "question": "What is Accessible name?",
      "explanation": "Visible text, aria-label, or aria-labelledby must name interactive elements.\n\n```tsx\nimport React from 'react';\n\n<button type=\"button\" aria-label=\"Close dialog\">\n  <CloseIcon aria-hidden />\n</button>\n```\n\nEvery control needs a name from visible text, aria-label, or aria-labelledby—icon-only buttons fail audits without an accessible name."
    },
    {
      "question": "What is Keyboard navigation?",
      "explanation": "All functionality operable via keyboard; visible focus styles.\n\n```tsx\nimport React from 'react';\n\nfunction MenuItem({ onActivate }: { onActivate: () => void }) {\n  return (\n    <div\n      role=\"menuitem\"\n      tabIndex={0}\n      onKeyDown={(e) => {\n        if (e.key === 'Enter' || e.key === ' ') {\n          e.preventDefault();\n          onActivate();\n        }\n      }}\n    />\n  );\n}\n```\n\nTab order should follow visual order; custom widgets need key handlers for Enter, Space, and arrows per WAI-ARIA patterns."
    },
    {
      "question": "What is Focus management?",
      "explanation": "Trap focus in modals; restore focus on close; autofocus intentionally.\n\n```tsx\nimport { useEffect } from 'react';\n\nuseEffect(() => {\n  const prev = document.activeElement as HTMLElement;\n  dialogRef.current?.focus();\n  return () => prev?.focus();\n}, []);\n```\n\nMove focus into modals on open and return focus to the trigger on close—trap Tab inside the dialog until dismissed."
    },
    {
      "question": "What is aria-live?",
      "explanation": "Announces dynamic updates (polite/assertive) for toasts/status.\n\n```tsx\nimport React from 'react';\n\n<div aria-live=\"polite\" role=\"status\">\n  {saved ? 'Changes saved' : ''}\n</div>\n```\n\nLive regions announce async status without moving focus—polite waits for pauses; assertive interrupts immediately for critical errors."
    },
    {
      "question": "What is Color contrast?",
      "explanation": "WCAG AA: 4.5:1 text; do not rely on color alone for meaning.\n\n```tsx\nimport React from 'react';\n\n<p className=\"text-red-700\">\n  <ErrorIcon aria-hidden /> Invalid email\n</p>\n```\n\nWCAG AA requires 4.5:1 for normal text—do not convey errors only with red; pair color with text and icons."
    },
    {
      "question": "What is alt text?",
      "explanation": "Decorative: alt=\"\". Informative: concise description. Functional images need context.\n\n```tsx\nimport React from 'react';\n\n<img src=\"/chart.png\" alt=\"Revenue up 12% in Q2\" />\n<img src=\"/divider.svg\" alt=\"\" role=\"presentation\" />\n```\n\nDecorative images use alt=\"\"; informative images need concise descriptions; functional images describe the action, not the bitmap."
    },
    {
      "question": "What is Form labels?",
      "explanation": "Every input has associated label; placeholders are not labels.\n\n```tsx\nimport React from 'react';\n\n<label htmlFor=\"email\">Email address</label>\n<input id=\"email\" name=\"email\" type=\"email\" autoComplete=\"email\" />\n```\n\nPlaceholders are not labels—visible <label htmlFor> or aria-labelledby must associate every input for screen readers."
    },
    {
      "question": "What is Skip links?",
      "explanation": "Skip to main content link for keyboard users bypassing nav.\n\n```tsx\nimport React from 'react';\n\n<a href=\"#main\" className=\"skip-link\">\n  Skip to main content\n</a>\n<main id=\"main\">…</main>\n```\n\nFirst focusable link jumps to #main—keyboard users skip repetitive nav on every page load in large apps."
    },
    {
      "question": "What is Reduced motion?",
      "explanation": "prefers-reduced-motion: reduce disables non-essential animations.\n\n```tsx\n@media (prefers-reduced-motion: reduce) {\n  * { animation-duration: 0.01ms !important; }\n}\n```\n\nHonor prefers-reduced-motion by disabling parallax and large transitions—vestibular disorders are triggered by infinite animations."
    },
    {
      "question": "What is Role attribute?",
      "explanation": "When semantic HTML insufficient: role=\"dialog\", role=\"tablist\", etc.\n\n```tsx\nimport React from 'react';\n\n<div role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"title-id\">\n  <h2 id=\"title-id\">Confirm</h2>\n</div>\n```\n\nUse role when no native element fits—role=\"dialog\" needs aria-modal and labelledby; incorrect roles confuse assistive tech."
    },
    {
      "question": "What is Heading order?",
      "explanation": "Do not skip levels arbitrarily; one h1 per page typically.\n\n```tsx\nimport React from 'react';\n\n<h1>Account</h1>\n<h2>Profile</h2>\n<h3>Contact</h3>\n```\n\nDo not skip heading levels for styling—one h1 per page (or per route) outlines document structure for rotor navigation."
    },
    {
      "question": "What is Testing a11y?",
      "explanation": "axe-core automated checks + manual screen reader testing.\n\n```tsx\nimport React from 'react';\nimport { expect } from 'vitest';\n\nconst { container } = render(<Checkout />);\nexpect(await axe(container)).toHaveNoViolations();\n```\n\nAutomated axe catches ~30% of issues—manual VoiceOver/NVDA passes still required for focus order and meaningful announcements."
    },
    {
      "question": "What is React Aria / Radix?",
      "explanation": "Libraries implement WAI-ARIA patterns correctly.\n\n```tsx\nimport * as Dialog from '@radix-ui/react-dialog';\nimport React from 'react';\n\n<Dialog.Root>\n  <Dialog.Trigger>Open</Dialog.Trigger>\n  <Dialog.Content aria-describedby={undefined}>…</Dialog.Content>\n</Dialog.Root>\n```\n\nHeadless primitives implement combobox, dialog, and menu keyboard models—faster than hand-rolling aria-expanded and focus rings."
    },
    {
      "question": "What is Disabled vs aria-disabled?",
      "explanation": "aria-disabled allows focus for custom widgets; disabled removes from tab order.\n\n```tsx\nimport React from 'react';\n\n<button aria-disabled={isBusy} onClick={isBusy ? undefined : submit}>\n  Submit\n</button>\n```\n\ndisabled removes from tab order; aria-disabled keeps focus for custom widgets that still need keyboard explanation before activation."
    }
  ]
};
