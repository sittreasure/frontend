import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import AceEditor from 'react-ace'
import 'brace/theme/monokai'
import 'brace/ext/language_tools'

import { Markdown } from '../common'
import LessonActions from '../../redux/lessonStore'

require('brace/mode/markdown')
require('brace/snippets/markdown')

const Container = styled.div`
  height: 100%;
  padding: 20px;
`

const Title = styled.div`
  display: inline-block;
  font-family: 'ThaiSans Neue';
  font-style: normal;
  font-weight: bold;
  font-size: 30px;
  line-height: 39px;
  color: #c4c4c4;
  background-color: #202020;
  padding: 6px 30px;
  box-sizing: border-box;
`

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #202020;
  height: calc(100% - 20px - 51px);
  padding-left: 30px;
  margin-top: 13px;
`

const DescriptionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 43px;
  border-bottom: 0.5px solid #272727;
`

const DescriptionTitle = styled.div`
  font-family: 'ThaiSans Neue';
  font-size: 18px;
  line-height: 21px;
  color: #61d0ff;
`

const ButtonContainer = styled.span`
  display: flex;
  height: 43px;
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

class Content extends Component {
  constructor(props) {
    super(props)
    this.state = {
      description: '',
    }
  }

  componentDidMount() {
    this.setState({
      description: this.props.lesson.description,
    })
  }

  render() {
    return (
      <Container>
        <Title>{`${this.props.group && this.props.group.name} - ${
          this.props.lesson.topic
        }`}</Title>
        <DescriptionContainer>
          <DescriptionHeader>
            <DescriptionTitle>
              ## {this.props.editorMode ? 'markdown' : 'preview'}
            </DescriptionTitle>
            <ButtonContainer>
              <ButtonWrapper onClick={() => this.props.switchMode()}>
                <Button
                  src={require(`../../assets/images/${
                    this.props.editorMode ? 'preview' : 'pen'
                  }.png`)}
                />
              </ButtonWrapper>
              <ButtonWrapper
                onClick={() =>
                  this.props.dispatch(
                    LessonActions.editLesson(
                      this.props.lesson.id,
                      this.state.description
                    )
                  )
                }
              >
                <Button src={require('../../assets/images/save.png')} />
              </ButtonWrapper>
            </ButtonContainer>
          </DescriptionHeader>
          {this.props.editorMode ? (
            <AceEditor
              mode="markdown"
              value={this.state.description}
              onChange={value =>
                this.setState({
                  description: value,
                })
              }
              theme="monokai"
              fontSize={15}
              tabSize={2}
              width="100%"
              height="100%"
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
              }}
              editorProps={{
                $blockScrolling: Infinity,
              }}
            />
          ) : (
            <Markdown data={this.state.description} />
          )}
        </DescriptionContainer>
      </Container>
    )
  }
}

Content.propTypes = {
  group: PropTypes.object,
  lesson: PropTypes.object,
  editorMode: PropTypes.bool,
  switchMode: PropTypes.func,
  dispatch: PropTypes.func,
}

export default Content
