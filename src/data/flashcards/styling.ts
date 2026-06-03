import type { FlashcardDeck } from './types';

export const stylingDeck: FlashcardDeck = {
  "id": "styling",
  "slug": "styling",
  "title": "Styling in React",
  "cards": [
    {
      "question": "What is CSS Modules?",
      "explanation": "```tsx\nimport styles from './Card.module.css';\nimport React from 'react';\nimport type { ReactNode } from 'react';\n\nexport function Card({ children }: { children: React.ReactNode }) {\n  return <article className={styles.card}>{children}</article>;\n}\n```\n\nBuild tools hash class names locally—import styles.title without global collisions; compose with composes or multiple classes."
    },
    {
      "question": "What is Tailwind CSS?",
      "explanation": "Utility classes in JSX; @apply for extracts; tree-shake unused.\n\n```tsx\nimport React from 'react';\n\n<button className=\"rounded-lg bg-violet-600 px-4 py-2 text-white hover:bg-violet-500 focus-visible:ring-2\">\n  Save\n</button>\n```\n\nUtility classes colocate styling in JSX; @layer and design tokens keep consistency—purge/content config must include all template paths."
    },
    {
      "question": "What is CSS-in-JS (styled-components)?",
      "explanation": "Styles colocated; runtime cost; Emotion similar; consider zero-runtime alternatives.\n\n```tsx\nconst Button = styled.button`\n  padding: 0.5rem 1rem;\n  background: ${(p) => p.theme.primary};\n`;\n```\n\nRuntime CSS-in-JS adds bundle and insertion cost—fine for dynamic themes; consider zero-runtime (Vanilla Extract, Linaria) for perf-sensitive apps."
    },
    {
      "question": "What is Vanilla Extract?",
      "explanation": "Type-safe CSS-in-TS; zero runtime; build-time extraction.\n\n```tsx\nimport { style } from '@vanilla-extract/css';\n\nexport const card = style({\n  padding: '1rem',\n  borderRadius: '8px',\n});\n```\n\nWrite styles in .css.ts files extracted at build—type-safe variants with zero runtime style injection cost."
    },
    {
      "question": "What is Inline styles?",
      "explanation": "style={{ }} object; camelCase props; good for dynamic values only.\n\n```tsx\nimport React from 'react';\n\n<div style={{ transform: `translateX(${percent}%)` }} />\n```\n\nstyle={{ }} objects suit one-off dynamic values (progress width)—avoid duplicating design tokens inline across dozens of components."
    },
    {
      "question": "What is clsx / cn utility?",
      "explanation": "Conditional class merging: cn(\"btn\", isActive && \"active\").\n\n```tsx\nimport React from 'react';\n\nfunction cn(...classes: (string | false | undefined)[]) {\n  return classes.filter(Boolean).join(' ');\n}\n\n<button className={cn('btn', isActive && 'btn-active')} />\n```\n\nMerge conditional classes without string typos—cn often wraps clsx + tailwind-merge to resolve conflicting utilities."
    },
    {
      "question": "What is Design systems?",
      "explanation": "Token-based spacing/color; component library (shadcn, MUI).\n\n```tsx\n// tokens: --space-4, components/Button.tsx variants\n```\n\nToken-driven spacing/color plus primitives (Button, Input) keep product teams aligned—shadcn copies components you own into the repo."
    },
    {
      "question": "What is Dark mode?",
      "explanation": "CSS variables + data-theme; prefers-color-scheme; class on html.\n\n```tsx\nimport React from 'react';\n\n<html className={theme === 'dark' ? 'dark' : ''}>\n  <body className=\"bg-background text-foreground\" />\n</html>\n```\n\nclass=\"dark\" on html with CSS variables scales better than duplicating palettes—respect prefers-color-scheme for system default."
    },
    {
      "question": "What is Responsive design?",
      "explanation": "Media queries, container queries, mobile-first breakpoints.\n\n```tsx\nimport React from 'react';\n\n<div className=\"grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3\">\n  {items.map((i) => <Card key={i.id} item={i} />)}\n</div>\n```\n\nMobile-first breakpoints (md:, lg:) and container queries (@container) adapt components inside sidebars without global viewport hacks."
    },
    {
      "question": "What is Global styles?",
      "explanation": "index.css reset; avoid leaking globals—use layers (@layer).\n\n```tsx\n@layer base {\n  body { @apply bg-white text-slate-900 antialiased; }\n}\n```\n\nResets and typography live in a single global entry—@layer base in Tailwind orders cascade predictably vs scattered !important."
    },
    {
      "question": "What is Animation performance?",
      "explanation": "Prefer transform/opacity; avoid layout thrashing.\n\n```tsx\n.panel {\n  transition: transform 200ms ease, opacity 200ms ease;\n}\n```\n\nAnimate transform and opacity only—width/height/top animations trigger layout; prefer CSS transitions over JS rAF loops for simple UI."
    },
    {
      "question": "What is SSR CSS?",
      "explanation": "Collect critical CSS or use zero-runtime to avoid FOUC.\n\n```tsx\n// Vanilla Extract / CSS Modules: styles in built CSS file linked in HTML\n```\n\nRuntime CSS-in-JS may flash unstyled content—extract critical CSS or use build-time CSS so server HTML matches first paint."
    },
    {
      "question": "What is Tailwind content scanning?",
      "explanation": "v3: content paths in tailwind.config. v4: @source globs in CSS—wrong paths cause missing styles or leftover CSS.\n\n```tsx\n/* app.css v4 */\n@source \"../src/**/*.{tsx,ts}\";\n@source \"../app/**/*.{tsx,ts}\";\n```\n\nv4 @source globs and v3 content arrays must include app, src, and MDX paths—missing globs drop utilities silently from production CSS."
    },
    {
      "question": "What is Component variants?",
      "explanation": "cva() defines variant maps type-safely.\n\n```tsx\nimport { cva } from 'class-variance-authority';\n\nconst button = cva('inline-flex items-center rounded-md', {\n  variants: {\n    size: { sm: 'h-8 px-3 text-sm', md: 'h-10 px-4' },\n    intent: { primary: 'bg-violet-600 text-white', ghost: 'bg-transparent' },\n  },\n  defaultVariants: { size: 'md', intent: 'primary' },\n});\n```\n\ncva() maps variant props to class strings with TypeScript inference—pairs with cn for default and compound variants."
    },
    {
      "question": "What is Scoped vs global?",
      "explanation": "Modules/CSS-in-JS scoped; global for resets and typography base.\n\n```tsx\nimport './globals.css';\nimport styles from './Widget.module.css';\n```\n\nModules and CSS-in-JS scope component styles; globals handle resets—leaking globals causes specificity wars across features."
    }
  ]
};
