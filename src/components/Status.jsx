/* eslint-disable react/prop-types */


const Status = ({ status }) => {
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