import React, { Component } from 'react'
import styled from 'styled-components'

import Label from './Label'

const DirectoryContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: #eee;
  height: 100%;
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
      <DirectoryContainer>
        {this.showLabel(this.state.data).map(data => data)}
      </DirectoryContainer>
    )
  }
}

export default Directory
