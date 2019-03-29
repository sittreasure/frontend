import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { Styled, functions } from './utilities'
import DirectoryActions from '../../redux/directoryStore'
import PlaygroundActions from '../../redux/playgroundStore'

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 36px;
  padding-top: 2px;
  padding-bottom: 2px;
`

class Label extends Component {
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
            this.props.dispatch(PlaygroundActions.setOpen(this.props.id))
            this.props.dispatch(PlaygroundActions.toggleDirectory())
          }}
        >
          <Styled.Icon src={functions.showIcon(this.props.name.split('.')[1])} />
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
