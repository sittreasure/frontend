import React, { Component } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Link } from "react-router-dom"

import LogoImg from "../../assets/images/logo.png"

const Container = styled.div`
  height: 100%;
  width: 53px;
  background-color: #141414;
  padding: 0px;
  margin: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 100;
`

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  margin-top: 9px;
`

const Logo = styled.img`
  height: auto;
  width: 40px;
`

class SideTab extends Component {
  render() {
    return (
      <Container>
        <Link to="/home">
          <LogoContainer>
            <Logo src={LogoImg} />
          </LogoContainer>
        </Link>
        {this.props.children}
      </Container>
    )
  }
}

SideTab.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
}

export default SideTab
