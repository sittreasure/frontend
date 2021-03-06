import React, { Component } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { connect } from "react-redux"

import { Nav } from "../common"
import Card from "./Card"
import Remove from "./Remove"
import LessonActions from "../../redux/lessonStore"

const Wrappper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: #1b1b1b;
  overflow: hidden;
`

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0px 180px;
`

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const Header = styled.h1`
  font-family: "ThaiSans Neue";
  font-style: normal;
  font-weight: bold;
  font-size: 50px;
  line-height: 65px;
  color: #c4c4c4;
`

const LessonContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  overflow: scroll;
  overflow-y: auto;
  max-height: 700px;
`

class EditLessonList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showRemove: false,
      select: null,
    }
  }

  componentDidMount() {
    this.props.dispatch(LessonActions.getLessonGroup())
    this.props.dispatch(LessonActions.getLesson())
  }

  toggleShowRemove() {
    this.setState({
      showRemove: !this.state.showRemove,
    })
  }

  selectLesson(lesson) {
    this.setState({
      select: lesson,
    })
    this.toggleShowRemove()
  }

  render() {
    return (
      <Wrappper>
        <Nav title="Edit Lesson" />
        <Container>
          <HeaderContainer>
            <Header>Select Lesson</Header>
          </HeaderContainer>
          <LessonContainer>
            {this.props.lessons.map((lesson, index) => {
              const group = this.props.group.filter(group => {
                return group.id === lesson.lessonGroup
              })[0]
              return (
                <Card
                  key={index}
                  lesson={lesson}
                  group={group}
                  selectLesson={lesson => this.selectLesson(lesson)}
                />
              )
            })}
          </LessonContainer>
        </Container>
        <Remove
          showRemove={this.state.showRemove}
          toggleShowRemove={() => this.toggleShowRemove()}
          lesson={this.state.select}
          groups={this.props.group}
        />
      </Wrappper>
    )
  }
}

EditLessonList.propTypes = {
  dispatch: PropTypes.func,
  group: PropTypes.array,
  lessons: PropTypes.array,
}

const mapStateToProps = state => ({
  group: state.lessonStore.group,
  lessons: state.lessonStore.lessons,
})

export default connect(mapStateToProps)(EditLessonList)
