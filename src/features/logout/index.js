import React, { Component } from 'react'
import { Redirect } from 'react-router'

import { accessToken } from '../../utils'

class Logout extends Component {
  componentDidMount() {
    accessToken.removeToken()
  }
  render() {
    return <Redirect to="/" />
  }
}

export default Logout
