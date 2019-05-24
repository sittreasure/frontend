import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { Styled } from './utilities'
import DirectoryActions from '../../redux/directoryStore'
import PlaygroundActions from '../../redux/playgroundStore'

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-wrap: wrap;
`

const FileType = styled.i`
  display: flex;
  width: 203px;
  height: 70px;
  color: #fff;
  cursor: pointer;
  margin: 0px ${props => props.center ? 22 : 0}px;
  margin-top: ${props => props.firstRow ? 15 : 27}px;
  background-image: url(${props => props.choose ? props.iconColor : props.icon});
  background-size: cover;
  background-repeat: no-repeat;

  &:hover {
    background-image: url(${props => props.iconColor});
  }
`

class NewFile extends Component {
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
    this.props.dispatch(DirectoryActions.toggleContextMenuNewFile())
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

  renderError() {
    const { regularExpression } = this.state.type
    if (regularExpression === '^[A-Z][0-9A-Za-z]*') {
      return 'Please start with capital letter (A-Z) and next with letter (A-Z or a-z) or number (0-9)'
    }
    else {
      return 'Please start with letter (A-Z or a-z) and next with letter (A-Z or a-z) or number (0-9) or symbol (- _)'
    }
  }

  render() {
    const { showNewFile } = this.props.contextMenu
    return (
      <Fragment>
        <Styled.OverlayBackground show={showNewFile} />
        <Styled.PopupContainer show={showNewFile}>
          <Styled.PopupBox width='687px'>
            <Styled.PopupHeader>Create File</Styled.PopupHeader>
            <Styled.PopupBody>
              <Styled.NameContainer>
                <Styled.Label>Name:</Styled.Label>
                <Styled.InputContainer>
                  <Styled.Input
                    value={this.state.name}
                    onChange={e => this.setName(e)}
                    pattern={this.state.type ? this.state.type.regularExpression : '^[a-zA-Z][0-9a-zA-Z-_]*'}
                    placeholder='file name'
                  />
                  <Styled.InputError>{this.state.type ? this.renderError() : ''}</Styled.InputError>
                </Styled.InputContainer>
              </Styled.NameContainer>
              <Container>
                {this.props.fileType.map((type, index) => (
                  <FileType
                    key={type.id}
                    onClick={e => this.setType(e, type)}
                    choose={this.state.type && this.state.type.id === type.id}
                    firstRow={index === 0 || index === 1 || index === 2}
                    center={index % 3 === 1}
                    icon={require(`../../assets/images/newfile/${type.name.replace(' ', '').toLowerCase()}-unclick.png`)}
                    iconColor={require(`../../assets/images/newfile/${type.name.replace(' ', '').toLowerCase()}.png`)}
                  />
                ))}
              </Container>
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

NewFile.propTypes = {
  dispatch: PropTypes.func,
  fileType: PropTypes.array,
  contextMenu: PropTypes.object,
}

const mapStateToProps = state => ({
  fileType: state.directoryStore.fileType,
  contextMenu: state.directoryStore.contextMenu,
})

export default connect(mapStateToProps)(NewFile)
