import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Icon } from 'antd'

import UserActions from '../../redux/userStore'
import background from '../../assets/images/main-background.png'
import button from '../../assets/images/square.png'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-image: url(${background});
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
  profile: 'edit profile',
  playground: 'playground',
  lesson: 'lesson',
  logout: 'logout',
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
      <Container>
        <ButtonWrapper>
          <EffectRow>
            <Effect />
            <Effect />
          </EffectRow>
          <DescriptionRow>
            <Description>
              {this.state.hover ? (
                <DescriptionText>{menu[this.state.hover]}</DescriptionText>
              ) : null}
            </Description>
          </DescriptionRow>
          <ButtonRow>
            <Button
              onMouseEnter={() => this.setHover('profile')}
              onMouseLeave={() => this.setHover(null)}
            >
              <Icon type="user" style={{ fontSize: '60px', color: '#fff' }} />
            </Button>
            <Link to="/playground">
              <Button
                onMouseEnter={() => this.setHover('playground')}
                onMouseLeave={() => this.setHover(null)}
              >
                <Icon type="code" style={{ fontSize: '60px', color: '#fff' }} />
              </Button>
            </Link>
            <Link to="/lesson">
              <Button
                onMouseEnter={() => this.setHover('lesson')}
                onMouseLeave={() => this.setHover(null)}
              >
                <Icon type="read" style={{ fontSize: '60px', color: '#fff' }} />
              </Button>
            </Link>
            <Link to="/logout">
              <Button
                onMouseEnter={() => this.setHover('logout')}
                onMouseLeave={() => this.setHover(null)}
              >
                <Icon
                  type="logout"
                  style={{ fontSize: '60px', color: '#fff' }}
                />
              </Button>
            </Link>
          </ButtonRow>
        </ButtonWrapper>
      </Container>
    )
  }
}

Home.propTypes = {
  dispatch: PropTypes.func,
}

export default connect()(Home)
