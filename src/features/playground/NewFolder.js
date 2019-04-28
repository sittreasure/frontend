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

const InputContainer = styled.div`
  display: flex;
  flex: 1;
`

const NameContainer = styled.div`
  display: flex;
  color:  #fff;
  width: 100%;
`

const Name = styled.input`
  width: 100%;
  &:invalid {
    color: #fff;
    background-color: #f00;
  }
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`

const Button = styled.button`
  cursor: pointer;
`

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
    this.props.dispatch(DirectoryActions.addFolder(id, folder))
    this.close(event)
  }

  render() {
    const { showNewFolder } = this.props.contextMenu
    return (
      <Fragment>
        <Styled.OverlayBackground show={showNewFolder} />
        <Wrapper show={showNewFolder}>
          <Container>
            <InputContainer>
              <NameContainer>
                Name:
                <Name
                  value={this.state.name}
                  onChange={e => this.setName(e)}
                  pattern='^[a-zA-Z][0-9a-zA-Z-_]*'
                />
              </NameContainer>
            </InputContainer>
            <ButtonContainer>
              <Button onClick={e => this.close(e)}>No</Button>
              <Button
                disabled={!this.state.valid}
                onClick={e => this.create(e)}
              >
                Yes
              </Button>
            </ButtonContainer>
          </Container>
        </Wrapper>
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
