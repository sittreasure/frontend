import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'

import UserActions from '../../redux/userStore'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
        <Link href="/playground">Playground</Link>
      </Container>
    )
  }
}

Home.propTypes = {
  dispatch: PropTypes.func,
}

export default connect()(Home)
