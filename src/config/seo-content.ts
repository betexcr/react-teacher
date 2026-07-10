import { GITHUB_REPO, SITE_NAME } from './brand';

export const SEO_STATS = {
  challenges: 53,
  flashcardDecks: 20,
  flashcards: 290,
  patterns: 16,
  systemDesign: 20,
  basicsTopics: 20,
} as const;

export const PORTFOLIO_SITES = [
  { name: 'PythonTeacher', url: 'https://pythonprep.vercel.app', current: false },
  { name: 'NodeTeacher', url: 'https://nodeprep.vercel.app', current: false },
  { name: 'ReactTeacher', url: 'https://reactteacher.vercel.app', current: true },
] as const;

export const SITE_DESCRIPTION =
  'Free React interview prep with coding challenges, flashcards, React patterns, and frontend system design walkthroughs.';

export const HOME_META = {
  title: `React Interview Questions & Coding Challenges (Free) · ${SITE_NAME}`,
  description: `Practice ${SEO_STATS.challenges} React interview challenges with solutions, ${SEO_STATS.flashcards}+ flashcards, ${SEO_STATS.patterns} patterns, and system design guides. No account. Progress saves in your browser.`,
  ogImageId: 'get-started',
} as const;

export const FAQ_ITEMS = [
  {
    question: 'Is ReactTeacher really free?',
    answer:
      'Yes. All challenges, flashcards, patterns, and system design guides are free with no account required. Progress saves in your browser via localStorage.',
  },
  {
    question: 'How do I prepare for a React interview in 2 weeks?',
    answer:
      'Start with JS Basics, complete easy challenges daily, study 2–3 flashcard decks (hooks, fundamentals, performance), and read one pattern plus one system design guide per week. Use the progress dashboard on Get Started to track completion.',
  },
  {
    question: 'What React topics are asked in frontend interviews?',
    answer:
      'Common topics include hooks, component lifecycle, state management, performance (memo, useMemo, useCallback), testing with React Testing Library, TypeScript in React, routing, data fetching, and frontend system design for dashboards, forms, and real-time UIs.',
  },
  {
    question: 'Do I need to install anything?',
    answer:
      'No for studying flashcards, patterns, and system design. For challenges, you can read requirements here and implement locally in your own editor with Node.js 20+ and a Vite or Create React App project.',
  },
  {
    question: 'How does progress tracking work?',
    answer:
      'Challenge acceptance checklists, flashcard deck completion, and read status for guides are stored in your browser. No server account is required.',
  },
  {
    question: 'Are React coding challenges enough for interviews?',
    answer:
      'They help with implementation skills, but pair them with flashcards for theory, patterns for architecture idioms, and system design for scalability and UX trade-off discussions.',
  },
  {
    question: 'Should I learn React 19 features before interviewing?',
    answer:
      'Know hooks, concurrent features at a high level, and Server Components if the role uses Next.js. ReactTeacher includes a React 19 flashcard deck and challenges that use modern patterns.',
  },
  {
    question: 'How to explain useEffect in an interview?',
    answer:
      'useEffect runs side effects after render. Mention dependency arrays, cleanup functions for subscriptions, and when to prefer event handlers or derived state instead. Study the hooks flashcard deck and custom-hooks pattern guide.',
  },
  {
    question: 'Can I use ChatGPT to prepare ethically?',
    answer:
      'Use AI to explain concepts and review your solutions after attempting challenges yourself. Do not paste interview questions during live interviews.',
  },
  {
    question: 'How to contribute challenges?',
    answer: `Open a pull request on ${GITHUB_REPO} following the challenge source format in scripts/challenges/.`,
  },
] as const;

