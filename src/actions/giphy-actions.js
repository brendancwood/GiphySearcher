import api from '../utils/api'
import * as types from './action-types'

export const receiveSearch = (data) => {
  return {
    type: types.RECEIVE_SEARCH,
    payload: data
  }
}

export const requestSearch = (term) => {
  return {
    type: types.REQUEST_SEARCH,
    term
  }
}


export function searchGiphy(term) {
  return dispatch => {
    dispatch(requestSearch(term))
    return api.instance.get(api.prepareUrl(api.urls.search, term)).then(response => {
      dispatch(receiveSearch(response.data))
    })
  }
}

export const receiveTrending = (data) => {
  return {
    type: types.RECEIVE_TRENDING,
    payload: data
  }
}


export const requestTrending = () => {
  return {
    type: types.REQUEST_TRENDING,
  }
}

export function getTrending() {
  return dispatch => {
    dispatch(requestTrending())
    return api.instance.get(api.prepareUrl(api.urls.trending)).then(response => {
      dispatch(receiveTrending(response.data))
    })
  }
}
