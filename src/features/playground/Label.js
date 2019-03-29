import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { Styled } from './utilities'
import DirectoryActions from '../../redux/directoryStore'

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 36px;
  padding-top: 2px;
  padding-bottom: 2px;
`

class Label extends Component {

  renderIcon(name) {
    name = name.split('.')
    const type = name[name.length - 1]
    switch (type) {
      case 'java':
        return require('../../assets/images/java.png')
      case 'html':
        return require('../../assets/images/html5.png')
      case 'xml':
        return require('../../assets/images/xml.png')
      default:
        return require('../../assets/images/info.png')
    }
  }

  render() {
    return (
      <Container>
        <Styled.Idel dept={this.props.dept || 1} />
        <Styled.TitleWrapper
          onClick={e => {
            e.preventDefault()
            if (!this.props.data) {
              this.props.dispatch(DirectoryActions.getData(this.props.id))
            }
          }}
        >
          <Styled.Icon src={this.renderIcon(this.props.name)} />
          <Styled.Title>{this.props.name}</Styled.Title>
        </Styled.TitleWrapper>
      </Container>
    )
  }
}

Label.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  data: PropTypes.string,
  dept: PropTypes.number,
  dispatch: PropTypes.func,
}

export default connect()(Label)