export type BlogArticle = {
  slug: string;
  pillar: string;
  title: string;
  description: string;
  body: string;
};

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    slug: 'complete-react-interview-guide-2026',
    pillar: 'Interview Guides',
    title: 'Complete React Interview Guide (2026)',
    description: 'A structured roadmap for React frontend and full-stack interviews.',
    body: `React interviews in 2026 test fundamentals, component design, performance, and frontend system thinking. Use this guide with ReactTeacher's challenges, flashcards, and system design walkthroughs.

## Week 1: Foundations
Review JS Basics on ReactTeacher, then complete 5 easy challenges. Study the fundamentals and hooks flashcard decks.

## Week 2: Patterns & testing
Read compound components and custom hooks pattern guides. Complete medium challenges on hooks and forms. Study the testing-react flashcard deck.

## Week 3: System design
Work through infinite scroll, auth system, and data table guides. Practice explaining trade-offs aloud.

## Week 4: Mock interviews
Mix hard challenges with flashcard review. Record yourself answering "tell me about a React project you shipped."

## What interviewers expect
Clear component boundaries, idiomatic hooks usage, accessibility awareness, and honest trade-off discussion beat memorized buzzwords.`,
  },
  {
    slug: 'frontend-system-design-react-interview',
    pillar: 'System Design',
    title: 'Frontend System Design for React Interviews',
    description: 'How to approach scalable UI design discussions with React examples.',
    body: `Frontend system design interviews ask you to design component architecture, data flows, and UX reliability—not just draw boxes.

## Start with requirements
Clarify read/write ratio, offline needs, latency targets, and scale (concurrent users, bundle size).

## React-specific angles
Discuss component composition, state colocation vs global store, React Query for server state, code splitting with lazy/Suspense, and optimistic UI patterns.

## Patterns to cite
Compound components, provider/context, error boundaries, and headless UI appear in ReactTeacher patterns and medium challenges.

## Practice on ReactTeacher
Study infinite scroll, form builder, chat application, and auth system guides. Link each component to a React library you have used.`,
  },
  {
    slug: 'react-hooks-interview-deep-dive',
    pillar: 'Patterns',
    title: 'React Hooks Interview Deep Dive',
    description: 'useState, useEffect, custom hooks, and Rules of Hooks for interviews.',
    body: `Interviewers use hooks questions to see if you write maintainable production React.

## High-yield hooks topics
- useState and functional updates
- useEffect dependency arrays and cleanup
- useMemo and useCallback for performance
- useRef for DOM and mutable values
- Custom hooks for reusable logic

## How to answer
Give a one-sentence definition, a when-to-use rule, and a short code sketch. ReactTeacher pattern guides include copyable examples.

## Connect to challenges
Medium challenges on custom hooks, forms, and data fetching reinforce these patterns hands-on.`,
  },
  {
    slug: 'react-interview-questions-2026',
    pillar: 'Interview Questions',
    title: 'React Interview Questions for 2026',
    description: 'Frequently asked React interview topics with study links.',
    body: `Focus on JSX, hooks, reconciliation, keys, controlled components, context, performance, and testing. Use flashcard decks tagged fundamentals, hooks, performance, and testing-react on ReactTeacher.`,
  },
  {
    slug: 'react-component-patterns-interview',
    pillar: 'Interview Questions',
    title: 'React Component Patterns Interview Questions',
    description: 'Compound components, render props, HOCs, and composition.',
    body: `Know when to use composition over inheritance, how compound components share implicit state, and when render props or HOCs still make sense. Study the compound-components, composition, and provider-context pattern guides.`,
  },
  {
    slug: 'react-performance-interview-questions',
    pillar: 'Interview Questions',
    title: 'React Performance Interview Questions',
    description: 'Memoization, virtualization, and bundle optimization.',
    body: `Discuss React.memo, useMemo, useCallback, code splitting, lazy loading, and list virtualization. Avoid premature optimization—explain when profiling showed a real bottleneck. Review the performance-optimization flashcard deck.`,
  },
  {
    slug: 'react-testing-interview-guide',
    pillar: 'Interview Questions',
    title: 'React Testing Interview Guide',
    description: 'Testing Library, user-centric tests, and mocking.',
    body: `Prefer testing user behavior over implementation details. Discuss render, screen queries, userEvent, mocking fetch, and async tests with findBy. Complete testing-related challenges and study the testing-react flashcard deck.`,
  },
  {
    slug: 'react-typescript-interview-questions',
    pillar: 'Interview Questions',
    title: 'React TypeScript Interview Questions',
    description: 'Typing props, generics, and component patterns in TypeScript.',
    body: `Explain React.FC trade-offs, typing children, discriminated unions for props, and generic components. Discuss strict mode benefits. Review the typescript-in-react flashcard deck.`,
  },
  {
    slug: 'react-vs-nextjs-interview',
    pillar: 'Comparisons',
    title: 'React vs Next.js: Interview Comparison',
    description: 'When to recommend each in architecture discussions.',
    body: `React is the view library; Next.js adds routing, SSR, SSG, and API routes. For SEO-heavy marketing sites or full-stack apps, Next.js is common. For SPAs embedded in existing backends, Vite + React remains valid.`,
  },
  {
    slug: 'two-week-react-interview-study-plan',
    pillar: 'Study Plans',
    title: '2-Week React Interview Study Plan',
    description: 'A day-by-day plan using ReactTeacher resources.',
    body: `Days 1–3: JS Basics + 3 easy challenges/day. Days 4–7: two flashcard decks + patterns. Days 8–10: medium challenges. Days 11–12: system design guides. Days 13–14: mock interviews and review weak flashcards.`,
  },
  {
    slug: 'best-free-react-interview-prep',
    pillar: 'Comparisons',
    title: 'Best Free React Interview Prep Resources',
    description: 'How ReactTeacher compares to other free options.',
    body: `ReactTeacher combines challenges with acceptance criteria, spaced flashcards, patterns, and frontend system design in one free site. Pair it with official React docs and your own project portfolio.`,
  },
  {
    slug: 'react-state-management-interview',
    pillar: 'Interview Questions',
    title: 'React State Management Interview Questions',
    description: 'Local state, context, and external stores.',
    body: `Start with useState and lifting state up. Use context for low-frequency global data. Discuss Redux, Zustand, or React Query when server cache or complex client state warrants it. Study the state-store system design guide.`,
  },
  {
    slug: 'frontend-system-design-without-faang-scale',
    pillar: 'System Design',
    title: 'Frontend System Design Without FAANG Scale',
    description: 'Realistic system design for mid-size companies.',
    body: `You do not need billion-user scale. Focus on clear component boundaries, API integration, optimistic UI, error handling, accessibility, and bundle budgets. ReactTeacher system design guides use realistic product examples.`,
  },
];

