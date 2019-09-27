import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: scroll;

  * {
    font-family: 'ThaiSans Neue';
    color: #c4c4c4;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: #61d0ff;
  }
`

class Markdown extends Component {
  render() {
    return (
      <Container>
        <ReactMarkdown source={this.props.data} />
      </Container>
    )
  }
}

Markdown.propTypes = {
  data: PropTypes.string,
}

export default Markdown
