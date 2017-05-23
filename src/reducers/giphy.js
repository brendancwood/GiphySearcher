import * as types from '../actions/action-types'

const initialState = {
  isLoading: false,
  gifs: {
    isSearching: false,
    trending: {
      offset: 0,
      data: []
    },
    search: {
      currentTerm: null
    }
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.REQUEST_TRENDING:
      return {...state, isLoading: true}
    case types.RECEIVE_TRENDING:
      return {...state, gifs: {...state.gifs, trending: action.payload}}
    default:
      return state
  }
}
