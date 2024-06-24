import { useEffect } from 'react'
import { inputAtom, greetingAtom, onSubmit } from './model'
import { Search } from './Search'
import { useAtom, useCtx } from '@reatom/npm-react'
import './App.css'

function App() {
  const [input, setInput] = useAtom(inputAtom)
  const [greeting] = useAtom(ctx => `common:GREETING ${ctx.spy(inputAtom)}!`)
  const ctx = useCtx()

  useEffect(() => {
    ctx.subscribe(greetingAtom, greeting => {
      const greetingEl = document.getElementById('greeting')

      if (!greetingEl) return

      greetingEl.innerText = greeting
    })
  }, [])

  return (
    <>
      <b>{input}</b>
      <input id='name' onInput={e => setInput(e.currentTarget.value)} />
      <div id='greeting'></div>
      <div style={{ color: 'red' }}>{greeting}</div>
      <button onClick={() => onSubmit(ctx)}>save</button>
      <Search />
    </>
  )
}

export default App
