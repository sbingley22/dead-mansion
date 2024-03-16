/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useEffect, useState } from "react"
import { useThree } from "@react-three/fiber"
import Pathfinding from "pathfinding"
import { Box } from "@react-three/drei"
import Player from "./Player"

const Arena = ({ levels, setLevels, level, zone }) => {
  const { camera } = useThree()
  const [grid, setGrid] = useState(null)
  const [gridScale, setGridScale] = useState(0.5)

  // Load grid
  useEffect(() => {
    if (levels == null) return
    if (level == null) return

    const lvl = levels[level]
    //console.log(levels, level)
    
    // Create new grid
    const gridWidth = lvl.grid.size[0]
    const gridHeight = lvl.grid.size[1]
    const tempGrid = new Pathfinding.Grid(gridWidth, gridHeight)
    console.log(tempGrid)

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

  }, [levels, level])

  // Load zone
  useEffect(() => {
    if (level == null) return
    const lvl = levels[level]

    if (camera) {
      if (lvl.zones[zone].pos) {
        const cam = lvl.zones[zone]
        camera.position.set(cam.pos.x, cam.pos.y, cam.pos.z)
        camera.rotation.set(cam.rot._x, cam.rot._y, cam.rot._z, cam.rot._order)
      }
    }
    console.log(camera)

  }, [level, levels, zone, camera])
  

  // Grid conversion
  const gridToWorld = (coord) => {
    const offsetX = (grid.width*gridScale) * -0.5
    const offsetZ = (grid.height*gridScale) * -0.5
    const newX = coord.x + offsetX
    const newZ = coord.z + offsetZ
    return({ x: newX, y: 0, z: newZ })
  }
  const worldToGrid = (coord) => {
    const offsetX = (grid.width*gridScale) * 0.5
    const offsetZ = (grid.height*gridScale) * 0.5
    const newX = coord.x + offsetX
    const newZ = coord.z + offsetZ
    return({ x: newX, y: 0, z: newZ })
  }

  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight position={[0,1,0]} castShadow/>

      <Box position={[0,1,0]} scale={[0.25,1.4,0.25]} >
        <meshStandardMaterial />
      </Box>
      <Player />
    </>
  )
}

export default Arena