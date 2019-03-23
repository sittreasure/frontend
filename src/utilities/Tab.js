import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 57px;
  width: 57px;
  cursor: pointer;
`

class Tab extends Component {
  render() {
    return (
      <Container onClick={this.props.onClick}>
        {this.props.children}
      </Container>
    )
  }
}

Tab.propTypes = {
  children: PropTypes.element,
  onClick: PropTypes.func,
}

export default Tab
