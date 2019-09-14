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
    this.props.dispatch(LessonActions.getLessonGroup())
    this.props.dispatch(LessonActions.getLesson())
    this.props.dispatch(LessonActions.getLessonLearning())
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
}

export default connect()(Lesson)
