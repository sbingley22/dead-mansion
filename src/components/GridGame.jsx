/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */

const GridGame = ({ grid, gridScale = 0.5, setGridClick }) => {
  const gridX = grid && grid.width ? grid.width : 1
  const gridZ = grid && grid.height ? grid.height : 1

  const handleClick = (e) => {
    const pointX = e.point.x
    const pointZ = e.point.z
    
    // convert point to grid index then update grid
    const gridX = Math.round( (pointX / gridScale) + grid.width/2 )
    const gridZ = Math.round( (pointZ / gridScale) + grid.height/2 )
    //console.log(Math.floor(point.x), gridX)
    //console.log(gridX, gridZ)
    setGridClick([gridX,gridZ])
  }

  if (!grid) return

  return (
    <group 
      position={[
        (gridX*gridScale)*-0.5, 
        0, 
        (gridZ*gridScale)*-0.5]}
        scale={[gridX,1,gridZ]}
    >
      <mesh 
        receiveShadow
        rotation-x={-Math.PI/2}
        onClick={handleClick}
      >
        <planeGeometry />
        <meshPhongMaterial />
      </mesh>
    </group>
  )
}

export default GridGame