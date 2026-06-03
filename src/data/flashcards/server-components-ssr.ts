import type { FlashcardDeck } from './types';

export const serverComponentsSsrDeck: FlashcardDeck = {
  "id": "server-components-ssr",
  "slug": "server-components",
  "title": "Server Components & SSR",
  "cards": [
    {
      "question": "What is Server Component?",
      "explanation": "Runs on server; can async fetch; no hooks/state/events. Code is not client-bundled; output streams as RSC payload alongside client JS.\n\n```tsx\nimport React from 'react';\n\nexport default async function ProductPage({ params }: { params: { id: string } }) {\n  const product = await db.product.find(params.id);\n  return <ProductDetails product={product} />;\n}\n```\n\nAsync server components fetch with secrets and DB drivers that never ship to the client—output streams as RSC payload; interactivity lives in child client islands."
    },
    {
      "question": "What is \"use client\"?",
      "explanation": "Marks client boundary—bundle includes hooks, effects, browser APIs.\n\n```tsx\n'use client';\n\nimport { useState } from 'react';\n\nexport function Counter() {\n  const [n, setN] = useState(0);\n  return <button onClick={() => setN(n + 1)}>{n}</button>;\n}\n```\n\nThe directive marks a module and its imports as client-bundled—use for useState, useEffect, and browser APIs; keep the boundary as leaf nodes as possible."
    },
    {
      "question": "What is SSR vs SSG?",
      "explanation": "SSR: HTML per request. SSG: HTML at build. ISR: revalidate static pages.\n\n```tsx\n// SSG: generateStaticParams + fetch at build\n// SSR: dynamic = 'force-dynamic' or no cache\n```\n\nSSR builds HTML per request (personalized); SSG at build time is cheaper at scale—ISR blends static speed with timed revalidation."
    },
    {
      "question": "What is Hydration?",
      "explanation": "Client React reconciles with server-rendered HTML (and RSC payload), then makes the UI interactive; markup mismatches cause hydration errors.\n\n```tsx\nimport { useId } from 'react';\n\nconst id = useId();\nreturn (\n  <>\n    <label htmlFor={id}>Name</label>\n    <input id={id} defaultValue={initialName} />\n  </>\n);\n```\n\nClient React attaches listeners to server HTML—mismatched markup forces recovery work and warnings; use useId and consistent data sources across server/client."
    },
    {
      "question": "What is Streaming SSR?",
      "explanation": "Send HTML in chunks with Suspense fallbacks—faster TTFB.\n\n```tsx\nimport { Suspense } from 'react';\n\nexport default function Page() {\n  return (\n    <main>\n      <Header />\n      <Suspense fallback={<CommentsSkeleton />}>\n        <Comments />\n      </Suspense>\n    </main>\n  );\n}\n```\n\nSend the shell HTML immediately and stream Suspense fallbacks as slow queries finish—improves TTFB vs waiting for every query before bytes leave the server."
    },
    {
      "question": "What is serialize RSC payload?",
      "explanation": "Flight protocol streams component tree references to client.\n\n```tsx\nimport React from 'react';\n\n// Server renders <Row />, client receives flight refs + props\n<Row userId={user.id} />\n```\n\nThe Flight protocol streams a compact component tree reference—not a JSON dump of your source—client reconciles against serialized server output."
    },
    {
      "question": "What is When to use client components?",
      "explanation": "Interactivity, useState, useEffect, browser APIs, most third-party UI libs.\n\n```tsx\nimport { use, useState } from 'react';\n\n// Server: async function List() { … }\n// Client: 'use client' + useState for filters\n```\n\nNeed hooks, effects, subscriptions, or most npm UI kits? Client boundary. Pure data display and static markup stay on the server."
    },
    {
      "question": "What is Passing data RSC → client?",
      "explanation": "Serializable props only; no functions unless server actions.\n\n```tsx\nimport React from 'react';\n\nexport default async function Page() {\n  const user = await getUser();\n  return <ProfileClient name={user.name} avatarUrl={user.avatarUrl} />;\n}\n```\n\nProps crossing the boundary must be JSON-serializable—pass IDs and fetch on server; do not pass functions except Server Actions with proper marking."
    },
    {
      "question": "What is Server Actions?",
      "explanation": "Async functions run on server; invoked from forms/client with secure boundaries.\n\n```tsx\nimport { use } from 'react';\n\nasync function addTodo(formData: FormData) {\n  'use server';\n  const title = String(formData.get('title'));\n  await db.todo.create({ title });\n}\n```\n\nAsync functions with \"use server\" run on the server when invoked from forms or startTransition—validate auth inside every action, not only UI."
    },
    {
      "question": "What is Caching in Next?",
      "explanation": "fetch { next: { revalidate } }, route segment config, unstable_cache; Next 15+ also Cache Components (\"use cache\", cacheTag, cacheLife).\n\n```tsx\nconst res = await fetch('https://api.example.com/posts', {\n  next: { revalidate: 60 },\n});\n```\n\nfetch cache options, segment config, and Next 15+ Cache Components (\"use cache\", cacheTag) control staleness—explicit opt-out when data must be realtime."
    },
    {
      "question": "What is SEO benefit?",
      "explanation": "SSR/SSG gives crawlers HTML immediately; CSR can be indexed but is slower/less reliable for content and link previews without SSR/meta pipelines.\n\n```tsx\nexport const metadata = {\n  title: 'Pricing',\n  description: 'Plans for teams of every size',\n};\n```\n\nCrawlers and link previews get meaningful HTML from SSR/SSG—CSR-only SPAs can be indexed but are slower and less reliable for content-heavy pages."
    },
    {
      "question": "What is Environment secrets?",
      "explanation": "Only server components/route handlers access private env vars.\n\n```tsx\n// server-only.ts\nconst dbUrl = process.env.DATABASE_URL;\n```\n\nOnly server modules read DATABASE_URL without NEXT_PUBLIC_—client bundles must never import files that reference private env vars."
    },
    {
      "question": "What is Client-only libraries?",
      "explanation": "dynamic(() => import(...), { ssr: false }) for chart/map libs.\n\n```tsx\nimport React from 'react';\nimport dynamic from 'next/dynamic';\n\nconst Map = dynamic(() => import('./Map'), { ssr: false });\n\nexport function StoreLocator() {\n  return <Map stores={stores} />;\n}\n```\n\nCharts and maps that touch window need dynamic(..., { ssr: false }) or a client-only import so SSR does not reference document."
    },
    {
      "question": "What is Partial Prerendering?",
      "explanation": "Static shell + streamed dynamic Suspense holes; experimental in Next 15, evolving toward Cache Components in Next 16+.\n\n```tsx\nimport { Suspense } from 'react';\n\n<Suspense fallback={<DynamicSkeleton />}>\n  <RealtimeWidget />\n</Suspense>\n```\n\nStatic shell prerendered with dynamic Suspense holes streamed at request time—evolving toward Cache Components in newer Next releases."
    },
    {
      "question": "What is Waterfalls?",
      "explanation": "Avoid sequential client fetches; colocate fetch in RSC or parallel Query.\n\n```tsx\nimport React from 'react';\n\nexport default async function Page() {\n  const [user, posts] = await Promise.all([getUser(), getPosts()]);\n  return <Dashboard user={user} posts={posts} />;\n}\n```\n\nSequential await in nested client useEffects multiplies latency—parallelize fetches in one RSC parent or Promise.all on the server."
    }
  ]
};
