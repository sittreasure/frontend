import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Styled } from './utilities'

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 36px;
  padding-top: 2px;
  padding-bottom: 2px;
`

class Label extends Component {

  renderIcon(name) {
    name = name.split('.')
    const type = name[name.length - 1]
    switch (type) {
      case 'java':
        return require('../../assets/images/java.png')
      default:
        return require('../../assets/images/dropdown.png')
    }
  }

  render() {
    return (
      <Container>
        <Styled.Idel dept={this.props.dept || 1} />
        <Styled.TitleWrapper>
          <Styled.Icon src={this.renderIcon(this.props.name)} />
          <Styled.Title>{this.props.name}</Styled.Title>
        </Styled.TitleWrapper>
      </Container>
    )
  }
}

Label.propTypes = {
  name: PropTypes.string,
  dept: PropTypes.number,
}

export default Label
