import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { SideTab, Tab, Nav } from '../common'
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

class EditLesson extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditorMode: true,
    }
  }

  switchMode() {
    this.setState({
      isEditorMode: !this.state.isEditorMode,
    })
  }

  componentDidMount() {
    this.props.dispatch(LessonActions.getLessonGroup())
    this.props.dispatch(LessonActions.getLesson())
  }

  render() {
    const lesson = this.props.lessons[0]
    if (lesson === undefined) {
      return null
    }
    const group = this.props.group.filter(group => {
      return group.id === lesson.lessonGroup
    })[0]
    return (
      <Wrappper>
        <SideTab>
          <Tab>
            <Icon src={require('../../assets/images/book.png')} />
          </Tab>
        </SideTab>
        <Container>
          <Nav
            title={`${this.state.isEditorMode ? 'Edit' : 'Preview'} / ${group &&
              group.name} - ${lesson.topic}`}
          />
          <Content
            group={group}
            lesson={lesson}
            editorMode={this.state.isEditorMode}
            switchMode={() => this.switchMode()}
          />
        </Container>
      </Wrappper>
    )
  }
}

EditLesson.propTypes = {
  dispatch: PropTypes.func,
  group: PropTypes.array,
  lessons: PropTypes.array,
}

const mapStateToProps = state => ({
  group: state.lessonStore.group,
  lessons: state.lessonStore.lessons,
})

export default connect(mapStateToProps)(EditLesson)
