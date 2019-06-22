import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Styled } from './utils'
import DirectoryActions from '../../redux/directoryStore'

class NewFolder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      valid: false,
    }
  }

  setName(event) {
    const value = event.target.value
    let valid = value.match('^[a-zA-Z][0-9a-zA-Z-_]*') !== null
    this.setState({
      name: value,
      valid,
    })
  }

  close(event) {
    event.preventDefault()
    this.props.dispatch(DirectoryActions.toggleContextMenuNewFolder())
    this.setState({
      name: '',
      valid: false,
    })
  }

  create(event) {
    const { id } = this.props.contextMenu
    let { name } = this.state
    name = `${name}/`
    const folder = {
      id: `${id}${name}`,
      name: name,
      data: [],
      isDir: true,
    }
    this.props.dispatch(DirectoryActions.addFile(id, folder))
    this.close(event)
  }

  render() {
    const { showNewFolder } = this.props.contextMenu
    return (
      <Fragment>
        <Styled.OverlayBackground show={showNewFolder} />
        <Styled.PopupContainer show={showNewFolder}>
          <Styled.PopupBox width='494px'>
            <Styled.PopupHeader>Create Folder</Styled.PopupHeader>
            <Styled.PopupBody>
              <Styled.NameContainer>
                <Styled.Label>Name:</Styled.Label>
                <Styled.InputContainer>
                  <Styled.Input
                    value={this.state.name}
                    onChange={e => this.setName(e)}
                    pattern='^[a-zA-Z][0-9a-zA-Z-_]*'
                    placeholder='folder name'
                  />
                  <Styled.InputError>Please start with letter (A-Z or a-z) and next with letter (A-Z or a-z) or number (0-9) or symbol (- _)</Styled.InputError>
                </Styled.InputContainer>
              </Styled.NameContainer>
            </Styled.PopupBody>
            <Styled.PopupFooter>
              <Styled.Button onClick={e => this.close(e)} />
              <Styled.Button
                disabled={!this.state.valid}
                onClick={e => this.create(e)}
                yes
              />
            </Styled.PopupFooter>
          </Styled.PopupBox>
        </Styled.PopupContainer>
      </Fragment>
    )
  }
}

NewFolder.propTypes = {
  dispatch: PropTypes.func,
  contextMenu: PropTypes.object,
}

const mapStateToProps = state => ({
  contextMenu: state.directoryStore.contextMenu,
})

export default connect(mapStateToProps)(NewFolder)
