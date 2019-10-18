import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import App from './App'
import reduxStore from './redux'
import './assets/css/font.css'
import './assets/css/styles.css'
import 'antd/dist/antd.css'

const store = reduxStore()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
)
