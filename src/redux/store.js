import logger from 'redux-logger'
import {createStore,applyMiddleware} from 'redux'

import reducer from './reducer.js'

const middleware = applyMiddleware(logger())
export default createStore(reducer,middleware);