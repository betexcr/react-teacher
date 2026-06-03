import type { FlashcardDeck } from './types';

export const ecosystemIntegrationDeck: FlashcardDeck = {
  "id": "ecosystem-integration",
  "slug": "ecosystem",
  "title": "React Ecosystem & Integration",
  "cards": [
    {
      "question": "What is State libraries comparison?",
      "explanation": "Redux Toolkit: global predictable state. Zustand/Jotai: light client stores. TanStack Query: server/async cache. Recoil is largely unmaintained.\n\n```tsx\nimport { useQuery } from '@tanstack/react-query';\n\nconst { data } = useQuery({ queryKey: ['todos'], queryFn: fetchTodos });\nconst sidebarOpen = useUIStore((s) => s.sidebarOpen);\n```\n\nTanStack Query for server/async cache; Zustand/Jotai for light UI state; Redux Toolkit when you need time-travel debugging and strict event flows—Recoil is largely unmaintained."
    },
    {
      "question": "What is Zustand?",
      "explanation": "Simple store hook; no Provider required; middleware for persist/devtools.\n\n```tsx\nconst useStore = create<{ count: number; inc: () => void }>((set) => ({\n  count: 0,\n  inc: () => set((s) => ({ count: s.count + 1 })),\n}));\n```\n\nNo Provider wrapper—select slices with selectors to avoid re-rendering on unrelated store changes; middleware adds persist and devtools."
    },
    {
      "question": "What is Redux Toolkit?",
      "explanation": "createSlice, configureStore, RTK Query for data—less boilerplate.\n\n```tsx\nimport React from 'react';\nimport { createSlice } from '@reduxjs/toolkit';\n\nconst cartSlice = createSlice({\n  name: 'cart',\n  initialState: { items: [] as Item[] },\n  reducers: {\n    add(state, action: PayloadAction<Item>) {\n      state.items.push(action.payload);\n    },\n  },\n});\n```\n\ncreateSlice + Immer reducers cut boilerplate; RTK Query colocates API cache with Redux when teams already standardized on Redux DevTools."
    },
    {
      "question": "What is Framer Motion?",
      "explanation": "Declarative animations; layout animations; gesture support.\n\n```tsx\nimport React from 'react';\n\n<motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} />\n```\n\nAnimate presence and layout transitions declaratively—respect prefers-reduced-motion by shortening or disabling motion variants."
    },
    {
      "question": "What is React Hook Form + UI libs?",
      "explanation": "Integrates with MUI/Chakra via Controller for controlled third-party inputs.\n\n```tsx\nimport React from 'react';\n\n<Controller\n  name=\"email\"\n  control={control}\n  render={({ field }) => <TextField {...field} label=\"Email\" />}\n/>\n```\n\nController bridges register() to MUI/Chakra inputs that own internal value state—keeps validation in RHF while using design-system widgets."
    },
    {
      "question": "What is i18n?",
      "explanation": "react-i18next: namespaces, interpolation, lazy load translations.\n\n```tsx\nimport React from 'react';\n\nconst { t, i18n } = useTranslation('common');\n\n<button onClick={() => i18n.changeLanguage('es')}>{t('save')}</button>\n```\n\nreact-i18next namespaces split translations; lazy-load locale JSON so English users do not download every language upfront."
    },
    {
      "question": "What is MDX?",
      "explanation": "Markdown + JSX in content pages; compile to components.\n\n```tsx\nimport React from 'react';\n\nexport function BlogPost({ components }: { components: MDXComponents }) {\n  return <MDXContent components={components} />;\n}\n```\n\nEmbed interactive React components inside Markdown docs—compile MDX to components at build time for blogs and design system docs."
    },
    {
      "question": "What is Micro-frontend integration?",
      "explanation": "Single-spa, module federation share react singleton.\n\n```tsx\n// webpack ModuleFederationPlugin shared: { react: { singleton: true } }\n```\n\nModule federation or single-spa shells load remote bundles—pin react/react-dom versions as singletons or hooks break across boundaries."
    },
    {
      "question": "What is Electron + React?",
      "explanation": "Renderer process UI; watch IPC security; contextIsolation.\n\n```tsx\n// preload exposes narrow ipcRenderer API via contextBridge\n```\n\nRenderer runs React; main process holds Node APIs—enable contextIsolation and avoid nodeIntegration in renderer for XSS containment."
    },
    {
      "question": "What is React Native architecture?",
      "explanation": "React renders to native views; New Architecture (Fabric, TurboModules, JSI) replaces the legacy async bridge for most paths.\n\n```tsx\nimport { View, Text } from 'react-native';\nimport React from 'react';\n\nexport function Hello() {\n  return (\n    <View>\n      <Text>Hello</Text>\n    </View>\n  );\n}\n```\n\nFabric renderer and TurboModules on the New Architecture reduce async bridge hops—most greenfield apps target New Arch today."
    },
    {
      "question": "What is Storybook?",
      "explanation": "Isolated component dev; visual regression with Chromatic.\n\n```tsx\nexport default { component: Button };\nexport const Primary = { args: { variant: 'primary', children: 'Save' } };\n```\n\nDevelop components in isolation with controls and docs—Chromatic adds visual regression on PRs for design-system teams."
    },
    {
      "question": "What is Design tokens?",
      "explanation": "Style Dictionary exports to CSS/JS from single source.\n\n```tsx\n:root {\n  --color-brand: #863bff;\n  --space-md: 1rem;\n}\n```\n\nStyle Dictionary exports tokens to CSS variables and TS constants—one source prevents drift between Figma and code."
    },
    {
      "question": "What is CMS headless?",
      "explanation": "Contentful/Sanity data into RSC or static generation.\n\n```tsx\nconst posts = await sanity.fetch(groq`*[_type == \"post\"]`);\n```\n\nSanity/Contentful content feeds RSC or SSG pages—preview mode shows draft content to editors without publishing."
    },
    {
      "question": "What is Analytics?",
      "explanation": "Effect on route change; respect consent; avoid PII in events.\n\n```tsx\nimport { useEffect } from 'react';\n\nconst location = useLocation();\n\nuseEffect(() => {\n  if (consent.analytics) trackPage(location.pathname);\n}, [location.pathname, consent.analytics]);\n```\n\nFire page views on route changes in useEffect; honor consent banners and strip PII from event payloads—GDPR applies to client trackers too."
    }
  ]
};
