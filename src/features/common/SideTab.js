import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

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

const Logo = styled.div`
  height: 40px;
  width: 40px;
  background-color: #c4c4c4;
  margin-top: 9px;
`

class SideTab extends Component {
  render() {
    return (
      <Container>
        <Link to="/home">
          <Logo />
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
