import type { FlashcardDeck } from './types';

export const routingNavigationDeck: FlashcardDeck = {
  "id": "routing-navigation",
  "slug": "routing",
  "title": "Routing & Navigation",
  "cards": [
    {
      "question": "What is React Router 7 basics?",
      "explanation": "createBrowserRouter + RouterProvider, or <BrowserRouter> with Routes/Route element, Link, NavLink, useNavigate (RR 6/7 patterns).\n\n```tsx\nimport React from 'react';\nimport { RouterProvider, createBrowserRouter } from 'react-router-dom';\n\nconst router = createBrowserRouter([\n  { path: '/', element: <Home /> },\n  { path: '/about', element: <About /> },\n]);\n\nexport function App() {\n  return <RouterProvider router={router} />;\n}\n```\n\nData routers (createBrowserRouter) support loaders and actions; declarative BrowserRouter + Routes still works for smaller apps—pick one style per app."
    },
    {
      "question": "What is Nested routes?",
      "explanation": "Parent Route with Outlet; child routes render inside parent layout.\n\n```tsx\nimport React from 'react';\nimport { Route } from 'react-router-dom';\n\n<Route path=\"dashboard\" element={<DashboardLayout />}>\n  <Route index element={<Overview />} />\n  <Route path=\"settings\" element={<Settings />} />\n</Route>\n```\n\nParent routes render a layout with <Outlet />; child paths append without re-mounting the shell—ideal for dashboards with persistent side nav."
    },
    {
      "question": "What is Dynamic params?",
      "explanation": "```tsx\nimport React from 'react';\nimport { Route, useParams } from 'react-router-dom';\nimport { useQuery } from '@tanstack/react-query';\n\n<Route path=\"users/:userId\" element={<UserProfile />} />;\n\nfunction UserProfile() {\n  const { userId } = useParams();\n  const { data } = useQuery({ queryKey: ['user', userId], queryFn: () => fetchUser(userId!) });\n  return <h1>{data?.name}</h1>;\n}\n```\n\nuseParams() reads :id segments—validate and parse IDs before fetching; invalid slugs should hit a 404 or error route, not throw in render."
    },
    {
      "question": "What is Search params?",
      "explanation": "```tsx\nimport { useSearchParams } from 'react-router-dom';\n\nconst [params, setParams] = useSearchParams();\nconst page = Number(params.get('page') ?? '1');\n\nfunction goNext() {\n  setParams((p) => { p.set('page', String(page + 1)); return p; });\n}\n```\n\nuseSearchParams syncs filters and page numbers to the URL—users can bookmark ?page=2&sort=price without custom history hacks."
    },
    {
      "question": "What is Programmatic navigation?",
      "explanation": "navigate(\"/path\") or navigate(-1) for history back.\n\n```tsx\nimport { useNavigate } from 'react-router-dom';\n\nconst navigate = useNavigate();\n\nasync function onSave() {\n  await api.save();\n  navigate('/success', { replace: true });\n}\n```\n\nnavigate(path) after mutations; navigate(-1) for back—pass { replace: true } when redirecting after login to avoid stacking history entries."
    },
    {
      "question": "What is Protected routes?",
      "explanation": "Wrapper checks auth; redirect to login with location state return URL.\n\n```tsx\nimport React from 'react';\nimport type { ReactNode } from 'react';\nimport { Navigate } from 'react-router-dom';\n\nfunction RequireAuth({ children }: { children: React.ReactNode }) {\n  const user = useAuth();\n  const location = useLocation();\n  if (!user) return <Navigate to=\"/login\" state={{ from: location }} replace />;\n  return children;\n}\n```\n\nGate layouts with auth checks and redirect to login while preserving location.state.from for post-login return navigation."
    },
    {
      "question": "What is Lazy routes?",
      "explanation": "```tsx\nimport { Suspense, lazy } from 'react';\nimport { Route } from 'react-router-dom';\n\nconst Admin = lazy(() => import('./Admin'));\n\n<Route\n  path=\"admin\"\n  element={\n    <Suspense fallback={<Spinner />}>\n      <Admin />\n    </Suspense>\n  }\n/>\n```\n\nlazy(() => import()) per route shrinks the initial bundle—always wrap route elements in Suspense with a meaningful fallback."
    },
    {
      "question": "What is 404 handling?",
      "explanation": "path=\"*\" element={<NotFound />} at end of Routes.\n\n```tsx\nimport React from 'react';\nimport { Route } from 'react-router-dom';\n\n<Routes>\n  <Route path=\"/\" element={<Home />} />\n  <Route path=\"*\" element={<NotFound />} />\n</Routes>\n```\n\nA catch-all path=\"*\" route at the end of the tree renders NotFound—nested apps may use a splat under a parent prefix instead of global *."
    },
    {
      "question": "What is Data routers?",
      "explanation": "createBrowserRouter + loaders/actions for data on navigation (RR 6.4+).\n\n```tsx\nimport React from 'react';\n\n{\n  path: 'projects/:id',\n  loader: ({ params }) => fetchProject(params.id),\n  element: <Project />,\n  errorElement: <ProjectError />,\n}\n```\n\nLoader functions fetch before render; actions handle form posts—errors can throw to errorElement boundaries per route."
    },
    {
      "question": "What is Relative links?",
      "explanation": "Link to=\"details\" resolves relative to parent route path.\n\n```tsx\nimport React from 'react';\nimport { Link } from 'react-router-dom';\n\n// at /dashboard\n<Link to=\"settings\">Settings</Link>\n// → /dashboard/settings\n```\n\nLink to=\"settings\" resolves relative to the current route URL—portable when nesting under /dashboard without hardcoding full paths."
    },
    {
      "question": "What is Index routes?",
      "explanation": "Default child at parent URL—index route element on parent path.\n\n```tsx\nimport React from 'react';\nimport { Route } from 'react-router-dom';\n\n<Route path=\"account\" element={<AccountLayout />}>\n  <Route index element={<Profile />} />\n  <Route path=\"security\" element={<Security />} />\n</Route>\n```\n\nAn index route renders at the parent path exactly—different from path=\"\" child in some mental models; use for default tab content."
    },
    {
      "question": "What is Scroll restoration?",
      "explanation": "Manual useEffect on pathname or ScrollRestoration in frameworks.\n\n```tsx\nimport { useEffect } from 'react';\n\nconst { pathname } = useLocation();\n\nuseEffect(() => {\n  window.scrollTo(0, 0);\n}, [pathname]);\n```\n\nSPAs do not reset scroll on navigation by default—scrollTo(0,0) on pathname change or use framework ScrollRestoration for Next."
    },
    {
      "question": "What is Next.js App Router?",
      "explanation": "File-system routes under app/ with layout.tsx, page.tsx, loading.tsx; Server Components by default, \"use client\" for boundaries.\n\n```tsx\nimport React from 'react';\n\n// app/dashboard/page.tsx\nexport default async function DashboardPage() {\n  const stats = await getStats();\n  return <StatsGrid stats={stats} />;\n}\n```\n\nFile-system routes under app/ with layout.tsx and page.tsx; Server Components by default—add \"use client\" only where interactivity is required."
    },
    {
      "question": "What is Deep linking?",
      "explanation": "URLs reflect app state for sharing; sync tab state to query params.\n\n```tsx\nimport React from 'react';\nimport { useSearchParams } from 'react-router-dom';\n\nconst [params, setParams] = useSearchParams();\nconst photoId = params.get('photo');\n\n{photoId && <Lightbox id={photoId} onClose={() => setParams({})} />}\n```\n\nMirror modal open state and selected tab in the URL so shared links reopen the same UI—especially for photo lightboxes and wizard steps."
    },
    {
      "question": "What is Route-based code splitting?",
      "explanation": "Each route chunk loads separately—smaller initial bundle.\n\n```tsx\nimport { lazy } from 'react';\n\nconst routes = [\n  { path: '/', lazy: () => import('./Home') },\n  { path: '/reports', lazy: () => import('./Reports') },\n];\n```\n\nEach route chunk loads on first visit—initial entry only includes the home route graph; monitor chunk count vs cache headers in production."
    }
  ]
};
