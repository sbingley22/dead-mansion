/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import * as THREE from 'three'
import { useEffect, useRef, useState } from "react"
import { useThree } from "@react-three/fiber"
import Pathfinding from "pathfinding"
import Player from "./Player"
// eslint-disable-next-line no-unused-vars
import GridVisualiser from "./GridVisualiser"
import GridGame from "./GridGame"
import NightmareQueen from "./NightmareQueen"
import { Environment } from "@react-three/drei"

const screenPosition = new THREE.Vector3()
const worldPosition = new THREE.Vector3()

const Arena = ({ levels, setLevels, level, levelDoor, playerDestination, setPlayerDestination, setReachedDestination, rmb, takeShot, setTakeShot, setShotCharge, playerStats, setPlayerStats }) => {
  const { scene, camera, mouse } = useThree()

  const [grid, setGrid] = useState(null)
  const [gridScale, setGridScale] = useState(0.5)
  const [playerPos, setPlayerPos] = useState([0,0,0])
  const [gridClick, setGridClick] = useState([-1,-1])
  const [enemies, setEnemies] = useState([])
  const playerRef = useRef(null)

  // Load level
  useEffect(() => {
    if (levels == null) return
    if (level == null) return

    const lvl = levels[level]
    //console.log(levels, level)
    
    // Create new grid
    const gridWidth = lvl.grid.size[0]
    const gridHeight = lvl.grid.size[1]
    const tempGrid = new Pathfinding.Grid(gridWidth, gridHeight)
    //console.log(tempGrid)

    // Initialize walkable to false
    for (let x = 0; x < tempGrid.width; x++) {
      for (let z = 0; z < tempGrid.height; z++) {
        tempGrid.nodes[z][x].walkable = false
      }
    }

    // Load in walkable values from json
    lvl.grid.walkable.forEach((nodeIndex) => {
      const x = nodeIndex % tempGrid.width
      const z = Math.floor(nodeIndex / tempGrid.width)
      tempGrid.nodes[z][x].walkable = true
    })
    //console.log(lvl.grid.walkable)

    // Load in scale
    setGridScale(lvl.grid.scale)
    
    setGrid(tempGrid)

    // Load camera
    if (camera) {
      if (lvl.pos) {
        camera.position.set(lvl.pos.x, lvl.pos.y, lvl.pos.z)
        camera.rotation.set(lvl.rot._x, lvl.rot._y, lvl.rot._z, lvl.rot._order)
      }
    }

    // Load player
    const door = lvl.doors.find(door => door.destination === levelDoor)
    if (!door) console.log("Couldn't find door")
    const doorPos = gridToWorld({x: parseInt(door.x), y: 0, z: parseInt(door.z)}, tempGrid.width, tempGrid.height, gridScale)
    setPlayerPos([doorPos.x, 0, doorPos.z])
    //console.log(door, doorPos)

    // Load enemies
    const enemyData = lvl.enemies
    if (enemyData) {
      const tempEnemies = []
      enemyData.forEach((en, index) => {
        const enemyPos = gridToWorld({x: parseInt(en.x), y: 0, z: parseInt(en.z)}, tempGrid.width, tempGrid.height, gridScale)
        console.log(en.x, en.z, enemyPos)
        tempEnemies.push({
          id: index,
          gx: enemyPos.x,
          gz: enemyPos.z,
          type: en.type,
          health: 100
        })
      })
      setEnemies(tempEnemies)
      //console.log(tempEnemies)
    } else setEnemies([])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [levels, level, levelDoor])
  
  // Pathfinding
  const finder = new Pathfinding.AStarFinder({
    allowDiagonal: true,
    dontCrossCorners: true,
  })

  const findPath = (start, end, grid) => {
    const gridClone = grid.clone()
    
    if (start[0] < 0 || start[1] < 0) return []
    if (start[0] > grid.width || start[1] > grid.height) return []
    if (end[0] < 0 || end[1] < 0) return []
    if (end[0] > grid.width || end[1] > grid.height) return []
    //console.log(start, end)
    
    gridClone.setWalkableAt(start[0], start[1], true)
    const path = finder.findPath(start[0], start[1], end[0], end[1], gridClone)
    path.shift()
    return path
  }

  // Grid conversion
  const gridToWorld = (coord, gridW, gridH, gridS) => {
    const newX = (coord.x - (gridW / 2)) * gridS
    const newZ = (coord.z - (gridH / 2)) * gridS
    return({ x: newX, y: 0, z: newZ })
  }
  const worldToGrid = (coord, gridW, gridH, gridS) => {
    const newX = Math.floor( (coord.x / gridS) + (gridW / 2) )
    const newZ = Math.floor( (coord.z / gridS) + (gridH / 2) )
    return({ x: newX, y: 0, z: newZ })
  }

  const findNodeByName = (node, name) => {
    if (node.name === name) {
      return node;
    }

    if (node.children && node.children.length > 0) {
      for (let child of node.children) {
        const foundNode = findNodeByName(child, name);
        if (foundNode) {
          return foundNode;
        }
      }
    }

    return null;
  };

  const getMousePos = () => {
    return {x: mouse.x, y: mouse.y}
  }

  const worldToScreen = (worldPos) => {
    worldPosition.copy(worldPos)
    worldPosition.y += 1
    screenPosition.copy(worldPosition).project(camera);

    return screenPosition;
  }

  const pointerOverEnemy = (position) => {
    playerRef.current.rotationFlag = position
    //console.log("pointer rotation: ", position)
  }

  // Get player ref
  useEffect(()=>{
    const ply = findNodeByName(scene, "Player")
    playerRef.current = ply
    //console.log(ply)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerPos])

  // Move to grid pos
  useEffect(()=>{
    if (gridClick[0] == -1) return

    setPlayerDestination(gridClick)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gridClick])

  // Take a photo
  useEffect(()=>{
    if (takeShot == -1) return

    let shotPower = Math.floor(takeShot)
    if (shotPower > 3) shotPower = 3

    enemies.forEach( en => {
      const enemy = findNodeByName(scene, en.type+en.id)
      //console.log(enemy)
      const mousePos = getMousePos()
      //console.log(mousePos)      
      const screenPos = worldToScreen(enemy.position)
      //console.log(screenPos)

      const radius = 100

      if (mousePos.x < screenPos.x - radius) return
      if (mousePos.x > screenPos.x + radius) return
      if (mousePos.y < screenPos.y - radius) return
      if (mousePos.y > screenPos.y + radius) return

      // hit enemy
      enemy.health -= shotPower * 20
      enemy.actionFlag = "hurt"
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[takeShot])

  // Check for player death
  useEffect(()=>{
    if (playerStats.health < 0) {
      enemies.forEach( en => {
        const enemy = findNodeByName(scene, en.type+en.id)
        enemy.actionFlag = "playerDead"
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerStats])

  return (
    <>
      <ambientLight intensity={0} />
      <Environment preset="sunset" />
      <directionalLight position={[0,10,0]} castShadow/>

      <Player 
        playerPos={playerPos}
        playerDestination={playerDestination}
        setReachedDestination={setReachedDestination}
        grid={grid}
        gridScale={gridScale}
        gridToWorld={gridToWorld}
        worldToGrid={worldToGrid}
        findPath={findPath}
        rmb={rmb}
        setTakeShot={setTakeShot}
        setShotCharge={setShotCharge}
        playerStats={playerStats}
        setPlayerStats={setPlayerStats}
      />

      {enemies.map( en => (
        <NightmareQueen
          key={en.id}
          id={en.id}
          initialPos={[en.gx,0,en.gz]}
          grid={grid}
          gridScale={gridScale}
          gridToWorld={gridToWorld}
          worldToGrid={worldToGrid}
          findPath={findPath}
          pointerOverEnemy={pointerOverEnemy}
        />          
      ))}
      
      <GridGame grid={grid} gridScale={gridScale} setGridClick={setGridClick} />
      {/* <GridVisualiser grid={grid} gridScale={gridScale} /> */}
    </>
  )
}

export default Arena