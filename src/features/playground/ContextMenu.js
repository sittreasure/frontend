import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'

import DirectoryActions from '../../redux/directoryStore'

const Background = styled.div`
  display: ${props => props.isOpen ? 'block' : 'none'};
  position: absolute;
  z-index: 200;
  width: 100%;
  height: 100%;
  background-color: transparent;
  cursor: pointer;
`

const Container = styled.div`
  display: ${props => props.isOpen ? 'block' : 'none'};
  position: absolute;
  left: ${props => `${props.x}px`};
  top: ${props => props.overflow ? 'auto' : `${props.y}px`};
  bottom: ${props => props.overflow ? `${props.y}px` : 'auto'};
  z-index: 200;
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
    this.props.dispatch(DirectoryActions.setContextMenu(false, 0, 0))
  }

  render() {
    const { isOpen, x, y, overflow } = this.props.contextMenu
    return (
      <Fragment>
        <Background
          isOpen={isOpen}
          onClick={e => this.closeContextMenu(e)}
        />
        <Container
          isOpen={isOpen}
          x={x}
          y={y}
          overflow={overflow}
        >
          <Option>New Folder</Option>
          <Option>New File</Option>
          <Option>Remove</Option>
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
