import React, {PropTypes} from 'react'
import Gif from './Gif'
import '../styles/main.css'
import Loader from './Loader'

const GifList = ({gifs, showLoader}) => {
  return (
    <div className="gif-container">
      <Loader showLoader={showLoader} />
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
