import type { FlashcardDeck } from './types';

export const applicationArchitectureDeck: FlashcardDeck = {
  "id": "application-architecture",
  "slug": "architecture",
  "title": "Application Architecture",
  "cards": [
    {
      "question": "What is Container vs presentational?",
      "explanation": "Containers handle data/logic; presentational components are pure UI from props.\n\n```tsx\nimport React from 'react';\nimport { useQuery } from '@tanstack/react-query';\n\nfunction UserPageContainer() {\n  const { data } = useQuery({ queryKey: ['user'], queryFn: fetchUser });\n  return <UserProfileView user={data} loading={!data} />;\n}\n\nfunction UserProfileView({ user, loading }: { user?: User; loading: boolean }) {\n  if (loading) return <Skeleton />;\n  return <h1>{user!.name}</h1>;\n}\n```\n\nContainers fetch and map data; presentational components are pure functions of props—easier to test UI in Storybook without mocking the network layer."
    },
    {
      "question": "What is Feature folders?",
      "explanation": "Colocate components, hooks, tests per feature instead of type-based folders only.\n\n```tsx\n// features/checkout/\n//   CheckoutPage.tsx\n//   useCheckout.ts\n//   checkout.api.ts\n//   CheckoutPage.test.tsx\n```\n\nColocate components, hooks, API helpers, and tests under features/billing instead of scattering by file type—onboarding follows product boundaries."
    },
    {
      "question": "What is State colocation?",
      "explanation": "Keep state as low as possible; lift only when multiple consumers need it.\n\n```tsx\nimport React from 'react';\nimport type { ReactNode } from 'react';\n\nfunction AccordionItem({ title, children }: { title: string; children: React.ReactNode }) {\n  const [open, setOpen] = useState(false);\n  return (\n    <section>\n      <button onClick={() => setOpen((o) => !o)}>{title}</button>\n      {open && children}\n    </section>\n  );\n}\n```\n\nKeep state as close as possible to where it is used; lift only when siblings must stay in sync—premature global state complicates refactors."
    },
    {
      "question": "What is URL as state?",
      "explanation": "Shareable/bookmarkable UI state via route params and searchParams.\n\n```tsx\nimport React from 'react';\nimport { useSearchParams } from 'react-router-dom';\n\nconst [params, setParams] = useSearchParams();\nconst tab = params.get('tab') ?? 'overview';\n\n<button onClick={() => setParams({ tab: 'billing' })}>Billing</button>\n```\n\nFilters, tabs, and pagination in searchParams make views shareable and back-button friendly—treat the URL as serializable UI state, not just routing."
    },
    {
      "question": "What is Global vs local state?",
      "explanation": "Local default; global for auth, theme, truly cross-app data. Consider React Query for server cache.\n\n```tsx\nimport { useState } from 'react';\nimport { useQuery } from '@tanstack/react-query';\n\nconst { data: user } = useQuery({ queryKey: ['me'], queryFn: fetchMe });\nconst [sidebarOpen, setSidebarOpen] = useState(false);\n```\n\nDefault to local state; use context or Zustand for cross-route UI; TanStack Query owns server data—avoid duplicating API results in Redux unnecessarily."
    },
    {
      "question": "What is Error boundaries placement?",
      "explanation": "Wrap route sections or risky widgets—not every component.\n\n```tsx\nimport React from 'react';\n\n<ErrorBoundary fallback={<BillingError />}>\n  <BillingRoutes />\n</ErrorBoundary>\n```\n\nWrap route segments or risky widgets—not every leaf—so one chart failure does not white-screen the entire app shell."
    },
    {
      "question": "What is Composition root?",
      "explanation": "App shell wires providers (router, query, theme) once at top.\n\n```tsx\nimport React from 'react';\nimport type { ReactNode } from 'react';\nimport { RouterProvider } from 'react-router-dom';\n\nexport function AppProviders({ children }: { children: React.ReactNode }) {\n  return (\n    <QueryClientProvider client={qc}>\n      <ThemeProvider>\n        <RouterProvider router={router} />\n      </ThemeProvider>\n    </QueryClientProvider>\n  );\n}\n```\n\nWire router, QueryClient, theme, and i18n once at the app root so feature code assumes providers exist without re-wrapping each page."
    },
    {
      "question": "What is Barrel files tradeoff?",
      "explanation": "index.ts re-exports simplify imports but can hurt tree-shaking if not careful.\n\n```tsx\n// Prefer for hot paths:\nimport { Button } from '@/components/Button';\n\n// Barrel okay for stable public API:\n// export { Button } from './Button';\n```\n\nindex.ts re-exports simplify imports but can pull unused modules into bundles if the bundler cannot tree-shake side-effectful barrels—prefer direct imports for heavy libs."
    },
    {
      "question": "What is API layer separation?",
      "explanation": "services/api.ts abstracts fetch; hooks consume services.\n\n```tsx\n// services/todos.ts\nexport async function fetchTodos(userId: string) {\n  const res = await fetch(`/api/users/${userId}/todos`);\n  if (!res.ok) throw new Error('Failed to load todos');\n  return res.json();\n}\n```\n\nCentralize fetch URLs, headers, and error mapping in services/api.ts; hooks call those functions so UI components never embed raw fetch strings."
    },
    {
      "question": "What is Env configuration?",
      "explanation": "import.meta.env / process.env for API URLs; never commit secrets.\n\n```tsx\nconst apiBase = import.meta.env.VITE_API_URL;\n```\n\nVITE_ and NEXT_PUBLIC_ vars are public in the client bundle—proxy secrets through server routes and keep API keys off the frontend entirely."
    },
    {
      "question": "What is Monorepo with React?",
      "explanation": "Shared UI package + apps; Turborepo/npm workspaces for builds.\n\n```tsx\n// apps/web/package.json depends on \"@repo/ui\": \"workspace:*\"\n```\n\nShared UI package consumed by web and admin apps—Turborepo caches build outputs so a change in @repo/ui does not rebuild unrelated packages from scratch."
    },
    {
      "question": "What is Micro-frontends?",
      "explanation": "Module federation or iframe boundaries; shared design system challenges.\n\n```tsx\n// federation config: shared: { react: { singleton: true }, 'react-dom': { singleton: true } }\n```\n\nModule federation shares react and react-dom as singletons—version skew across shells causes hook errors and duplicate React instances."
    },
    {
      "question": "What is DDD in frontend?",
      "explanation": "Domains map to features; bounded contexts reduce coupling.\n\n```tsx\n// catalog/public.ts — only export what other features may import\n```\n\nModel features as bounded contexts (billing, catalog) with explicit public APIs between folders—reduces import spaghetti across domains."
    },
    {
      "question": "What is Testing pyramid?",
      "explanation": "Many unit, fewer integration, selective E2E for critical flows.\n\n```tsx\n// Many: useToggle.test.ts\n// Some: Checkout.integration.test.tsx\n// Few: checkout.spec.ts (Playwright)\n```\n\nMany fast unit tests on hooks and reducers, fewer integration tests on flows, selective Playwright for checkout—balance CI time vs confidence."
    },
    {
      "question": "What is Documentation?",
      "explanation": "Storybook for UI; ADRs for architectural decisions.\n\n```tsx\n// stories/Button.stories.tsx\nexport const Primary = { args: { variant: 'primary', label: 'Save' } };\n```\n\nStorybook documents visual states; ADRs capture why you chose App Router vs SPA—future teammates need decisions, not only API lists."
    }
  ]
};
