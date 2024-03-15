/* eslint-disable react/no-unknown-property */
import { useControls, button } from "leva"
import { useState } from "react"
import { Canvas } from "@react-three/fiber"
import levelsJson from '../assets/levels.json'
import LevelEditor from "./LevelEditor"

const LevelSelector = () => {
  const [levels, setLevels] = useState(levelsJson)
  const [level, setLevel] = useState(null)
  const [zone, setZone] = useState(0)
  //console.log(levels)

  useControls('Level', {
    nextZone: button(() => {
      if (level) {
        const zones = levels[level].zones
        if (zone + 1 < zones.length) setZone(prev => prev + 1)
        else setZone(0)
      }
    })
  });

  if (level == null) {
    return (
      <div>
        <h1>Choose level to edit:</h1>
        <select onChange={(e) => setLevel(e.target.value)}>
          <option value=""></option>
          {Object.keys(levels).map((key) => (
            <option key={key} value={key}>{key}</option>
          ))}
        </select>
      </div>
    )
  }

  const backgroundImg = levels?.[level]?.zones?.[zone]?.img ? `url(${levels[level].zones[zone].img})` : '';  
  
  return (
    <>
      <div className="background" style={{ backgroundImage: backgroundImg}}></div>
      <Canvas>
        <LevelEditor levels={levels} setLevels={setLevels} level={level} zone={zone} />
      </Canvas>      
    </>
  )
}

export default LevelSelector