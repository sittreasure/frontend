import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'

const create = (rootReducer, rootSaga) => {
  const sagaMiddleware = createSagaMiddleware()
  const middleware = applyMiddleware(sagaMiddleware)
  const composeDevTools = composeWithDevTools(middleware)
  const store = createStore(
    rootReducer,
    composeDevTools
  )
  sagaMiddleware.run(rootSaga)
  return store
}

export default create
