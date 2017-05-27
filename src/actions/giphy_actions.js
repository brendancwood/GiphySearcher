import api, { PUBLIC_KEY } from '../utils/api'
import * as types from './action_types'
import axios from 'axios'

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

export function searchGiphy(term) {
  return dispatch => {
    dispatch(requestSearch(term))
    return api.instance.get(api.prepareUrl(api.urls.search, term)).then(response => {
      dispatch(receiveSearch(response.data))
    })
  }
}

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


const uploadingGif = () => {
  return {
    type: types.UPLOADING_GIF
  }
}

const uploadSuccess = () => {
  return {
    type: types.UPLOAD_SUCCESS
  }
}

export function uploadGif(file) {
  const data = {
    // 'username': 'brendancwood87',
    file: file.name,
    api_key: PUBLIC_KEY,
    tags: 'cat,pink,catbrush'
  }

  // const config = {
  //   // withCredentials: true,
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //       'Access-Control-Allow-Credentials': true,
  //       'Access-Control-Allow-Headers': 'Content-Type, Accept, x-requested-with, cache-control',
  //       'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  //       'Access-Control-Allow-Origin': '*'
  //   }
  // }
  return dispatch => {
    dispatch(uploadingGif())
    return axios.post(api.urls.upload, data).then(response => {
      dispatch(uploadSuccess(response.data))
    })
    .catch(response => {
      console.log('failed')
    })
  }
}
