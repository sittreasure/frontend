import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { Styled } from '../playground/utils'
import LessonActions from '../../redux/lessonStore'
import BannerImg from '../../assets/images/banner-lesson.png'

const Text = styled(Styled.Title)`
  font-size: 22px;
  line-height: 29px;
`

const Container = styled.div`
  display: flex;
  margin-top: 10px;
  flex: 1;
  justify-content: space-between;
`

const Banner = styled.div`
  width: 150px;
  height: 90px;
  background-image: url(${BannerImg});
  background-size: cover;
  margin-right: 17px;
`

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`

const Lesson = styled.div`
  font-family: 'ThaiSans Neue';
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 22px;
  color: #c4c4c4;
`

const Create = styled.div`
  font-family: 'ThaiSans Neue';
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 18px;
  color: #5d5d5d;
`

class Remove extends Component {
  close(event) {
    event.preventDefault()
    this.props.toggleShowRemove()
  }

  remove(event) {
    this.props.dispatch(LessonActions.deleteLesson(this.props.lesson.id))
    this.close(event)
  }

  render() {
    const { groups, lesson, showRemove } = this.props
    let group
    if (lesson) {
      group = groups.filter(group => {
        return group.id === lesson.lessonGroup
      })[0]
    }

    return (
      <Fragment>
        <Styled.OverlayBackground show={showRemove} />
        <Styled.PopupContainer show={showRemove}>
          <Styled.PopupBox width="500px">
            <Styled.PopupHeader>Remove Lesson</Styled.PopupHeader>
            <Styled.PopupBody>
              <Text>Are you sure you want to remove this lesson?</Text>
              <Container>
                <Banner />
                <Wrapper>
                  <Lesson>
                    {group && group.name}
                    <br />
                    {lesson && lesson.topic}
                  </Lesson>
                  <Create>
                    Created by:{' '}
                    {lesson && lesson.admin ? lesson.admin.name : '-'}
                  </Create>
                </Wrapper>
              </Container>
            </Styled.PopupBody>
            <Styled.PopupFooter>
              <Styled.Button onClick={e => this.close(e)} />
              <Styled.Button onClick={e => this.remove(e)} yes />
            </Styled.PopupFooter>
          </Styled.PopupBox>
        </Styled.PopupContainer>
      </Fragment>
    )
  }
}

Remove.propTypes = {
  dispatch: PropTypes.func,
  showRemove: PropTypes.bool,
  toggleShowRemove: PropTypes.func,
  lesson: PropTypes.object,
  groups: PropTypes.array,
}

export default connect()(Remove)
