import { atom, action } from '@reatom/framework'

const initState = localStorage.getItem('name') ?? ''
export const inputAtom = atom(initState)

export const greetingAtom = atom(ctx => {
  // `spy` dynamically reads the atom and subscribes to it
  const input = ctx.spy(inputAtom)
  return input ? `Hello, ${input}!` : ''
})

export const onSubmit = action<[{ name: string }]>((ctx, { name }) => {
  console.log('name: ', name)

  const input = ctx.get(inputAtom)
  ctx.schedule(() => {
    localStorage.setItem('name', input)
  })
})

export const searchAtom = atom('', 'searchAtom')
