import * as types from '../actions/action_types'

const initialState = {
  currentTerm: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.REQUEST_SEARCH:
      const currentTerm = action.payload
      return {...state, currentTerm: currentTerm, [currentTerm]: {data: []}}
    case types.RECEIVE_SEARCH:
      return {...state, [state.currentTerm]: action.payload}
    default:
      return state
  }
}
