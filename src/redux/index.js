import { combineReducers } from 'redux'

import createStore from './createStore'
import rootSaga from '../sagas'

const createRedux = () => {
  const rootReducer = combineReducers({
    directory: require('./directoryStore').reducer,
  })

  return createStore(rootReducer, rootSaga)
}

export default createRedux
