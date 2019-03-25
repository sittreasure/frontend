import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Styled, functions } from './utilities'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: ${props => props.show ? 'auto' : '40px'};
  overflow: hidden;
`

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  padding-top: 2px;
  padding-bottom: 2px;
`

class LabelFolder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
    }
  }
  
  render() {
    return (
      <Container show={this.state.show} className="transition">
        <TitleWrapper>
          <Styled.Idel dept={this.props.dept || 1} />
          <Styled.TitleWrapper onClick={e => functions.toggleShow(e, this)}>
            <Styled.Icon src={require('../../assets/images/folder.png')} />
            <Styled.Title>{this.props.name}</Styled.Title>
          </Styled.TitleWrapper>
        </TitleWrapper>
        {this.props.children}
      </Container>
    )
  }
}

LabelFolder.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
  ]),
  name: PropTypes.string,
  dept: PropTypes.number,
}

export default LabelFolder
