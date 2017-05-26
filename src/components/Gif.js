import React, {PropTypes} from 'react'

const Gif = ({gif}) => {
  return (
    <div className="gif-box">
      <img role="presentation" className="img-fluid" src={gif.images.original.url} />
      <p>{gif.rating}</p>
    </div>
  )
}

Gif.propTypes = {
  gif: PropTypes.object.isRequired
}

export default Gif
