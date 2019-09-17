import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Label from './Label'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 17px;
  margin: 5px 0;
  cursor: pointer;
`

const Title = styled.div`
  font-family: 'ThaiSans Neue';
  font-style: normal;
  font-weight: bold;
  font-size: 21px;
  line-height: 27px;
  color: #c4c4c4;
  cursor: pointer;
`

class Group extends Component {
  render() {
    return (
      <Container>
        <Title>{this.props.title}</Title>
        {this.props.lessons &&
          this.props.lessons.map(lesson => {
            if (
              !(this.props.show || this.props.nextLessonIndex === lesson.index)
            ) {
              return null
            }
            return (
              <Label
                lessonId={lesson.id}
                title={lesson.topic}
                isCurrentLesson={this.props.currentLesson === lesson.id}
                isNextLesson={this.props.nextLessonIndex === lesson.index}
                key={lesson.id}
              />
            )
          })}
      </Container>
    )
  }
}

Group.propTypes = {
  title: PropTypes.string,
  lessons: PropTypes.array,
  currentLesson: PropTypes.number,
  nextLessonIndex: PropTypes.number,
  show: PropTypes.bool,
}

export default Group
