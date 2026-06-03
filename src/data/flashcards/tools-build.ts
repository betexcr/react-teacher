import type { FlashcardDeck } from './types';

export const toolsBuildDeck: FlashcardDeck = {
  "id": "tools-build",
  "slug": "tools",
  "title": "Tools & Build Pipeline",
  "cards": [
    {
      "question": "What is Vite?",
      "explanation": "Dev: native ESM + esbuild.prebundle. Prod: Rollup. Fast HMR.\n\n```tsx\nimport { defineConfig } from 'vite';\nimport react from '@vitejs/plugin-react';\n\nexport default defineConfig({\n  plugins: [react()],\n  server: { port: 5173 },\n});\n```\n\nDev server serves native ESM with esbuild prebundling for speed; production Rollup build tree-shakes and code-splits—default for new React SPAs."
    },
    {
      "question": "What is Webpack role?",
      "explanation": "Bundler: entry graph, loaders, plugins. Slower dev but ecosystem mature.\n\n```tsx\nimport { use } from 'react';\n\nmodule.exports = {\n  entry: './src/main.tsx',\n  module: { rules: [{ test: /\\.tsx?$/, use: 'ts-loader' }] },\n};\n```\n\nMature loader/plugin graph for legacy apps—slower cold start than Vite but still common in enterprises and Create React App migrations."
    },
    {
      "question": "What is TypeScript in build?",
      "explanation": "tsc --noEmit for types; esbuild/swc transpile separately in Vite.\n\n```tsx\n// package.json: \"typecheck\": \"tsc -p tsconfig.app.json --noEmit\"\n```\n\nVite transpiles with esbuild/swc; run tsc --noEmit separately for types—faster CI than expecting tsc to emit every bundle."
    },
    {
      "question": "What is ESLint + React?",
      "explanation": "eslint-plugin-react-hooks enforces rules of hooks; react-refresh for HMR safety.\n\n```tsx\n// eslint.config.js extends: reactHooks.configs['recommended-latest']\n```\n\neslint-plugin-react-hooks enforces rules of hooks and exhaustive-deps—catches stale closures before they ship."
    },
    {
      "question": "What is Prettier?",
      "explanation": "Opinionated formatter; integrate with ESLint via eslint-config-prettier.\n\n```tsx\n// .prettierrc: { \"singleQuote\": true, \"semi\": true }\n```\n\nFormat on save ends style debates—pair with eslint-config-prettier so formatting rules do not fight lint rules."
    },
    {
      "question": "What is Environment variables?",
      "explanation": "VITE_ prefix exposed in Vite; never prefix secrets.\n\n```tsx\nconst api = import.meta.env.VITE_API_URL;\n```\n\nOnly VITE_ prefixed vars are exposed to client code in Vite—DATABASE_URL without prefix stays server-side in SSR frameworks."
    },
    {
      "question": "What is Source maps?",
      "explanation": "Production hidden-source-map for Sentry; not exposed publicly.\n\n```tsx\n// vite build: sourcemap: 'hidden'\n```\n\nhidden-source-map uploads to Sentry without publishing maps publicly—users cannot reverse-engineer your TS from production URLs."
    },
    {
      "question": "What is Tree shaking?",
      "explanation": "ESM side-effect-free imports enable dead code elimination.\n\n```tsx\nimport { debounce } from 'lodash-es';\n```\n\nESM static imports enable dead code elimination—side-effectful barrel imports or CommonJS can prevent shaking lodash-sized deps."
    },
    {
      "question": "What is Bundle analysis?",
      "explanation": "rollup-plugin-visualizer / webpack-bundle-analyzer find large deps.\n\n```tsx\n// vite.config: plugins: [visualizer({ open: true })]\n```\n\nVisualize chunk weight after build—surprise dependencies (moment locales, whole icons packs) show up as oversized rectangles."
    },
    {
      "question": "What is Vitest?",
      "explanation": "Vite-native test runner; compatible with Jest API via vi.\n\n```tsx\nimport { describe, it, expect } from 'vitest';\n\ndescribe('formatPrice', () => {\n  it('formats cents', () => expect(formatPrice(199)).toBe('$1.99'));\n});\n```\n\nShares Vite config and transforms—vi.fn and jsdom run component tests without a separate Jest transformer pipeline."
    },
    {
      "question": "What is CI pipeline?",
      "explanation": "lint → typecheck → test → build; cache node_modules.\n\n```tsx\njobs:\n  verify:\n    steps: [checkout, pnpm install, lint, typecheck, test, build]\n```\n\nFail fast: lint and typecheck before tests and build—cache pnpm store and Turborepo outputs to keep PR feedback under a few minutes."
    },
    {
      "question": "What is pnpm vs npm?",
      "explanation": "pnpm: content-addressable store, strict node_modules—saves disk.\n\n```tsx\npnpm install\npnpm --filter web build\n```\n\npnpm symlinks packages per project with a global content store—saves disk and avoids phantom dependencies from hoisted node_modules."
    },
    {
      "question": "What is Monorepo tools?",
      "explanation": "Turborepo caches task outputs across packages.\n\n```tsx\n// turbo.json: build dependsOn: [\"^build\"]\n```\n\nTurborepo hashes task inputs and skips unchanged package builds—critical when ten packages share one repo."
    },
    {
      "question": "What is HMR?",
      "explanation": "Hot Module Replacement updates modules without full reload.\n\n```tsx\nif (import.meta.hot) {\n  import.meta.hot.accept();\n}\n```\n\nVite HMR updates modules in place preserving React state when possible—misconfigured boundaries still full-reload on some CSS changes."
    },
    {
      "question": "What is Docker for SPA?",
      "explanation": "Multi-stage: build static assets, serve with nginx.\n\n```tsx\n# Dockerfile: FROM node AS build → pnpm build → FROM nginx COPY dist\n```\n\nMulti-stage build: Node stage runs pnpm build, nginx stage serves static dist/—never run dev server in production images."
    }
  ]
};
