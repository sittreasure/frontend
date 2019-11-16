import React, { Component } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import ReactMarkdown from "react-markdown"

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;

  * {
    font-family: "ThaiSans Neue";
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

  h1 {
    font-size: 48px;
  }
  h2 {
    font-size: 40px;
  }
  h3 {
    font-size: 35px;
  }
  h4 {
    font-size: 32px;
  }
  h5 {
    font-size: 30px;
  }
  h6 {
    font-size: 28px;
  }
  p {
    font-size: 30px;
  }
  pre {
    background-color: #393939;
    padding: 10px;
    border-radius: 5px;

    code {
      padding: 0px !important;
      color: #c4c4c4;
    }
  }

  code {
    background-color: #393939;
    font-size: 25px;
    padding: 0 10px;
    border-radius: 5px;
    color: #ff5e5e;
  }

  li {
    font-size: 30px;
  }

  a,
  a:link,
  a:active,
  a:hover,
  a:visited {
    font-size: 30px;
    color: #61d0ff;
  }
`

class Markdown extends Component {
  render() {
    return (
      <Container>
        <ReactMarkdown source={this.props.data} escapeHtml={false} />
      </Container>
    )
  }
}

Markdown.propTypes = {
  data: PropTypes.string,
}

export default Markdown
