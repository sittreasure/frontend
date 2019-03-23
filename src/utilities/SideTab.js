import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div`
  height: 100%;
  width: 53px;
  background-color: #141414;
  padding: 0px;
  margin: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 999;
`

const Logo = styled.div`
  height: 40px;
  width: 40px;
  background-color: #C4C4C4;
  margin-top: 9px;
`

class SideTab extends Component {
  render() {
    return (
      <Container>
        <Logo />
        {this.props.children}
      </Container>
    )
  }
}

SideTab.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
  ]),
}

export default SideTab
