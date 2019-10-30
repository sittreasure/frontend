import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Login from './features'
import Home from './features/home'
import Playground from './features/playground'
import Lesson from './features/lesson'
import EditUser from './features/editUser'
import EditLessonList from './features/editLessonList'
import EditLesson from './features/editLesson'
import Logout from './features/logout'
import ComingSoon from './features/notices/ComingSoon'

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={Login} />
        <Route path="/home" exact component={Home} />
        <Route path="/playground" exact component={Playground} />
        <Route path="/lesson" exact component={Lesson} />
        <Route path="/editUser" exact component={EditUser} />
        <Route path="/editLessonList" exact component={EditLessonList} />
        <Route path="/editLesson/:index" exact component={EditLesson} />
        <Route path="/logout" exact component={Logout} />
        <Route path="/comingsoon" exact component={ComingSoon} />
      </Router>
    )
  }
}

export default App
