import './App.css'
import MainMenu from './components/MainMenu'
import { useState } from 'react'
import LevelSelector from './components/LevelSelector'
import Game from './components/Game'

function App() {
  const [mode, setMode] = useState(9)

  const style = {
    backgroundImage: mode == 0 ? `url(./titleShot.png)` : '',
    height: "100%"
  }

  const clicked = () => {
    if (mode == 0) setMode(1)
  }

  return (
    <div style={style} onClick={clicked}>
      { mode == 1 && <MainMenu setMode={setMode} /> }
      { mode == 2 && <Game /> }
      { mode == 9 && <LevelSelector /> }
    </div>
  )
}

export default App
