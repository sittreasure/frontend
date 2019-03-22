import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const LabelContainer = styled.div`
  padding-top: 2px;
  padding-bottom: 2px;
  padding-left: ${props => props.dept * 20}px

  &:hover {
    background-color: #fff;
  }
`

class Label extends Component {
  render() {
    return (
      <LabelContainer dept={this.props.dept || 1}>
        <div>{this.props.name}</div>
      </LabelContainer>
    )
  }
}

Label.propTypes = {
  name: PropTypes.string,
  // isDir: PropTypes.bool,
  dept: PropTypes.number,
}

export default Label
