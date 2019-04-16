import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'

import LabelGroup from './LabelGroup'
import Label from './Label'
import LabelFolder from './LabelFolder'
import DirectoryActions from '../../redux/directoryStore'

const DirectoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #141414;
  height: 100%;
  width: 297px;
  position: absolute;
  z-index: 10;
  top: 0px;
  left: ${props => props.show ? 53 : -350}px;
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
  componentDidMount() {
    this.props.dispatch(DirectoryActions.getMetadata('playground/'))
  }
  
  showLabel(data) {
    return (
      <Label
        key={data.id}
        id={data.id}
        name={data.name}
        data={data.data}
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
        id={data.id}
        name={data.name}
        insideSize={inside.length}
        dept={data.id.split('/').length - 1}
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
          {this.props.directory.map(data => {
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
  dispatch: PropTypes.func,
  directory: PropTypes.array,
}

const mapStateToProps = state => ({
  directory: state.directoryStore.directory,
})

export default connect(mapStateToProps)(Directory)
