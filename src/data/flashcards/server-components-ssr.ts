import type { FlashcardDeck } from './types';

export const serverComponentsSsrDeck: FlashcardDeck = {
  "id": "server-components-ssr",
  "slug": "server-components",
  "title": "Server Components & SSR",
  "cards": [
    {
      "question": "What is Server Component?",
      "explanation": "Runs on server; can async fetch; no hooks/state/events. Code is not client-bundled; output streams as RSC payload alongside client JS.\n\n```tsx\n// app/page.tsx — no 'use client'\nexport default async function Page() {\n  const data = await db.query();\n  return <List items={data} />;\n}\n```\n\nInterview tip: clarify what runs on the server vs client bundle and what breaks if you mix boundaries wrong."
    },
    {
      "question": "What is \"use client\"?",
      "explanation": "Marks client boundary—bundle includes hooks, effects, browser APIs.\n\n```tsx\n'use client';\n\nexport function Counter() {\n  const [n, setN] = useState(0);\n  return <button onClick={() => setN(n + 1)}>{n}</button>;\n}\n```\n\nInterview tip: clarify what runs on the server vs client bundle and what breaks if you mix boundaries wrong."
    },
    {
      "question": "What is SSR vs SSG?",
      "explanation": "SSR: HTML per request. SSG: HTML at build. ISR: revalidate static pages.\n\nInterview tip: clarify what runs on the server vs client bundle and what breaks if you mix boundaries wrong."
    },
    {
      "question": "What is Hydration?",
      "explanation": "Client React reconciles with server-rendered HTML (and RSC payload), then makes the UI interactive; markup mismatches cause hydration errors.\n\nInterview tip: clarify what runs on the server vs client bundle and what breaks if you mix boundaries wrong."
    },
    {
      "question": "What is Streaming SSR?",
      "explanation": "Send HTML in chunks with Suspense fallbacks—faster TTFB.\n\nInterview tip: clarify what runs on the server vs client bundle and what breaks if you mix boundaries wrong."
    },
    {
      "question": "What is serialize RSC payload?",
      "explanation": "Flight protocol streams component tree references to client.\n\nInterview tip: clarify what runs on the server vs client bundle and what breaks if you mix boundaries wrong."
    },
    {
      "question": "What is When to use client components?",
      "explanation": "Interactivity, useState, useEffect, browser APIs, most third-party UI libs.\n\nInterview tip: clarify what runs on the server vs client bundle and what breaks if you mix boundaries wrong."
    },
    {
      "question": "What is Passing data RSC → client?",
      "explanation": "Serializable props only; no functions unless server actions.\n\nInterview tip: clarify what runs on the server vs client bundle and what breaks if you mix boundaries wrong."
    },
    {
      "question": "What is Server Actions?",
      "explanation": "Async functions run on server; invoked from forms/client with secure boundaries.\n\n```tsx\nasync function addItem(formData: FormData) {\n  'use server';\n  await db.items.create({ name: formData.get('name') });\n}\n```\n\nInterview tip: clarify what runs on the server vs client bundle and what breaks if you mix boundaries wrong."
    },
    {
      "question": "What is Caching in Next?",
      "explanation": "fetch { next: { revalidate } }, route segment config, unstable_cache; Next 15+ also Cache Components (\"use cache\", cacheTag, cacheLife).\n\nInterview tip: clarify what runs on the server vs client bundle and what breaks if you mix boundaries wrong."
    },
    {
      "question": "What is SEO benefit?",
      "explanation": "SSR/SSG gives crawlers HTML immediately; CSR can be indexed but is slower/less reliable for content and link previews without SSR/meta pipelines.\n\nInterview tip: clarify what runs on the server vs client bundle and what breaks if you mix boundaries wrong."
    },
    {
      "question": "What is Environment secrets?",
      "explanation": "Only server components/route handlers access private env vars.\n\nInterview tip: clarify what runs on the server vs client bundle and what breaks if you mix boundaries wrong."
    },
    {
      "question": "What is Client-only libraries?",
      "explanation": "dynamic(() => import(...), { ssr: false }) for chart/map libs.\n\n```tsx\nconst Map = dynamic(() => import('./Map'), { ssr: false });\n```\n\nInterview tip: clarify what runs on the server vs client bundle and what breaks if you mix boundaries wrong."
    },
    {
      "question": "What is Partial Prerendering?",
      "explanation": "Static shell + streamed dynamic Suspense holes; experimental in Next 15, evolving toward Cache Components in Next 16+.\n\nInterview tip: clarify what runs on the server vs client bundle and what breaks if you mix boundaries wrong."
    },
    {
      "question": "What is Waterfalls?",
      "explanation": "Avoid sequential client fetches; colocate fetch in RSC or parallel Query.\n\nInterview tip: clarify what runs on the server vs client bundle and what breaks if you mix boundaries wrong."
    }
  ]
};
