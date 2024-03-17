/* eslint-disable react/no-unknown-property */
import { Suspense, useEffect, useRef, useState } from "react"
import { Canvas } from "@react-three/fiber"
import levelsJson from '../assets/levels.json'
import Arena from "./Arena"

const Game = () => {
  const [levels, setLevels] = useState(levelsJson)
  const [level, setLevel] = useState(null)
  //console.log(levels)
  const backgroundRef = useRef(null)
  const [playerDestination, setPlayerDestination] = useState([-1,-1]) 

  const loadLevel = (lvl) => {
    setLevel(lvl)
  }

  // Handle mouse move and click
  useEffect(() => {
    const isInDoor = (x,y) => {
      const lvl = levels[level]
      if (!level) return null

      let inDoor = null
      lvl.doors.forEach( (door, index) => {
        if (x < parseInt(door.sx1)) return
        if (x > parseInt(door.sx2)) return
        if (y < parseInt(door.sy1)) return
        if (y > parseInt(door.sy2)) return
        inDoor = index
      })

      return inDoor
    } 
    const handleMouseMove = (e) => {
      const backgroundDiv = backgroundRef.current;
      if (!backgroundDiv) return;

      const rect = backgroundDiv.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      //console.log([x, y]);
    }

    const handleMouseClick = (e) => {
      const backgroundDiv = backgroundRef.current
      if (!backgroundDiv) return

      const rect = backgroundDiv.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const inDoor = isInDoor(x,y)
      if (inDoor != null) {
        const door = levels[level].doors[inDoor]
        const dest = [parseInt(door.x), parseInt(door.z)]
        console.log(dest)
        console.log(door.destination)
        setPlayerDestination(dest)
      }
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleMouseClick);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleMouseClick);
    };
  }, [levels, level]);

  if (level == null) {
    return (
      <div>
        <button onClick={()=>loadLevel("mainHall")}>
          New Game
        </button>
        <button>Load 1</button>
      </div>
    )
  }  

  const backgroundImg = levels?.[level]?.img ? `url(${levels[level].img})` : '';  
  
  return (
    <>
      <div 
        ref={backgroundRef}
        className="background"
        style={{ backgroundImage: backgroundImg}}
      />
      <Canvas shadows>
        <Suspense>
          <Arena levels={levels} setLevels={setLevels} level={level} playerDestination={playerDestination} setPlayerDestination={setPlayerDestination} />
        </Suspense>
      </Canvas>
    </>
  )
}

export default Game