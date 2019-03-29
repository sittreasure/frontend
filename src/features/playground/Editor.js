import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import AceEditor from 'react-ace'
import 'brace/mode/xml'
import 'brace/snippets/xml'
import 'brace/ext/language_tools'

import { Styled, functions } from './utilities'

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: #1B1B1B;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 46px;
`

const Name = styled.div`
  display: flex;
  align-items: center;
  width: auto;
  height: 100%;
  background-color: #1F1F1F;
  padding: 0px 17px;
`

const ButtonContainer = styled.div`
  display: flex;
  width: auto;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 43px;
  height: 100%;
`

const Button = styled.img`
  width: 21px;
  height: 21px;
`

const TextEditor = styled.div`
  display: flex;
  flex: 0.8;
`

class Editor extends Component {
  renderMode(name) {
    const type = name
    switch (type) {
      case 'java':
        return 'java'
      case 'html':
        return 'html'
      case 'css':
        return 'css'
      case 'xml':
        return 'xml'
      default:
        return 'text'
    }
  }

  render() {
    return (
      <Container>
        <Header>
          {this.props.openFile.id
            ? (
              <Name>
                <Styled.Icon src={functions.showIcon(this.props.openFile.name)} />
                <Styled.Title>{this.props.openFile.name}</Styled.Title>
              </Name>
            )
            : <div />
          }
          <ButtonContainer>
            <ButtonWrapper>
              <Button src={require('../../assets/images/preview.png')} />
            </ButtonWrapper>
            <ButtonWrapper>
              <Button src={require('../../assets/images/save.png')} />
            </ButtonWrapper>
            <ButtonWrapper>
              <Button src={require('../../assets/images/play.png')} />
            </ButtonWrapper>
            <ButtonWrapper>
              <Button src={require('../../assets/images/download.png')} />
            </ButtonWrapper>
          </ButtonContainer>
        </Header>
        <TextEditor>
          {this.props.openFile.id
            ? (
              <AceEditor
                mode={this.renderMode(this.props.openFile.name.split('.')[1])}
                fontSize={15}
                tabSize={2}
                width='100%'
                height='100%'
                setOptions={{
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: true,
                  enableSnippets: true,
                }}
              />
            )
            : ''
          }
        </TextEditor>
      </Container>
    )
  }
}

Editor.propTypes = {
  // dispatch: PropTypes.func,
  openFile: PropTypes.object,
  // directory: PropTypes.array,
}

const mapStateToProps = state => ({
  openFile: state.playgroundStore.open,
  directory: state.directoryStore.directory,
})

export default connect(mapStateToProps)(Editor)
