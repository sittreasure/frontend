import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { Styled, functions } from './utils'
import DirectoryActions from '../../redux/directoryStore'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: ${props => props.show ? 'auto' : '40px'};
  overflow: hidden;
`

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  padding-top: 2px;
  padding-bottom: 2px;

  &:hover {
    background-color: #483D3D;
  }
`

class LabelFolder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
    }
  }

  renderIcon() {
    if (this.state.show) {
      return require('../../assets/images/folder-open.png')
    }
    return require('../../assets/images/folder-close.png')
  }
  
  render() {
    return (
      <Container show={this.state.show} className="transition">
        <TitleWrapper onContextMenu={e => functions.openContextMenu(e, this.props.dispatch, this.props.id, true)}>
          <Styled.Idel dept={this.props.dept || 1} />
          <Styled.TitleWrapper
            onClick={e => {
              if (this.props.insideSize === 0) {
                this.props.dispatch(DirectoryActions.getMetadata(this.props.id))
              }
              functions.toggleShow(e, this)
            }}
          >
            <Styled.Icon src={this.renderIcon()} />
            <Styled.Title>{this.props.name}</Styled.Title>
          </Styled.TitleWrapper>
        </TitleWrapper>
        {this.props.children}
      </Container>
    )
  }
}

LabelFolder.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
  ]),
  id: PropTypes.string,
  name: PropTypes.string,
  dept: PropTypes.number,
  insideSize: PropTypes.number,
  dispatch: PropTypes.func,
}

export default connect()(LabelFolder)
