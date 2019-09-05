import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 47px;
  margin-bottom: 9px;
`

const Title = styled.div`
  display: flex;
  align-items: center;
  width: auto;
  height: 100%;
  font-family: "ThaiSans Neue";
  font-style: normal;
  font-weight: bold;
  font-size: 21px;
  line-height: normal;
  color: #C4C4C4;
  background-color: #141414;
  padding: 0px 17px;
`

class Nav extends Component {
  render() {
    return (
      <Container>
        <Title>{this.props.title}</Title>
      </Container>
    )
  }
}

Nav.propTypes = {
  title: PropTypes.string,
}

export default Nav
