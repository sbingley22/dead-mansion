/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useAnimations, useGLTF } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import modelGlb from '../assets/NightmareQueen-transformed.glb?url'
import * as THREE from 'three'
import { useSkinnedMeshClone } from './SkinnedMeshClone'

const vec3Dir = new THREE.Vector3()

const NightmareQueen = ({ id, initialPos, grid, gridScale, gridToWorld, worldToGrid, findPath, pointerOverEnemy, setPlayAudio }) => {
  const group = useRef()
  const { scene, nodes, animations } = useSkinnedMeshClone(modelGlb)
  // eslint-disable-next-line no-unused-vars
  const { actions, names, mixer } = useAnimations(animations, scene) // scene must be added to useAnimations()
  //console.log(nodes)

  // Initialise nodes
  useEffect(() => {
    //console.log(nodes)
    // Object.keys(nodes).forEach((nodeName) => {
    //   const node = nodes[nodeName]
    //   if (node.name === "SkinnedMesh") {
    //     node.castShadow = true
    //   }
    // })
    let nodeArray = ["Genesis8FemaleShape", "Genesis8Female_1"]
    nodeArray.forEach(node => {
      if (nodes[node]) nodes[node].castShadow = true
    })
  }, [nodes])

  const playerRef = useRef(null)
  const currentAnimation = useRef("idle1")
  const nextAnimation = useRef("idle1")
  const [ path, setPath ] = useState([])
  const [ dead, setDead ] = useState(false)
  const frameCount = useRef(0)

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

  const move = (delta) => {
    if (currentAnimation.current == "claw1") return
    if (currentAnimation.current == "hurt1") return
    if (path.length == 1) {
      if (currentAnimation.current == "walk1") nextAnimation.current = "idle1"
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
      const newPath = [...path.slice(1)]
      setPath(newPath)
      return
    }

    // Update position
    const speed = 0.8 * delta
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

  const updateActions = () => {
    const health = group.current.health
    if (health <= 0) {
      setDead(true)
    }

    // Attack player?
    const distance = playerRef.current.position.distanceTo(group.current.position)
    if (distance < 1.5 && currentAnimation.current != "claw1") {
      //console.log(distance)
      group.current.actionFlag = "claw"
      playerRef.current.actionFlag = "hurt"
    }

    // Random growl
    if (Math.random() < 1/200) setPlayAudio("ZombieGrowl")

    // Sort action flags
    const actionFlag = group.current.actionFlag
    //console.log(actionFlag)
    if (actionFlag == "") return

    if (actionFlag == "hurt") {
      nextAnimation.current = "hurt1"
      group.current.actionFlag = ""
    }
    else if (actionFlag == "claw") {
      nextAnimation.current = "claw1"
      group.current.actionFlag = ""
    }
  }

  const updatePath = () => {
    if (currentAnimation.current == "claw1") return
    if (currentAnimation.current == "hurt1") return

    const worldPos = group.current.position
    const gridPos = worldToGrid(worldPos, grid.width, grid.height, gridScale)
    //console.log(worldPos, gridPos)

    const playerGrid = worldToGrid(playerRef.current.position, grid.width, grid.height, gridScale)
    const playerDestination = [playerGrid.x, playerGrid.z]
    //console.log(gridPos, playerDestination)
    const newPath = findPath([gridPos.x, gridPos.z], playerDestination, grid)
    //console.log(newPath)
    setPath(newPath)
  }

  // Mixer functions. Listen for animation end, etc.
  useEffect(() => {
    actions['hurt1'].repetitions = 1
    actions['hurt1'].clampWhenFinished = true
    actions['claw1'].repetitions = 1
    actions['claw1'].clampWhenFinished = true

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
    if (dead) return
    if (group.current.actionFlag == "playerDead") return

    // find player
    if (!playerRef.current) {
      // find reference to player
      const sceneChildren = state.scene.children
      sceneChildren.forEach((node) => {
        if (node.name === "Player") {
          playerRef.current = node
          //console.log(playerRef.current)
        }
      })
    }

    frameCount.current += 1

    updateActions()
    move(delta)
    if (frameCount.current % 10 == 0) updatePath()
    updateAnimation()
  })

  const handlePointerOver = () => {
    pointerOverEnemy(group.current.position)
    //console.log("Pointer over enemy")
  }

  return (
    <group 
      ref={group}
      position={initialPos}
      dispose={null}
      name={"queen"+id}
      health={100}
      actionFlag={""}
      onPointerOver={handlePointerOver}
    >
      <primitive object={scene} />
    </group>
  )
}

export default NightmareQueen

useGLTF.preload(modelGlb)