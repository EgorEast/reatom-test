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

document.getElementById('name')?.addEventListener('input', event => {
  inputAtom(reatomCtx, (event.currentTarget as HTMLInputElement)?.value)
})
document.getElementById('save')?.addEventListener('click', () => {
  onSubmit(reatomCtx)
})

function App() {
  const [input, setInput] = useAtom(inputAtom)

  return (
    <>
      <b>{input}</b>
      <input id='name' onInput={e => setInput(e.currentTarget.value)} />
      <div id='greeting'></div>
      <button id='save'>sdc</button>
      <Search />
    </>
  )
}

export default App
