/* eslint-disable react/prop-types */
import { useState } from 'react';

const LevelPanel = ({ doors, setDoors, items, setItems, enemies, setEnemies }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [initialOffset, setInitialOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    const rect = e.currentTarget.getBoundingClientRect();
    setInitialOffset({
      x: e.pageX - rect.left,
      y: e.pageY - rect.top
    });
  }
  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.pageX - initialOffset.x,
        y: e.pageY - initialOffset.y
      });
    }
  }
  const handleMouseUp = () => {
    setIsDragging(false);
  }

  const [selectedDoorIndex, setSelectedDoorIndex] = useState(-1)
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1)
  const [selectedEnemyIndex, setSelectedEnemyIndex] = useState(-1)

  // Doors
  const handleDoorInputChange = (e, index) => {
    const { name, value, type } = e.target;
    const updatedDoors = [...doors];
  
    if (type === 'checkbox') {
      updatedDoors[index][name] = e.target.checked;
    } else {
      updatedDoors[index][name] = value;
    }
  
    setDoors(updatedDoors);
  }
  const handleDoorDelete = (index) => {
    const updatedDoors = [...doors]
    updatedDoors.splice(index, 1)
    setDoors(updatedDoors)
    setSelectedDoorIndex(-1)
  }
  const handleDoorAdd = () => {
    const newDoor = { x: 0, z: 0, destination: "new", sx1: 0, sy1: 0, sx2: 0, sy2: 0, key: false }
    setDoors([...doors, newDoor])
  }

  // Items
  const handleItemInputChange = (e, index) => {
    const { name, value, type } = e.target;
    const updatedItems = [...items];
  
    if (type === 'checkbox') {
      updatedItems[index][name] = e.target.checked;
    } else {
      updatedItems[index][name] = value;
    }
  
    setItems(updatedItems);
  }
  const handleItemDelete = (index) => {
    const updatedItems = [...items]
    updatedItems.splice(index, 1)
    setItems(updatedItems)
    setSelectedItemIndex(-1)
  }
  const handleItemAdd = () => {
    const newItem = { name: "new", type: "key", x: 0, z: 0, sx: 0, sy: 0, radius: 25, collected: false, image: "", scale: 1 }
    setItems([...items, newItem])
  }


  // Enemies
  const handleEnemyInputChange = (e, index) => {
    const { name, value, type } = e.target;
    const updatedEnemies = [...enemies];
  
    if (type === 'checkbox') {
      updatedEnemies[index][name] = e.target.checked;
    } else {
      updatedEnemies[index][name] = value;
    }
  
    setDoors(updatedEnemies);
  }
  const handleEnemyDelete = (index) => {
    const updatedEnemies = [...enemies]
    updatedEnemies.splice(index, 1)
    setEnemies(updatedEnemies)
    setSelectedEnemyIndex(-1)
  }
  const handleEnemyAdd = () => {
    const newEnemy = { x: 0, z: 0, type: "queen", status: 1 }
    setEnemies([...enemies, newEnemy])
  }

  return (
    <div
      className="panel-container"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div
        className="floating-panel"
        style={{ left: position.x, top: position.y }}
      >
        <div className="draggable-bar" onMouseDown={handleMouseDown}>
        </div>
        <div className="content">
          <div>
            <h4>Doors:</h4>
            <select 
              value={selectedDoorIndex} 
              onChange={(e) => setSelectedDoorIndex(parseInt(e.target.value))}
              >
                <option value={-1}>Select a door</option>
                {doors.map((door,index) => (
                  <option key={index} value={index}>
                    {door.destination}
                  </option>
                ))}
            </select>
            {selectedDoorIndex !== -1 && (
              <div>
                <div>
                  <label>grid x</label>
                  <input
                    type='number'
                    name="x"
                    min={0}
                    value={doors[selectedDoorIndex].x}
                    onChange={(e) => handleDoorInputChange(e, selectedDoorIndex)}
                  />
                </div>
                <div>
                  <label>grid z</label>
                  <input
                    type='number'
                    name="z"
                    min={0}
                    value={doors[selectedDoorIndex].z}
                    onChange={(e) => handleDoorInputChange(e, selectedDoorIndex)}
                  />
                </div>
                <div>
                  <label>destination</label>
                  <input
                    type='text'
                    name="destination"
                    min={0}
                    value={doors[selectedDoorIndex].destination}
                    onChange={(e) => handleDoorInputChange(e, selectedDoorIndex)}
                  />
                </div>
                <div>
                  <label>screen x1</label>
                  <input
                    type='number'
                    name="sx1"
                    min={0}
                    value={doors[selectedDoorIndex].sx1}
                    onChange={(e) => handleDoorInputChange(e, selectedDoorIndex)}
                  />
                </div>
                <div>
                  <label>screen y1</label>
                  <input
                    type='number'
                    name="sy1"
                    min={0}
                    value={doors[selectedDoorIndex].sy1}
                    onChange={(e) => handleDoorInputChange(e, selectedDoorIndex)}
                  />
                </div>
                <div>
                  <label>screen x2</label>
                  <input
                    type='number'
                    name="sx2"
                    min={0}
                    value={doors[selectedDoorIndex].sx2}
                    onChange={(e) => handleDoorInputChange(e, selectedDoorIndex)}
                  />
                </div>
                <div>
                  <label>screen y2</label>
                  <input
                    type='number'
                    name="sy2"
                    min={0}
                    value={doors[selectedDoorIndex].sy2}
                    onChange={(e) => handleDoorInputChange(e, selectedDoorIndex)}
                  />
                </div>
                <div>
                  <label>key</label>
                  <input
                    type='checkbox'
                    name="key"
                    checked={doors[selectedDoorIndex].key}
                    onChange={(e) => handleDoorInputChange(e, selectedDoorIndex)}
                  />
                </div>
                <button onClick={() => handleDoorDelete(selectedDoorIndex)}>Delete</button>
              </div>
            )}
            <button onClick={handleDoorAdd}>Add Door</button>
          </div>
          <div>
            <h4>Items:</h4>
            <select 
              value={selectedItemIndex} 
              onChange={(e) => setSelectedItemIndex(parseInt(e.target.value))}
              >
                <option value={-1}>Select an item</option>
                {items.map((item,index) => (
                  <option key={index} value={index}>
                    {item.name}
                  </option>
                ))}
            </select>
            {selectedItemIndex !== -1 && (
              <div>
                <div>
                  <label>name</label>
                  <input
                    type='text'
                    name="name"
                    value={items[selectedItemIndex].name}
                    onChange={(e) => handleItemInputChange(e, selectedItemIndex)}
                  />
                </div>
                <div>
                  <label>type</label>
                  <input
                    type='text'
                    name="type"
                    value={items[selectedItemIndex].type}
                    onChange={(e) => handleItemInputChange(e, selectedItemIndex)}
                  />
                </div>
                <div>
                  <label>grid x</label>
                  <input
                    type='number'
                    name="x"
                    min={0}
                    value={items[selectedItemIndex].x}
                    onChange={(e) => handleItemInputChange(e, selectedItemIndex)}
                  />
                </div>
                <div>
                  <label>grid z</label>
                  <input
                    type='number'
                    name="z"
                    min={0}
                    value={items[selectedItemIndex].z}
                    onChange={(e) => handleItemInputChange(e, selectedItemIndex)}
                  />
                </div>
                <div>
                  <label>screen x</label>
                  <input
                    type='number'
                    name="sx"
                    min={0}
                    value={items[selectedItemIndex].sx}
                    onChange={(e) => handleItemInputChange(e, selectedItemIndex)}
                  />
                </div>
                <div>
                  <label>screen y</label>
                  <input
                    type='number'
                    name="sy"
                    min={0}
                    value={items[selectedItemIndex].sy}
                    onChange={(e) => handleItemInputChange(e, selectedItemIndex)}
                  />
                </div>
                <div>
                  <label>radius</label>
                  <input
                    type='number'
                    name="radius"
                    min={0}
                    value={items[selectedItemIndex].radius}
                    onChange={(e) => handleItemInputChange(e, selectedItemIndex)}
                  />
                </div>
                <div>
                  <label>img</label>
                  <input
                    type='text'
                    name="img"
                    value={items[selectedItemIndex].radius}
                    onChange={(e) => handleItemInputChange(e, selectedItemIndex)}
                  />
                </div>
                <div>
                  <label>scale</label>
                  <input
                    type='number'
                    name="scale"
                    min={0}
                    value={items[selectedItemIndex].scale}
                    onChange={(e) => handleItemInputChange(e, selectedItemIndex)}
                  />
                </div>
                <button onClick={() => handleItemDelete(selectedItemIndex)}>Delete</button>
              </div>
            )}
            <button onClick={handleItemAdd}>Add Item</button>
          </div>
          <div>
            <h4>Enemies:</h4>
            <select 
              value={selectedEnemyIndex} 
              onChange={(e) => setSelectedEnemyIndex(parseInt(e.target.value))}
              >
                <option value={-1}>Select an enemy</option>
                {enemies.map((enemy,index) => (
                  <option key={index} value={index}>
                    {enemy.name}
                  </option>
                ))}
            </select>
            {selectedEnemyIndex !== -1 && (
              <div>
                <div>
                  <label>type</label>
                  <input
                    type='text'
                    name="type"
                    value={enemies[selectedEnemyIndex].type}
                    onChange={(e) => handleEnemyInputChange(e, selectedEnemyIndex)}
                  />
                </div>
                <div>
                  <label>grid x</label>
                  <input
                    type='number'
                    name="x"
                    min={0}
                    value={enemies[selectedEnemyIndex].x}
                    onChange={(e) => handleEnemyInputChange(e, selectedEnemyIndex)}
                  />
                </div>
                <div>
                  <label>grid z</label>
                  <input
                    type='number'
                    name="z"
                    min={0}
                    value={enemies[selectedEnemyIndex].z}
                    onChange={(e) => handleEnemyInputChange(e, selectedEnemyIndex)}
                  />
                </div>
                <button onClick={() => handleEnemyDelete(selectedEnemyIndex)}>Delete</button>
              </div>
            )}
            <button onClick={handleEnemyAdd}>Add Enemy</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LevelPanel;
