import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

const create = (rootReducer, rootSaga) => {
  const sagaMiddleware = createSagaMiddleware()
  const middleware = applyMiddleware(sagaMiddleware)
  const store = createStore(
    rootReducer,
    middleware
  )
  sagaMiddleware.run(rootSaga)
  return store
}

export default create
