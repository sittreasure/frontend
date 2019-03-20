import React, { Component } from 'react'
// import styled from 'styled-components'
import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex'

import Directory from './Directory'

class Playground extends Component {
  render() {
    return (
      <ReflexContainer orientation="vertical">
        <ReflexElement
          className="left-pane"
          flex={0.2}
        >
          <Directory />
        </ReflexElement>
        <ReflexSplitter />
        <ReflexElement
          className="right-pane"
          flex={0.8}
        >
          <div className="pane-content">
            Right Pane (resizeable)
          </div>
        </ReflexElement>
      </ReflexContainer>
    )
  }
}

export default Playground
