import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { Styled } from '../playground/utils'
import AdminActions from '../../redux/adminStore'

const Text = styled(Styled.Title)`
  font-size: 22px;
  line-height: 29px;
`

class Remove extends Component {
  close(event) {
    event.preventDefault()
    this.props.toggleShow()
  }

  remove(event) {
    const { dispatch, user } = this.props
    dispatch(AdminActions.deleteUser(user.id))
    this.close(event)
  }

  render() {
    return (
      <Fragment>
        <Styled.OverlayBackground show={this.props.show} />
        <Styled.PopupContainer show={this.props.show}>
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
  dispatch: PropTypes.func,
  show: PropTypes.bool,
  user: PropTypes.object,
  toggleShow: PropTypes.func,
}

export default connect()(Remove)
