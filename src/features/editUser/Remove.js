import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { Styled } from '../playground/utils'
// import LessonActions from '../../redux/lessonStore'

const Text = styled(Styled.Title)`
  font-size: 22px;
  line-height: 29px;
`

class Remove extends Component {
  close(event) {
    event.preventDefault()
    this.props.toggleShowRemove()
  }

  remove(event) {
    // this.props.dispatch(LessonActions.deleteLesson(this.props.lesson.id))
    this.close(event)
  }

  render() {
    return (
      <Fragment>
        <Styled.OverlayBackground show={this.props.showRemove} />
        <Styled.PopupContainer show={this.props.showRemove}>
          <Styled.PopupBox width="362px">
            <Styled.PopupHeader>Remove User</Styled.PopupHeader>
            <Styled.PopupBody>
              <Text>Are you sure you want to remove this user?</Text>
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
  // dispatch: PropTypes.func,
  showRemove: PropTypes.bool,
  toggleShowRemove: PropTypes.func,
}

export default connect()(Remove)
