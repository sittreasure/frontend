import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #141414;
  height: 100%;
  width: 297px;
  position: absolute;
  z-index: 10;
  top: 0px;
  left: ${props => (props.show ? 53 : -350)}px;
`

const Title = styled.div`
  font-family: 'ThaiSans Neue';
  font-style: normal;
  font-weight: bold;
  font-size: 23px;
  line-height: normal;
  color: #61d0ff;
  margin-top: 12px;
  margin-left: 17px;
  cursor: default;
`

class LessonList extends Component {
  render() {
    return (
      <Container show={this.props.show} className="transition">
        <Title>All Lessons</Title>
      </Container>
    )
  }
}

LessonList.propTypes = {
  show: PropTypes.bool,
}

export default LessonList
