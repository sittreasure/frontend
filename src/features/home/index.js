/* eslint-disable standard/computed-property-even-spacing */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Icon } from 'antd'

import UserActions from '../../redux/userStore'
import background from '../../assets/videos/Comp.mp4'
import button from '../../assets/images/square.png'
import LogoImg from '../../assets/images/logo.png'

const Video = styled.video`
  position: absolute;
  z-index: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-size: cover;
`

const ButtonWrapper = styled.div`
  height: 636px;
  width: 927px;
  position: relative;
`

const DescriptionRow = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 355px;
  position: absolute;
  top: 0px;
  padding-top: 73.5px; /* diagonal / 2 - height / 2 */
`

const Description = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 355px;
  height: 355px;
  background-image: url(${button});
  background-size: cover;
  transform: rotate(45deg);
`

const DescriptionText = styled.div`
  font-family: 'ThaiSans Neue';
  font-style: normal;
  font-weight: 800;
  font-size: 65px;
  line-height: 84px;
  color: #c4c4c4;
  text-transform: uppercase;
  text-align: center;
  transform: rotate(-45deg);
`

const Logo = styled.img`
  width: 200px;
  height: 200px;
  transform: rotate(-45deg);
`

const EffectRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  height: 263px;
  position: absolute;
  bottom: 0px;
`

const Effect = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 263px;
  height: 263px;
  background-color: #c4c4c4;
  transform: rotate(45deg);
  margin: 54.47px; /* diagonal / 2 - height / 2 */
`

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  height: 131px;
  position: absolute;
  bottom: 0px;
`

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 131px;
  height: 131px;
  background-image: url(${button});
  background-size: cover;
  transform: rotate(45deg);
  margin: 27.13px; /* diagonal / 2 - height / 2 */

  & i {
    transform: rotate(-45deg);
  }
`

const menu = {
  general: [
    {
      icon: 'user',
      hover: 'edit profile',
      link: '/comingsoon',
    },
    {
      icon: 'code',
      hover: 'playground',
      link: '/playground',
    },
    {
      icon: 'read',
      hover: 'lesson',
      link: '/lesson',
    },
    {
      icon: 'logout',
      hover: 'logout',
      link: '/logout',
    },
  ],
  admin: [
    {
      icon: 'user',
      hover: 'edit profile',
      link: '/editUser',
    },
    {
      icon: 'code',
      hover: 'edit playground',
      link: '/comingsoon',
    },
    {
      icon: 'read',
      hover: 'edit lesson',
      link: '/editLessonList',
    },
    {
      icon: 'logout',
      hover: 'logout',
      link: '/logout',
    },
  ],
}

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hover: null,
    }
  }

  componentDidMount() {
    this.props.dispatch(UserActions.me())
  }

  setHover(value) {
    this.setState({ hover: value })
  }

  render() {
    return (
      <>
        <Video autoPlay loop>
          <source src={background} type="video/mp4" />
        </Video>
        <Container>
          <ButtonWrapper>
            <EffectRow>
              <Effect />
              <Effect />
            </EffectRow>
            <DescriptionRow>
              <Description>
                {this.state.hover ? (
                  <DescriptionText>{this.state.hover}</DescriptionText>
                ) : (
                  <Logo src={LogoImg} />
                )}
              </Description>
            </DescriptionRow>
            <ButtonRow>
              {menu[
                this.props.user && this.props.user.isAdmin ? 'admin' : 'general'
              ].map((menu, index) => (
                <Link to={menu.link} key={index}>
                  <Button
                    onMouseEnter={() => this.setHover(menu.hover)}
                    onMouseLeave={() => this.setHover(null)}
                    key={index}
                  >
                    <Icon
                      type={menu.icon}
                      style={{ fontSize: '60px', color: '#fff' }}
                    />
                  </Button>
                </Link>
              ))}
            </ButtonRow>
          </ButtonWrapper>
        </Container>
      </>
    )
  }
}

Home.propTypes = {
  dispatch: PropTypes.func,
  user: PropTypes.object,
}

const mapStateToProps = state => ({
  user: state.userStore.user,
})

export default connect(mapStateToProps)(Home)
