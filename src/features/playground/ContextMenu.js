import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'

import DirectoryActions from '../../redux/directoryStore'

const Background = styled.div`
  display: ${props => props.show ? 'block' : 'none'};
  position: absolute;
  z-index: 200;
  width: 100%;
  height: 100%;
  background-color: transparent;
  cursor: pointer;
`

const Container = styled.div`
  display: ${props => props.show ? 'block' : 'none'};
  position: absolute;
  left: ${props => `${props.x}px`};
  top: ${props => props.isOverflow ? 'auto' : `${props.y}px`};
  bottom: ${props => props.isOverflow ? `${props.y}px` : 'auto'};
  z-index: 201;
  background-color: #FFF;
`

const Option = styled.div`
  width: 100%;
  height: auto;
  cursor: pointer;
`

class ContextMenu extends Component {
  closeContextMenu(event) {
    event.preventDefault()
    this.props.dispatch(DirectoryActions.setContextMenu(false, 0, 0, false))
  }

  openFileType(event) {
    this.closeContextMenu(event)
    this.changeId()
    this.props.dispatch(DirectoryActions.setContextMenuFileType(true))
  }

  openRemove(event) {
    this.closeContextMenu(event)
    this.props.dispatch(DirectoryActions.setContextMenuRemove(true))
  }

  changeId() {
    let { id } = this.props.contextMenu
    if (id.search('.') !== -1) {
      id = id.split('/')
      id[id.length - 1] = ''
      id = id.join('/')
    }
    this.props.dispatch(DirectoryActions.setContextMenuId(id))
  }

  render() {
    const { show, x, y, overflow } = this.props.contextMenu
    return (
      <Fragment>
        <Background
          show={show}
          onClick={e => this.closeContextMenu(e)}
        />
        <Container
          show={show}
          x={x}
          y={y}
          isOverflow={overflow}
        >
          <Option>New Folder</Option>
          <Option onClick={e => this.openFileType(e)}>New File</Option>
          <Option onClick={e => this.openRemove(e)}>Remove</Option>
        </Container>
      </Fragment>
    )
  }
}

ContextMenu.propTypes = {
  dispatch: PropTypes.func,
  contextMenu: PropTypes.object,
}

const mapStateToProps = state => ({
  contextMenu: state.directoryStore.contextMenu,
})

export default connect(mapStateToProps)(ContextMenu)
