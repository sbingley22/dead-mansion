/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { Box, useAnimations, useGLTF } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import modelGlb from '../assets/elizabeth-transformed.glb?url'
import InvisiblePlane from './InvisiblePlane'
//import modelGlb from '../assets/dev/elizabeth.glb?url'
//import modelGlb from "../assets/dev/AsukaExport.glb?url"

const Player = ({ playerPos, playerDestination, grid, gridToWorld, worldToGrid, findPath }) => {
  const group = useRef()
  const { scene, nodes, animations } = useGLTF(modelGlb)
  const { actions, names, mixer } = useAnimations(animations, scene) // scene must be added to useAnimations()
  //console.log(nodes)

  // Initialise nodes
  useEffect(() => {
    console.log(nodes)
    // Object.keys(nodes).forEach((nodeName) => {
    //   const node = nodes[nodeName]
    //   if (node.name === "SkinnedMesh") {
    //     node.castShadow = true
    //   }
    // })
    let node = "Genesis8FemaleShape"
    if (nodes[node]) nodes[node].castShadow = true
    node = "Genesis8Female_6"
    if (nodes[node]) nodes[node].castShadow = true
    node = "CameraShape"
    if (nodes[node]) nodes[node].visible = false
  }, [nodes])

  const currentAnimation = useRef("idle1")
  const nextAnimation = useRef("idle1")

  const updateAnimation = () => {
    if (!actions) return
    if (!nextAnimation.current) return

    //console.log(mixer)
    //console.log(actions)
    //console.log(currentAnimation.current)
    actions[currentAnimation.current].fadeOut(0.5)
    actions[nextAnimation.current].reset().fadeIn(0.5).play()

    nextAnimation.current = null
  }

  // eslint-disable-next-line no-unused-vars
  useFrame((state, delta) => {
    if (!scene) return

    updateAnimation()
  })

  // Player wants to move
  useEffect(() => {
    if (playerDestination[0] == -1) return

    const path = findPath([15,0], playerDestination, grid)
    console.log(path)
  }, [playerDestination])

  // Mixer functions. Listen for animation end, etc.
  useEffect(() => {
    //actions['hurt'].repetitions = 1
    //actions['hurt'].clampWhenFinished = true

    mixer.addEventListener('finished', (e) => {
      console.log(e)
      nextAnimation.current = "idle1"
    })

    return () => mixer.removeEventListener('finished')
  }, [mixer, actions])

  return (
    <group 
      ref={group}
      position={[playerPos[0],0,playerPos[2]]}
      dispose={null}
    >
      <primitive object={scene} />
      {/* <InvisiblePlane scale={[1,1,1]} /> */}
    </group>
  )
}

export default Player

useGLTF.preload(modelGlb)