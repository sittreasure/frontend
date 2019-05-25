import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'

import Label from './Label'
import LabelFolder from './LabelFolder'
import DirectoryActions from '../../redux/directoryStore'
import { Styled, functions } from './utilities'

const DirectoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #141414;
  height: 100%;
  width: 297px;
  position: absolute;
  z-index: 10;
  top: 0px;
  left: ${props => props.show ? 53 : -350}px;
`

const Title = styled.div`
  font-family: "ThaiSans Neue";
  font-style: normal;
  font-weight: bold;
  font-size: 23px;
  line-height: normal;
  color: #61D0FF;
  margin-top: 12px;
  margin-left: 17px;
  cursor: default;
`

const GroupContainer = styled.div`
  width: 100%;
  height: ${props => props.show ? '100%' : '28px'};
  margin-top: 2px;
  overflow: hidden;
`

const TitleWrapper = styled.div`
  display: flex;
  cursor: pointer;
  height: 28px;
`

const ArrowWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 42px;
`

const Arrow = styled.img`
  width: 6px;
  height: 12px;
  transform: rotate(${props => props.show ? 90 : 0 }deg);
`

const Unsave = styled(Styled.Title)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  background-color: rgba(255, 0, 0, 0.79);
  width: 21px;
  height: 21px;
  border-radius: 50%;
  position: absolute;
  top: 46px;
  right: 20px;
`

const ContentContainer = styled.div`
  padding-top: 5px;
`

class Directory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: true,
    }
  }

  componentDidMount() {
    this.props.dispatch(DirectoryActions.getMetadata('playground/'))
    this.props.dispatch(DirectoryActions.getFileType())
  }
  
  showLabel(data) {
    return (
      <Label
        key={data.id}
        id={data.id}
        name={data.name}
        data={data.data}
        save={data.save}
        dept={data.id.split('/').length}
      />
    )
  }
  
  showLabelFolder(data) {
    let children = []
    let inside = data.data
    let element
    inside.map(data => {
      if (data.isDir) {
        element = this.showLabelFolder(data)
      }
      else {
        element = this.showLabel(data)
      }
      children = [...children, element]
    })
    return (
      <LabelFolder
        key={data.id}
        id={data.id}
        name={data.name}
        insideSize={inside.length}
        dept={data.id.split('/').length - 1}
      >
        {children.map(data => data)}
      </LabelFolder>
    )
  }

  checkUnsave(parents) {
    const unsave = parents.reduce(
      (sum, data) => {
        if (!data.isDir) {
          if (!data.save) {
            sum += 1
          }
        } else {
          sum += this.checkUnsave(data.data)          
        }
        return sum
      },
      0
    )
    return unsave
  }
  
  render() {
    const unsave = this.checkUnsave(this.props.directory)
    return (
      <DirectoryContainer show={this.props.show} className="transition">
        <Title>File Editor</Title>
        <GroupContainer
          show={this.state.show}
          className="transition"
        >
          {unsave
            ? (
              <Unsave>{unsave}</Unsave>
            )
            : ''
          }
          <TitleWrapper onClick={e => functions.toggleShow(e, this)}>
            <ArrowWrapper>
              <Arrow
                src={require('../../assets/images/next.png')}
                show={this.state.show}
                className="transition"
              />
            </ArrowWrapper>
            <Styled.Title>Directory</Styled.Title>
          </TitleWrapper>
          <ContentContainer>
            {this.props.directory.map(data => {
              if(data.isDir) {
                return this.showLabelFolder(data)
              }
              return this.showLabel(data)
            })}
          </ContentContainer>
        </GroupContainer>
      </DirectoryContainer>
    )
  }
}

Directory.propTypes = {
  show: PropTypes.bool,
  dispatch: PropTypes.func,
  directory: PropTypes.array,
}

const mapStateToProps = state => ({
  directory: state.directoryStore.directory,
})

export default connect(mapStateToProps)(Directory)
