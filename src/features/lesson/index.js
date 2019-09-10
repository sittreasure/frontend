import React, { Component } from 'react'
import styled from 'styled-components'

import { SideTab, Tab, Nav } from '../common'

const Wrappper = styled.div`
  display: flex;
  flex: 1;
  background-color: #272727;
  overflow: hidden;
`

const Icon = styled.img`
  width: 26px;
  height: 26px;
`

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
  padding: 0px 9px;
`

class Lesson extends Component {
  render() {
    return (
      <Wrappper>
        <SideTab>
          <Tab>
            <Icon src={require('../../assets/images/book.png')} />
          </Tab>
          <Tab>
            <Icon src={require('../../assets/images/trophy.png')} />
          </Tab>
        </SideTab>
        <Container>
          <Nav title="Lesson" />
        </Container>
      </Wrappper>
    )
  }
}

export default Lesson
