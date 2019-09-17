import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'

import Group from './Group'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #141414;
  height: 100%;
  width: 297px;
  position: absolute;
  z-index: 10;
  top: 0px;
  left: ${props => (props.show ? 53 : -350)}px;
`

const Title = styled.div`
  font-family: 'ThaiSans Neue';
  font-style: normal;
  font-weight: bold;
  font-size: 23px;
  line-height: normal;
  color: #61d0ff;
  margin: 12px 0 0 17px;
  cursor: default;
`

class LessonList extends Component {
  renderGroup() {
    const groups = []
    if (this.props.currentLesson) {
      const currentLesson = this.props.lessons.filter(lesson => {
        const { learned } = this.props
        return lesson.id === learned[learned.length - 1]
      })[0]
      if (this.props.lessons.length !== 0) {
        this.props.group.map(group => {
          const lessons = this.props.lessons.filter(lesson => {
            return lesson.lessonGroup === group.id
          })
          const temp = {
            lessons,
            groupId: lessons[0].lessonGroup,
          }
          lessons.reduce((accumulator, currentValue) => {
            const learned = this.props.learned.indexOf(currentValue.id)
            accumulator = accumulator || learned !== -1
            temp.show = accumulator
          }, false)

          temp.hasNaxtLesson =
            lessons.filter(lesson => {
              return lesson.index === currentLesson.index + 1
            }).length !== 0
          groups.push(temp)
        })
      }
      return groups.map((group, index) => {
        const titleIndex = this.props.group.findIndex(
          g => g.id === group.groupId
        )
        const title = this.props.group[titleIndex].name
        if (!(group.show || group.hasNaxtLesson)) {
          return null
        }
        return (
          <Group
            title={title}
            lessons={group.lessons}
            currentLesson={this.props.currentLesson}
            nextLessonIndex={currentLesson.index + 1}
            show={group.show}
            key={index}
          />
        )
      })
    }
  }

  render() {
    return (
      <Container show={this.props.show} className="transition">
        <Title>All Lessons</Title>
        {this.renderGroup()}
      </Container>
    )
  }
}

LessonList.propTypes = {
  show: PropTypes.bool,
  group: PropTypes.array,
  lessons: PropTypes.array,
  learned: PropTypes.array,
  currentLesson: PropTypes.number,
}

const mapStateToProps = state => ({
  show: state.lessonStore.openList,
  group: state.lessonStore.group,
  lessons: state.lessonStore.lessons,
  learned: state.lessonStore.learned,
  currentLesson: state.lessonStore.currentLesson,
})

export default connect(mapStateToProps)(LessonList)
