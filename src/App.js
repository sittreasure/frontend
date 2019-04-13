import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import Playground from './features/playground'

class App extends Component {
  render() {
    return (
      <Router>
        <Route path='/' exact render={() => <Redirect to='/playground' />} />
        <Route path='/playground' exact component={Playground} />
      </Router>
    )
  }
}

export default App
