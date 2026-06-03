import type { FlashcardDeck } from './types';

export const routingNavigationDeck: FlashcardDeck = {
  "id": "routing-navigation",
  "slug": "routing",
  "title": "Routing & Navigation",
  "cards": [
    {
      "question": "What is React Router 7 basics?",
      "explanation": "createBrowserRouter + RouterProvider, or <BrowserRouter> with Routes/Route element, Link, NavLink, useNavigate (RR 6/7 patterns).\n\nInterview tip: tie this to a URL, layout, or redirect users could bookmark or share."
    },
    {
      "question": "What is Nested routes?",
      "explanation": "Parent Route with Outlet; child routes render inside parent layout.\n\nInterview tip: tie this to a URL, layout, or redirect users could bookmark or share."
    },
    {
      "question": "What is Dynamic params?",
      "explanation": "path=\"users/:id\" — useParams() returns { id }.\n\nInterview tip: tie this to a URL, layout, or redirect users could bookmark or share."
    },
    {
      "question": "What is Search params?",
      "explanation": "useSearchParams() read/write query string; good for filters/pagination.\n\nInterview tip: tie this to a URL, layout, or redirect users could bookmark or share."
    },
    {
      "question": "What is Programmatic navigation?",
      "explanation": "navigate(\"/path\") or navigate(-1) for history back.\n\nInterview tip: tie this to a URL, layout, or redirect users could bookmark or share."
    },
    {
      "question": "What is Protected routes?",
      "explanation": "Wrapper checks auth; redirect to login with location state return URL.\n\nInterview tip: tie this to a URL, layout, or redirect users could bookmark or share."
    },
    {
      "question": "What is Lazy routes?",
      "explanation": "const Page = lazy(() => import(\"./Page\")); wrap Route in Suspense.\n\nInterview tip: tie this to a URL, layout, or redirect users could bookmark or share."
    },
    {
      "question": "What is 404 handling?",
      "explanation": "path=\"*\" element={<NotFound />} at end of Routes.\n\nInterview tip: tie this to a URL, layout, or redirect users could bookmark or share."
    },
    {
      "question": "What is Data routers?",
      "explanation": "createBrowserRouter + loaders/actions for data on navigation (RR 6.4+).\n\nInterview tip: tie this to a URL, layout, or redirect users could bookmark or share."
    },
    {
      "question": "What is Relative links?",
      "explanation": "Link to=\"details\" resolves relative to parent route path.\n\nInterview tip: tie this to a URL, layout, or redirect users could bookmark or share."
    },
    {
      "question": "What is Index routes?",
      "explanation": "Default child at parent URL—index route element on parent path.\n\nInterview tip: tie this to a URL, layout, or redirect users could bookmark or share."
    },
    {
      "question": "What is Scroll restoration?",
      "explanation": "Manual useEffect on pathname or ScrollRestoration in frameworks.\n\nInterview tip: tie this to a URL, layout, or redirect users could bookmark or share."
    },
    {
      "question": "What is Next.js App Router?",
      "explanation": "File-system routes under app/ with layout.tsx, page.tsx, loading.tsx; Server Components by default, \"use client\" for boundaries.\n\nInterview tip: tie this to a URL, layout, or redirect users could bookmark or share."
    },
    {
      "question": "What is Deep linking?",
      "explanation": "URLs reflect app state for sharing; sync tab state to query params.\n\nInterview tip: tie this to a URL, layout, or redirect users could bookmark or share."
    },
    {
      "question": "What is Route-based code splitting?",
      "explanation": "Each route chunk loads separately—smaller initial bundle.\n\nInterview tip: tie this to a URL, layout, or redirect users could bookmark or share."
    }
  ]
};
