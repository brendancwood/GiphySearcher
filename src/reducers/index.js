import app_state from './app_state.js'
import search from './search.js'
import trending from './trending.js'
import uploads from './uploads.js'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
  app_state,
  search,
  trending,
  uploads
})

export default rootReducer
