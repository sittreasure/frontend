import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 310px;
  height: 180px;
  border-radius: 10px;
  background-image: url(${props => props.bg});
  background-size: cover;
  position: relative;
  padding: 23px 30px;
`

const Title = styled.div`
  font-family: 'ThaiSans Neue';
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 18px;
  color: #fff;
`

const Value = styled.div`
  font-family: 'ThaiSans Neue';
  font-style: normal;
  font-weight: 800;
  font-size: 55px;
  line-height: 70px;
  color: #fff;
`

const Icon = styled.div`
  width: 82px;
  height: 82px;
  background-image: url(${props => props.icon});
  background-size: cover;
  position: absolute;
  top: 49px;
  right: 23px;
`

class Card extends Component {
  render() {
    return (
      <Container bg={this.props.bg}>
        <Title>{this.props.title}</Title>
        <Value>{this.props.value}</Value>
        <Icon icon={this.props.icon} />
      </Container>
    )
  }
}

Card.propTypes = {
  bg: PropTypes.any,
  icon: PropTypes.any,
  title: PropTypes.string,
  value: PropTypes.number,
}

export default Card
