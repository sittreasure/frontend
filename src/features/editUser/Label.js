import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 80px;
`

const Top = styled.div`
  display: flex;
  align-items: center;
  font-family: 'ThaiSans Neue';
  font-style: normal;
  font-weight: 800;
  font-size: 25px;
  color: #c4c4c4;
`

const Bar = styled.div`
  width: 24px;
  height: 8px;
  background-color: ${props => props.color};
  margin-left: 5px;
`

const Bottom = styled.div`
  font-family: 'ThaiSans Neue';
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 19px;
  color: #5d5d5d;
`

class Label extends Component {
  render() {
    const { percent, color, sub } = this.props
    return (
      <Container>
        <Top>
          {`${percent} %`} <Bar color={color} />
        </Top>
        <Bottom>{sub}</Bottom>
      </Container>
    )
  }
}

Label.propTypes = {
  percent: PropTypes.number,
  color: PropTypes.string,
  sub: PropTypes.string,
}

export default Label
