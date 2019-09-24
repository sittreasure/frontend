import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Login from './features'
import Home from './features/home'
import Playground from './features/playground'
import Lesson from './features/lesson'
import EditLesson from './features/editLesson'
import Logout from './features/logout'
class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={Login} />
        <Route path="/home" exact component={Home} />
        <Route path="/playground" exact component={Playground} />
        <Route path="/lesson" exact component={Lesson} />
        <Route path="/editLesson" exact component={EditLesson} />
        <Route path="/logout" exact component={Logout} />
      </Router>
    )
  }
}

export default App
