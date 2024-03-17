/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */

const InvisiblePlane = ({ scale }) => {
  return (
    <mesh
      receiveShadow
      rotation={[-Math.PI / 2, 0, 0]}
      scale={scale}
    >
      <planeGeometry attach="geometry" />
      <shadowMaterial attach="material" opacity={0.8} transparent />
      {/* <meshStandardMaterial attach="material" color={"grey"} /> */}
    </mesh>
  )
}

InvisiblePlane.defaultProps = {
  scale: [10,10,10]
}

export default InvisiblePlane
