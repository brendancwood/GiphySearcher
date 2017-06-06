import React, { PropTypes } from 'react'
import Waypoint from 'react-waypoint'


const InfiniteScroller = ({isLoading, onScroll, paginationData}) => {
  if (isLoading) {
    return null
  }

  return (
    <div>
      <Waypoint onEnter={onScroll(paginationData)}>
        <div>
          Some content here ----------------------
        </div>
      </Waypoint>
    </div>
  )
}

InfiniteScroller.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  onScroll: PropTypes.func.isRequired,
  paginationData: PropTypes.object.isRequired
}

export default InfiniteScroller
