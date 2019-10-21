import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import CheckMark from '../../assets/images/check-mark.png'

const Wrapper = styled.div`
  display: ${props => (props.show ? 'flex' : 'none')};
  position: absolute;
  z-index: 201;
  width: 100%;
  height: 100%;
  background-color: transparent;
`

const Container = styled.div`
  display: ${props => (props.show ? 'flex' : 'none')};
  flex-direction: column;
  width: 230px;
  height: 171px;
  background-color: #1b1b1b;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  position: absolute;
  right: ${props => props.right}px;
  top: ${props => (props.renderBottom ? `${props.top}px` : 'auto')};
  bottom: ${props => (props.renderBottom ? 'auto' : `${props.bottom}px`)};
`

const Title = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  font-family: 'ThaiSans Neue';
  font-style: normal;
  font-weight: 800;
  font-size: 23px;
  line-height: 30px;
  color: #5d5d5d;
  padding-left: 20px;
`

const Row = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 71px;
  padding: 0 22px 0 50px;
  cursor: ${props => (props.select ? 'default' : 'pointer')};
  position: relative;

  &:hover {
    background-color: ${props => (props.select ? 'tranparent' : '#393939')};
  }
`

const TextTop = styled.div`
  font-family: 'ThaiSans Neue';
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 26px;
  color: ${props => (props.select ? '#61D0FF' : '#C4C4C4')};
`

const TextSub = styled.div`
  font-family: 'ThaiSans Neue';
  font-style: normal;
  font-weight: 800;
  font-size: 15px;
  line-height: 13px;
  color: #5d5d5d;
`

const Check = styled.img`
  width: 13px;
  height: 13px;
  position: absolute;
  top: 29px;
  left: 20px;
`

class ChangeRow extends Component {
  checkRenderBottom() {
    const height = window.innerHeight
    if (this.props.roleBox.bottom + 187 < height) {
      return true
    }
    return false
  }

  close(event) {
    event.preventDefault()
    event.stopPropagation()
    this.props.toggleShow()
  }

  openModal(event, call) {
    event.preventDefault()
    event.stopPropagation()
    if (call) {
      this.close(event)
      this.props.toggleModal()
    }
  }

  render() {
    const { show, roleBox, user } = this.props

    return (
      <Wrapper show={show} onClick={e => this.close(e)}>
        <Container
          show={show}
          renderBottom={roleBox && this.checkRenderBottom()}
          bottom={
            roleBox && window.innerHeight - roleBox.bottom + roleBox.height + 16
          }
          top={roleBox && roleBox.top + roleBox.height + 16}
          right={roleBox && window.innerWidth - roleBox.right}
        >
          <Title>Role</Title>
          <Row
            select={user && user.isAdmin}
            onClick={e => this.openModal(e, !user.isAdmin)}
          >
            <TextTop select={user && user.isAdmin}>Administrator</TextTop>
            <TextSub>
              Manage role and remove user. Enter content manage mpde.
            </TextSub>
            {user && user.isAdmin && <Check src={CheckMark} />}
          </Row>
          <Row
            select={user && !user.isAdmin}
            onClick={e => this.openModal(e, user.isAdmin)}
          >
            <TextTop select={user && !user.isAdmin}>General User</TextTop>
            <TextSub>
              Learn lesson and create JSP project in Playground feature.
            </TextSub>
            {user && !user.isAdmin && <Check src={CheckMark} />}
          </Row>
        </Container>
      </Wrapper>
    )
  }
}

ChangeRow.propTypes = {
  show: PropTypes.bool,
  roleBox: PropTypes.object,
  user: PropTypes.object,
  toggleShow: PropTypes.func,
  toggleModal: PropTypes.func,
}

export default ChangeRow
