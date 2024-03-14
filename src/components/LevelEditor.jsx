/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import * as THREE from 'three'
import { Box, OrbitControls } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import { useControls, button } from "leva"
import Pathfinding from "pathfinding"
import { useEffect, useState } from "react"
import GridHelper from "./GridHelper"

const LevelEditor = ({ levels, level, zone }) => {
  //console.log(levels)
  const { camera } = useThree()
  const [lockCam, setLockCam] = useState(true)
  const [grid, setGrid] = useState(null)

  const { gridX, gridY } = useControls('Grid', {
    gridX: { value: 20 },
    gridY: { value: 20 },
    updateGrid: button(() => {
      setGrid(new Pathfinding.Grid(gridX, gridY))
    })
  });

  useControls('Camera', {
    lockCam: button(() => {
      setLockCam(prevLockCam => !prevLockCam)
    })
  })

  useControls('Finish', {
    saveLevel: button(() => {
      const levelsJson = {...levels}
      levelsJson[level].zones[zone].pos = camera.position
      levelsJson[level].zones[zone].rot = camera.rotation
      console.log(levelsJson)
    })
  })

  // Load selected level
  useEffect(() => {
    if (level == null) return
    const lvl = levels[level]
    console.log(lvl)
    
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
      { grid && <GridHelper grid={grid} gridScale={levels[level].grid.scale} setGrid={setGrid} lockCam={lockCam} /> }
    </>
  )
}

export default LevelEditor