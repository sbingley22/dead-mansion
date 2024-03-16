/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 src/assets/dev/elizabeth.glb -T 
Files: src/assets/dev/elizabeth.glb [9.93MB] > D:\Web_Projects\Games\dead-mansion\elizabeth-transformed.glb [2.31MB] (77%)
*/

import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/elizabeth-transformed.glb')
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Genesis8Female">
          <primitive object={nodes.Camera} />
          <primitive object={nodes.root} />
        </group>
        <group name="BS_French_Braid_Hair_for_Genesis_8_Females_294114Shape">
          <skinnedMesh name="BS_French_Braid_Hair_for_Genesis_8_Females_294114" geometry={nodes.BS_French_Braid_Hair_for_Genesis_8_Females_294114.geometry} material={materials['BS French Braid Hair for Genesis 8 Females_Cap']} skeleton={nodes.BS_French_Braid_Hair_for_Genesis_8_Females_294114.skeleton} />
          <skinnedMesh name="BS_French_Braid_Hair_for_Genesis_8_Females_294114_1" geometry={nodes.BS_French_Braid_Hair_for_Genesis_8_Females_294114_1.geometry} material={materials['BS French Braid Hair for Genesis 8 Females_Right1']} skeleton={nodes.BS_French_Braid_Hair_for_Genesis_8_Females_294114_1.skeleton} />
          <skinnedMesh name="BS_French_Braid_Hair_for_Genesis_8_Females_294114_2" geometry={nodes.BS_French_Braid_Hair_for_Genesis_8_Females_294114_2.geometry} material={materials['BS French Braid Hair for Genesis 8 Females_Right1']} skeleton={nodes.BS_French_Braid_Hair_for_Genesis_8_Females_294114_2.skeleton} />
          <skinnedMesh name="BS_French_Braid_Hair_for_Genesis_8_Females_294114_3" geometry={nodes.BS_French_Braid_Hair_for_Genesis_8_Females_294114_3.geometry} material={materials['BS French Braid Hair for Genesis 8 Females_Right1']} skeleton={nodes.BS_French_Braid_Hair_for_Genesis_8_Females_294114_3.skeleton} />
          <skinnedMesh name="BS_French_Braid_Hair_for_Genesis_8_Females_294114_4" geometry={nodes.BS_French_Braid_Hair_for_Genesis_8_Females_294114_4.geometry} material={materials['BS French Braid Hair for Genesis 8 Females_Right1']} skeleton={nodes.BS_French_Braid_Hair_for_Genesis_8_Females_294114_4.skeleton} />
          <skinnedMesh name="BS_French_Braid_Hair_for_Genesis_8_Females_294114_5" geometry={nodes.BS_French_Braid_Hair_for_Genesis_8_Females_294114_5.geometry} material={materials['BS French Braid Hair for Genesis 8 Females_Right1']} skeleton={nodes.BS_French_Braid_Hair_for_Genesis_8_Females_294114_5.skeleton} />
          <skinnedMesh name="BS_French_Braid_Hair_for_Genesis_8_Females_294114_6" geometry={nodes.BS_French_Braid_Hair_for_Genesis_8_Females_294114_6.geometry} material={materials['BS French Braid Hair for Genesis 8 Females_Right1']} skeleton={nodes.BS_French_Braid_Hair_for_Genesis_8_Females_294114_6.skeleton} />
          <skinnedMesh name="BS_French_Braid_Hair_for_Genesis_8_Females_294114_7" geometry={nodes.BS_French_Braid_Hair_for_Genesis_8_Females_294114_7.geometry} material={materials['BS French Braid Hair for Genesis 8 Females_Right1']} skeleton={nodes.BS_French_Braid_Hair_for_Genesis_8_Females_294114_7.skeleton} />
          <skinnedMesh name="BS_French_Braid_Hair_for_Genesis_8_Females_294114_8" geometry={nodes.BS_French_Braid_Hair_for_Genesis_8_Females_294114_8.geometry} material={materials['BS French Braid Hair for Genesis 8 Females_Right1']} skeleton={nodes.BS_French_Braid_Hair_for_Genesis_8_Females_294114_8.skeleton} />
          <skinnedMesh name="BS_French_Braid_Hair_for_Genesis_8_Females_294114_9" geometry={nodes.BS_French_Braid_Hair_for_Genesis_8_Females_294114_9.geometry} material={materials['BS French Braid Hair for Genesis 8 Females_Right1']} skeleton={nodes.BS_French_Braid_Hair_for_Genesis_8_Females_294114_9.skeleton} />
        </group>
        <group name="CameraShape">
          <skinnedMesh name="Camera_1" geometry={nodes.Camera_1.geometry} material={materials.Lens_Glass} skeleton={nodes.Camera_1.skeleton} />
          <skinnedMesh name="Camera_2" geometry={nodes.Camera_2.geometry} material={materials.PaletteMaterial001} skeleton={nodes.Camera_2.skeleton} />
          <skinnedMesh name="Camera_3" geometry={nodes.Camera_3.geometry} material={materials.PaletteMaterial001} skeleton={nodes.Camera_3.skeleton} />
          <skinnedMesh name="Camera_4" geometry={nodes.Camera_4.geometry} material={materials.Lens_Frame_Outer} skeleton={nodes.Camera_4.skeleton} />
          <skinnedMesh name="Camera_5" geometry={nodes.Camera_5.geometry} material={materials.Lens_Glass} skeleton={nodes.Camera_5.skeleton} />
          <skinnedMesh name="Camera_6" geometry={nodes.Camera_6.geometry} material={materials.Lens_Frame_Outer} skeleton={nodes.Camera_6.skeleton} />
          <skinnedMesh name="Camera_7" geometry={nodes.Camera_7.geometry} material={materials.PaletteMaterial001} skeleton={nodes.Camera_7.skeleton} />
          <skinnedMesh name="Camera_8" geometry={nodes.Camera_8.geometry} material={materials.PaletteMaterial001} skeleton={nodes.Camera_8.skeleton} />
          <skinnedMesh name="Camera_9" geometry={nodes.Camera_9.geometry} material={materials.Lens_Frame_Outer} skeleton={nodes.Camera_9.skeleton} />
          <skinnedMesh name="Camera_10" geometry={nodes.Camera_10.geometry} material={materials.Lens_Frame_Outer} skeleton={nodes.Camera_10.skeleton} />
          <skinnedMesh name="Camera_11" geometry={nodes.Camera_11.geometry} material={materials.PaletteMaterial001} skeleton={nodes.Camera_11.skeleton} />
          <skinnedMesh name="Camera_12" geometry={nodes.Camera_12.geometry} material={materials.PaletteMaterial001} skeleton={nodes.Camera_12.skeleton} />
          <skinnedMesh name="Camera_13" geometry={nodes.Camera_13.geometry} material={materials.Lens_Frame_Outer} skeleton={nodes.Camera_13.skeleton} />
          <skinnedMesh name="Camera_14" geometry={nodes.Camera_14.geometry} material={materials.Mirror} skeleton={nodes.Camera_14.skeleton} />
          <skinnedMesh name="Camera_15" geometry={nodes.Camera_15.geometry} material={materials.PaletteMaterial001} skeleton={nodes.Camera_15.skeleton} />
        </group>
        <group name="dress_18061Shape">
          <skinnedMesh name="dress_18061" geometry={nodes.dress_18061.geometry} material={materials.dress_18061_straps} skeleton={nodes.dress_18061.skeleton} />
          <skinnedMesh name="dress_18061_1" geometry={nodes.dress_18061_1.geometry} material={materials['dress_18061_lower sleeve']} skeleton={nodes.dress_18061_1.skeleton} />
          <skinnedMesh name="dress_18061_2" geometry={nodes.dress_18061_2.geometry} material={materials['dress_18061_upper sleeves edge']} skeleton={nodes.dress_18061_2.skeleton} />
          <skinnedMesh name="dress_18061_3" geometry={nodes.dress_18061_3.geometry} material={materials['dress_18061_upper sleeves edge']} skeleton={nodes.dress_18061_3.skeleton} />
          <skinnedMesh name="dress_18061_4" geometry={nodes.dress_18061_4.geometry} material={materials.dress_18061_straps} skeleton={nodes.dress_18061_4.skeleton} />
          <skinnedMesh name="dress_18061_5" geometry={nodes.dress_18061_5.geometry} material={materials.dress_18061_straps} skeleton={nodes.dress_18061_5.skeleton} />
          <skinnedMesh name="dress_18061_6" geometry={nodes.dress_18061_6.geometry} material={materials.dress_18061_straps} skeleton={nodes.dress_18061_6.skeleton} />
          <skinnedMesh name="dress_18061_7" geometry={nodes.dress_18061_7.geometry} material={materials.dress_18061_straps} skeleton={nodes.dress_18061_7.skeleton} />
        </group>
        <group name="Genesis8FemaleShape">
          <skinnedMesh name="Genesis8Female_1" geometry={nodes.Genesis8Female_1.geometry} material={materials['Genesis 8 Female_Torso']} skeleton={nodes.Genesis8Female_1.skeleton} />
          <skinnedMesh name="Genesis8Female_2" geometry={nodes.Genesis8Female_2.geometry} material={materials['Genesis 8 Female_Face']} skeleton={nodes.Genesis8Female_2.skeleton} />
          <skinnedMesh name="Genesis8Female_3" geometry={nodes.Genesis8Female_3.geometry} material={materials['Genesis 8 Female_Lips']} skeleton={nodes.Genesis8Female_3.skeleton} />
          <skinnedMesh name="Genesis8Female_4" geometry={nodes.Genesis8Female_4.geometry} material={materials['Genesis 8 Female_Teeth']} skeleton={nodes.Genesis8Female_4.skeleton} />
          <skinnedMesh name="Genesis8Female_5" geometry={nodes.Genesis8Female_5.geometry} material={materials['Genesis 8 Female_Ears']} skeleton={nodes.Genesis8Female_5.skeleton} />
          <skinnedMesh name="Genesis8Female_6" geometry={nodes.Genesis8Female_6.geometry} material={materials['Genesis 8 Female_Legs']} skeleton={nodes.Genesis8Female_6.skeleton} />
          <skinnedMesh name="Genesis8Female_7" geometry={nodes.Genesis8Female_7.geometry} material={materials['Genesis 8 Female_Ears']} skeleton={nodes.Genesis8Female_7.skeleton} />
          <skinnedMesh name="Genesis8Female_8" geometry={nodes.Genesis8Female_8.geometry} material={materials['Genesis 8 Female_Teeth']} skeleton={nodes.Genesis8Female_8.skeleton} />
          <skinnedMesh name="Genesis8Female_9" geometry={nodes.Genesis8Female_9.geometry} material={materials['Genesis 8 Female_Arms']} skeleton={nodes.Genesis8Female_9.skeleton} />
          <skinnedMesh name="Genesis8Female_10" geometry={nodes.Genesis8Female_10.geometry} material={materials.PaletteMaterial002} skeleton={nodes.Genesis8Female_10.skeleton} />
          <skinnedMesh name="Genesis8Female_11" geometry={nodes.Genesis8Female_11.geometry} material={materials.PaletteMaterial003} skeleton={nodes.Genesis8Female_11.skeleton} />
          <skinnedMesh name="Genesis8Female_12" geometry={nodes.Genesis8Female_12.geometry} material={materials.PaletteMaterial002} skeleton={nodes.Genesis8Female_12.skeleton} />
          <skinnedMesh name="Genesis8Female_13" geometry={nodes.Genesis8Female_13.geometry} material={materials.PaletteMaterial003} skeleton={nodes.Genesis8Female_13.skeleton} />
          <skinnedMesh name="Genesis8Female_14" geometry={nodes.Genesis8Female_14.geometry} material={materials['Genesis 8 Female_Irises']} skeleton={nodes.Genesis8Female_14.skeleton} />
          <skinnedMesh name="Genesis8Female_15" geometry={nodes.Genesis8Female_15.geometry} material={materials['Genesis 8 Female_Irises']} skeleton={nodes.Genesis8Female_15.skeleton} />
          <skinnedMesh name="Genesis8Female_16" geometry={nodes.Genesis8Female_16.geometry} material={materials['Genesis 8 Female_Legs']} skeleton={nodes.Genesis8Female_16.skeleton} />
        </group>
        <group name="Genesis8FemaleEyelashesShape">
          <skinnedMesh name="Genesis8FemaleEyelashes" geometry={nodes.Genesis8FemaleEyelashes.geometry} material={materials.PaletteMaterial002} skeleton={nodes.Genesis8FemaleEyelashes.skeleton} />
          <skinnedMesh name="Genesis8FemaleEyelashes_1" geometry={nodes.Genesis8FemaleEyelashes_1.geometry} material={materials['Genesis 8 Female Eyelashes_Eyelashes']} skeleton={nodes.Genesis8FemaleEyelashes_1.skeleton} />
        </group>
        <group name="Roxy_Flat_Sandals_4636Shape">
          <skinnedMesh name="Roxy_Flat_Sandals_4636" geometry={nodes.Roxy_Flat_Sandals_4636.geometry} material={materials['Roxy Flat Sandals_4636_Strap_Toes']} skeleton={nodes.Roxy_Flat_Sandals_4636.skeleton} />
          <skinnedMesh name="Roxy_Flat_Sandals_4636_1" geometry={nodes.Roxy_Flat_Sandals_4636_1.geometry} material={materials['Roxy Flat Sandals_4636_Strap_Toes']} skeleton={nodes.Roxy_Flat_Sandals_4636_1.skeleton} />
          <skinnedMesh name="Roxy_Flat_Sandals_4636_2" geometry={nodes.Roxy_Flat_Sandals_4636_2.geometry} material={materials['Roxy Flat Sandals_4636_Strap_Toes']} skeleton={nodes.Roxy_Flat_Sandals_4636_2.skeleton} />
          <skinnedMesh name="Roxy_Flat_Sandals_4636_3" geometry={nodes.Roxy_Flat_Sandals_4636_3.geometry} material={materials['Roxy Flat Sandals_4636_Strap_Toes']} skeleton={nodes.Roxy_Flat_Sandals_4636_3.skeleton} />
          <skinnedMesh name="Roxy_Flat_Sandals_4636_4" geometry={nodes.Roxy_Flat_Sandals_4636_4.geometry} material={materials['Roxy Flat Sandals_4636_Strap_Toes']} skeleton={nodes.Roxy_Flat_Sandals_4636_4.skeleton} />
          <skinnedMesh name="Roxy_Flat_Sandals_4636_5" geometry={nodes.Roxy_Flat_Sandals_4636_5.geometry} material={materials['Roxy Flat Sandals_4636_Strap_Toes']} skeleton={nodes.Roxy_Flat_Sandals_4636_5.skeleton} />
          <skinnedMesh name="Roxy_Flat_Sandals_4636_6" geometry={nodes.Roxy_Flat_Sandals_4636_6.geometry} material={materials.PaletteMaterial004} skeleton={nodes.Roxy_Flat_Sandals_4636_6.skeleton} />
          <skinnedMesh name="Roxy_Flat_Sandals_4636_7" geometry={nodes.Roxy_Flat_Sandals_4636_7.geometry} material={materials['Roxy Flat Sandals_4636_Strap_Toes']} skeleton={nodes.Roxy_Flat_Sandals_4636_7.skeleton} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/elizabeth-transformed.glb')
