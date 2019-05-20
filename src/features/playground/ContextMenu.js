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
  padding-top: 7px;

  position: absolute;
  left: ${props => `${props.x}px`};
  top: ${props => props.isOverflow ? 'auto' : `${props.y}px`};
  bottom: ${props => props.isOverflow ? `${props.y}px` : 'auto'};
  z-index: 201;
`

const Option = styled(Styled.Title)`
  width: 100%;
  height: 28px;
  font-size: 18px;
  line-height: 23px;
  padding: 4px 0px;
  border-top: ${props => props.splitter ? 1 : 0}px solid #483D3D;
  cursor: ${props => props.disable ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disable ? 0.5 : 1};

  &:hover {
    background-color: #393939;
    color: ${props => props.disable
      ? '#C4C4C4'
      : props.remove ? '#EC172C' : '#61D0FF'
    };
  }
`

const Icon = styled.i`
  display: inline-block;
  width: 13px;
  height: 15px;
  margin: 0px 17px;
  background-image: url(${props => props.icon});
  background-repeat: no-repeat;

  ${Option}:hover & {
    background-image: url(${props => props.disable ? props.icon : props.iconColor});
  }
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
    const { isDir } = this.props.contextMenu
    if (!isDir) {
      this.closeContextMenu(event)
      this.props.dispatch(DirectoryActions.toggleContextMenuRemove())
    }
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
          <Option onClick={e => this.openNewFolder(e)}>
            <Icon
              icon={require('../../assets/images/context/folder.png')}
              iconColor={require('../../assets/images/context/folder-color.png')}
            />
            New Folder
          </Option>
          <Option onClick={e => this.openNewFile(e)}>
            <Icon
              icon={require('../../assets/images/context/file.png')}
              iconColor={require('../../assets/images/context/file-color.png')}
            />
            New File
          </Option>
          <Option
            onClick={e => this.cutFile(e)}
            disable={isDir}
            splitter
          >
            <Icon
              icon={require('../../assets/images/context/cut.png')}
              iconColor={require('../../assets/images/context/cut-color.png')}
              disable={isDir}
            />
            Cut
          </Option>
          <Option
            onClick={e => this.pasteFile(e)}
            disable={!cut}
          >
            <Icon
              icon={require('../../assets/images/context/paste.png')}
              iconColor={require('../../assets/images/context/paste-color.png')}
              disable={!cut}
            />
            Paste
          </Option>
          <Option
            onClick={e => this.openRemove(e)}
            disable={isDir}
            splitter
            remove
          >
            <Icon
              icon={require('../../assets/images/context/remove.png')}
              iconColor={require('../../assets/images/context/remove-color.png')}
              disable={isDir}
            />
            Remove
          </Option>
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
