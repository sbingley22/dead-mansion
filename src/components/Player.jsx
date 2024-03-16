/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { Box, useAnimations, useGLTF } from '@react-three/drei'
import modelGlb from '../assets/elizabeth-transformed.glb?url'
import { useRef } from 'react'

const Player = ({ playerPos, gridToWorld, worldToGrid }) => {
  const group = useRef()
  const { scene, nodes, animations } = useGLTF(modelGlb)
  const { actions, names } = useAnimations(animations)
  console.log(nodes, names)
  console.log(playerPos)
  return (
    <group 
      ref={group}
      position={[playerPos[0],0,playerPos[2]]}
      //position={[2.5,0,-2.5]}
      dispose={null}
    >
      <primitive object={scene} />
      <Box scale={0.25} />
    </group>
  )
}

export default Player

useGLTF.preload(modelGlb)