import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import Playground from './features/playground'
import Login from './features/login'

class App extends Component {
  render() {
    return (
      <Router>
        <Route path='/' exact render={() => <Redirect to='/login' />} />
        <Route path='/playground' exact component={Playground} />
        <Route path='/login' exact component={Login} />
      </Router>
    )
  }
}

export default App
