/* eslint-disable react/no-unknown-property */
import { Suspense, useEffect, useRef, useState } from "react"
import { Canvas } from "@react-three/fiber"
import levelsJson from '../assets/levels.json'
import Arena from "./Arena"
import FloatingPanel from "./FloatingPanel"
import Status from "./Status"
import InventoryUi from "./InventoryUi"
import DialogUi from "./DialogUi"

const Game = () => {
  const [levels, setLevels] = useState(levelsJson)
  const [level, setLevel] = useState(null)
  const [levelDoor, setLevelDoor] = useState("study")
  //console.log(levels)
  const backgroundRef = useRef(null)
  const [currentCursor, setCurrentCursor] = useState('crosshair');

  const [playerDestination, setPlayerDestination] = useState([-1,-1])
  const [destinationAction, setDestinationAction] = useState(null)
  const [reachedDestination, setReachedDestination] = useState(null)
  const [inventory, setInventory] = useState([])
  const [playerStats, setPlayerStats] = useState({
    health: 30
  })
  const [dialog, setDialog] = useState([])

  const loadLevel = (lvl) => {
    if (level) setLevelDoor(level)
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

    const isOverItem = (x,y) => {
      const lvl = levels[level]
      if (!level) return null

      let overItem = null
      if (!lvl.items) return null
      lvl.items.forEach( (item, index) => {
        if (item.collected) return
        const sx =  parseInt(item.sx)
        const sy =  parseInt(item.sy)
        const radius =  parseInt(item.radius)
        if (x < sx - radius) return
        if (x > sx + radius) return
        if (y < sy - radius) return
        if (y > sy + radius) return
        overItem = index
      })

      return overItem
    }

    const handleMouseMove = (e) => {
      const backgroundDiv = backgroundRef.current;
      if (!backgroundDiv) return;

      const rect = backgroundDiv.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      //console.log([x, y]);

      const overItem = isOverItem(x,y)
      if (overItem != null) {
        setCurrentCursor('pointer')
        return
      }
      const inDoor = isInDoor(x,y)
      if (inDoor != null) {
        setCurrentCursor('move')
        return
      }
      
      setCurrentCursor('crosshair')      
    }

    const handleMouseClick = (e) => {
      const backgroundDiv = backgroundRef.current
      if (!backgroundDiv) return

      const rect = backgroundDiv.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      let action = null

      const inDoor = isInDoor(x,y)
      if (inDoor != null) {
        const door = levels[level].doors[inDoor]
        const dest = [parseInt(door.x), parseInt(door.z)]
        setPlayerDestination(dest)
        //console.log(dest, door.destination)

        action = {
          type: "door",
          destination: door.destination,
          coord: dest,
          key: door.key
        }
      }

      const overItem = isOverItem(x,y)
      if (overItem != null) {
        const item = levels[level].items[overItem]
        const dest = [parseInt(item.x), parseInt(item.z)]
        setPlayerDestination(dest)

        action = {
          type: "item",
          index: overItem,
          coord: dest,
        }
      }

      setDestinationAction(action)
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleMouseClick);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleMouseClick);
    };
  }, [levels, level]);

  // Reached destination
  useEffect(() => {
    if (destinationAction == null) {
      setReachedDestination(null)
      return
    }

    if (destinationAction.coord != reachedDestination) {
      setReachedDestination(null)
      setDestinationAction(null)
    }

    if (destinationAction.type == "door") {
      let travel = false
      const destination = destinationAction.destination
      if (destinationAction.key) {
        const containsItem = inventory.some(item => item.name === destination)
        if (containsItem) {
          travel = true
          const updatedInventory = inventory.filter(item => item.name !== destination)
          setInventory(updatedInventory)
        } else {
          setDialog(["Locked"])
        }
      } else travel = true

      if (travel) {
        console.log("Going to " + destination)
        loadLevel(destination)
      }
    }
    else if (destinationAction.type == "item") {
      // Update levels
      const tempLevels = {...levels}
      const item = tempLevels[level].items[destinationAction.index]
      item.collected = true
      setLevels(tempLevels)

      // Update inventory
      console.log(item)
      const tempInventory = [...inventory]
      if (item.type == "key") {
        tempInventory.push({
          name: item.name,
          label: item.name + " key",
          type: item.type,
        })
      } else if (item.type == "healing") {
        tempInventory.push({
          name: item.name,
          label: item.name,
          type: item.type,
        })
      }
      setInventory(tempInventory)
    }

    setReachedDestination(null)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reachedDestination])

  if (level == null) {
    loadLevel("mainHall")
    return (
      <div style={{cursor: currentCursor}}>
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
        style={{ backgroundImage: backgroundImg }}
      />

      { levels[level].items && levels[level].items.map( (item, index) => (
        !item.collected && <img key={index} src={"/items/" + item.image} className="item" style={{top: item.sy - 28 + "px", left: item.sx -28 + "px"}} />
      ))
      }

      <Canvas shadows style={{cursor: currentCursor}}>
        <Suspense>
          <Arena 
            levels={levels}
            setLevels={setLevels} 
            level={level} 
            levelDoor={levelDoor} 
            playerDestination={playerDestination} 
            setPlayerDestination={setPlayerDestination} 
            setReachedDestination={setReachedDestination}
          />
        </Suspense>
      </Canvas>

      <FloatingPanel 
        name="Status"
        backgroundColor={"rgba(0,0,0,0)"}
      >
        <Status playerStats={playerStats} />
      </FloatingPanel>
      <FloatingPanel
        name="Photographs"
        x={300} 
      >
        photo
      </FloatingPanel>
      <FloatingPanel name="Inventory" x={600} >
        <InventoryUi inventory={inventory} setInventory={setInventory} playerStats={playerStats} setPlayerStats={setPlayerStats} />
      </FloatingPanel>

      {dialog.length > 0 && <DialogUi dialog={dialog} setDialog={setDialog} />}
    </>
  )
}

export default Game