import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div`
  height: 100%;
  width: 53px;
  background-color: #141414;
  padding: 0px;
  margin: 0px;
`

class SideTab extends Component {
  render() {
    return (
      <Container>
        {this.props.children}
      </Container>
    )
  }
}

SideTab.propTypes = {
  children: PropTypes.element,
}

export default SideTab
