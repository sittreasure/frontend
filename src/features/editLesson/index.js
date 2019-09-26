import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { SideTab, Tab, Nav } from '../common'
import Content from './Content'

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

  render() {
    const { lessons, group, match } = this.props
    const lesson = lessons[match.params.index]
    if (lesson === undefined) {
      return null
    }
    const lessonGroup = group.filter(group => {
      return group.id === lesson.lessonGroup
    })[0]

    return (
      <Wrappper>
        <SideTab>
          <Link to="/editLessonList">
            <Tab>
              <Icon src={require('../../assets/images/book.png')} />
            </Tab>
          </Link>
        </SideTab>
        <Container>
          <Nav
            title={`${
              this.state.isEditorMode ? 'Edit' : 'Preview'
            } / ${lessonGroup && lessonGroup.name} - ${lesson.topic}`}
          />
          <Content
            group={lessonGroup}
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
  // dispatch: PropTypes.func,
  group: PropTypes.array,
  lessons: PropTypes.array,
  match: PropTypes.object,
}

const mapStateToProps = state => ({
  group: state.lessonStore.group,
  lessons: state.lessonStore.lessons,
})

export default connect(mapStateToProps)(EditLesson)
