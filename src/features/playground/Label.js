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

  &:hover {
    background-color: #483D3D;
  }
`

const Unsave = styled.div`
  background-color: rgba(255, 0, 0, 0.79);
  width: 9px;
  height: 9px;
  border-radius: 50%;
  margin-left: 18px;
`

class Label extends Component {
  render() {
    return (
      <Container onContextMenu={e => functions.openContextMenu(e, this.props.dispatch, this.props.id, false)}>
        <Styled.Idel dept={this.props.dept || 1}>
          {!this.props.save
            ? (
              <Unsave />
            )
            : ''
          }
        </Styled.Idel>
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
  save: PropTypes.bool,
  dept: PropTypes.number,
  dispatch: PropTypes.func,
}

export default connect()(Label)
