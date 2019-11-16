import React, { Component } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import FacebookLogin from "react-facebook-login"
import { Redirect } from "react-router"
import { connect } from "react-redux"

import UserActions from "../redux/userStore"
import DirectoryActions from "../redux/directoryStore"
import { accessToken } from "../utils"

import LogoImg from "../assets/images/logo-for-main.png"

const Container = styled.div`
  width: 100%;
  height: 100%;
`

const Banner = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${props => props.image});
  background-size: cover;
`

const Navbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  position: fixed;
  top: 0;
  padding: 10px 90px;
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 0.5);
`

const Logo = styled.img`
  width: auto;
  height: 80px;
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
    const [firstname, lastname] = name.split(" ")
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
        <Banner image={require("../assets/images/banner/home.jpg")} />
        <Banner image={require("../assets/images/banner/home2.jpg")} />
        <Banner image={require("../assets/images/banner/home3.jpg")} />
        <Banner image={require("../assets/images/banner/home4.jpg")} />
        <Banner image={require("../assets/images/banner/home5.jpg")} />
        <Navbar>
          <Logo src={LogoImg} />
          <FacebookLogin
            appId={process.env.REACT_APP_FACEBOOK_ID}
            scope="public_profile, email"
            fields="name, email, picture.type(normal)"
            icon="fa-facebook"
            callback={response => this.facebookCallback(response)}
            size="small"
          />
        </Navbar>
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
