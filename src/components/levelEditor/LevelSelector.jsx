/* eslint-disable react/no-unknown-property */
import { useEffect, useRef, useState } from "react"
import { Canvas } from "@react-three/fiber"
import levelsJson from '../../assets/levels.json'
import LevelEditor from "./LevelEditor"
import LevelPanel from "./LevelPanel"

const LevelSelector = () => {
  const [levels, setLevels] = useState(levelsJson)
  const [level, setLevel] = useState(null)
  //console.log(levels)
  const [nodeInfo, setNodeInfo] = useState(null)
  const [screenInfo, setScreenInfo] = useState(null)
  const [doors, setDoors] = useState([])
  const [items, setItems] = useState([])
  const backgroundRef = useRef()

  useEffect(() => {
    if (!level) return

    const lvl = levels[level]
    console.log(doors, lvl.doors)
    if (lvl.doors) setDoors(lvl.doors)
    if (lvl.items) setItems(lvl.items)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [levels, level])

  useEffect(() => {
    const handleMouseMove = (e) => {
      const backgroundDiv = backgroundRef.current;
      if (!backgroundDiv) return
  
      const rect = backgroundDiv.getBoundingClientRect();
      const x = Math.round(e.clientX - rect.left)
      const y = Math.round(e.clientY - rect.top)
      setScreenInfo(`x: ${x}, y: ${y}`);
    }

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

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
      <div
        className="background"
        style={{ backgroundImage: backgroundImg}}
        ref={backgroundRef}
      />
      <Canvas>
        <LevelEditor levels={levels} setLevels={setLevels} level={level} setNodeInfo={setNodeInfo} setScreenInfo={setScreenInfo} doors={doors} items={items} />
      </Canvas>
      <div className="hud-editor">
        <p>{screenInfo}</p>
        <p>{nodePos}</p>
      </div>
      <LevelPanel 
        doors={doors}
        setDoors={setDoors} 
        items={items}
        setItems={setItems}
      />
    </>
  )
}

export default LevelSelector