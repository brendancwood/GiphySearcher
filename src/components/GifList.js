import React, { PropTypes } from 'react'
import Gif from './Gif'
import '../styles/main.css'
import Loader from './Loader'

const GifList = ({showLoader, gifs}) => {
  if (!showLoader && !gifs.length) {
    return (<div className="text-center">There seems to be nothing here...</div>)
  }

  return (
    <div className="gif-container">
    <Loader showLoader={showLoader} />
      <div className="row">
        {
          gifs.map(gif => {
            return(<Gif key={gif.id} gif={gif} />)
          })
        }
      </div>
    </div>
  )
}

GifList.propTypes = {
  gifs: PropTypes.array.isRequired
}

export default GifList
