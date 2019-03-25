import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  align-items: center;
  align-self: flex-start;
  height: 36px;

  padding-top: 2px;
  padding-bottom: 2px;
`

const Idel = styled.div`
  width: ${props => (props.dept * 17) + 17}px;
  height: 1px;
`

const TitleWrapper = styled.div`
  display: flex;
  cursor: pointer;
`

const Icon = styled.img`
  width: 17px;
  height: 19px;
  margin-right: 10px;
`

const Title = styled.div`
  font-family: "ThaiSans Neue";
  font-style: normal;
  font-weight: bold;
  font-size: 21px;
  line-height: normal;
  color: #C4C4C4;
`

class Label extends Component {
  render() {
    return (
      <Container>
        <Idel dept={this.props.dept || 1} />
        <TitleWrapper>
          <Icon src={require('../../assets/images/java.png')} />
          <Title>{this.props.name}</Title>
        </TitleWrapper>
      </Container>
    )
  }
}

Label.propTypes = {
  name: PropTypes.string,
  // isDir: PropTypes.bool,
  dept: PropTypes.number,
}

export default Label
