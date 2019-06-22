import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { Styled } from './utils'
import DirectoryActions from '../../redux/directoryStore'

const Content = styled(Styled.Title)`
  font-size: 22px;
  line-height: 29px;
`

class Remove extends Component {
  close(event) {
    event.preventDefault()
    this.props.dispatch(DirectoryActions.toggleContextMenuRemove())
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
        <Styled.PopupContainer show={showRemove}>
          <Styled.PopupBox width='355px'>
            <Styled.PopupHeader>Remove File</Styled.PopupHeader>
            <Styled.PopupBody>
              <Content>Do you want to remove this file?</Content>
            </Styled.PopupBody>
            <Styled.PopupFooter>
              <Styled.Button onClick={e => this.close(e)} />
              <Styled.Button
                onClick={e => this.remove(e)}
                yes
              />
            </Styled.PopupFooter>
          </Styled.PopupBox>
        </Styled.PopupContainer>
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
