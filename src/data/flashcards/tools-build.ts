import type { FlashcardDeck } from './types';

export const toolsBuildDeck: FlashcardDeck = {
  "id": "tools-build",
  "slug": "tools",
  "title": "Tools & Build Pipeline",
  "cards": [
    {
      "question": "What is Vite?",
      "explanation": "Dev: native ESM + esbuild.prebundle. Prod: Rollup. Fast HMR.\n\n```tsx\n// vite.config.ts\nexport default defineConfig({\n  plugins: [react()],\n});\n```\n\nInterview tip: link this to a script in CI or a local dev pain (HMR, types, lint) you actually hit."
    },
    {
      "question": "What is Webpack role?",
      "explanation": "Bundler: entry graph, loaders, plugins. Slower dev but ecosystem mature.\n\nInterview tip: link this to a script in CI or a local dev pain (HMR, types, lint) you actually hit."
    },
    {
      "question": "What is TypeScript in build?",
      "explanation": "tsc --noEmit for types; esbuild/swc transpile separately in Vite.\n\nInterview tip: link this to a script in CI or a local dev pain (HMR, types, lint) you actually hit."
    },
    {
      "question": "What is ESLint + React?",
      "explanation": "eslint-plugin-react-hooks enforces rules of hooks; react-refresh for HMR safety.\n\nInterview tip: link this to a script in CI or a local dev pain (HMR, types, lint) you actually hit."
    },
    {
      "question": "What is Prettier?",
      "explanation": "Opinionated formatter; integrate with ESLint via eslint-config-prettier.\n\nInterview tip: link this to a script in CI or a local dev pain (HMR, types, lint) you actually hit."
    },
    {
      "question": "What is Environment variables?",
      "explanation": "VITE_ prefix exposed in Vite; never prefix secrets.\n\n```tsx\nconst apiUrl = import.meta.env.VITE_API_URL;\n```\n\nInterview tip: link this to a script in CI or a local dev pain (HMR, types, lint) you actually hit."
    },
    {
      "question": "What is Source maps?",
      "explanation": "Production hidden-source-map for Sentry; not exposed publicly.\n\nInterview tip: link this to a script in CI or a local dev pain (HMR, types, lint) you actually hit."
    },
    {
      "question": "What is Tree shaking?",
      "explanation": "ESM side-effect-free imports enable dead code elimination.\n\nInterview tip: link this to a script in CI or a local dev pain (HMR, types, lint) you actually hit."
    },
    {
      "question": "What is Bundle analysis?",
      "explanation": "rollup-plugin-visualizer / webpack-bundle-analyzer find large deps.\n\nInterview tip: link this to a script in CI or a local dev pain (HMR, types, lint) you actually hit."
    },
    {
      "question": "What is Vitest?",
      "explanation": "Vite-native test runner; compatible with Jest API via vi.\n\n```tsx\nimport { describe, it, expect } from 'vitest';\n\ndescribe('sum', () => {\n  it('adds', () => expect(1 + 1).toBe(2));\n});\n```\n\nInterview tip: link this to a script in CI or a local dev pain (HMR, types, lint) you actually hit."
    },
    {
      "question": "What is CI pipeline?",
      "explanation": "lint → typecheck → test → build; cache node_modules.\n\nInterview tip: link this to a script in CI or a local dev pain (HMR, types, lint) you actually hit."
    },
    {
      "question": "What is pnpm vs npm?",
      "explanation": "pnpm: content-addressable store, strict node_modules—saves disk.\n\nInterview tip: link this to a script in CI or a local dev pain (HMR, types, lint) you actually hit."
    },
    {
      "question": "What is Monorepo tools?",
      "explanation": "Turborepo caches task outputs across packages.\n\nInterview tip: link this to a script in CI or a local dev pain (HMR, types, lint) you actually hit."
    },
    {
      "question": "What is HMR?",
      "explanation": "Hot Module Replacement updates modules without full reload.\n\nInterview tip: link this to a script in CI or a local dev pain (HMR, types, lint) you actually hit."
    },
    {
      "question": "What is Docker for SPA?",
      "explanation": "Multi-stage: build static assets, serve with nginx.\n\nInterview tip: link this to a script in CI or a local dev pain (HMR, types, lint) you actually hit."
    }
  ]
};
