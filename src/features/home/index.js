import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'

import UserActions from '../../redux/userStore'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

const Row = styled.div`
  display: flex;
`

const Link = styled.a`
  display: flex;
  border: #50aaec 1px solid;
  padding: 10px;
`

class Home extends Component {
  componentDidMount() {
    this.props.dispatch(UserActions.me())
  }

  render() {
    return (
      <Container>
        <h1>Home</h1>
        <Row>
          <Link href="/playground">Playground</Link>
          <Link href="/lesson">Lesson</Link>
          <Link href="/logout">Logout</Link>
        </Row>
      </Container>
    )
  }
}

Home.propTypes = {
  dispatch: PropTypes.func,
}

export default connect()(Home)
