import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Arrow from '../../assets/images/next.png'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`

class Role extends Component {
  render() {
    return (
      <Container
        ref={node => (this.role = node)}
        onClick={e => {
          e.preventDefault()
          const box = this.role.getBoundingClientRect()
          this.props.setBox(box)
          this.props.setUser()
          this.props.toggleShowRole()
        }}
      >
        <span>{this.props.isAdmin ? 'Administrator' : 'General User'}</span>
        <img src={Arrow} style={{ transform: 'rotate(90deg)' }} />
      </Container>
    )
  }
}

Role.propTypes = {
  isAdmin: PropTypes.bool,
  setBox: PropTypes.func,
  toggleShowRole: PropTypes.func,
  setUser: PropTypes.func,
}

export default Role
