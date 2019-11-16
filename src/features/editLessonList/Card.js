import React, { Component } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Link } from "react-router-dom"

import axios from "../../libs/axios"
import { accessToken } from "../../utils"
import BannerImg from "../../assets/images/banner-lesson.png"
import Pen from "../../assets/images/pen.png"
import Bin from "../../assets/images/context/remove.png"

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
  background-size: contain;
  background-repeat: no-repeat;
  border-bottom: 2px solid #61d0ff;
  border-radius: 10px 10px 0 0;
`

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 196px;
  height: 150px;
  padding: 0 17px;
  padding-top: 5px;
`

const Group = styled.div`
  font-family: "ThaiSans Neue";
  font-style: normal;
  font-weight: bold;
  font-size: 23px;
  line-height: 30px;
  color: #61d0ff;
`

const Title = styled.div`
  font-family: "ThaiSans Neue";
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 18px;
  color: #c4c4c4;
`

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 10px;
  padding-bottom: 17px;
`

const AdminContaier = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
`

const AdminImg = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  ${props =>
    props.img
      ? `
    background-image: url(${props.img});
    background-size: cover;
  `
      : "background-color: #c4c4c4;"}
`

const AdminName = styled.div`
  font-family: "ThaiSans Neue";
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 19px;
  color: #5d5d5d;
  margin-left: 8px;
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
  constructor(props) {
    super(props)
    this.state = {
      admin: null,
    }
  }

  async componentDidMount() {
    if (this.props.lesson.addedBy) {
      const { data } = await axios.get(
        `/mainapi/v1/user/${this.props.lesson.addedBy}/`,
        {
          headers: {
            Authorization: `Bearer ${accessToken.getToken()}`,
          },
        }
      )
      this.setState({
        admin: data,
      })
    }
  }

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
            <AdminContaier>
              <AdminImg img={this.state.admin && this.state.admin.avatar} />
              <AdminName>
                {this.state.admin ? this.state.admin.name : "-"}
              </AdminName>
            </AdminContaier>
            <IconContainer>
              <Link to={`/editLesson/${lesson.index}`}>
                <Icon src={Pen} />
              </Link>
              <Icon
                src={Bin}
                onClick={() => {
                  this.props.selectLesson({
                    ...this.props.lesson,
                    admin: this.state.admin,
                  })
                }}
              />
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
  selectLesson: PropTypes.func,
}

export default Card
