import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import LabelGroup from './LabelGroup'
import Label from './Label'
import LabelFolder from './LabelFolder'

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

const Title = styled.div`
  font-family: "ThaiSans Neue";
  font-style: normal;
  font-weight: bold;
  font-size: 23px;
  line-height: normal;
  color: #61D0FF;
  margin-top: 12px;
  margin-left: 17px;
  cursor: default;
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
              id: 'dir/dir2',
              objectName: 'dir2',
              isDir: true,
              data: [
                {
                  id: 'dir/dir2/Sample.java',
                  objectName: 'Sample.java',
                  isDir: false,
                  data: null,
                },
              ],
            },
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
    return (
      <Label
        key={data.id}
        name={data.objectName}
        dept={data.id.split('/').length}
      />
    )
  }

  showLabelFolder(data) {
    let children = []
    let inside = data.data
    let element
    inside.map(data => {
      if (data.isDir) {
        element = this.showLabelFolder(data)
      }
      else {
        element = this.showLabel(data)
      }
      children = [...children, element]
    })
    return (
      <LabelFolder
        key={data.id}
        name={data.objectName}
        dept={data.id.split('/').length}
      >
        {children.map(data => data)}
      </LabelFolder>
    )
  }
  
  render() {
    return (
      <DirectoryContainer show={this.props.show} className="transition">
        <Title>File Editor</Title>
        <LabelGroup title="Open Tabs" height="30%" />
        <LabelGroup title="Files" height="100%">
          {this.state.data.map(data => {
            if(data.isDir) {
              return this.showLabelFolder(data)
            }
            return this.showLabel(data)
          })}
        </LabelGroup>
      </DirectoryContainer>
    )
  }
}

Directory.propTypes = {
  show: PropTypes.bool,
}

export default Directory
