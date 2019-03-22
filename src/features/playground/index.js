import React, { Component } from 'react'
import styled from 'styled-components'

import { SideTab } from '../../utilities'
// import Directory from './Directory'

const Container = styled.div`
  background-color: #272727;
  width: 100%;
  height: 100%;
`

class Playground extends Component {
  render() {
    return (
      <Container>
        <SideTab />
      </Container>
    )
  }
}

export default Playground
