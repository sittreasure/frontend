import React, { Component } from 'react'
import styled from 'styled-components'

const DirectoryContainer = styled.div`
  display: flex;
  flex: 1;
  background-color: #eee;
  height: 100%;
`

class Directory extends Component {
  render() {
    return (
      <DirectoryContainer />
    )
  }
}

export default Directory
