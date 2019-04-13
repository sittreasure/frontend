import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import AceEditor from 'react-ace'
import 'brace/mode/java'
import 'brace/mode/jsp'
import 'brace/mode/html'
import 'brace/mode/css'
import 'brace/mode/javascript'
import 'brace/mode/xml'
import 'brace/mode/text'
import 'brace/theme/monokai'
import 'brace/ext/language_tools'

import { Styled, functions } from './utilities'
import PlaygroundActions from '../../redux/playgroundStore'
// import DirectoryActions from '../../redux/directoryStore'
import '../../assets/css/theme.css'

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
  cursor: pointer;
`

const Button = styled.img`
  width: 21px;
  height: 21px;
`

const TextEditor = styled.div`
  display: flex;
  flex: 0.8;
`

const findData = (parents, id) => {
  for (let i = 0; i < parents.length; i++) {
    const child = parents[i]
    if (child.id === id) {
      return child.data
    }
    else {
      if (child.isDir && id.search(child.id) !== -1) {
        return findData(child.data, id)
      }
    }
  }
}

class Editor extends Component {
  componentDidMount() {
    if (!this.props.jobName) {
      this.props.dispatch(PlaygroundActions.setName('playground'))
    }
  }

  componentDidUpdate() {
    console.log('>>> [Editor.js:84] this.props.isCompile : ', this.props.isCompile)
    if (this.props.isCompile) {
      this.checkCompile()
    }
    else {
      console.log('>>> [Editor.js:95] clear interval ')
      clearInterval(this.checkCompileId)
    }
  }

  renderMode(name) {
    const type = name
    switch (type) {
      case 'java':
      case 'jsp':
      case 'html':
      case 'css':
        return type
      case 'js':
        return 'javascript'
      case 'xml':
      case 'tld':
      case 'tag':
        return 'xml'
      default:
        return 'text'
    }
  }

  compile(event) {
    event.preventDefault()
    const name = this.props.jobName
    this.props.dispatch(PlaygroundActions.compile(name))
  }

  checkCompile() {
    const name = this.props.jobName
    this.checkCompileId = setInterval(
      () => {
        console.log('>>> [Editor.js:129] interval ')
        this.props.dispatch(PlaygroundActions.checkCompile(name))
      },
      5000
    )
    console.log('>>> [Editor.js:134] this.checkCompileId : ', this.checkCompileId)
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
            <ButtonWrapper onClick={e => this.compile(e)}>
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
                value={this.props.openFile.id
                  ? findData(this.props.directory, this.props.openFile.id) || 'loading...'
                  : ''
                }
                theme='monokai'
                fontSize={15}
                tabSize={2}
                width='100%'
                height='100%'
                setOptions={{
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: true,
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
  dispatch: PropTypes.func,
  openFile: PropTypes.object,
  jobName: PropTypes.string,
  isCompile: PropTypes.bool,
  directory: PropTypes.array,
}

const mapStateToProps = state => ({
  openFile: state.playgroundStore.open,
  jobName: state.playgroundStore.name,
  isCompile: state.playgroundStore.isCompile,
  directory: state.directoryStore.directory,
})

export default connect(mapStateToProps)(Editor)
