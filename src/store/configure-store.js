import rootReducer from '../reducers/index'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

const initialState = {}
let middlewares = [thunk]

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(logger)
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...middlewares)))

export default store
