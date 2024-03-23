/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 src/assets/dev/NightmareQueen.glb -T 
Files: src/assets/dev/NightmareQueen.glb [1.53MB] > D:\Web_Projects\Games\dead-mansion\NightmareQueen-transformed.glb [943.32KB] (38%)
*/

import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/NightmareQueen-transformed.glb')
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Genesis8Female">
          <primitive object={nodes.root} />
        </group>
        <skinnedMesh name="G8F_succ_horns_UV_552Shape" geometry={nodes.G8F_succ_horns_UV_552Shape.geometry} material={materials['G8F_succ_horns_UV_552_NQ Horns']} skeleton={nodes.G8F_succ_horns_UV_552Shape.skeleton} />
        <group name="Genesis8FemaleShape">
          <skinnedMesh name="Genesis8Female_1" geometry={nodes.Genesis8Female_1.geometry} material={materials['Nightmare Queen_Torso']} skeleton={nodes.Genesis8Female_1.skeleton} />
          <skinnedMesh name="Genesis8Female_2" geometry={nodes.Genesis8Female_2.geometry} material={materials['Nightmare Queen_Face']} skeleton={nodes.Genesis8Female_2.skeleton} />
          <skinnedMesh name="Genesis8Female_3" geometry={nodes.Genesis8Female_3.geometry} material={materials['Nightmare Queen_Face']} skeleton={nodes.Genesis8Female_3.skeleton} />
          <skinnedMesh name="Genesis8Female_4" geometry={nodes.Genesis8Female_4.geometry} material={materials['Nightmare Queen_Teeth']} skeleton={nodes.Genesis8Female_4.skeleton} />
          <skinnedMesh name="Genesis8Female_5" geometry={nodes.Genesis8Female_5.geometry} material={materials['Nightmare Queen_Face']} skeleton={nodes.Genesis8Female_5.skeleton} />
          <skinnedMesh name="Genesis8Female_6" geometry={nodes.Genesis8Female_6.geometry} material={materials['Nightmare Queen_Legs']} skeleton={nodes.Genesis8Female_6.skeleton} />
          <skinnedMesh name="Genesis8Female_7" geometry={nodes.Genesis8Female_7.geometry} material={materials['Nightmare Queen_Teeth']} skeleton={nodes.Genesis8Female_7.skeleton} />
          <skinnedMesh name="Genesis8Female_8" geometry={nodes.Genesis8Female_8.geometry} material={materials['Nightmare Queen_Arms']} skeleton={nodes.Genesis8Female_8.skeleton} />
          <skinnedMesh name="Genesis8Female_9" geometry={nodes.Genesis8Female_9.geometry} material={materials['Nightmare Queen_Arms']} skeleton={nodes.Genesis8Female_9.skeleton} />
          <skinnedMesh name="Genesis8Female_10" geometry={nodes.Genesis8Female_10.geometry} material={materials['Nightmare Queen_Legs']} skeleton={nodes.Genesis8Female_10.skeleton} />
          <skinnedMesh name="Genesis8Female_11" geometry={nodes.Genesis8Female_11.geometry} material={materials['Nightmare Queen_NQ Head']} skeleton={nodes.Genesis8Female_11.skeleton} />
        </group>
        <group name="SU_Nurse_Uniform_Clothes_G8F_20396Shape">
          <skinnedMesh name="SU_Nurse_Uniform_Clothes_G8F_20396" geometry={nodes.SU_Nurse_Uniform_Clothes_G8F_20396.geometry} material={materials['SU Nurse Uniform Clothes G8F_20396_Body']} skeleton={nodes.SU_Nurse_Uniform_Clothes_G8F_20396.skeleton} />
          <skinnedMesh name="SU_Nurse_Uniform_Clothes_G8F_20396_1" geometry={nodes.SU_Nurse_Uniform_Clothes_G8F_20396_1.geometry} material={materials['SU Nurse Uniform Clothes G8F_20396_Body']} skeleton={nodes.SU_Nurse_Uniform_Clothes_G8F_20396_1.skeleton} />
          <skinnedMesh name="SU_Nurse_Uniform_Clothes_G8F_20396_2" geometry={nodes.SU_Nurse_Uniform_Clothes_G8F_20396_2.geometry} material={materials['SU Nurse Uniform Clothes G8F_20396_Body']} skeleton={nodes.SU_Nurse_Uniform_Clothes_G8F_20396_2.skeleton} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/NightmareQueen-transformed.glb')