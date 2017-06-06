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

    case types.RECEIVE_NEXT_PAGE:
      if (!action.payload.currentTerm) {
        return state
      } else {
          return {...state, [state.currentTerm]: {
              data: [...state.currentTerm.data.data, ...action.payload.data.data],
              pagination: state.currentTerm.data.pagination
            }
          }
        }
    default:
      return state
  }
}
