import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { Styled } from './utilities'
import DirectoryActions from '../../redux/directoryStore'

const Wrapper = styled.div`
  display: ${props => props.show ? 'flex' : 'none'};
  flex: 1;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 201;
  width: 100%;
  height: 100%;
  background-color: transparent;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 200px;
  background-color: #000;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`

const Button = styled.button`
  cursor: pointer;
`

class Remove extends Component {
  close(event) {
    event.preventDefault()
    this.props.dispatch(DirectoryActions.setContextMenuRemove(false))
  }

  remove(event) {
    const { id } = this.props.contextMenu
    this.props.dispatch(DirectoryActions.removeData(id))
    this.close(event)
  }

  render() {
    const { showRemove } = this.props.contextMenu
    return (
      <Fragment>
        <Styled.OverlayBackground show={showRemove} />
        <Wrapper show={showRemove}>
          <Container>
            <ButtonContainer>
              <Button onClick={e => this.close(e)}>No</Button>
              <Button onClick={e => this.remove(e)}>Yes</Button>
            </ButtonContainer>
          </Container>
        </Wrapper>
      </Fragment>
    )
  }
}

Remove.propTypes = {
  dispatch: PropTypes.func,
  contextMenu: PropTypes.object,
}

const mapStateToProps = state => ({
  contextMenu: state.directoryStore.contextMenu,
})

export default connect(mapStateToProps)(Remove)
