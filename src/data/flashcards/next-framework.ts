import type { FlashcardDeck } from './types';

export const nextFrameworkDeck: FlashcardDeck = {
  "id": "next-framework",
  "slug": "nextjs",
  "title": "Next Framework",
  "cards": [
    {
      "question": "What is App Router vs Pages?",
      "explanation": "App: app/ dir, layouts, RSC. Pages: pages/ file routing, getServerSideProps legacy.\n\n```tsx\nimport React from 'react';\n\n// app/page.tsx — App Router entry\nexport default function Home() {\n  return <main>Welcome</main>;\n}\n```\n\nApp Router uses app/ with layouts and RSC by default; Pages router keeps getServerSideProps/getStaticProps patterns—new apps should start on App Router."
    },
    {
      "question": "What is layout.tsx?",
      "explanation": "Shared UI for a segment; client state in the layout persists across child navigations; Server Components in layouts re-fetch unless cached.\n\n```tsx\nimport React from 'react';\nimport type { ReactNode } from 'react';\n\nexport default function DashboardLayout({ children }: { children: React.ReactNode }) {\n  return (\n    <div className=\"shell\">\n      <Sidebar />\n      {children}\n    </div>\n  );\n}\n```\n\nLayouts wrap child segments and persist client state across navigations within the segment—Server Component layouts re-fetch unless cached."
    },
    {
      "question": "What is loading.tsx?",
      "explanation": "Instant loading UI via Suspense boundary for route segment.\n\n```tsx\nimport React from 'react';\n\nexport default function Loading() {\n  return <div className=\"skeleton\" aria-busy=\"true\" />;\n}\n```\n\nInstant fallback UI via Suspense for the route segment—shows while async server components or slow client children resolve."
    },
    {
      "question": "What is error.tsx?",
      "explanation": "Client error boundary for route segment; reset() recovers.\n\n```tsx\n'use client';\n\nimport React from 'react';\n\nexport default function Error({\n  error,\n  reset,\n}: {\n  error: Error;\n  reset: () => void;\n}) {\n  return (\n    <div>\n      <p>{error.message}</p>\n      <button onClick={reset}>Try again</button>\n    </div>\n  );\n}\n```\n\nMust be a client component—acts as an error boundary for the segment; reset() retries rendering after a failed server or client render."
    },
    {
      "question": "What is Metadata API?",
      "explanation": "```tsx\nexport const metadata = {\n  title: 'Products',\n  description: 'Browse our catalog',\n  openGraph: { title: 'Products' },\n};\n```\n\nexport const metadata or generateMetadata sets title/description/Open Graph without manual head management in client effects."
    },
    {
      "question": "What is Route handlers?",
      "explanation": "app/api/route.ts — HTTP methods as exported functions.\n\n```tsx\nexport async function GET() {\n  return Response.json({ ok: true });\n}\n\nexport async function POST(req: Request) {\n  const body = await req.json();\n  return Response.json({ received: body });\n}\n```\n\napp/api/**/route.ts exports GET/POST handlers—use for webhooks and BFF endpoints; keep secrets server-side."
    },
    {
      "question": "What is Middleware?",
      "explanation": "middleware.ts intercepts requests (auth, redirects, headers); defaults to Edge runtime; Node.js runtime supported in some versions—check current Next docs.\n\n```tsx\nexport function middleware(req: NextRequest) {\n  if (!req.cookies.get('session')) {\n    return NextResponse.redirect(new URL('/login', req.url));\n  }\n  return NextResponse.next();\n}\n```\n\nmiddleware.ts runs before routes—auth redirects, geo headers, A/B flags; check current Next docs for Edge vs Node runtime support per version."
    },
    {
      "question": "What is Image component?",
      "explanation": "next/image: optimization, lazy load, responsive sizes.\n\n```tsx\nimport React from 'react';\n\n<Image src=\"/hero.png\" alt=\"Team\" width={1200} height={630} priority />\n```\n\nnext/image serves responsive srcset, lazy loading, and blur placeholders—always set width/height or fill to prevent CLS."
    },
    {
      "question": "What is Font optimization?",
      "explanation": "next/font: self-host Google fonts, no layout shift.\n\n```tsx\nimport React from 'react';\n\nconst inter = Inter({ subsets: ['latin'], display: 'swap' });\n\n<body className={inter.className}>{children}</body>\n```\n\nnext/font self-hosts Google fonts at build time—eliminates layout shift from FOIT and extra DNS round trips."
    },
    {
      "question": "What is Dynamic routes?",
      "explanation": "[slug] folders; generateStaticParams for SSG paths.\n\n```tsx\nexport async function generateStaticParams() {\n  const posts = await getPosts();\n  return posts.map((p) => ({ slug: p.slug }));\n}\n```\n\n[slug] dynamic segments pair with generateStaticParams for known paths at build and on-demand ISR for the long tail."
    },
    {
      "question": "What is Client navigation?",
      "explanation": "Link prefetches; soft navigation without full reload.\n\n```tsx\nimport React from 'react';\nimport { Link } from 'react-router-dom';\n\n<Link href=\"/pricing\" prefetch>\n  Pricing\n</Link>\n```\n\nLink prefetches visible routes in production—soft navigation avoids full document reload while updating URL and RSC payload."
    },
    {
      "question": "What is Vercel deployment?",
      "explanation": "Zero-config for Next; edge functions; env vars per environment.\n\n```tsx\n// vercel.json or dashboard env: NEXT_PUBLIC_API_URL\n```\n\nGit push triggers preview URLs per PR; production env vars differ from preview—test auth callbacks on preview domains explicitly."
    },
    {
      "question": "What is ISR?",
      "explanation": "revalidate: 60 on fetch/page—regenerate stale pages in background.\n\n```tsx\nimport React from 'react';\n\nexport const revalidate = 60;\n\nexport default async function Page() {\n  const data = await fetchData();\n  return <List items={data} />;\n}\n```\n\nrevalidate: N seconds regenerates stale pages in the background—users see cached HTML while fresh data builds."
    },
    {
      "question": "What is Parallel routes?",
      "explanation": "@modal slots for simultaneous views (e.g. modal + page).\n\n```tsx\n// app/@modal/(.)login/page.tsx alongside app/dashboard/page.tsx\n```\n\n@modal slots render alongside children—open login modal and keep dashboard mounted underneath with independent loading/error UI."
    },
    {
      "question": "What is Intercepting routes?",
      "explanation": "(..)photo modal over gallery—URL reflects modal state.\n\n```tsx\n// app/@modal/(..)photos/[id]/page.tsx intercepts app/photos/[id]\n```\n\n(..) segments show a modal over the current page while URL reflects /photos/123—closing modal restores prior context without losing scroll."
    }
  ]
};
