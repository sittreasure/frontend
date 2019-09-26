import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import BannerImg from '../../assets/images/banner-lesson.png'
import Pen from '../../assets/images/pen.png'
import Bin from '../../assets/images/context/remove.png'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 230px;
  height: 300px;
  background-color: #272727;
  border-radius: 10px;
  margin-right: 30px;
  margin-bottom: 30px;
`

const Banner = styled.div`
  width: 100%;
  height: 150px;
  background-image: url(${BannerImg});
  background-size: cover;
  border-bottom: 2px solid #61d0ff;
`

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 196px;
  height: 150px;
  padding: 0 17px;
`

const Group = styled.div`
  font-family: 'ThaiSans Neue';
  font-style: normal;
  font-weight: bold;
  font-size: 23px;
  line-height: 30px;
  color: #61d0ff;
`

const Title = styled.div`
  font-family: 'ThaiSans Neue';
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 18px;
  color: #c4c4c4;
`

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
`

const IconContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 54px;
`

const Icon = styled.img`
  width: 18px;
  height: 18px;
  cursor: pointer;
`

class Card extends Component {
  render() {
    const { group, lesson } = this.props

    return (
      <Container>
        <Banner />
        <Content>
          <div>
            <Group>{group && group.name}</Group>
            <Title>{lesson.topic}</Title>
          </div>
          <Footer>
            <IconContainer>
              <Icon src={Pen} />
              <Icon src={Bin} />
            </IconContainer>
          </Footer>
        </Content>
      </Container>
    )
  }
}

Card.propTypes = {
  group: PropTypes.object,
  lesson: PropTypes.object,
}

export default Card
