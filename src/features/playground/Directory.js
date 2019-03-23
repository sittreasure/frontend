import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Label from './Label'

const DirectoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #141414;
  height: 100%;
  width: 297px;
  position: relative;
  z-index: 10;
  top: 0px;
  left: ${props => props.show ? -9 : -359}px;
`

class Directory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [
        {
          id: 'Sample.java',
          objectName: 'Sample.java',
          isDir: false,
          data: null,
        },
        {
          id: 'dir',
          objectName: 'dir',
          isDir: true,
          data: [
            {
              id: 'dir/Sample.java',
              objectName: 'Sample.java',
              isDir: false,
              data: null,
            },
          ],
        },
      ],
    }
  }
  
  showLabel(data) {
    let result = []
    for (let i = 0; i < data.length; i++) {      
      let element = (
        <Label
          key={data[i].id}
          name={data[i].objectName}
          isDir={data[i].isDir}
          dept={data[i].id.split('/').length}
        />
      )
      result.push(element)
      if (data[i].isDir) {
        let element = this.showLabel(data[i].data)
        result = [...result, ...element]
      }
    }
    return result
  }
  
  render() {
    return (
      <DirectoryContainer show={this.props.show} className="transition">
        {this.showLabel(this.state.data).map(data => data)}
      </DirectoryContainer>
    )
  }
}

Directory.propTypes = {
  show: PropTypes.bool,
}

export default Directory
