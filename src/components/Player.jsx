/* eslint-disable react/no-unknown-property */
import { useAnimations, useGLTF } from '@react-three/drei'
import modelGlb from '../assets/elizabeth-transformed.glb?url'
import { useRef } from 'react'

const Player = () => {
  const group = useRef()
  const { scene, nodes, animations } = useGLTF(modelGlb)
  const { actions, names } = useAnimations(animations)
  console.log(nodes, names)
  
  return (
    <group ref={group} dispose={null}>
      <primitive object={scene} />
    </group>
  )
}

export default Player

useGLTF.preload(modelGlb)