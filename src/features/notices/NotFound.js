import React, { Component } from 'react'
import styled from 'styled-components'

import Layout from './Layout'

const Container = styled.div`
  font-family: 'ThaiSans Neue';
  font-style: normal;
  font-weight: 800;
  position: relative;
`

const Text = styled.div`
  font-size: 300px;
  line-height: 300px;
  color: #61d0ff;
`

const BlurText = styled.div`
  font-size: 500px;
  line-height: 500px;
  color: rgba(196, 196, 196, 0.1);

  position: absolute;
  top: -200px;
  left: -100px;
`

class NotFound extends Component {
  render() {
    return (
      <Layout
        title="PAGE NOT FOUND"
        titleStyle={{
          fontSize: '50px',
          lineHeight: '65px',
        }}
        description="The page you are looking for might have been removed had its name changed or is temporarily unavailable."
        icon={
          <Container>
            <Text>Oops!</Text>
            <BlurText>404</BlurText>
          </Container>
        }
      />
    )
  }
}

export default NotFound
