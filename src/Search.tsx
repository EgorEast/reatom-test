import { useAtom } from '@reatom/npm-react'
import { inputAtom, searchAtom } from './model'
import {
  reatomAsync,
  sleep,
  withAbort,
  withDataAtom,
  withCache,
  withRetry,
  onUpdate,
} from '@reatom/framework'

const api = async (query: string, controller: AbortController) => {
  const res = await fetch(`https://api.github.com/search/issues?q=${query}`, {
    signal: controller.signal,
  })

  return (await res.json()) as { items?: { title: string }[] }
}

const fetchIssues = reatomAsync(async (ctx, query: string) => {
  await sleep(350) // debounce
  const { items } = await api(query, ctx.controller)
  console.log('items: ', items)
  return items
}, 'fetchIssues').pipe(
  withAbort({ strategy: 'last-in-win' }),
  withDataAtom([]),
  withCache({ length: 50, swr: false, paramsLength: 1 }),
  withRetry({
    onReject(ctx, error, retries) {
      // return delay in ms or -1 to prevent retries
      return ((error as Error) || null)?.message.includes('rate limit')
        ? 100 * Math.min(500, retries ** 2)
        : -1
    },
  }),
)

// run fetchIssues on every searchAtom update
onUpdate(searchAtom, fetchIssues)

export const Search = () => {
  const [input] = useAtom(inputAtom)
  console.log('input: ', input)

  const [search, setSearch] = useAtom(searchAtom)
  const [issues] = useAtom(fetchIssues.dataAtom)
  // you could pass a callback to `useAtom` to create a computed atom
  const [isLoading] = useAtom(
    ctx =>
      // even if there are no pending requests, we need to wait for retries
      // let do not show the limit error to make him think that everything is fine for a better UX
      ctx.spy(fetchIssues.pendingAtom) + ctx.spy(fetchIssues.retriesAtom) > 0,
  )

  return (
    <main>
      <input value={search} onChange={e => setSearch(e.currentTarget.value)} placeholder='Search' />
      {isLoading && 'Loading...'}
      <ul>
        {issues?.map(({ title }, i) => (
          <li key={i}>{title}</li>
        ))}
      </ul>
    </main>
  )
}
