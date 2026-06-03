import type { FlashcardDeck } from './types';

export const nextFrameworkDeck: FlashcardDeck = {
  "id": "next-framework",
  "slug": "nextjs",
  "title": "Next Framework",
  "cards": [
    {
      "question": "What is App Router vs Pages?",
      "explanation": "App: app/ dir, layouts, RSC. Pages: pages/ file routing, getServerSideProps legacy.\n\nInterview tip: reference an app/ file or convention (layout, loader, metadata) and what it replaced from Pages Router."
    },
    {
      "question": "What is layout.tsx?",
      "explanation": "Shared UI for a segment; client state in the layout persists across child navigations; Server Components in layouts re-fetch unless cached.\n\nInterview tip: reference an app/ file or convention (layout, loader, metadata) and what it replaced from Pages Router."
    },
    {
      "question": "What is loading.tsx?",
      "explanation": "Instant loading UI via Suspense boundary for route segment.\n\nInterview tip: reference an app/ file or convention (layout, loader, metadata) and what it replaced from Pages Router."
    },
    {
      "question": "What is error.tsx?",
      "explanation": "Client error boundary for route segment; reset() recovers.\n\nInterview tip: reference an app/ file or convention (layout, loader, metadata) and what it replaced from Pages Router."
    },
    {
      "question": "What is Metadata API?",
      "explanation": "export metadata or generateMetadata for SEO tags.\n\nInterview tip: reference an app/ file or convention (layout, loader, metadata) and what it replaced from Pages Router."
    },
    {
      "question": "What is Route handlers?",
      "explanation": "app/api/route.ts — HTTP methods as exported functions.\n\nInterview tip: reference an app/ file or convention (layout, loader, metadata) and what it replaced from Pages Router."
    },
    {
      "question": "What is Middleware?",
      "explanation": "middleware.ts intercepts requests (auth, redirects, headers); defaults to Edge runtime; Node.js runtime supported in some versions—check current Next docs.\n\nInterview tip: reference an app/ file or convention (layout, loader, metadata) and what it replaced from Pages Router."
    },
    {
      "question": "What is Image component?",
      "explanation": "next/image: optimization, lazy load, responsive sizes.\n\nInterview tip: reference an app/ file or convention (layout, loader, metadata) and what it replaced from Pages Router."
    },
    {
      "question": "What is Font optimization?",
      "explanation": "next/font: self-host Google fonts, no layout shift.\n\nInterview tip: reference an app/ file or convention (layout, loader, metadata) and what it replaced from Pages Router."
    },
    {
      "question": "What is Dynamic routes?",
      "explanation": "[slug] folders; generateStaticParams for SSG paths.\n\nInterview tip: reference an app/ file or convention (layout, loader, metadata) and what it replaced from Pages Router."
    },
    {
      "question": "What is Client navigation?",
      "explanation": "Link prefetches; soft navigation without full reload.\n\nInterview tip: reference an app/ file or convention (layout, loader, metadata) and what it replaced from Pages Router."
    },
    {
      "question": "What is Vercel deployment?",
      "explanation": "Zero-config for Next; edge functions; env vars per environment.\n\nInterview tip: reference an app/ file or convention (layout, loader, metadata) and what it replaced from Pages Router."
    },
    {
      "question": "What is ISR?",
      "explanation": "revalidate: 60 on fetch/page—regenerate stale pages in background.\n\nInterview tip: reference an app/ file or convention (layout, loader, metadata) and what it replaced from Pages Router."
    },
    {
      "question": "What is Parallel routes?",
      "explanation": "@modal slots for simultaneous views (e.g. modal + page).\n\nInterview tip: reference an app/ file or convention (layout, loader, metadata) and what it replaced from Pages Router."
    },
    {
      "question": "What is Intercepting routes?",
      "explanation": "(..)photo modal over gallery—URL reflects modal state.\n\nInterview tip: reference an app/ file or convention (layout, loader, metadata) and what it replaced from Pages Router."
    }
  ]
};
