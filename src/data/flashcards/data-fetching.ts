import type { FlashcardDeck } from './types';

export const dataFetchingDeck: FlashcardDeck = {
  "id": "data-fetching",
  "slug": "data-fetching",
  "title": "Data Fetching & Management",
  "cards": [
    {
      "question": "What is useEffect fetch pitfalls?",
      "explanation": "Race conditions, no cache, loading flicker—use cleanup/AbortController.\n\n```tsx\nimport { useEffect, useState } from 'react';\n\nfunction UserPanel({ userId }: { userId: string }) {\n  const [user, setUser] = useState<User | null>(null);\n\n  useEffect(() => {\n    const ctrl = new AbortController();\n    fetch(`/api/users/${userId}`, { signal: ctrl.signal })\n      .then((r) => r.json())\n      .then(setUser)\n      .catch((e) => {\n        if (e.name !== 'AbortError') console.error(e);\n      });\n    return () => ctrl.abort();\n  }, [userId]);\n\n  return user ? <p>{user.name}</p> : <p>Loading…</p>;\n}\n```\n\nIf the user changes filters before the prior fetch finishes, the slower response can overwrite fresher data—AbortController or an ignore flag fixes that race."
    },
    {
      "question": "What is TanStack Query benefits?",
      "explanation": "Caching, deduping, background refetch, staleTime, mutations, optimistic updates.\n\n```tsx\nimport React from 'react';\nimport { useQuery } from '@tanstack/react-query';\n\nconst qc = new QueryClient();\n\nfunction Todos({ userId }: { userId: string }) {\n  const { data, isLoading, isError, refetch } = useQuery({\n    queryKey: ['todos', userId],\n    queryFn: () => fetchTodos(userId),\n    staleTime: 60_000,\n  });\n\n  if (isLoading) return <Spinner />;\n  if (isError) return <button onClick={() => refetch()}>Retry</button>;\n  return <ul>{data.map((t) => <li key={t.id}>{t.title}</li>)}</ul>;\n}\n```\n\nQuery dedupes in-flight requests, keeps a normalized cache, and refetches in the background so you avoid hand-rolling loading/error/refetch logic in every screen."
    },
    {
      "question": "What is staleTime vs gcTime?",
      "explanation": "staleTime: how long data is fresh before background refetch; gcTime (formerly cacheTime in v4): how long unused cache stays in memory after unmount.\n\n```tsx\nimport { useQuery } from '@tanstack/react-query';\n\nuseQuery({\n  queryKey: ['posts'],\n  queryFn: fetchPosts,\n  staleTime: 30_000,\n  gcTime: 5 * 60_000,\n});\n```\n\nstaleTime is how long cached data is treated as fresh (no background refetch); gcTime is how long inactive cache entries stay in memory after the last subscriber unmounts."
    },
    {
      "question": "What is SWR pattern?",
      "explanation": "Stale-while-revalidate: show cache, revalidate in background.\n\n```tsx\nimport React from 'react';\nimport useSWR from 'swr';\n\nconst { data, error, isValidating, mutate } = useSWR('/api/profile', fetcher, {\n  revalidateOnFocus: true,\n});\n\nreturn (\n  <>\n    <Profile user={data} />\n    {isValidating && <span aria-hidden>↻</span>}\n    {error && <button onClick={() => mutate()}>Retry</button>}\n  </>\n);\n```\n\nShow the last good payload immediately while revalidating in the background—great for dashboards where stale data beats a blank screen."
    },
    {
      "question": "What is Server state vs client state?",
      "explanation": "Server: remote cache (Query). Client: UI toggles, form drafts (useState/Zustand).\n\n```tsx\nimport { useState } from 'react';\nimport { useQuery } from '@tanstack/react-query';\n\nconst { data: cart } = useQuery({ queryKey: ['cart'], queryFn: fetchCart });\nconst [isCheckoutOpen, setCheckoutOpen] = useState(false);\n\nreturn (\n  <>\n    <CartList items={cart} />\n    <button onClick={() => setCheckoutOpen(true)}>Checkout</button>\n  </>\n);\n```\n\nTreat API data as server state (Query/SWR); keep UI toggles, wizard steps, and modal open flags in local state or a small client store—mixing them causes double sources of truth."
    },
    {
      "question": "What is Optimistic updates?",
      "explanation": "Update UI before server confirms; rollback on error.\n\n```tsx\nimport React from 'react';\nimport { useMutation, useQueryClient } from '@tanstack/react-query';\n\nconst qc = useQueryClient();\n\nconst mutation = useMutation({\n  mutationFn: toggleTodo,\n  onMutate: async (id) => {\n    await qc.cancelQueries({ queryKey: ['todos'] });\n    const prev = qc.getQueryData<Todo[]>(['todos']);\n    qc.setQueryData(['todos'], (old = []) =>\n      old.map((t) => (t.id === id ? { ...t, done: !t.done } : t))\n    );\n    return { prev };\n  },\n  onError: (_e, _id, ctx) => qc.setQueryData(['todos'], ctx?.prev),\n  onSettled: () => qc.invalidateQueries({ queryKey: ['todos'] }),\n});\n```\n\nUpdate the UI before the server confirms, then roll back if the mutation fails—pair onMutate snapshots with onError restore for list UIs."
    },
    {
      "question": "What is Pagination patterns?",
      "explanation": "Offset/limit vs cursor; infinite scroll with useInfiniteQuery.\n\n```tsx\nimport React from 'react';\nimport { useInfiniteQuery } from '@tanstack/react-query';\n\nconst { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({\n  queryKey: ['feed'],\n  queryFn: ({ pageParam }) => fetchFeed({ cursor: pageParam }),\n  initialPageParam: null as string | null,\n  getNextPageParam: (last) => last.nextCursor ?? undefined,\n});\n\nreturn (\n  <>\n    {data.pages.flatMap((p) => p.items).map((item) => <Card key={item.id} item={item} />)}\n    {hasNextPage && (\n      <button disabled={isFetchingNextPage} onClick={() => fetchNextPage()}>\n        Load more\n      </button>\n    )}\n  </>\n);\n```\n\nOffset pagination is simple but drifts when rows are inserted; cursor pages are stable for feeds and pair naturally with useInfiniteQuery."
    },
    {
      "question": "What is Prefetching?",
      "explanation": "queryClient.prefetchQuery on hover/route loader for faster navigation.\n\n```tsx\nimport React from 'react';\nimport { Link } from 'react-router-dom';\n\nfunction ProductLink({ id, title }: { id: string; title: string }) {\n  const qc = useQueryClient();\n\n  return (\n    <Link\n      to={`/products/${id}`}\n      onMouseEnter={() =>\n        qc.prefetchQuery({\n          queryKey: ['product', id],\n          queryFn: () => fetchProduct(id),\n          staleTime: 60_000,\n        })\n      }\n    >\n      {title}\n    </Link>\n  );\n}\n```\n\nWarm the cache on hover or in a route loader so navigation feels instant without blocking the current view on a full fetch."
    },
    {
      "question": "What is Error handling?",
      "explanation": "isError, error object, retry, error boundaries for unexpected.\n\n```tsx\nimport React from 'react';\nimport { useQuery } from '@tanstack/react-query';\n\nconst { data, isError, error, refetch, isFetching } = useQuery({\n  queryKey: ['invoice', id],\n  queryFn: () => fetchInvoice(id),\n  retry: 2,\n});\n\nif (isError) {\n  return (\n    <div role=\"alert\">\n      <p>{error.message}</p>\n      <button onClick={() => refetch()} disabled={isFetching}>Try again</button>\n    </div>\n  );\n}\n```\n\nSurface query errors in UI (isError, error.message), retry transient failures, and reserve error boundaries for unexpected render throws—not for routine 404s."
    },
    {
      "question": "What is Mutations?",
      "explanation": "```tsx\nimport { useMutation, useQueryClient } from '@tanstack/react-query';\n\nconst qc = useQueryClient();\n\nconst createPost = useMutation({\n  mutationFn: (body: NewPost) => api.createPost(body),\n  onSuccess: () => {\n    qc.invalidateQueries({ queryKey: ['posts'] });\n  },\n});\n```\n\nAfter a successful mutation, invalidate or update related query keys so lists and detail views stay in sync without manual refetch wiring in every caller."
    },
    {
      "question": "What is GraphQL with React?",
      "explanation": "Apollo Client or urql: normalized cache, queries, subscriptions.\n\n```tsx\nimport React from 'react';\nimport { useQuery } from '@tanstack/react-query';\n\nconst { data, loading } = useQuery(gql`\n  query User($id: ID!) {\n    user(id: $id) { id name posts { id title } }\n  }\n`, { variables: { id } });\n\nif (loading) return <Skeleton />;\nreturn <h1>{data.user.name}</h1>;\n```\n\nClients like Apollo normalize entities by __typename + id so list and detail views share one cache; colocate queries with components or use fragments for reusable fields."
    },
    {
      "question": "What is WebSockets?",
      "explanation": "```tsx\nimport { useEffect } from 'react';\n\nuseEffect(() => {\n  const ws = new WebSocket(WS_URL);\n\n  ws.onmessage = (evt) => {\n    const msg = JSON.parse(evt.data);\n    qc.setQueryData<ChatMessage[]>(['chat', roomId], (old = []) => [...old, msg]);\n  };\n\n  return () => ws.close();\n}, [roomId, qc]);\n```\n\nSubscribe in useEffect, push messages into Query cache or local state, and always unsubscribe on unmount to avoid duplicate handlers after Fast Refresh."
    },
    {
      "question": "What is Suspense for data?",
      "explanation": "Suspense shows fallback while children suspend; React 19 can read promises with use(promise) under a boundary, or use library helpers like useSuspenseQuery.\n\n```tsx\nimport { Suspense, use } from 'react';\n\nfunction Comments({ promise }: { promise: Promise<Comment[]> }) {\n  const comments = use(promise);\n  return (\n    <ul>\n      {comments.map((c) => (\n        <li key={c.id}>{c.text}</li>\n      ))}\n    </ul>\n  );\n}\n\n<Suspense fallback={<p>Loading comments…</p>}>\n  <Comments promise={fetchComments()} />\n</Suspense>\n```\n\nA Suspense boundary shows fallback while children suspend; React 19 use(promise) or library useSuspenseQuery keeps loading UI declarative instead of isLoading branches."
    },
    {
      "question": "What is RSC data fetching?",
      "explanation": "async Server Component fetch—no client waterfall.\n\n```tsx\nimport React from 'react';\n\nexport default async function ProductPage({ params }: { params: { id: string } }) {\n  const product = await db.product.find(params.id);\n  return <ProductDetails product={product} />;\n}\n```\n\nFetch in an async Server Component on the server so the client never waterfalls through useEffect for initial data—pass serializable results into client children as props."
    },
    {
      "question": "What is Request deduplication?",
      "explanation": "Same key requests merge—built into Query/SWR.\n\n```tsx\nimport React from 'react';\nimport { useQuery } from '@tanstack/react-query';\n\nfunction HeaderBadge() {\n  const { data } = useQuery({ queryKey: ['unread'], queryFn: fetchUnread });\n  return <span>{data?.count}</span>;\n}\n\nfunction Inbox() {\n  const { data } = useQuery({ queryKey: ['unread'], queryFn: fetchUnread });\n  return <List items={data?.items} />;\n}\n```\n\nTwo components mounting with the same query key should share one network request—TanStack Query and SWR merge in-flight calls automatically."
    }
  ]
};
