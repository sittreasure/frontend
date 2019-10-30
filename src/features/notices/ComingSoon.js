import React, { Component } from 'react'
import styled from 'styled-components'

import Layout from './Layout'
import Icon from '../../assets/images/notice/construct.png'

const Image = styled.img`
  width: 150px;
  height: 150px;
`

class ComingSoon extends Component {
  render() {
    return (
      <Layout
        title="COMING SOON"
        description="This page is under construction. We are working to bring you new best experience. Stay tured for something amazing"
        icon={<Image src={Icon} />}
      />
    )
  }
}

export default ComingSoon
