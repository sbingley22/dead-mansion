/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useEffect, useState } from "react"
import { useThree } from "@react-three/fiber"
import Pathfinding from "pathfinding"
import Player from "./Player"
import GridVisualiser from "./GridVisualiser"
import { Plane } from "@react-three/drei"
import GridGame from "./GridGame"

const Arena = ({ levels, setLevels, level }) => {
  const { camera } = useThree()
  const [grid, setGrid] = useState(null)
  const [gridScale, setGridScale] = useState(0.5)
  const [playerPos, setPlayerPos] = useState([0,0,0])
  const [gridClick, setGridClick] = useState([-1,-1])
  const [playerDestination, setPlayerDestination] = useState([-1,-1])

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
    const door = lvl.doors[0]
    const doorPos = gridToWorld({x: parseInt(door.x), y: 0, z: parseInt(door.z)}, tempGrid.width, tempGrid.height, gridScale)
    setPlayerPos([doorPos.x, 0, doorPos.z])
    //setPlayerPos([0,0,0])
    //console.log(door, doorPos)

  }, [levels, level])
  
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

  useEffect(()=>{
    if (gridClick[0] == -1) return

    setPlayerDestination(gridClick)
  }, [gridClick])

  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight position={[0,1,0]} castShadow/>
      <Player playerPos={playerPos} playerDestination={playerDestination} grid={grid} gridScale={gridScale} gridToWorld={gridToWorld} worldToGrid={worldToGrid} findPath={findPath}/>
      <GridGame grid={grid} gridScale={gridScale} setGridClick={setGridClick} />
      {/* <GridVisualiser grid={grid} gridScale={gridScale} /> */}
    </>
  )
}

export default Arena