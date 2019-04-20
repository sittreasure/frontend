import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'

import PlaygroundActions from '../../redux/playgroundStore'
import { SideTab, Tab, Nav } from '../../utilities'
import Directory from './Directory'
import Editor from './Editor'
import ContextMenu from './ContextMenu'

const Wrappper = styled.div`
  display: flex;
  flex: 1;
  background-color: #272727;
  overflow: hidden;
`

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
  padding: 0px 9px;
`

const Icon = styled.img`
  width: 26px;
  height: 26px;
`

class Playground extends Component {
  render() {
    return (
      <Wrappper>
        <SideTab>
          <Tab>
            <Icon src={require('../../assets/images/info.png')} />
          </Tab>
          <Tab onClick={e => {
            e.preventDefault()
            this.props.dispatch(PlaygroundActions.toggleDirectory())
          }}>
            <Icon src={require('../../assets/images/folder.png')} />
          </Tab>
        </SideTab>
        <Container>
          <Directory show={this.props.directory} />
          <Nav title="Playground" />
          <Editor />
        </Container>
        <ContextMenu />
      </Wrappper>
    )
  }
}

Playground.propTypes = {
  dispatch: PropTypes.func,
  directory: PropTypes.bool,
}

const mapStateToProps = state => ({
  directory: state.playgroundStore.directory,
})

export default connect(mapStateToProps)(Playground)
