import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Playground from './features/playground'
import Login from './features'

class App extends Component {
  render() {
    return (
      <Router>
        <Route path='/' exact component={Login} />
        <Route path='/playground' exact component={Playground} />
      </Router>
    )
  }
}

export default App
