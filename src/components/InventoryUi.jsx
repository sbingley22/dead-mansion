/* eslint-disable react/prop-types */

const InventoryUi = ({ inventory, setInventory }) => {
  const itemClicked = (index) => {
    console.log(inventory[index])
  }

  return (
    <div>
      { inventory.map((item, index) => (
        <div
          key={index}
          onClick={()=>itemClicked(index)}
          style={{userSelect: "none", cursor: "pointer"}}
        >
          { item.label }
        </div>
      ))}
    </div>
  )
}

export default InventoryUi