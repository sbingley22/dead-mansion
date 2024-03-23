/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useAnimations, useGLTF } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import modelGlb from '../assets/elizabeth-transformed.glb?url'
import * as THREE from 'three'

const vec3Dir = new THREE.Vector3()

const Player = ({ playerPos, playerDestination, setReachedDestination, grid, gridScale, gridToWorld, worldToGrid, findPath, rmb, setTakeShot, setShotCharge, playerStats, setPlayerStats }) => {
  const group = useRef()
  const { scene, nodes, animations } = useGLTF(modelGlb)
  // eslint-disable-next-line no-unused-vars
  const { actions, names, mixer } = useAnimations(animations, scene) // scene must be added to useAnimations()
  //console.log(nodes)

  // Initialise nodes
  useEffect(() => {
    console.log(nodes)
    // let nodeArray = ["Genesis8FemaleShape", "Genesis8Female_6", "Genesis8Female_1","Genesis8Female_2","Genesis8Female_3","Genesis8Female_4","Genesis8Female_5","Genesis8Female_7","Genesis8Female_8","Genesis8Female_9","Genesis8Female_10","Genesis8Female_11","Genesis8Female_12","Genesis8Female_13","Genesis8Female_14","Genesis8Female_15","Genesis8Female_16"]
    let nodeArray = ["Genesis8FemaleShape", "Genesis8Female_1"]
    nodeArray.forEach(node => {
      if (nodes[node]) nodes[node].castShadow = true
    })

    let node = "CameraShape"
    if (nodes[node]) nodes[node].visible = false
  }, [nodes])

  const currentAnimation = useRef("idle1")
  const nextAnimation = useRef("idle1")
  const [ path, setPath ] = useState([])
  const action = useRef(null)
  const actionTimer = useRef(0)

  const updateAnimation = () => {
    if (!actions) return
    if (!nextAnimation.current) return
    actions[currentAnimation.current].fadeOut(0.5)
    actions[nextAnimation.current].reset().fadeIn(0.5).play()

    currentAnimation.current = nextAnimation.current
    nextAnimation.current = null

    //console.log(mixer)
    //console.log(actions)
    //console.log(currentAnimation.current)
  }

  const rotateTo = (targetPosition) => {
    vec3Dir.subVectors(targetPosition, group.current.position).normalize()
    const targetRotation = Math.atan2(vec3Dir.x, vec3Dir.z)
    group.current.rotation.y = targetRotation
  }

  const move = (delta) => {
    if (rmb) return

    if (path.length == 1) {
      if (currentAnimation.current == "walk1") nextAnimation.current = "idle1"
      setReachedDestination(path[0])
      const newPath = [...path.slice(1)]
      setPath(newPath)
      return
    }
    else if (path.length < 1) {
      return
    }

    if (currentAnimation.current !== "walk1") nextAnimation.current = "walk1"

    const worldNode = gridToWorld({x: path[0][0], z: path[0][1]}, grid.width, grid.height, gridScale)
    const position = group.current.position
    const distance = position.distanceTo(worldNode)
    //console.log(position)

    if (distance < 0.1) {
      if (path.length < 2) setReachedDestination(path[0])
      const newPath = [...path.slice(1)]
      setPath(newPath)
      return
    }

    // Update position
    const speed = 2.5 * delta
    vec3Dir.subVectors(worldNode, position).normalize()
    position.addScaledVector(vec3Dir, speed)
    //console.log(vec3Dir)

    // Calculate rotation
    const targetRotation = Math.atan2(vec3Dir.x, vec3Dir.z);
    let currentRotation = group.current.rotation.y;

    // Ensure shortest rotation
    const PI2 = Math.PI * 2;
    const diff = (targetRotation - currentRotation + Math.PI) % PI2 - Math.PI;
    const rotationDirection = Math.sign(diff);

    // Smoothly interpolate rotation
    const rotationSpeed = 10
    const deltaRotation = rotationSpeed * delta
    let newRotation = currentRotation
    if (Math.abs(diff) > deltaRotation) {
      newRotation = currentRotation + rotationDirection * deltaRotation
    } else {
      newRotation = targetRotation;
    }
    group.current.rotation.y = newRotation;
  }

  const updateActions = (delta) => {
    if (rmb) {
      if (path > 0) setPath([])
      
      if (action.current === "aim") {
        actionTimer.current += delta
        const timerFloor = Math.floor(actionTimer.current)
        setShotCharge(prev => {
          if (timerFloor === prev) return prev
          return timerFloor
        })

        // Rotate to face enemy
        if (group.current.rotationFlag) {
          //console.log("Rotate to", group.current.rotationFlag)
          rotateTo(group.current.rotationFlag)
          group.current.rotationFlag = null
        }
      }
      else {
        action.current = "aim"
        nextAnimation.current = "aim1"
        //console.log(nextAnimation.current)
      }
    } else {
      if (action.current === "aim") {
        // take photo
        setTakeShot(actionTimer.current)
        action.current = null
        actionTimer.current = 0
        nextAnimation.current = "idle1"
      }
    }

    // Action flags
    const actionFlag = group.current.actionFlag
    //console.log(actionFlag)

    if (actionFlag === "hurt") {
      if (currentAnimation.current === "hurt1") return
      nextAnimation.current = "hurt1"
      actionTimer.current = 0
      setShotCharge(0)
      group.current.actionFlag = null

      const tempPlayerStats = {...playerStats}
      tempPlayerStats.health -= 20
      setPlayerStats(tempPlayerStats)
      //console.log(playerStats)
    }
  }

  const updateModel = () => {
    let node = "CameraShape"
    if (currentAnimation.current === "aim1" || currentAnimation.current === "hurt1") {
      if (nodes[node]) nodes[node].visible = true
    } else if (nodes[node]) nodes[node].visible = false
  }

  // Player wants to move
  useEffect(() => {
    if (playerDestination[0] == -1) return

    const worldPos = group.current.position
    const gridPos = worldToGrid(worldPos, grid.width, grid.height, gridScale)
    //console.log(worldPos, gridPos)
    const newPath = findPath([gridPos.x, gridPos.z], playerDestination, grid)
    //console.log(newPath)
    setPath(newPath)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerDestination])

  // Mixer functions. Listen for animation end, etc.
  useEffect(() => {
    actions['hurt1'].repetitions = 1
    actions['hurt1'].clampWhenFinished = true

    // eslint-disable-next-line no-unused-vars
    mixer.addEventListener('finished', (e) => {
      //console.log(e)
      nextAnimation.current = "idle1"
    })

    return () => mixer.removeEventListener('finished')
  }, [mixer, actions])

  // eslint-disable-next-line no-unused-vars
  useFrame((state, delta) => {
    if (!scene) return
    if (playerStats.health < 0) return

    updateActions(delta)
    move(delta)
    updateAnimation()
    updateModel()
  })

  return (
    <group 
      ref={group}
      position={[playerPos[0],0,playerPos[2]]}
      dispose={null}
      name='Player'
      actionFlag={null}
      rotationFlag={null}
    >
      <primitive object={scene} />
    </group>
  )
}

export default Player

useGLTF.preload(modelGlb)