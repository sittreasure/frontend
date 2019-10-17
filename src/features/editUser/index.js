import React, { Component } from 'react'
import styled from 'styled-components'
import ReactEcharts from 'echarts-for-react'
import { Icon } from 'antd'

import { Nav } from '../common'
import Card from './Card'
import Label from './Label'

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

const Header = styled.div`
  font-family: 'ThaiSans Neue';
  font-style: normal;
  font-weight: bold;
  font-size: 28px;
  line-height: 36px;
  color: #c4c4c4;
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${props => props.padding};
  flex: ${props => props.flex || 0};
`

const Section = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: ${props => props.width}px;
  background-color: #202020;
  padding: 14px 30px 0 30px;
`

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  margin-bottom: 10px;
`

const TitleContainer = styled.span`
  font-family: 'ThaiSans Neue';
  font-style: normal;
  font-weight: bold;
  font-size: 25px;
  line-height: 32px;
  color: #c4c4c4;
`

const LabelContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const colors = ['#205072', '#329D9C', '#56C596', '#7BE495', '#CFF4D2']
const renderData = () => {
  const result = []
  colors.map(color =>
    result.push({
      value: Math.round(Math.random() * 200),
      itemStyle: { color },
    })
  )
  return result
}
class EditUser extends Component {
  render() {
    return (
      <Wrappper>
        <Nav title="Edit User" />
        <Container>
          <Header>Dashboard</Header>
          <Row padding="23px 0 0 0">
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
          </Row>
          <Row padding="28px 0 0 0" flex={1}>
            <Section width={310}>
              <TitleWrapper>
                <TitleContainer>
                  <Icon
                    type="star"
                    style={{ color: '#C4C4C4', fontSize: 13 }}
                  />{' '}
                  Volume
                </TitleContainer>
              </TitleWrapper>
              <ReactEcharts
                style={{
                  width: '171px',
                  height: '171px',
                  alignSelf: 'center',
                }}
                option={{
                  series: [
                    {
                      type: 'pie',
                      radius: ['50%', '70%'],
                      avoidLabelOverlap: false,
                      hoverAnimation: false,
                      label: {
                        normal: {
                          show: false,
                        },
                      },
                      data: renderData(),
                    },
                  ],
                }}
              />
              <LabelContainer>
                {colors.map((color, index) => (
                  <Label
                    percent={Math.round(Math.random() * 100)}
                    color={color}
                    sub={`Lesson ${index + 1}`}
                    key={index}
                  />
                ))}
              </LabelContainer>
            </Section>
            <Section width={660} />
          </Row>
        </Container>
      </Wrappper>
    )
  }
}

export default EditUser
