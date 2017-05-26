import * as types from '../actions/action_types'

const initialState = {
  data: {
    data: []
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.REQUEST_TRENDING:
      return {...state}
    case types.RECEIVE_TRENDING:
      return {...state, data: action.payload}
    default:
      return state
  }
}
