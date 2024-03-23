import './App.css'
import MainMenu from './components/MainMenu'
import { useEffect, useRef, useState } from 'react'
import LevelSelector from './components/levelEditor/LevelSelector'
import Game from './components/Game'

function App() {
  const [mode, setMode] = useState(0)

  const style = {
    backgroundImage: mode == 0 ? `url(./titleShot.png)` : '',
    height: "100%"
  }

  const menuMusic = useRef()

  const clicked = () => {
    if (mode == 0) { 
      setMode(1)

      menuMusic.current.play()
      //menuMusic.volume = 0.25
    }
    else if (mode == 1) {
      menuMusic.current.pause()
    }
  }

  useEffect(() => {
    if (menuMusic.current) {
      menuMusic.current.volume = 0.25
    }
  }, [])

  return (
    <div style={style} onClick={clicked}>
      { mode == 1 && <MainMenu setMode={setMode} /> }
      { mode == 2 && <Game /> }
      { mode == 9 && <LevelSelector /> }

      <audio
        ref={menuMusic}
        id="menuMusic"
        src='./audio/scary-piano.wav'
        loop
        autoPlay
      />
    </div>
  )
}

export default App
