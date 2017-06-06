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
    case types.RECEIVE_NEXT_PAGE:
      if (action.payload.currentTerm) {
        return state
      }
      const newData = [...state.data.data, ...action.payload.data.data]
      return {...state, data: {data: newData, pagination: action.payload.data.pagination}}
    default:
      return state
  }
}
