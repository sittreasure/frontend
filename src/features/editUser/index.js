import React, { Component } from 'react'
import styled from 'styled-components'
import ReactEcharts from 'echarts-for-react'
import { Icon, Table as AntTable, Avatar } from 'antd'

import { Nav } from '../common'
import Card from './Card'
import Label from './Label'
import Role from './Role'
import ChangeRole from './ChangeRole'
import Remove from './Remove'

import Bin from '../../assets/images/context/remove.png'

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

const Table = styled(AntTable)`
  table {
    color: #c4c4c4;
  }

  .ant-table-thead,
  th {
    background-color: #272727 !important;
    font-family: 'ThaiSans Neue';
    font-style: normal;
    font-weight: 800 !important;
    font-size: 20px;
    line-height: 26px;
    color: #5d5d5d !important;
  }

  th,
  td {
    border-bottom-width: 0px !important;
  }

  .ant-table-tbody > tr.ant-table-row-hover > td,
  .ant-table-tbody > tr:hover > td,
  .ant-table-thead > tr.ant-table-row-hover > td,
  .ant-table-thead > tr:hover > td {
    background-color: transparent !important;
  }

  .ant-table-placeholder {
    text-align: center;
    background-color: transparent !important;
    border-color: transparent !important;

    .ant-empty-normal {
      color: #c4c4c4;
    }
  }
`

const RemoveIcon = styled.img`
  cursor: pointer;
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

const mockData = [
  {
    id: 2421164057945625,
    name: 'Puripat Arayasirikul',
    avatar:
      'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=2421164057945625&height=100&width=100&ext=1573923088&hash=AeR_807UfbpSLL35',
    isAdmin: true,
    lesson: null,
  },
  {
    id: 1,
    name: 'Puripat Arayasirikul',
    avatar:
      'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=2421164057945625&height=100&width=100&ext=1573923088&hash=AeR_807UfbpSLL35',
    isAdmin: false,
    lesson: null,
  },
  {
    id: 2,
    name: 'Puripat Arayasirikul',
    avatar:
      'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=2421164057945625&height=100&width=100&ext=1573923088&hash=AeR_807UfbpSLL35',
    isAdmin: false,
    lesson: null,
  },
  {
    id: 3,
    name: 'Puripat Arayasirikul',
    avatar:
      'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=2421164057945625&height=100&width=100&ext=1573923088&hash=AeR_807UfbpSLL35',
    isAdmin: false,
    lesson: null,
  },
  {
    id: 4,
    name: 'Puripat Arayasirikul',
    avatar:
      'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=2421164057945625&height=100&width=100&ext=1573923088&hash=AeR_807UfbpSLL35',
    isAdmin: false,
    lesson: null,
  },
  {
    id: 5,
    name: 'Puripat Arayasirikul',
    avatar:
      'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=2421164057945625&height=100&width=100&ext=1573923088&hash=AeR_807UfbpSLL35',
    isAdmin: false,
    lesson: null,
  },
]

class EditUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      showRemove: false,
      showRole: false,
      roleBox: null,
    }
  }

  toggleShowRole() {
    this.setState({
      showRole: !this.state.showRole,
    })
  }

  toggleShowRemove() {
    this.setState({
      showRemove: !this.state.showRemove,
    })
  }

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
            <Section width={660}>
              <TitleWrapper>
                <TitleContainer>
                  <Icon
                    type="user"
                    style={{ color: '#C4C4C4', fontSize: 13 }}
                  />{' '}
                  Manage Users
                </TitleContainer>
              </TitleWrapper>
              <Table
                dataSource={mockData}
                rowKey="id"
                pagination={{ pageSize: 5 }}
                columns={[
                  {
                    title: 'User',
                    colSpan: 2,
                    dataIndex: 'avatar',
                    render: value => <Avatar src={value} size={25} />,
                  },
                  {
                    title: 'name',
                    colSpan: 0,
                    dataIndex: 'name',
                  },
                  {
                    title: 'Status',
                    dataIndex: 'lesson',
                    render: value => <>{value ? value : '-'}</>,
                  },
                  {
                    title: 'Role',
                    dataIndex: 'isAdmin',
                    render: (value, row) => (
                      <Role
                        isAdmin={value}
                        setBox={box => this.setState({ roleBox: box })}
                        toggleShowRole={() => this.toggleShowRole()}
                        setUser={() =>
                          this.setState({
                            user: mockData.filter(data => {
                              return data.id === row.id
                            })[0],
                          })
                        }
                      />
                    ),
                  },
                  {
                    title: '',
                    dataIndex: 'id',
                    render: value => (
                      <RemoveIcon
                        src={Bin}
                        onClick={() => {
                          this.toggleShowRemove()
                          this.setState({
                            user: mockData.filter(data => {
                              return data.id === value
                            })[0],
                          })
                        }}
                      />
                    ),
                  },
                ]}
              />
            </Section>
          </Row>
        </Container>
        <ChangeRole
          show={this.state.showRole}
          user={this.state.user}
          roleBox={this.state.roleBox}
          toggleShow={() => this.toggleShowRole()}
        />
        <Remove
          showRemove={this.state.showRemove}
          toggleShowRemove={() => this.toggleShowRemove()}
        />
      </Wrappper>
    )
  }
}

export default EditUser
