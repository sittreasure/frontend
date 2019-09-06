import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Login from './features'
import Home from './features/home'
import Playground from './features/playground'

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={Login} />
        <Route path="/home" exact component={Home} />
        <Route path="/playground" exact component={Playground} />
      </Router>
    )
  }
}

export default App
