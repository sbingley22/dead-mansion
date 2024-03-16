/* eslint-disable react/no-unknown-property */
import { Suspense, useState } from "react"
import { Canvas } from "@react-three/fiber"
import levelsJson from '../assets/levels.json'
import Arena from "./Arena"

const Game = () => {
  const [levels, setLevels] = useState(levelsJson)
  const [level, setLevel] = useState(null)
  const [zone, setZone] = useState(0)
  //console.log(levels)

  const loadLevel = (lvl, zn) => {
    setLevel(lvl)
    setZone(zn)
  }

  if (level == null) {
    return (
      <div>
        <button onClick={()=>loadLevel("mainHall", 0)}>New Game</button>
        <button>Load 1</button>
      </div>
    )
  }  

  const backgroundImg = levels?.[level]?.zones?.[zone]?.img ? `url(${levels[level].zones[zone].img})` : '';  
  
  return (
    <>
      <div className="background" style={{ backgroundImage: backgroundImg}}></div>
      <Canvas>
        <Suspense>
          <Arena levels={levels} setLevels={setLevels} level={level} zone={zone} />
        </Suspense>
      </Canvas>
    </>
  )
}

export default Game