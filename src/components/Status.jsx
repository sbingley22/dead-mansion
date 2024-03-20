/* eslint-disable react/prop-types */


const Status = ({ playerStats }) => {
  let status = "healthyIdle"
  if (playerStats.health < 40) {
    status = "criticalIdle"
  } else if (playerStats.health < 70) {
    status = "scaredIdle"
  }

  const statusImage = `/status/${status}.gif`

  const style = {
    width: '100%',
    height: 'auto',
    padding: "0",
    margin: "0",
    display: "block"
  }
  return (
    <img src={statusImage} style={style} />
  )
}

export default Status