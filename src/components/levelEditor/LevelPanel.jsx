/* eslint-disable react/prop-types */
import { useState } from 'react';

const LevelPanel = ({ doors, setDoors }) => {
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

  const [selectedDoorIndex, setSelectedDoorIndex] = useState(-1);

  const handleDoorInputChange = (e, index) => {
    const { name, value } = e.target
    const updatedDoors = [...doors]
    updatedDoors[index][name] = value
    setDoors(updatedDoors)
  };

  const handleDoorDelete = (index) => {
    const updatedDoors = [...doors]
    updatedDoors.splice(index, 1)
    setDoors(updatedDoors)
    setSelectedDoorIndex(-1)
  }

  const handleDoorAdd = () => {
    const newDoor = { x: 0, z: 0, destination: "new" }
    setDoors([...doors, newDoor])
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
                <button onClick={() => handleDoorDelete(selectedDoorIndex)}>Delete</button>
              </div>
            )}
            <button onClick={handleDoorAdd}>Add Door</button>
          </div>
          <div>
            <h4>Items:</h4>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LevelPanel;
