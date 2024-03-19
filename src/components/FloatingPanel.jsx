/* eslint-disable react/prop-types */
import { useState } from 'react';

const FloatingPanel = ( props ) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: props.x, y: props.y });
  const [initialOffset, setInitialOffset] = useState({ x: 0, y: 0 })
  const [minimized, setMinimized] = useState(props.minimzed)

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

  const panelStyle = {
    position: "fixed",
    top: position.y + "px",
    left: position.x + "px",
    width: props.width,
    minHeight: "30px",
    backgroundColor: props.backgroundColor,
    border: props.border,
    borderRadius: "5px",
  }
  const barContainerStyle = {
    display: "grid",
    gridTemplateColumns: "3fr 1fr",
    minHeight: "20px"
  }
  const dragableStyle = {
    backgroundColor: "#111111",
    padding: "1px",
    marginBottom: "1px",
    cursor: "grab",
    userSelect: "none",
    fontSize: "small"
  }
  const minimizeStyle = {
    backgroundColor: "#552222"
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div
        style={panelStyle}
      >
        <div style={barContainerStyle}>
          <div
            style={dragableStyle}
            onMouseDown={handleMouseDown}
          >
            {props.name}
          </div>
          <div
            style={minimizeStyle}
            onClick={() => setMinimized(prev => !prev)}
          />
        </div>
        {!minimized && props.children}
      </div>
    </div>
  )
}

FloatingPanel.defaultProps = {
  x: 0,
  y: 0,
  width: "260px",
  name: "",
  minimized: false,
  backgroundColor: "#313131",
  border: "4px solid #111"
}

export default FloatingPanel