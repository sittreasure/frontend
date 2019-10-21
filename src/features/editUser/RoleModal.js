import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Avatar } from 'antd'
import { connect } from 'react-redux'

import AdminActions from '../../redux/adminStore'
import { Styled } from '../playground/utils'

const Text = styled(Styled.Title)`
  font-size: 22px;
  line-height: 29px;
`

const Container = styled.div`
  display: flex;
  margin-top: 10px;
  padding: 0 24px;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 19px;
`

const Name = styled(Text)`
  line-height: 22px;
`

const Description = styled(Text)`
  font-size: 18px;
  line-height: 18px;
  color: #5d5d5d;

  span {
    color: #61d0ff;
    margin-left: 10px;
  }
`

class RoleModal extends Component {
  close(event) {
    event.preventDefault()
    this.props.toggleShow()
  }

  changeRole(event) {
    const { dispatch, user } = this.props
    dispatch(AdminActions.changeRoleUser(user.id, !user.isAdmin))
    this.close(event)
  }

  render() {
    const { user } = this.props

    return (
      <Fragment>
        <Styled.OverlayBackground show={this.props.show} />
        <Styled.PopupContainer show={this.props.show}>
          <Styled.PopupBox width="410px">
            <Styled.PopupHeader>Change Role</Styled.PopupHeader>
            <Styled.PopupBody>
              <Text>Are you sure you want to change role this user?</Text>
              <Container>
                <Avatar src={user && user.avatar} size={50} />
                <Wrapper>
                  <Name>{user && user.name}</Name>
                  <Description>
                    From:{' '}
                    {user && user.isAdmin ? 'Administrator' : 'General User'}
                    <span>
                      To:{' '}
                      {user && user.isAdmin ? 'General User' : 'Administrator'}
                    </span>
                  </Description>
                </Wrapper>
              </Container>
            </Styled.PopupBody>
            <Styled.PopupFooter>
              <Styled.Button onClick={e => this.close(e)} />
              <Styled.Button onClick={e => this.changeRole(e)} yes />
            </Styled.PopupFooter>
          </Styled.PopupBox>
        </Styled.PopupContainer>
      </Fragment>
    )
  }
}

RoleModal.propTypes = {
  dispatch: PropTypes.func,
  show: PropTypes.bool,
  user: PropTypes.object,
  toggleShow: PropTypes.func,
}

export default connect()(RoleModal)
