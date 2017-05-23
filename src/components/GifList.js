import React, {PropTypes} from 'react'
import Gif from './Gif'
import '../styles/main.css'

const GifList = ({gifs}) => {
  return (
    <div className="gif-container">
      {gifs.map((gif) =>
        <Gif key={gif.id} gif={gif} />
      )}
    </div>
  )
}

GifList.propTypes = {
  gifs: PropTypes.array.isRequired
}

export default GifList
