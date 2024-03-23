/* eslint-disable react/prop-types */


const PhotoUi = ({ photoImg }) => {

  const statusImage = `./photographs/${photoImg}.png`

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

export default PhotoUi