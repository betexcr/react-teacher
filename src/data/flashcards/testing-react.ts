import type { FlashcardDeck } from './types';

export const testingReactDeck: FlashcardDeck = {
  "id": "testing-react",
  "slug": "testing",
  "title": "Testing React Applications",
  "cards": [
    {
      "question": "What is Testing Library philosophy?",
      "explanation": "Test behavior users see—queries by role/label, not implementation details.\n\nInterview tip: mention the query or assertion you would use (role, label, findBy) and what user behavior it guards."
    },
    {
      "question": "What is render vs screen?",
      "explanation": "render(<App />); screen.getByRole(\"button\", { name: /submit/i }).\n\n```tsx\nrender(<LoginForm />);\nexpect(screen.getByRole('button', { name: /sign in/i })).toBeEnabled();\n```\n\nInterview tip: mention the query or assertion you would use (role, label, findBy) and what user behavior it guards."
    },
    {
      "question": "What is userEvent vs fireEvent?",
      "explanation": "userEvent simulates realistic interactions (click, type); prefer over fireEvent.\n\n```tsx\nawait userEvent.click(screen.getByRole('button', { name: /save/i }));\nawait userEvent.type(screen.getByLabelText(/email/i), 'a@b.com');\n```\n\nInterview tip: mention the query or assertion you would use (role, label, findBy) and what user behavior it guards."
    },
    {
      "question": "What is waitFor / findBy?",
      "explanation": "findBy* async waits for element; waitFor for arbitrary async assertions.\n\n```tsx\nconst row = await screen.findByText(/uploaded/i);\nawait waitFor(() => expect(mockFetch).toHaveBeenCalled());\n```\n\nInterview tip: mention the query or assertion you would use (role, label, findBy) and what user behavior it guards."
    },
    {
      "question": "What is Mocking fetch?",
      "explanation": "msw (Mock Service Worker) intercepts network; or vi.spyOn(global, \"fetch\").\n\nInterview tip: mention the query or assertion you would use (role, label, findBy) and what user behavior it guards."
    },
    {
      "question": "What is Testing hooks?",
      "explanation": "renderHook from @testing-library/react; act() wraps state updates.\n\n```tsx\nconst { result } = renderHook(() => useCounter(), { wrapper: Providers });\nact(() => result.current.inc());\nexpect(result.current.count).toBe(1);\n```\n\nInterview tip: mention the query or assertion you would use (role, label, findBy) and what user behavior it guards."
    },
    {
      "question": "What is Provider wrappers?",
      "explanation": "render(ui, { wrapper: ({ children }) => <Provider>{children}</Provider> }).\n\n```tsx\nrender(<Profile />, {\n  wrapper: ({ children }) => <QueryClientProvider client={qc}>{children}</QueryClientProvider>,\n});\n```\n\nInterview tip: mention the query or assertion you would use (role, label, findBy) and what user behavior it guards."
    },
    {
      "question": "What is Snapshot testing caution?",
      "explanation": "Brittle for large trees; prefer explicit assertions on text/roles.\n\nInterview tip: mention the query or assertion you would use (role, label, findBy) and what user behavior it guards."
    },
    {
      "question": "What is E2E with Playwright?",
      "explanation": "Real browser; test critical paths; slower but high confidence.\n\nInterview tip: mention the query or assertion you would use (role, label, findBy) and what user behavior it guards."
    },
    {
      "question": "What is Accessibility tests?",
      "explanation": "jest-axe or eslint-plugin-jsx-a11y catch missing labels/roles.\n\nInterview tip: mention the query or assertion you would use (role, label, findBy) and what user behavior it guards."
    },
    {
      "question": "What is Testing async components?",
      "explanation": "await screen.findByText; assert loading then success states.\n\nInterview tip: mention the query or assertion you would use (role, label, findBy) and what user behavior it guards."
    },
    {
      "question": "What is Mock modules?",
      "explanation": "vi.mock(\"./api\") in Vitest; jest.mock in Jest.\n\nInterview tip: mention the query or assertion you would use (role, label, findBy) and what user behavior it guards."
    },
    {
      "question": "What is Coverage limits?",
      "explanation": "100% coverage ≠ quality; focus critical paths and edge cases.\n\nInterview tip: mention the query or assertion you would use (role, label, findBy) and what user behavior it guards."
    },
    {
      "question": "What is CI testing?",
      "explanation": "Run unit in PR; E2E on main or nightly; parallelize shards.\n\nInterview tip: mention the query or assertion you would use (role, label, findBy) and what user behavior it guards."
    },
    {
      "question": "What is Component isolation?",
      "explanation": "Storybook for visual states; test one component per test file.\n\nInterview tip: mention the query or assertion you would use (role, label, findBy) and what user behavior it guards."
    }
  ]
};
