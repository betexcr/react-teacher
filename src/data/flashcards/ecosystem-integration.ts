import type { FlashcardDeck } from './types';

export const ecosystemIntegrationDeck: FlashcardDeck = {
  "id": "ecosystem-integration",
  "slug": "ecosystem",
  "title": "React Ecosystem & Integration",
  "cards": [
    {
      "question": "What is State libraries comparison?",
      "explanation": "Redux Toolkit: global predictable state. Zustand/Jotai: light client stores. TanStack Query: server/async cache. Recoil is largely unmaintained.\n\nIn React Ecosystem & Integration interviews, connect this to a concrete scenario: what user problem were you solving, and how did this concept keep the UI predictable or maintainable? Strong answers name tradeoffs—not only what the API does.\n\nReact's ecosystem (routing, data libraries, testing tools) assumes you understand this idea. Mention how it interacts with hooks, rendering, or TypeScript where relevant, and contrast with naive DOM manipulation or class-heavy patterns when helpful."
    },
    {
      "question": "What is Zustand?",
      "explanation": "Simple store hook; no Provider required; middleware for persist/devtools.\n\nIn React Ecosystem & Integration interviews, connect this to a concrete scenario: what user problem were you solving, and how did this concept keep the UI predictable or maintainable? Strong answers name tradeoffs—not only what the API does.\n\nReact's ecosystem (routing, data libraries, testing tools) assumes you understand this idea. Mention how it interacts with hooks, rendering, or TypeScript where relevant, and contrast with naive DOM manipulation or class-heavy patterns when helpful."
    },
    {
      "question": "What is Redux Toolkit?",
      "explanation": "createSlice, configureStore, RTK Query for data—less boilerplate.\n\nIn React Ecosystem & Integration interviews, connect this to a concrete scenario: what user problem were you solving, and how did this concept keep the UI predictable or maintainable? Strong answers name tradeoffs—not only what the API does.\n\nReact's ecosystem (routing, data libraries, testing tools) assumes you understand this idea. Mention how it interacts with hooks, rendering, or TypeScript where relevant, and contrast with naive DOM manipulation or class-heavy patterns when helpful."
    },
    {
      "question": "What is Framer Motion?",
      "explanation": "Declarative animations; layout animations; gesture support.\n\nIn React Ecosystem & Integration interviews, connect this to a concrete scenario: what user problem were you solving, and how did this concept keep the UI predictable or maintainable? Strong answers name tradeoffs—not only what the API does.\n\nReact's ecosystem (routing, data libraries, testing tools) assumes you understand this idea. Mention how it interacts with hooks, rendering, or TypeScript where relevant, and contrast with naive DOM manipulation or class-heavy patterns when helpful."
    },
    {
      "question": "What is React Hook Form + UI libs?",
      "explanation": "Integrates with MUI/Chakra via Controller for controlled third-party inputs.\n\nIn React Ecosystem & Integration interviews, connect this to a concrete scenario: what user problem were you solving, and how did this concept keep the UI predictable or maintainable? Strong answers name tradeoffs—not only what the API does.\n\nReact's ecosystem (routing, data libraries, testing tools) assumes you understand this idea. Mention how it interacts with hooks, rendering, or TypeScript where relevant, and contrast with naive DOM manipulation or class-heavy patterns when helpful."
    },
    {
      "question": "What is i18n?",
      "explanation": "react-i18next: namespaces, interpolation, lazy load translations.\n\nIn React Ecosystem & Integration interviews, connect this to a concrete scenario: what user problem were you solving, and how did this concept keep the UI predictable or maintainable? Strong answers name tradeoffs—not only what the API does.\n\nReact's ecosystem (routing, data libraries, testing tools) assumes you understand this idea. Mention how it interacts with hooks, rendering, or TypeScript where relevant, and contrast with naive DOM manipulation or class-heavy patterns when helpful."
    },
    {
      "question": "What is MDX?",
      "explanation": "Markdown + JSX in content pages; compile to components.\n\nIn React Ecosystem & Integration interviews, connect this to a concrete scenario: what user problem were you solving, and how did this concept keep the UI predictable or maintainable? Strong answers name tradeoffs—not only what the API does.\n\nReact's ecosystem (routing, data libraries, testing tools) assumes you understand this idea. Mention how it interacts with hooks, rendering, or TypeScript where relevant, and contrast with naive DOM manipulation or class-heavy patterns when helpful."
    },
    {
      "question": "What is Micro-frontend integration?",
      "explanation": "Single-spa, module federation share react singleton.\n\nIn React Ecosystem & Integration interviews, connect this to a concrete scenario: what user problem were you solving, and how did this concept keep the UI predictable or maintainable? Strong answers name tradeoffs—not only what the API does.\n\nReact's ecosystem (routing, data libraries, testing tools) assumes you understand this idea. Mention how it interacts with hooks, rendering, or TypeScript where relevant, and contrast with naive DOM manipulation or class-heavy patterns when helpful."
    },
    {
      "question": "What is Electron + React?",
      "explanation": "Renderer process UI; watch IPC security; contextIsolation.\n\nIn React Ecosystem & Integration interviews, connect this to a concrete scenario: what user problem were you solving, and how did this concept keep the UI predictable or maintainable? Strong answers name tradeoffs—not only what the API does.\n\nReact's ecosystem (routing, data libraries, testing tools) assumes you understand this idea. Mention how it interacts with hooks, rendering, or TypeScript where relevant, and contrast with naive DOM manipulation or class-heavy patterns when helpful."
    },
    {
      "question": "What is React Native architecture?",
      "explanation": "React renders to native views; New Architecture (Fabric, TurboModules, JSI) replaces the legacy async bridge for most paths.\n\nIn React Ecosystem & Integration interviews, connect this to a concrete scenario: what user problem were you solving, and how did this concept keep the UI predictable or maintainable? Strong answers name tradeoffs—not only what the API does.\n\nReact's ecosystem (routing, data libraries, testing tools) assumes you understand this idea. Mention how it interacts with hooks, rendering, or TypeScript where relevant, and contrast with naive DOM manipulation or class-heavy patterns when helpful."
    },
    {
      "question": "What is Storybook?",
      "explanation": "Isolated component dev; visual regression with Chromatic.\n\nIn React Ecosystem & Integration interviews, connect this to a concrete scenario: what user problem were you solving, and how did this concept keep the UI predictable or maintainable? Strong answers name tradeoffs—not only what the API does.\n\nReact's ecosystem (routing, data libraries, testing tools) assumes you understand this idea. Mention how it interacts with hooks, rendering, or TypeScript where relevant, and contrast with naive DOM manipulation or class-heavy patterns when helpful."
    },
    {
      "question": "What is Design tokens?",
      "explanation": "Style Dictionary exports to CSS/JS from single source.\n\nIn React Ecosystem & Integration interviews, connect this to a concrete scenario: what user problem were you solving, and how did this concept keep the UI predictable or maintainable? Strong answers name tradeoffs—not only what the API does.\n\nReact's ecosystem (routing, data libraries, testing tools) assumes you understand this idea. Mention how it interacts with hooks, rendering, or TypeScript where relevant, and contrast with naive DOM manipulation or class-heavy patterns when helpful."
    },
    {
      "question": "What is CMS headless?",
      "explanation": "Contentful/Sanity data into RSC or static generation.\n\nIn React Ecosystem & Integration interviews, connect this to a concrete scenario: what user problem were you solving, and how did this concept keep the UI predictable or maintainable? Strong answers name tradeoffs—not only what the API does.\n\nReact's ecosystem (routing, data libraries, testing tools) assumes you understand this idea. Mention how it interacts with hooks, rendering, or TypeScript where relevant, and contrast with naive DOM manipulation or class-heavy patterns when helpful."
    },
    {
      "question": "What is Analytics?",
      "explanation": "Effect on route change; respect consent; avoid PII in events.\n\nIn React Ecosystem & Integration interviews, connect this to a concrete scenario: what user problem were you solving, and how did this concept keep the UI predictable or maintainable? Strong answers name tradeoffs—not only what the API does.\n\nReact's ecosystem (routing, data libraries, testing tools) assumes you understand this idea. Mention how it interacts with hooks, rendering, or TypeScript where relevant, and contrast with naive DOM manipulation or class-heavy patterns when helpful."
    }
  ]
};
