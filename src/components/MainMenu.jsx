/* eslint-disable react/prop-types */

const MainMenu = ({ setMode }) => {

  const style = {
    backgroundImage: `url(./titleShot.png)`,
    height: "100%",
    padding: "30px"
  }

  return (
    <div style={style}>
      <h1>Main Menu</h1>
      <button onClick={()=>{setMode(2)}}>Play</button>
      <button onClick={()=>{setMode(9)}}>Level Editor</button>
    </div>
  )
}

export default MainMenu