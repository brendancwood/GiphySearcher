import axios from 'axios'

export const PUBLIC_KEY = 'dc6zaTOxFJmzC'

class API {
  constructor() {
    this.instance = axios.create({
      baseURL: 'http://api.giphy.com/v1/gifs',
      timeout: 100000,
    })

    this.urls = {
      'search': 'search?q=',
      'trending': 'trending?',
      'upload'  : 'http://upload.giphy.com/v1/gifs'
    }
  }

  prepareUrl(urlType, queryString='') {
    queryString += `&api_key=${ PUBLIC_KEY }`
    queryString = `${encodeURI(queryString)}`
    return urlType + queryString
  }
}

const api = new API()

export default api
