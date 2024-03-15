/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { Box, OrbitControls } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import { useControls, button } from "leva"
import Pathfinding from "pathfinding"
import { useEffect, useState } from "react"
import GridHelper from "./GridHelper"

const LevelEditor = ({ levels, setLevels, level, zone }) => {
  //console.log(levels)
  const { camera } = useThree()
  const [lockCam, setLockCam] = useState(false)
  const [grid, setGrid] = useState(null)

  const updateLevels = () => {
    const tempLevels = {...levels}
    const lvl = tempLevels[level]
    console.log(lvl)

    if (!grid || !lvl) return

    // Grid size
    lvl.grid.size = [grid.width, grid.height]
    lvl.grid.scale = gridScale

    // Translate walkable squares to single array
    const walkableArray = []
    for (let x = 0; x < grid.width; x++) {
      for (let z = 0; z < grid.height; z++) {
        const node = grid.nodes[z][x];
        const index = x + grid.width * z
        if (node.walkable) walkableArray.push(index)
        if (node.walkable) console.log(x,z)
      }
    }
    lvl.grid.walkable = walkableArray

    // Camera placement
    lvl.zones[zone].pos = camera.position
    lvl.zones[zone].rot = camera.rotation

    return tempLevels
  }

  const { gridX, gridY, gridScale } = useControls('Grid', {
    gridX: { label: "x", value: 20 },
    gridY: { label: "y", value: 20 },
    gridScale: { label: "scale", value: 0.5 },
    updateGrid: button(() => {
      setGrid(new Pathfinding.Grid(gridX, gridY))
    })
  })

  useControls('Camera', {
    lockCamera: button(() => {
      if (lockCam) console.log("Camera locked")
      else console.log("Camera free")
      setLockCam(prevLockCam => !prevLockCam)
    })
  }, [lockCam])

  useControls('Level', {
    updateLevel: button(() => {
      const tempLevels = updateLevels()
      console.log(tempLevels)
      setLevels(tempLevels)
    }),
    saveLevel: button(() => {
      const tempLevels = updateLevels()
      console.log(tempLevels)
    })
  }, [grid, gridScale, zone])

  // Load selected level
  useEffect(() => {
    if (levels == null) return
    if (level == null) return

    const lvl = levels[level]
    //console.log(levels, level)
    
    // Create new grid
    const tempGrid = new Pathfinding.Grid(lvl.grid.size[0],lvl.grid.size[1])
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
    //gridScale = lvl.grid.scale

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
        camera.rotation.set(cam.rot.x, cam.rot.y, cam.rot.z, cam.rot.order)
      }
    }

  }, [level, levels, zone, camera])
  
  return (
    <>
      <OrbitControls enablePan={lockCam} enableRotate={lockCam} enableZoom={lockCam} />
      <ambientLight intensity={1} />
      <directionalLight position={[0,1,0]} castShadow/>

      <Box position={[0,1,0]} scale={[0.25,2,0.25]} >
        <meshStandardMaterial />
      </Box>
      { grid && <GridHelper grid={grid} gridScale={gridScale} setGrid={setGrid} lockCam={lockCam} /> }
    </>
  )
}

export default LevelEditor