export const COMPARE_PAGES: Record<
  string,
  { title: string; description: string; body: string }
> = {
  'reactteacher-vs-greatfrontend': {
    title: 'ReactTeacher vs GreatFrontEnd',
    description: 'Interview prep platforms compared for React developers.',
    body: `GreatFrontEnd offers structured frontend interview questions and quizzes. ReactTeacher focuses on hands-on React challenges with acceptance criteria, flashcards, patterns, and frontend system design walkthroughs—all free in-browser. Use both: GreatFrontEnd for question banks, ReactTeacher for integrated practice.`,
  },
  'reactteacher-vs-react-dev': {
    title: 'ReactTeacher vs React.dev',
    description: 'Official React docs vs interview-focused prep.',
    body: `React.dev is the authoritative source for learning React concepts and APIs. ReactTeacher is optimized for interview prep: coding challenges, spaced flashcards, pattern guides, and system design scenarios. Learn on React.dev; drill on ReactTeacher.`,
  },
  'free-react-interview-prep-resources': {
    title: 'Free React Interview Prep Resources Compared',
    description: 'A roundup of free tools including ReactTeacher.',
    body: `Combine ReactTeacher challenges and flashcards with official React documentation, TypeScript handbook, and React Testing Library docs. Avoid paid bootcamp pressure until you exhaust free structured practice.`,
  },
};

export function getBlogArticle(slug: string) {
  return BLOG_ARTICLES.find((a) => a.slug === slug);
}
