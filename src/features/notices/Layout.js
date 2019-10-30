import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import Back from '../../assets/images/notice/back.png'

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url(${require('../../assets/images/notice/bg.jpg')});
  background-size: cover;
`

const Title = styled.div`
  font-family: 'ThaiSans Neue';
  font-style: normal;
  font-weight: 800;
  font-size: 80px;
  line-height: 104px;
  color: #61d0ff;
`

const Description = styled.div`
  font-family: 'ThaiSans Neue';
  font-style: normal;
  font-weight: normal;
  font-size: 25px;
  line-height: 32px;
  color: #c4c4c4;
  width: 486px;
  text-align: center;
`

const BackIcon = styled.img`
  width: 12px;
  height: 12px;
  margin-right: 10px;
`

const Button = styled.div`
  font-family: 'ThaiSans Neue';
  font-style: normal;
  font-weight: bold;
  font-size: 21px;
  line-height: 27px;
  color: #61d0ff;
  border: 1px solid #61d0ff;
  box-sizing: border-box;
  border-radius: 3px;
  cursor: pointer;
  margin-top: 13px;
  padding: 0 10px;
`

class Layout extends Component {
  render() {
    return (
      <Container>
        {this.props.icon}
        <Title>{this.props.title}</Title>
        <Description>{this.props.description}</Description>
        <Link to="/">
          <Button>
            <BackIcon src={Back} />
            Back to main menu
          </Button>
        </Link>
      </Container>
    )
  }
}

Layout.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  icon: PropTypes.element,
}

export default Layout
