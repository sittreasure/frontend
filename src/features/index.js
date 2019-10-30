import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import FacebookLogin from 'react-facebook-login'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import { Carousel } from 'antd'

import UserActions from '../redux/userStore'
import DirectoryActions from '../redux/directoryStore'
import { accessToken } from '../utils'

const Container = styled.div`
  width: 100%;
  height: 100%;

  .ant-carousel .slick-slide {
    overflow: hidden;
    height: 100vh;
  }

  .ant-carousel .slick-slide div {
    height: 100vh;
  }
`

const Banner = styled.div`
  background-image: url(${props => props.image});
  background-size: cover;
`

const ButtonContainer = styled.div`
  position: absolute;
  top: 40px;
  right: 145px;
  box-sizing: border-box;
`

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      success: false,
    }
  }

  componentDidMount() {
    this.checkAuth()
  }

  componentDidUpdate() {
    this.checkAuth()
  }

  facebookCallback(result) {
    const {
      id,
      name,
      picture: {
        data: { url },
      },
    } = result
    const idInt = parseInt(id)
    const [firstname, lastname] = name.split(' ')
    this.props.dispatch(
      UserActions.loginFacebook(idInt, firstname, lastname, url)
    )
    setTimeout(() => {
      this.props.dispatch(UserActions.me())
      this.checkAuth()
    }, 500)
  }

  checkAuth() {
    if (accessToken.getToken()) {
      if (!this.props.hasBucket) {
        this.props.dispatch(DirectoryActions.createBucket())
      }
      this.setState({
        success: true,
      })
    }
  }

  render() {
    return (
      <Container>
        <Carousel autoplay autoplaySpeed={1000}>
          <Banner image={require('../assets/images/banner/home1.svg')} />
          <Banner image={require('../assets/images/banner/home2.svg')} />
          <Banner image={require('../assets/images/banner/home3.svg')} />
          <Banner image={require('../assets/images/banner/home4.svg')} />
          <Banner image={require('../assets/images/banner/home5.svg')} />
        </Carousel>
        <ButtonContainer>
          <FacebookLogin
            appId={process.env.REACT_APP_FACEBOOK_ID}
            scope="public_profile, email"
            fields="name, email, picture.type(normal)"
            icon="fa-facebook"
            callback={response => this.facebookCallback(response)}
            size="small"
          />
        </ButtonContainer>
        {this.state.success ? <Redirect to="/home" /> : null}
      </Container>
    )
  }
}

Login.propTypes = {
  dispatch: PropTypes.func,
  hasBucket: PropTypes.bool,
}

const mapStateToProps = state => ({
  hasBucket: state.directoryStore.hasBucket,
})

export default connect(mapStateToProps)(Login)
