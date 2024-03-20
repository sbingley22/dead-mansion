/* eslint-disable react/prop-types */

const InventoryUi = ({ inventory, setInventory, playerStats, setPlayerStats }) => {
  const itemClicked = (index) => {
    const item = inventory[index]
    let removeItem = false
    console.log(item)

    if (item.type == "healing") {
      if (playerStats.health >= 100) return
      let value = 30

      const tempStats = {...playerStats}
      tempStats.health += value
      if (tempStats.health > 100) tempStats.health = 100
      setPlayerStats(tempStats)
      removeItem = true
    }

    if (removeItem) {
      const tempInventory = [...inventory]
      tempInventory.splice(index, 1)
      setInventory(tempInventory)
    }
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