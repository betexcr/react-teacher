import type { FlashcardDeck } from './types';

export const applicationArchitectureDeck: FlashcardDeck = {
  "id": "application-architecture",
  "slug": "architecture",
  "title": "Application Architecture",
  "cards": [
    {
      "question": "What is Container vs presentational?",
      "explanation": "Containers handle data/logic; presentational components are pure UI from props.\n\nIn Application Architecture interviews, connect this to a concrete scenario: what user problem were you solving, and how did this concept keep the UI predictable or maintainable? Strong answers name tradeoffs—not only what the API does.\n\nReact's ecosystem (routing, data libraries, testing tools) assumes you understand this idea. Mention how it interacts with hooks, rendering, or TypeScript where relevant, and contrast with naive DOM manipulation or class-heavy patterns when helpful."
    },
    {
      "question": "What is Feature folders?",
      "explanation": "Colocate components, hooks, tests per feature instead of type-based folders only.\n\nIn Application Architecture interviews, connect this to a concrete scenario: what user problem were you solving, and how did this concept keep the UI predictable or maintainable? Strong answers name tradeoffs—not only what the API does.\n\nReact's ecosystem (routing, data libraries, testing tools) assumes you understand this idea. Mention how it interacts with hooks, rendering, or TypeScript where relevant, and contrast with naive DOM manipulation or class-heavy patterns when helpful."
    },
    {
      "question": "What is State colocation?",
      "explanation": "Keep state as low as possible; lift only when multiple consumers need it.\n\nIn Application Architecture interviews, connect this to a concrete scenario: what user problem were you solving, and how did this concept keep the UI predictable or maintainable? Strong answers name tradeoffs—not only what the API does.\n\nReact's ecosystem (routing, data libraries, testing tools) assumes you understand this idea. Mention how it interacts with hooks, rendering, or TypeScript where relevant, and contrast with naive DOM manipulation or class-heavy patterns when helpful."
    },
    {
      "question": "What is URL as state?",
      "explanation": "Shareable/bookmarkable UI state via route params and searchParams.\n\nIn Application Architecture interviews, connect this to a concrete scenario: what user problem were you solving, and how did this concept keep the UI predictable or maintainable? Strong answers name tradeoffs—not only what the API does.\n\nReact's ecosystem (routing, data libraries, testing tools) assumes you understand this idea. Mention how it interacts with hooks, rendering, or TypeScript where relevant, and contrast with naive DOM manipulation or class-heavy patterns when helpful."
    },
    {
      "question": "What is Global vs local state?",
      "explanation": "Local default; global for auth, theme, truly cross-app data. Consider React Query for server cache.\n\nIn Application Architecture interviews, connect this to a concrete scenario: what user problem were you solving, and how did this concept keep the UI predictable or maintainable? Strong answers name tradeoffs—not only what the API does.\n\nReact's ecosystem (routing, data libraries, testing tools) assumes you understand this idea. Mention how it interacts with hooks, rendering, or TypeScript where relevant, and contrast with naive DOM manipulation or class-heavy patterns when helpful."
    },
    {
      "question": "What is Error boundaries placement?",
      "explanation": "Wrap route sections or risky widgets—not every component.\n\nIn Application Architecture interviews, connect this to a concrete scenario: what user problem were you solving, and how did this concept keep the UI predictable or maintainable? Strong answers name tradeoffs—not only what the API does.\n\nReact's ecosystem (routing, data libraries, testing tools) assumes you understand this idea. Mention how it interacts with hooks, rendering, or TypeScript where relevant, and contrast with naive DOM manipulation or class-heavy patterns when helpful."
    },
    {
      "question": "What is Composition root?",
      "explanation": "App shell wires providers (router, query, theme) once at top.\n\nIn Application Architecture interviews, connect this to a concrete scenario: what user problem were you solving, and how did this concept keep the UI predictable or maintainable? Strong answers name tradeoffs—not only what the API does.\n\nReact's ecosystem (routing, data libraries, testing tools) assumes you understand this idea. Mention how it interacts with hooks, rendering, or TypeScript where relevant, and contrast with naive DOM manipulation or class-heavy patterns when helpful."
    },
    {
      "question": "What is Barrel files tradeoff?",
      "explanation": "index.ts re-exports simplify imports but can hurt tree-shaking if not careful.\n\nIn Application Architecture interviews, connect this to a concrete scenario: what user problem were you solving, and how did this concept keep the UI predictable or maintainable? Strong answers name tradeoffs—not only what the API does.\n\nReact's ecosystem (routing, data libraries, testing tools) assumes you understand this idea. Mention how it interacts with hooks, rendering, or TypeScript where relevant, and contrast with naive DOM manipulation or class-heavy patterns when helpful."
    },
    {
      "question": "What is API layer separation?",
      "explanation": "services/api.ts abstracts fetch; hooks consume services.\n\nIn Application Architecture interviews, connect this to a concrete scenario: what user problem were you solving, and how did this concept keep the UI predictable or maintainable? Strong answers name tradeoffs—not only what the API does.\n\nReact's ecosystem (routing, data libraries, testing tools) assumes you understand this idea. Mention how it interacts with hooks, rendering, or TypeScript where relevant, and contrast with naive DOM manipulation or class-heavy patterns when helpful."
    },
    {
      "question": "What is Env configuration?",
      "explanation": "import.meta.env / process.env for API URLs; never commit secrets.\n\nIn Application Architecture interviews, connect this to a concrete scenario: what user problem were you solving, and how did this concept keep the UI predictable or maintainable? Strong answers name tradeoffs—not only what the API does.\n\nReact's ecosystem (routing, data libraries, testing tools) assumes you understand this idea. Mention how it interacts with hooks, rendering, or TypeScript where relevant, and contrast with naive DOM manipulation or class-heavy patterns when helpful."
    },
    {
      "question": "What is Monorepo with React?",
      "explanation": "Shared UI package + apps; Turborepo/npm workspaces for builds.\n\nIn Application Architecture interviews, connect this to a concrete scenario: what user problem were you solving, and how did this concept keep the UI predictable or maintainable? Strong answers name tradeoffs—not only what the API does.\n\nReact's ecosystem (routing, data libraries, testing tools) assumes you understand this idea. Mention how it interacts with hooks, rendering, or TypeScript where relevant, and contrast with naive DOM manipulation or class-heavy patterns when helpful."
    },
    {
      "question": "What is Micro-frontends?",
      "explanation": "Module federation or iframe boundaries; shared design system challenges.\n\nIn Application Architecture interviews, connect this to a concrete scenario: what user problem were you solving, and how did this concept keep the UI predictable or maintainable? Strong answers name tradeoffs—not only what the API does.\n\nReact's ecosystem (routing, data libraries, testing tools) assumes you understand this idea. Mention how it interacts with hooks, rendering, or TypeScript where relevant, and contrast with naive DOM manipulation or class-heavy patterns when helpful."
    },
    {
      "question": "What is DDD in frontend?",
      "explanation": "Domains map to features; bounded contexts reduce coupling.\n\nIn Application Architecture interviews, connect this to a concrete scenario: what user problem were you solving, and how did this concept keep the UI predictable or maintainable? Strong answers name tradeoffs—not only what the API does.\n\nReact's ecosystem (routing, data libraries, testing tools) assumes you understand this idea. Mention how it interacts with hooks, rendering, or TypeScript where relevant, and contrast with naive DOM manipulation or class-heavy patterns when helpful."
    },
    {
      "question": "What is Testing pyramid?",
      "explanation": "Many unit, fewer integration, selective E2E for critical flows.\n\nIn Application Architecture interviews, connect this to a concrete scenario: what user problem were you solving, and how did this concept keep the UI predictable or maintainable? Strong answers name tradeoffs—not only what the API does.\n\nReact's ecosystem (routing, data libraries, testing tools) assumes you understand this idea. Mention how it interacts with hooks, rendering, or TypeScript where relevant, and contrast with naive DOM manipulation or class-heavy patterns when helpful."
    },
    {
      "question": "What is Documentation?",
      "explanation": "Storybook for UI; ADRs for architectural decisions.\n\nIn Application Architecture interviews, connect this to a concrete scenario: what user problem were you solving, and how did this concept keep the UI predictable or maintainable? Strong answers name tradeoffs—not only what the API does.\n\nReact's ecosystem (routing, data libraries, testing tools) assumes you understand this idea. Mention how it interacts with hooks, rendering, or TypeScript where relevant, and contrast with naive DOM manipulation or class-heavy patterns when helpful."
    }
  ]
};
