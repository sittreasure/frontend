import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { SideTab, Tab, Nav } from '../common'
import LessonList from './LessonList'
import Content from './Content'
import LessonActions from '../../redux/lessonStore'

const Wrappper = styled.div`
  display: flex;
  flex: 1;
  background-color: #272727;
  overflow: hidden;
`

const Icon = styled.img`
  width: 26px;
  height: 26px;
`

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
  padding: 0px 9px;
`

class Lesson extends Component {
  componentDidMount() {
    const { dispatch, currentLesson, lessons } = this.props
    dispatch(LessonActions.getLessonGroup())
    dispatch(LessonActions.getLesson())
    dispatch(LessonActions.getLessonLearning())
    if (currentLesson === undefined) {
      dispatch(LessonActions.learnLesson(lessons[0].id))
    }
  }

  render() {
    return (
      <Wrappper>
        <SideTab>
          <Tab
            onClick={e => {
              e.preventDefault()
              this.props.dispatch(LessonActions.toggleLessonList())
            }}
          >
            <Icon src={require('../../assets/images/book.png')} />
          </Tab>
          <Tab>
            <Icon src={require('../../assets/images/trophy.png')} />
          </Tab>
        </SideTab>
        <Container>
          <LessonList />
          <Nav title="Lesson" />
          <Content />
        </Container>
      </Wrappper>
    )
  }
}

Lesson.propTypes = {
  dispatch: PropTypes.func,
  lessons: PropTypes.array,
  currentLesson: PropTypes.number,
}

const mapStateToProps = state => ({
  lessons: state.lessonStore.lessons,
  currentLesson: state.lessonStore.currentLesson,
})

export default connect(mapStateToProps)(Lesson)
