import api, { PUBLIC_KEY } from '../utils/api'
import * as types from './action_types'
import axios from 'axios'
import { SEARCH_LIMIT } from '../utils/constants'


// SEARCHING
const receiveSearch = (data) => {
  return {
    type: types.RECEIVE_SEARCH,
    payload: data
  }
}

const requestSearch = (term) => {
  return {
    type: types.REQUEST_SEARCH,
    payload: term
  }
}


const sameSearch = (term) => {
  return {
    type: types.SAME_SEARCH,
    payload: term
  }
}

function deleteKey() {
  return {
    type: types.DELETE_KEY
  }
}


export function searchGiphy(term) {

  return (dispatch, getState) => {
    const store = getState()
    if (store.search[term] != null) {
      dispatch(sameSearch(term))
      return
    }

    if (Object.keys(store.search).length > SEARCH_LIMIT) {
      dispatch(deleteKey())
    }

    dispatch(requestSearch(term))
    return api.instance.get(api.prepareUrl(api.urls.search, term)).then(response => {
      dispatch(receiveSearch(response.data))
    })
  }
}

// TRENDING
const receiveTrending = (data) => {
  return {
    type: types.RECEIVE_TRENDING,
    payload: data
  }
}

const requestTrending = () => {
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

// UPLOADING
export const uploadReset = () => {
  return {
    type: types.UPLOAD_RESET
  }
}

const uploadingGif = () => {
  return {
    type: types.UPLOADING_GIF
  }
}

const uploadSuccess = (data) => {
  return {
    type: types.UPLOAD_SUCCESS,
    payload: data
  }
}

const uploadFailed = (data) => {
  return {
    type: types.UPLOAD_FAILED,
    payload: data
  }
}

export function uploadGif(file) {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('api_key', PUBLIC_KEY)

  return dispatch => {
    dispatch(uploadingGif())
    return axios.post(api.urls.upload, formData)
    .then(response => {
      if (response.data.meta.status === 200) {
        dispatch(uploadSuccess(response.data))
      } else {
        dispatch(uploadFailed(response.data))
      }
    })
  }
}


// PAGINATION
export function receiveNextPage(currentTerm, data) {
  return {
    type: types.RECEIVE_NEXT_PAGE,
    payload: {
      currentTerm,
      data
    }
  }
}

export function getNextPage(currentTerm, paginationData) {
  let querystring = `&offset=${paginationData.offset+10}`
  return dispatch => {
    if (!currentTerm) {
      return api.instance.get(api.prepareUrl(api.urls.trending, querystring)).then(response => {
        dispatch(receiveNextPage(currentTerm, response.data))
      })
    } else {
      querystring = currentTerm + querystring
      return api.instance.get(api.prepareUrl(api.urls.search, querystring)).then(response => {
        dispatch(receiveNextPage(currentTerm, response.data))
      })
    }
  }
}
