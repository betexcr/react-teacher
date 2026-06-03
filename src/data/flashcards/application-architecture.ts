import type { FlashcardDeck } from './types';

export const applicationArchitectureDeck: FlashcardDeck = {
  "id": "application-architecture",
  "slug": "architecture",
  "title": "Application Architecture",
  "cards": [
    {
      "question": "What is Container vs presentational?",
      "explanation": "Containers handle data/logic; presentational components are pure UI from props.\n\nInterview tip: describe where this lived in a feature folder or app shell and what coupling it reduced."
    },
    {
      "question": "What is Feature folders?",
      "explanation": "Colocate components, hooks, tests per feature instead of type-based folders only.\n\nInterview tip: describe where this lived in a feature folder or app shell and what coupling it reduced."
    },
    {
      "question": "What is State colocation?",
      "explanation": "Keep state as low as possible; lift only when multiple consumers need it.\n\nInterview tip: describe where this lived in a feature folder or app shell and what coupling it reduced."
    },
    {
      "question": "What is URL as state?",
      "explanation": "Shareable/bookmarkable UI state via route params and searchParams.\n\n```tsx\nconst [params] = useSearchParams();\nconst tab = params.get('tab') ?? 'overview';\n```\n\nInterview tip: describe where this lived in a feature folder or app shell and what coupling it reduced."
    },
    {
      "question": "What is Global vs local state?",
      "explanation": "Local default; global for auth, theme, truly cross-app data. Consider React Query for server cache.\n\nInterview tip: describe where this lived in a feature folder or app shell and what coupling it reduced."
    },
    {
      "question": "What is Error boundaries placement?",
      "explanation": "Wrap route sections or risky widgets—not every component.\n\n```tsx\n<Route path=\"billing/*\" element={\n  <ErrorBoundary fallback={<BillingError />}>\n    <BillingRoutes />\n  </ErrorBoundary>\n} />\n```\n\nInterview tip: describe where this lived in a feature folder or app shell and what coupling it reduced."
    },
    {
      "question": "What is Composition root?",
      "explanation": "App shell wires providers (router, query, theme) once at top.\n\nInterview tip: describe where this lived in a feature folder or app shell and what coupling it reduced."
    },
    {
      "question": "What is Barrel files tradeoff?",
      "explanation": "index.ts re-exports simplify imports but can hurt tree-shaking if not careful.\n\nInterview tip: describe where this lived in a feature folder or app shell and what coupling it reduced."
    },
    {
      "question": "What is API layer separation?",
      "explanation": "services/api.ts abstracts fetch; hooks consume services.\n\nInterview tip: describe where this lived in a feature folder or app shell and what coupling it reduced."
    },
    {
      "question": "What is Env configuration?",
      "explanation": "import.meta.env / process.env for API URLs; never commit secrets.\n\nInterview tip: describe where this lived in a feature folder or app shell and what coupling it reduced."
    },
    {
      "question": "What is Monorepo with React?",
      "explanation": "Shared UI package + apps; Turborepo/npm workspaces for builds.\n\nInterview tip: describe where this lived in a feature folder or app shell and what coupling it reduced."
    },
    {
      "question": "What is Micro-frontends?",
      "explanation": "Module federation or iframe boundaries; shared design system challenges.\n\nInterview tip: describe where this lived in a feature folder or app shell and what coupling it reduced."
    },
    {
      "question": "What is DDD in frontend?",
      "explanation": "Domains map to features; bounded contexts reduce coupling.\n\nInterview tip: describe where this lived in a feature folder or app shell and what coupling it reduced."
    },
    {
      "question": "What is Testing pyramid?",
      "explanation": "Many unit, fewer integration, selective E2E for critical flows.\n\nInterview tip: describe where this lived in a feature folder or app shell and what coupling it reduced."
    },
    {
      "question": "What is Documentation?",
      "explanation": "Storybook for UI; ADRs for architectural decisions.\n\nInterview tip: describe where this lived in a feature folder or app shell and what coupling it reduced."
    }
  ]
};
