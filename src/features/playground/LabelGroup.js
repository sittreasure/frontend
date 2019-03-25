import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  height: ${props => props.show ? props.height : '28px'};
  margin-top: 2px;
  overflow: hidden;
`

const TitleWrapper = styled.div`
  display: flex;
  cursor: pointer;
`

const ArrowWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 42px;
`

const Arrow = styled.img`
  width: 6px;
  height: 12px;
  transform: rotate(${props => props.show ? 90 : 0 }deg);
`

const Title = styled.div`
  font-family: "ThaiSans Neue";
  font-style: normal;
  font-weight: bold;
  font-size: 21px;
  line-height: normal;
  color: #C4C4C4;
`

const ContentContainer = styled.div`
  padding-top: 5px;
`

class LabelGroup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
    }
  }

  toggleShow(e) {
    e.preventDefault()
    this.setState({
      show: !this.state.show,
    })
  }

  render() {
    return (
      <Container show={this.state.show} height={this.props.height}>
        <TitleWrapper onClick={e => this.toggleShow(e)}>
          <ArrowWrapper>
            <Arrow
              src={require('../../assets/images/next.png')}
              show={this.state.show}
              className="transition"
            />
          </ArrowWrapper>
          <Title>{this.props.title}</Title>
        </TitleWrapper>
        <ContentContainer>
          {this.props.children}
        </ContentContainer>
      </Container>
    )
  }
}

LabelGroup.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
  ]),
  title: PropTypes.string,
  height: PropTypes.string,
}

export default LabelGroup
