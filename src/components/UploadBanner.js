import React, { PropTypes } from 'react'
import Loader from './Loader'
import { UPLOAD_STATUS } from '../utils/constants'
import api from '../utils/api'

const UploadBanner = ({uploadData}) => {
  let message;
  let classNames = 'flash-banner'
  if (uploadData.status === UPLOAD_STATUS.NONE) {
    return null
  }

  else if (uploadData.status === UPLOAD_STATUS.PENDING) {
    message = (<Loader showLoader={true} />)
  }

  else if (uploadData.status === UPLOAD_STATUS.SUCCESS) {
    const link = api.urls.giphy + uploadData.data.data.id
    message = (
      <span>
        Upload Successful! <a href={link} target="_blank">Click Here</a> to see it on Giphy.
      </span>
    )
    classNames += ' upload-green'
  }

  else if (uploadData.status === UPLOAD_STATUS.FAILED) {
    message = (
      <span>Upload Failed! Error: {uploadData.data.meta.msg}</span>
    )
    classNames += ' upload-red'
  }

  return (
    <div className={classNames}>
      {message}
    </div>
  )
}

UploadBanner.propTypes = {
  uploadData: PropTypes.object.isRequired
}

export default UploadBanner
