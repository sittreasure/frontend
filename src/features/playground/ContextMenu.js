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
  cursor: ${props => props.disable ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disable ? 0.5 : 1};
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

  cutFile(event) {
    const { isDir } = this.props.contextMenu
    if (!isDir) {
      this.closeContextMenu(event)
      this.props.dispatch(DirectoryActions.setContextMenuCut(this.props.contextMenu.id))
    }
  }

  pasteFile(event) {
    const { contextMenu: { cut }, directory } = this.props
    if (cut) {
      this.closeContextMenu(event)
      const paste = this.changeId()
      const file = { ...this.findFile(directory, cut) }
      const remove = file.id
      file.id = paste + file.name
      file.save = false
      this.props.dispatch(DirectoryActions.addFile(paste, file))
      this.props.dispatch(DirectoryActions.setContextMenuCut(null))
      this.props.dispatch(DirectoryActions.removeData(remove))
    }
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
    return id
  }

  findFile(parents, id) {
    for (let i = 0; i < parents.length; i++) {
      const child = parents[i]
      if (child.id === id) {
        return child
      }
      else {
        if (child.isDir && id.search(child.id) !== -1) {
          return this.findFile(child.data, id)
        }
      }
    }
  }

  render() {
    const { show, x, y, overflow, isDir, cut } = this.props.contextMenu
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
          <Option
            onClick={e => this.cutFile(e)}
            disable={isDir}
          >
            Cut
          </Option>
          <Option
            onClick={e => this.pasteFile(e)}
            disable={!cut}
          >
            Paste
          </Option>
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
  directory: PropTypes.array,
}

const mapStateToProps = state => ({
  contextMenu: state.directoryStore.contextMenu,
  directory: state.directoryStore.directory,
})

export default connect(mapStateToProps)(ContextMenu)
