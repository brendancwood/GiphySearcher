import * as types from '../actions/action_types'

const initialState = {
  currentTerm: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.REQUEST_SEARCH:
      const currentTerm = action.payload
      return {...state, currentTerm: currentTerm, [currentTerm]: {
          data: [],

        }
      }
    case types.RECEIVE_SEARCH:
      action.payload.timestamp = Date.now()
      return {...state, [state.currentTerm]: action.payload}

    case types.RECEIVE_NEXT_PAGE:
      if (!action.payload.currentTerm) {
        return state
      } else {
          const currentTerm = action.payload.currentTerm
          const newArray = [...state[currentTerm].data, ...action.payload.data.data]
          const newPagination = action.payload.data.pagination
          return {...state, [currentTerm]: {
              data: newArray,
              pagination: newPagination
            }
          }
        }
    case types.SAME_SEARCH:
      return {...state, currentTerm: action.payload}

    case types.DELETE_KEY:
      let oldestTime = Date.now()
      let keyToDelete = null

      for (let key in state) {
        if (key === 'currentTerm') {
          continue
        }

        if (state[key].timestamp < oldestTime) {
          oldestTime = state[key].timestamp
          keyToDelete = key
        }
      }

      const newState = {...state}
      delete newState[keyToDelete]
      return newState

    default:
      return state
  }
}
