import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { Styled } from './utilities'
import DirectoryActions from '../../redux/directoryStore'
import PlaygroundActions from '../../redux/playgroundStore'

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

const TypeContainer = styled.div`
  display: flex;
  flex: 1;
  flex-wrap: wrap;
`

const Type = styled.div`
  display: flex;
  width: 125px;
  height: 70px;
  color: #fff;
  background-color: #f00;
  opacity: ${props => props.choose ? 1 : 0.5 };
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`

const Button = styled.button`
  cursor: pointer;
`

class FileType extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      type: null,
      valid: false,
    }
  }

  setName(event) {
    const value = event.target.value
    let valid = false
    if (this.state.type) {
      valid = this.checkValid(value, this.state.type.regularExpression)
    }
    this.setState({
      name: value,
      valid,
    })
  }

  setType(event, type) {
    event.preventDefault()
    const valid = this.checkValid(this.state.name, type.regularExpression)
    this.setState({
      type,
      valid,
    })
  }

  checkValid(name, pattern) {
    let valid = true
    if (name.match(pattern) === null) {
      valid = false
    }
    return valid
  }

  close(event) {
    event.preventDefault()
    this.props.dispatch(DirectoryActions.setContextMenuFileType(false))
    this.setState({
      name: '',
      type: null,
      valid: false,
    })
  }

  create(event) {
    event.preventDefault()
    const { id } = this.props.contextMenu
    const name = `${this.state.name}.${this.state.type.fileType}`
    let data = this.state.type.initialCode.replace(/\${name}/g, this.state.name)
    const newline = String.fromCharCode(13, 10)
    const tab = String.fromCharCode(9)
    data = data.replace(/\\n/g, newline)
    data = data.replace(/\\t/g, tab)
    const file = {
      id: id + name,
      name,
      data,
      save: false,
    }
    this.props.dispatch(DirectoryActions.addFile(id, file))
    this.props.dispatch(PlaygroundActions.setOpen(id + name))
    this.props.dispatch(PlaygroundActions.toggleDirectory())
    this.close(event)
  }

  render() {
    const { showFileType } = this.props.contextMenu
    return (
      <Fragment>
        <Styled.OverlayBackground show={showFileType} />
        <Wrapper show={showFileType}>
          <Container>
            <InputContainer>
              <NameContainer>
                Name:
                <Name
                  value={this.state.name}
                  onChange={e => this.setName(e)}
                  pattern={this.state.type ? this.state.type.regularExpression : '^[a-zA-Z][0-9a-zA-Z-_]*'}
                />
              </NameContainer>
            </InputContainer>
            <TypeContainer>
              {this.props.fileType.map(type => (
                <Type
                  choose={this.state.type && this.state.type.id === type.id}
                  key={type.id}
                  onClick={e => this.setType(e, type)}
                >
                  {type.name}
                </Type>
              ))}
            </TypeContainer>
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

FileType.propTypes = {
  dispatch: PropTypes.func,
  fileType: PropTypes.array,
  contextMenu: PropTypes.object,
}

const mapStateToProps = state => ({
  fileType: state.directoryStore.fileType,
  contextMenu: state.directoryStore.contextMenu,
})

export default connect(mapStateToProps)(FileType)
