import React, { Component } from 'react'
import styled from 'styled-components'

import { Nav } from '../common'
import Card from './Card'

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
  align-self: center;
  width: 1010px;
  padding: 60px 0 37px 0;
`

const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 23px;
`

const Header = styled.div`
  font-family: 'ThaiSans Neue';
  font-style: normal;
  font-weight: bold;
  font-size: 28px;
  line-height: 36px;
  color: #c4c4c4;
`

class EditUser extends Component {
  render() {
    return (
      <Wrappper>
        <Nav title="Edit User" />
        <Container>
          <Header>Dashboard</Header>
          <CardContainer>
            <Card
              bg={require('../../assets/images/box-bg1.png')}
              icon={require('../../assets/images/stat-icon.png')}
              title="Number of Users"
              value={1290}
            />
            <Card
              bg={require('../../assets/images/box-bg2.png')}
              icon={require('../../assets/images/users-icon.png')}
              title="New Users"
              value={90}
            />
            <Card
              bg={require('../../assets/images/box-bg3.png')}
              icon={require('../../assets/images/book-icon.png')}
              title="Most Access Lesson"
              value={1}
            />
          </CardContainer>
        </Container>
      </Wrappper>
    )
  }
}

export default EditUser
