import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Styled, functions } from './utilities'

const Container = styled.div`
  width: 100%;
  height: ${props => props.show ? props.height : '28px'};
  margin-top: 2px;
  overflow: hidden;
`

const TitleWrapper = styled.div`
  display: flex;
  cursor: pointer;
  height: 28px;
`

const ArrowWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 42px;
`

const Arrow = styled.img`
  width: 6px;
  height: 12px;
  transform: rotate(${props => props.show ? 90 : 0 }deg);
`

const ContentContainer = styled.div`
  padding-top: 5px;
`

class LabelGroup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
    }
  }

  render() {
    return (
      <Container
        show={this.state.show}
        height={this.props.height}
        className="transition"
      >
        <TitleWrapper onClick={e => functions.toggleShow(e, this)}>
          <ArrowWrapper>
            <Arrow
              src={require('../../assets/images/next.png')}
              show={this.state.show}
              className="transition"
            />
          </ArrowWrapper>
          <Styled.Title>{this.props.title}</Styled.Title>
        </TitleWrapper>
        <ContentContainer>
          {this.props.children}
        </ContentContainer>
      </Container>
    )
  }
}

LabelGroup.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
  ]),
  title: PropTypes.string,
  height: PropTypes.string,
}

export default LabelGroup
