import * as types from '../actions/action_types'
import { APP_MODES } from '../utils/constants'

const initialState = {
  isLoading: false,
  mode: APP_MODES.TRENDING
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.REQUEST_TRENDING:
      return {...state, isLoading: true, mode: APP_MODES.TRENDING}
    case types.REQUEST_SEARCH:
      return {...state, isLoading: true, mode: APP_MODES.SEARCHING}

    case types.RECEIVE_TRENDING:
    case types.RECEIVE_SEARCH:
      return {...state, isLoading: false}

    default:
      return state
  }
}
