import React, { Component } from 'react'
import styled from 'styled-components'

import { SideTab, Tab } from '../../utilities'
import Directory from './Directory'

const Wrappper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  width: 100%;
  height: 100%;
  background-color: #272727;
  overflow: hidden;
`

const Container = styled.div`
  padding: 0px 9px;
`

const Icon = styled.img`
  width: 26px;
  height: 26px;
`

class Playground extends Component {
  constructor(props) {
    super(props)
    this.state = {
      directory: false,
    }
  }

  toggleDirectory(event) {
    event.preventDefault()
    this.setState({
      directory: !this.state.directory,
    })
  }

  render() {
    return (
      <Wrappper>
        <SideTab>
          <Tab>
            <Icon src={require('../../assets/images/info.png')} />
          </Tab>
          <Tab onClick={e => this.toggleDirectory(e)}>
            <Icon src={require('../../assets/images/folder.png')} />
          </Tab>
        </SideTab>
        <Container>
          <Directory show={this.state.directory} />
        </Container>
      </Wrappper>
    )
  }
}

export default Playground
