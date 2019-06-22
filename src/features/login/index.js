import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import FacebookLogin from 'react-facebook-login'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'

import LoginActions from '../../redux/loginStore'
import { accessToken } from '../../utils'

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
    const { id, name, picture: { data: { url } } } = result
    const idInt = parseInt(id)
    const [firstname, lastname] = name.split(' ')
    this.props.dispatch(LoginActions.loginFacebook(idInt, firstname, lastname, url))
    if (accessToken.getToken()) {
      this.setState({
        success: true,
      })
    }
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

Login.propTypes = {
  dispatch: PropTypes.func,
}

export default connect()(Login)
