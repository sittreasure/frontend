import React, { Component } from 'react'
import styled from 'styled-components'
import FacebookLogin from 'react-facebook-login'
import { Redirect } from 'react-router'

const Container = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      success: false,
    }
  }

  facebookCallback(result) {
    console.log('>>> [index.js:14] result : ', result)
    this.setState({
      success: true,
    })
  }

  render() {
    return (
      <Container>
        <FacebookLogin
          appId={process.env.REACT_APP_FACEBOOK_ID}
          scope="public_profile, email"
          fields="name, email, picture.type(normal)"
          icon="fa-facebook"
          callback={response => this.facebookCallback(response)}
        />
        {this.state.success
          ? <Redirect to='/playground' />
          : null
        }
      </Container>
    )
  }
}

export default Login
