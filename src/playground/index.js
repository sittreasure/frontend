import React, { Component } from 'react'
import styled from 'styled-components'

const Container = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
`

class Playground extends Component {
  render() {
    return (
      <Container>Welcome to Playground Page</Container>
    )
  }
}

export default Playground
