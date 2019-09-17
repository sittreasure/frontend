import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'

import LessonActions from '../../redux/lessonStore'

const Title = styled.div`
  font-family: 'ThaiSans Neue';
  font-style: normal;
  font-weight: bold;
  font-size: 21px;
  line-height: 27px;
  color: ${props =>
    props.isCurrentLesson
      ? '#61D0FF'
      : props.isNextLesson
      ? '#2F2F2F'
      : '#c4c4c4'};
  padding-left: 17px;
  margin-top: 5px;
  cursor: ${props => (props.isNextLesson ? 'not-allowed' : 'pointer')};
`

class Label extends Component {
  render() {
    return (
      <Title
        learned={this.props.learned}
        isCurrentLesson={this.props.isCurrentLesson}
        isNextLesson={this.props.isNextLesson}
        onClick={() => {
          if (this.props.isNextLesson) {
            return
          }
          this.props.dispatch(
            LessonActions.setCurrentLesson(this.props.lessonId)
          )
          this.props.dispatch(LessonActions.toggleLessonList())
        }}
      >
        - {this.props.title}
      </Title>
    )
  }
}

Label.propTypes = {
  dispatch: PropTypes.func,
  lessonId: PropTypes.number,
  title: PropTypes.string,
  learned: PropTypes.bool,
  isCurrentLesson: PropTypes.bool,
  isNextLesson: PropTypes.bool,
}

export default connect()(Label)
