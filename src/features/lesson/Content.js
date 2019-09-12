import React, { Component } from 'react'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'

import { ReactComponent as SkipIcon } from '../../assets/images/skip.svg'

const Container = styled.div`
  height: 100%;
  padding: 20px;
`

const Title = styled.div`
  display: inline-block;
  font-family: 'ThaiSans Neue';
  font-style: normal;
  font-weight: bold;
  font-size: 30px;
  line-height: 39px;
  color: #c4c4c4;
  background-color: #202020;
  padding: 6px 30px;
  box-sizing: border-box;
`

const MarkdownContainer = styled.div`
  font-family: 'ThaiSans Neue';
  color: #c4c4c4;
  background-color: #202020;
  height: calc(100% - 20px - 51px - 29px - 40px);
  padding: 10px 30px;
  margin: 14px 0px;
  overflow: scroll;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`

const Button = styled.div`
  font-family: 'ThaiSans Neue';
  font-style: normal;
  font-weight: bold;
  font-size: 21px;
  line-height: 27px;
  border: 1px solid #61d0ff;
  box-sizing: border-box;
  border-radius: 3px;
  padding: 0px 22px;
  cursor: pointer;

  & svg {
    width: 12px;
    height: 12px;
  }
`

const BackButton = styled(Button)`
  color: #61d0ff;

  & svg {
    margin-right: 8px;
    transform: scaleX(-1);
    & path {
      fill: #61d0ff;
    }
  }
`

const NextButton = styled(Button)`
  color: #272727;
  background-color: #61d0ff;
  margin-left: 10px;

  & svg {
    margin-left: 8px;
  }
`

class Content extends Component {
  render() {
    return (
      <Container>
        <Title>Lesson 1</Title>
        <MarkdownContainer>
          <ReactMarkdown
            source="- `source` or `children` - _string_ The Markdown source to parse (**required**)
- `className` - _string_ Class name of the container element. If none is passed, a container will not be rendered.
- `escapeHtml` - _boolean_ Setting to `false` will cause HTML to be rendered (see notes below about proper HTML support). Be aware that setting this to `false` might cause security issues if the
  input is user-generated. Use at your own risk. (default: `true`).
- `skipHtml` - _boolean_ Setting to `true` will skip inlined and blocks of HTML (default: `false`).
- `sourcePos` - _boolean_ Setting to `true` will add `data-sourcepos` attributes to all elements,
  indicating where in the markdown source they were rendered from (default: `false`).
- `rawSourcePos` - _boolean_ Setting to `true` will pass a `sourcePosition` property to all renderers with structured source position information (default: `false`).
- `includeNodeIndex` - _boolean_ Setting to `true` will pass `index` and `parentChildCount` props to all renderers (default: `false`).
- `allowedTypes` - _array_ Defines which types of nodes should be allowed (rendered). (default: all
  types).
- `disallowedTypes` - _array_ Defines which types of nodes should be disallowed (not rendered).
  (default: none).
- `unwrapDisallowed` - _boolean_ Setting to `true` will try to extract/unwrap the children of
  disallowed nodes. For instance, if disallowing `Strong`, the default behaviour is to simply skip
  the text within the strong altogether, while the behaviour some might want is to simply have the
  text returned without the strong wrapping it. (default: `false`)
- `allowNode` - _function_ Function execute if in order to determine if the node should be allowed.
  Ran prior to checking `allowedTypes`/`disallowedTypes`. Returning a truthy value will allow the
  node to be included. Note that if this function returns `true` and the type is not in
  `allowedTypes` (or specified as a `disallowedType`), it won't be included. The function will
  receive three arguments argument (`node`, `index`, `parent`), where `node` contains different
  properties depending on the node type.
- `linkTarget` - _function|string_ Sets the default target attribute for links. If a function is
  provided, it will be called with `url`, `text`, and `title` and should return a string
  (e.g. `_blank` for a new tab). Default is `undefined` (no target attribute).
- `transformLinkUri` - _function|null_ Function that gets called for each encountered link with a
  single argument - `uri`. The returned value is used in place of the original. The default link URI
  transformer acts as an XSS-filter, neutralizing things like `javascript:`, `vbscript:` and `file:`
  protocols. If you specify a custom function, this default filter won't be called, but you can
  access it as `require('react-markdown').uriTransformer`. If you want to disable the default
  transformer, pass `null` to this option.
- `transformImageUri` - _function|null_ Function that gets called for each encountered image with a
  single argument - `uri`. The returned value is used in place of the original.
- `renderers` - _object_ An object where the keys represent the node type and the value is a React
  component. The object is merged with the default renderers. The props passed to the component
  varies based on the type of node.
- `plugins` - _array_ An array of unified/remark parser plugins. If you need to pass options to the plugin, pass an array with two elements, the first being the plugin and the second being the options - for instance: `{plugins: [[require('remark-shortcodes'), {your: 'options'}]]`. (default: `[]`) Note that [not all plugins can be used](https://github.com/rexxars/react-markdown/issues/188#issuecomment-404710893).
- `parserOptions` - _object_ An object containing options to pass to [remark-parse](https://github.com/remarkjs/remark/tree/master/packages/remark-parse)."
          />
        </MarkdownContainer>
        <ButtonContainer>
          <BackButton>
            <SkipIcon />
            Previous lesson
          </BackButton>
          <NextButton>
            Next lesson
            <SkipIcon />
          </NextButton>
        </ButtonContainer>
      </Container>
    )
  }
}

export default Content
