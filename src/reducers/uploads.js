import * as types from '../actions/action_types'
import { UPLOAD_STATUS } from '../utils/constants'

const initialState = {
  status: UPLOAD_STATUS.NONE,
  data: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.UPLOAD_RESET:
      return initialState
    case types.UPLOADING_GIF:
      return {...state, status: UPLOAD_STATUS.PENDING}
    case types.UPLOAD_SUCCESS:
      return {...state, status: UPLOAD_STATUS.SUCCESS, data: action.payload}
    case types.UPLOAD_FAILED:
      return {...state, status: UPLOAD_STATUS.FAILED, data: action.payload}
    default:
      return state
  }
}
