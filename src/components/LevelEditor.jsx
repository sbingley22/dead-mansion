/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { Box, CameraControls } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import { useControls, button } from "leva"
import Pathfinding from "pathfinding"
import { useEffect, useState } from "react"
import GridHelper from "./GridHelper"

const LevelEditor = ({ levels, setLevels, level, setNodeInfo, doors }) => {
  //console.log(levels)
  const { camera } = useThree()
  const [lockCam, setLockCam] = useState(false)
  const [grid, setGrid] = useState(null)

  const updateLevels = () => {
    const tempLevels = {...levels}
    const lvl = tempLevels[level]
    //console.log(lvl)

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
      }
    }
    lvl.grid.walkable = walkableArray

    // Camera placement
    lvl.pos = camera.position
    lvl.rot = camera.rotation
    //lvl.quaternion = camera.quaternion
    //lvl.matrix = camera.matrix
    //console.log(camera)

    // Doors
    lvl.doors = doors

    // Items

    return tempLevels
  }

  const [{ gridX, gridY, gridScale }, setGridControls ] = useControls('Grid',() => ({
    gridX: { label: "x", value: 20 },
    gridY: { label: "y", value: 20 },
    gridScale: { label: "scale", value: 0.5 }
  }))

  useControls('Grid', {
    updateGrid: button(() => {
      console.log(gridX, gridY)
      const tempGrid = new Pathfinding.Grid(gridX, gridY)
      for (var y = 0; y < tempGrid.height; y++) {
        for (var x = 0; x < tempGrid.width; x++) {
            var node = tempGrid.getNodeAt(x, y);
            node.walkable = false;
        }
      }
      setGrid(tempGrid)
    })
  }, [gridX, gridY])

  useControls('Camera', {
    lockCamera: button(() => {
      if (lockCam) console.log("Camera locked")
      else console.log("Camera free")
      setLockCam(prevLockCam => !prevLockCam)
    })
  }, [lockCam])

  const { boxPos } = useControls('Box', {
    boxPos: {
      label: "position",
      value: [0,0.8,0]
    }
  })

  useControls('Level', {
    updateLevel: button(() => {
      const tempLevels = updateLevels()
      console.log(tempLevels)
      setLevels(tempLevels)
    }),
    saveLevel: button(() => {
      const tempLevels = updateLevels()

      // Download json to downloads folder
      const fileName = "levels.json"
      const jsonBlob = new Blob([JSON.stringify(tempLevels, null, 2)], { type: 'application/json' });
      const url = window.URL.createObjectURL(jsonBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);      
    })
  }, [grid, gridScale])

  // Load selected level
  useEffect(() => {
    if (levels == null) return
    if (level == null) return

    const lvl = levels[level]
    //console.log(levels, level)
    
    // Create new grid
    const gridWidth = lvl.grid.size[0]
    const gridHeight = lvl.grid.size[1]
    setGridControls({ gridX: gridWidth, gridY: gridHeight })
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
    setGridControls({ gridScale: lvl.grid.scale })
    
    setGrid(tempGrid)

    if (camera) {
      console.log(camera.matrix)
      if (lvl.pos) {
        camera.position.set(lvl.pos.x, lvl.pos.y, lvl.pos.z)
        camera.rotation.set(lvl.rot._x, lvl.rot._y, lvl.rot._z, lvl.rot._order)
      }
      console.log(camera.matrix)
    }

  }, [levels, level])
  
  return (
    <>
      {lockCam && <CameraControls enablePan={lockCam} enableRotate={lockCam} enableZoom={lockCam} />}
      <ambientLight intensity={1} />
      <directionalLight position={[0,1,0]} castShadow/>

      <Box position={boxPos} scale={[0.25,1.6,0.25]} >
        <meshStandardMaterial />
      </Box>
      { grid && <GridHelper grid={grid} gridScale={gridScale} setGrid={setGrid} lockCam={lockCam} setNodeInfo={setNodeInfo} /> }
    </>
  )
}

export default LevelEditor