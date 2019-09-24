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
  position: relative;
  height: ${props => (props.show ? 'auto' : '27px')};
  overflow: hidden;
`

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 20px;
`

const Title = styled.div`
  display: flex;
  flex: 1;
  font-family: 'ThaiSans Neue';
  font-style: normal;
  font-weight: bold;
  font-size: 21px;
  line-height: 27px;
  color: #c4c4c4;
  cursor: pointer;
`

const Arrow = styled.img`
  width: 6px;
  height: 12px;
  transform: rotate(${props => (props.show ? 90 : 0)}deg);
`

class Group extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: true,
    }
  }

  render() {
    return (
      <Container show={this.state.show} className="transition">
        <TitleContainer
          onClick={() => {
            this.setState({
              show: !this.state.show,
            })
          }}
        >
          <Title>{this.props.title}</Title>
          <Arrow
            src={require('../../assets/images/next.png')}
            show={this.state.show}
            className="transition"
          />
        </TitleContainer>
        {this.props.lessons &&
          this.props.lessons.map(lesson => {
            if (
              !(
                this.props.show ||
                this.props.nextLessonIndex === lesson.index ||
                this.props.learnedLesson.includes(lesson.id)
              )
            ) {
              return
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
  learnedLesson: PropTypes.array,
  currentLesson: PropTypes.number,
  nextLessonIndex: PropTypes.number,
  show: PropTypes.bool,
}

export default Group
