import type { FlashcardDeck } from './types';

export const dataFetchingDeck: FlashcardDeck = {
  "id": "data-fetching",
  "slug": "data-fetching",
  "title": "Data Fetching & Management",
  "cards": [
    {
      "question": "What is useEffect fetch pitfalls?",
      "explanation": "Race conditions, no cache, loading flicker—use cleanup/AbortController.\n\nInterview tip: contrast this with a raw useEffect fetch—caching, race handling, or stale UI you avoided."
    },
    {
      "question": "What is TanStack Query benefits?",
      "explanation": "Caching, deduping, background refetch, staleTime, mutations, optimistic updates.\n\nInterview tip: contrast this with a raw useEffect fetch—caching, race handling, or stale UI you avoided."
    },
    {
      "question": "What is staleTime vs gcTime?",
      "explanation": "staleTime: how long data is fresh before background refetch; gcTime (formerly cacheTime in v4): how long unused cache stays in memory after unmount.\n\nInterview tip: contrast this with a raw useEffect fetch—caching, race handling, or stale UI you avoided."
    },
    {
      "question": "What is SWR pattern?",
      "explanation": "Stale-while-revalidate: show cache, revalidate in background.\n\nInterview tip: contrast this with a raw useEffect fetch—caching, race handling, or stale UI you avoided."
    },
    {
      "question": "What is Server state vs client state?",
      "explanation": "Server: remote cache (Query). Client: UI toggles, form drafts (useState/Zustand).\n\nInterview tip: contrast this with a raw useEffect fetch—caching, race handling, or stale UI you avoided."
    },
    {
      "question": "What is Optimistic updates?",
      "explanation": "Update UI before server confirms; rollback on error.\n\nInterview tip: contrast this with a raw useEffect fetch—caching, race handling, or stale UI you avoided."
    },
    {
      "question": "What is Pagination patterns?",
      "explanation": "Offset/limit vs cursor; infinite scroll with useInfiniteQuery.\n\nInterview tip: contrast this with a raw useEffect fetch—caching, race handling, or stale UI you avoided."
    },
    {
      "question": "What is Prefetching?",
      "explanation": "queryClient.prefetchQuery on hover/route loader for faster navigation.\n\nInterview tip: contrast this with a raw useEffect fetch—caching, race handling, or stale UI you avoided."
    },
    {
      "question": "What is Error handling?",
      "explanation": "isError, error object, retry, error boundaries for unexpected.\n\nInterview tip: contrast this with a raw useEffect fetch—caching, race handling, or stale UI you avoided."
    },
    {
      "question": "What is Mutations?",
      "explanation": "useMutation with onSuccess invalidateQueries to refresh lists.\n\nInterview tip: contrast this with a raw useEffect fetch—caching, race handling, or stale UI you avoided."
    },
    {
      "question": "What is GraphQL with React?",
      "explanation": "Apollo Client or urql: normalized cache, queries, subscriptions.\n\nInterview tip: contrast this with a raw useEffect fetch—caching, race handling, or stale UI you avoided."
    },
    {
      "question": "What is WebSockets?",
      "explanation": "useEffect subscription; update cache or local state on message.\n\nInterview tip: contrast this with a raw useEffect fetch—caching, race handling, or stale UI you avoided."
    },
    {
      "question": "What is Suspense for data?",
      "explanation": "Suspense shows fallback while children suspend; React 19 can read promises with use(promise) under a boundary, or use library helpers like useSuspenseQuery.\n\nInterview tip: contrast this with a raw useEffect fetch—caching, race handling, or stale UI you avoided."
    },
    {
      "question": "What is RSC data fetching?",
      "explanation": "async Server Component fetch—no client waterfall.\n\nInterview tip: contrast this with a raw useEffect fetch—caching, race handling, or stale UI you avoided."
    },
    {
      "question": "What is Request deduplication?",
      "explanation": "Same key requests merge—built into Query/SWR.\n\nInterview tip: contrast this with a raw useEffect fetch—caching, race handling, or stale UI you avoided."
    }
  ]
};
