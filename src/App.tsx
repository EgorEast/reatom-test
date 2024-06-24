import { useEffect } from 'react'
import { inputAtom, greetingAtom, onSubmit } from './model'
import { Search } from './Search'
import { useAction, useAtom, useCtx } from '@reatom/npm-react'
import './App.css'

function App() {
  const ctx = useCtx()

  const [input, setInput] = useAtom(inputAtom)
  const [greeting] = useAtom(({ spy }) => `common:GREETING ${spy(inputAtom)}!`)
  const submit = useAction(onSubmit)

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
      <button onClick={submit}>save</button>
      <Search />
    </>
  )
}

export default App
