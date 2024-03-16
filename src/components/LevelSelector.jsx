/* eslint-disable react/no-unknown-property */
import { useEffect, useState } from "react"
import { Canvas } from "@react-three/fiber"
import levelsJson from '../assets/levels.json'
import LevelEditor from "./LevelEditor"
import LevelPanel from "./LevelPanel"

const LevelSelector = () => {
  const [levels, setLevels] = useState(levelsJson)
  const [level, setLevel] = useState(null)
  //console.log(levels)
  const [nodeInfo, setNodeInfo] = useState(null)
  const [doors, setDoors] = useState([])

  useEffect(() => {
    if (!level) return

    const lvl = levels[level]
    setDoors(lvl.doors)

  }, [levels, level])

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

  const backgroundImg = levels?.[level]?.img ? `url(${levels[level].img})` : ''
  const nodePos = nodeInfo ? `[${nodeInfo[0]},${nodeInfo[1]}]` : ''
  
  return (
    <>
      <div className="background" style={{ backgroundImage: backgroundImg}}></div>
      <Canvas>
        <LevelEditor levels={levels} setLevels={setLevels} level={level} setNodeInfo={setNodeInfo} doors={doors} />
      </Canvas>
      <div className="hud-editor">
          <p>{nodePos}</p>
      </div>
      <LevelPanel doors={doors} setDoors={setDoors} />
    </>
  )
}

export default LevelSelector