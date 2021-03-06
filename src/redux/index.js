import { combineReducers } from 'redux'

import createStore from './createStore'
import rootSaga from '../sagas'

const createRedux = () => {
  const rootReducer = combineReducers({
    directoryStore: require('./directoryStore').reducer,
    playgroundStore: require('./playgroundStore').reducer,
    userStore: require('./userStore').reducer,
    lessonStore: require('./lessonStore').reducer,
    adminStore: require('./adminStore').reducer,
  })

  return createStore(rootReducer, rootSaga)
}

export default createRedux
