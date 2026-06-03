import type { FlashcardDeck } from './types';

export const testingReactDeck: FlashcardDeck = {
  "id": "testing-react",
  "slug": "testing",
  "title": "Testing React Applications",
  "cards": [
    {
      "question": "What is Testing Library philosophy?",
      "explanation": "Test behavior users see—queries by role/label, not implementation details.\n\n```tsx\nimport React from 'react';\nimport { render, screen } from '@testing-library/react';\nimport { expect } from 'vitest';\n\nrender(<LoginForm />);\nconst submit = screen.getByRole('button', { name: /sign in/i });\nexpect(submit).toBeEnabled();\n```\n\nQuery by role, label, and accessible name—tests survive refactors that rename test IDs but break when real users lose access to controls."
    },
    {
      "question": "What is render vs screen?",
      "explanation": "render(<App />); screen.getByRole(\"button\", { name: /submit/i }).\n\n```tsx\nimport React from 'react';\nimport { render, screen } from '@testing-library/react';\nimport { expect } from 'vitest';\n\nrender(<App />);\nexpect(screen.getByRole('navigation')).toBeInTheDocument();\n```\n\nrender mounts into a container; screen queries the document—prefer screen after render so helpers work with portals and multiple roots."
    },
    {
      "question": "What is userEvent vs fireEvent?",
      "explanation": "userEvent simulates realistic interactions (click, type); prefer over fireEvent.\n\n```tsx\nimport userEvent from '@testing-library/user-event';\n\nawait userEvent.click(screen.getByRole('button', { name: /save/i }));\nawait userEvent.type(screen.getByLabelText(/email/i), 'a@b.com');\n```\n\nuserEvent simulates realistic pointer/keyboard sequences (focus, keydown, input)—fireEvent only dispatches a single synthetic event and misses edge cases."
    },
    {
      "question": "What is waitFor / findBy?",
      "explanation": "findBy* async waits for element; waitFor for arbitrary async assertions.\n\n```tsx\nimport { expect } from 'vitest';\n\nawait screen.findByText(/upload complete/i);\nawait waitFor(() => expect(mockFetch).toHaveBeenCalledWith('/api/upload'));\n```\n\nfindBy* returns a promise that rejects on timeout; waitFor retries assertions until async UI settles—use for spinners → content transitions."
    },
    {
      "question": "What is Mocking fetch?",
      "explanation": "msw (Mock Service Worker) intercepts network; or vi.spyOn(global, \"fetch\").\n\n```tsx\nimport { http, HttpResponse } from 'msw';\nimport { setupServer } from 'msw/node';\n\nconst server = setupServer(\n  http.get('/api/user', () => HttpResponse.json({ name: 'Ada' }))\n);\n```\n\nMSW intercepts at the network layer so components use real fetch—less brittle than mocking global.fetch implementation details per test."
    },
    {
      "question": "What is Testing hooks?",
      "explanation": "renderHook from @testing-library/react; act() wraps state updates.\n\n```tsx\nimport { renderHook, act } from '@testing-library/react';\nimport { expect } from 'vitest';\n\nconst { result } = renderHook(() => useCounter(), { wrapper: AllProviders });\n\nact(() => result.current.inc());\nexpect(result.current.count).toBe(1);\n```\n\nrenderHook runs hooks in a real React tree; wrap state updates in act() so assertions see flushed renders."
    },
    {
      "question": "What is Provider wrappers?",
      "explanation": "render(ui, { wrapper: ({ children }) => <Provider>{children}</Provider> }).\n\n```tsx\nimport React from 'react';\n\nrender(<Profile />, {\n  wrapper: ({ children }) => (\n    <QueryClientProvider client={testClient}>{children}</QueryClientProvider>\n  ),\n});\n```\n\nPass wrapper with QueryClientProvider, Router, and theme so hooks under test see the same context as production routes."
    },
    {
      "question": "What is Snapshot testing caution?",
      "explanation": "Brittle for large trees; prefer explicit assertions on text/roles.\n\n```tsx\nimport { expect } from 'vitest';\n\nexpect(screen.getByRole('heading', { name: /welcome/i })).toBeVisible();\n// Avoid: expect(container).toMatchSnapshot();\n```\n\nLarge snapshots churn on any markup tweak and do not assert behavior—prefer role/text assertions for components users actually interact with."
    },
    {
      "question": "What is E2E with Playwright?",
      "explanation": "Real browser; test critical paths; slower but high confidence.\n\n```tsx\nimport { expect } from 'vitest';\n\ntest('checkout', async ({ page }) => {\n  await page.goto('/cart');\n  await page.getByRole('button', { name: 'Pay' }).click();\n  await expect(page.getByText('Thank you')).toBeVisible();\n});\n```\n\nExercise real browsers for checkout and auth—slower than unit tests but catches integration issues (cookies, redirects, CSP) units miss."
    },
    {
      "question": "What is Accessibility tests?",
      "explanation": "jest-axe or eslint-plugin-jsx-a11y catch missing labels/roles.\n\n```tsx\nimport React from 'react';\nimport { expect } from 'vitest';\n\nconst { container } = render(<Form />);\nconst results = await axe(container);\nexpect(results).toHaveNoViolations();\n```\n\njest-axe catches missing labels and invalid roles in CI—automated checks complement manual VoiceOver/NVDA passes for focus order."
    },
    {
      "question": "What is Testing async components?",
      "explanation": "await screen.findByText; assert loading then success states.\n\n```tsx\nimport React from 'react';\nimport { render, screen } from '@testing-library/react';\nimport { expect } from 'vitest';\n\nrender(<UserLoader id=\"1\" />);\nexpect(screen.getByText(/loading/i)).toBeInTheDocument();\nexpect(await screen.findByText(/Ada/)).toBeInTheDocument();\n```\n\nAssert loading UI first, then await success content—use findBy to avoid flaky fixed timeouts when fetch duration varies."
    },
    {
      "question": "What is Mock modules?",
      "explanation": "vi.mock(\"./api\") in Vitest; jest.mock in Jest.\n\n```tsx\nvi.mock('./api', () => ({\n  fetchUser: vi.fn().mockResolvedValue({ name: 'Test' }),\n}));\n```\n\nvi.mock hoists to the top—mock the module boundary (./api) not deep internals so tests track the public contract."
    },
    {
      "question": "What is Coverage limits?",
      "explanation": "100% coverage ≠ quality; focus critical paths and edge cases.\n\n```tsx\nimport { expect } from 'vitest';\n\n// Prefer: assert redirect when session expires\n// Over: expect(wrapper).toBeTruthy();\n```\n\nHigh line coverage with shallow asserts gives false confidence—prioritize critical paths, error branches, and regressions you have actually seen in prod."
    },
    {
      "question": "What is CI testing?",
      "explanation": "Run unit in PR; E2E on main or nightly; parallelize shards.\n\n```tsx\n# ci.yml jobs: lint → tsc → vitest → build → playwright (main only)\n```\n\nRun lint, typecheck, and unit on every PR; shard Playwright across workers on main—cache node_modules and Turborepo outputs to keep feedback fast."
    },
    {
      "question": "What is Component isolation?",
      "explanation": "Storybook for visual states; test one component per test file.\n\n```tsx\n// UserCard.test.tsx — not entire App tree unless integration intent\n```\n\nStorybook documents empty/error/loading states; unit tests target one component per file—easier to pinpoint failures than monolithic App tests."
    }
  ]
};
