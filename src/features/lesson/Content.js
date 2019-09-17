import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import ReactMarkdown from 'react-markdown'

import LessonActions from '../../redux/lessonStore'
import { ReactComponent as SkipIcon } from '../../assets/images/skip.svg'

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

const MarkdownContainer = styled.div`
  font-family: 'ThaiSans Neue';
  color: #c4c4c4;
  background-color: #202020;
  height: calc(100% - 20px - 51px - 29px - 40px);
  padding: 10px 30px;
  margin: 14px 0px;
  overflow: scroll;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`

const Button = styled.div`
  font-family: 'ThaiSans Neue';
  font-style: normal;
  font-weight: bold;
  font-size: 21px;
  line-height: 27px;
  border: 1px solid #61d0ff;
  box-sizing: border-box;
  border-radius: 3px;
  padding: 0px 22px;
  cursor: pointer;

  & svg {
    width: 12px;
    height: 12px;
  }
`

const BackButton = styled(Button)`
  color: #61d0ff;
  margin-right: 10px;

  & svg {
    margin-right: 8px;
    transform: scaleX(-1);
    & path {
      fill: #61d0ff;
    }
  }
`

const NextButton = styled(Button)`
  color: #272727;
  background-color: #61d0ff;

  & svg {
    margin-left: 8px;
  }
`

class Content extends Component {
  render() {
    const lesson = this.props.lessons.filter(lesson => {
      return lesson.id === this.props.currentLesson
    })[0]
    if (lesson === undefined) {
      return null
    }
    const group = this.props.group.filter(group => {
      return group.id === lesson.lessonGroup
    })[0]
    return (
      <Container>
        <Title>{`${group && group.name} - ${lesson.topic}`}</Title>
        <MarkdownContainer>
          <ReactMarkdown source={lesson.description} />
        </MarkdownContainer>
        <ButtonContainer>
          {lesson.index > 0 ? (
            <BackButton
              onClick={() => {
                const prevLesson = this.props.lessons[lesson.index - 1]
                this.props.dispatch(
                  LessonActions.setCurrentLesson(prevLesson.id)
                )
              }}
            >
              <SkipIcon />
              Previous lesson
            </BackButton>
          ) : null}
          <NextButton>
            Next lesson
            <SkipIcon />
          </NextButton>
        </ButtonContainer>
      </Container>
    )
  }
}

Content.propTypes = {
  dispatch: PropTypes.func,
  group: PropTypes.array,
  lessons: PropTypes.array,
  currentLesson: PropTypes.number,
}

const mapStateToProps = state => ({
  group: state.lessonStore.group,
  lessons: state.lessonStore.lessons,
  currentLesson: state.lessonStore.currentLesson,
})

export default connect(mapStateToProps)(Content)
