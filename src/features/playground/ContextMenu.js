import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'

import DirectoryActions from '../../redux/directoryStore'
import { Styled } from './utilities'

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
  width: 150px;
  height: auto;
  background-color: #1B1B1B;

  position: absolute;
  left: ${props => `${props.x}px`};
  top: ${props => props.isOverflow ? 'auto' : `${props.y}px`};
  bottom: ${props => props.isOverflow ? `${props.y}px` : 'auto'};
  z-index: 201;
`

const Option = styled(Styled.Title)`
  width: 100px;
  height: 28px;
  line-height: 27px;
  padding-left: 50px;
  padding-top: 4px;
  padding-bottom: 4px;
  cursor: pointer;
`

class ContextMenu extends Component {
  closeContextMenu(event) {
    event.preventDefault()
    this.props.dispatch(DirectoryActions.setContextMenu(false, 0, 0, false))
  }

  openNewFolder(event) {
    this.closeContextMenu(event)
    this.changeId()
    this.props.dispatch(DirectoryActions.toggleContextMenuNewFolder())
  }

  openNewFile(event) {
    this.closeContextMenu(event)
    this.changeId()
    this.props.dispatch(DirectoryActions.toggleContextMenuNewFile())
  }

  openRemove(event) {
    this.closeContextMenu(event)
    this.props.dispatch(DirectoryActions.toggleContextMenuRemove())
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
    const { show, x, y, overflow, isDir } = this.props.contextMenu
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
          <Option onClick={e => this.openNewFolder(e)}>New Folder</Option>
          <Option onClick={e => this.openNewFile(e)}>New File</Option>
          {!isDir
            ? (
              <Option onClick={e => this.openRemove(e)}>Remove</Option>
            )
            : ''
          }
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
