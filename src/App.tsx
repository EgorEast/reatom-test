import { inputAtom, greetingAtom, onSubmit } from './model'
import { Search } from './Search'
import { useAtom } from '@reatom/npm-react'
import { reatomCtx } from './Providers'
import './App.css'

reatomCtx.subscribe(greetingAtom, greeting => {
  const greetingEl = document.getElementById('greeting')

  if (!greetingEl) return

  greetingEl.innerText = greeting
})

function App() {
  const [input, setInput] = useAtom(inputAtom)
  const [greeting] = useAtom(ctx => `common:GREETING ${ctx.spy(inputAtom)}!`)

  return (
    <>
      <b>{input}</b>
      <input id='name' onInput={e => setInput(e.currentTarget.value)} />
      <div id='greeting'></div>
      <div style={{ color: 'red' }}>{greeting}</div>
      <button onClick={() => onSubmit(reatomCtx)}>save</button>
      <Search />
    </>
  )
}

export default App
