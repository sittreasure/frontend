const toggleShow = (event, component) => {
  event.preventDefault()
  component.setState({
    show: !component.state.show,
  })
}

const showIcon = type => {
  switch (type) {
    case 'java':
      return require('../../../assets/images/java.png')
    case 'html':
      return require('../../../assets/images/html5.png')
    case 'xml':
      return require('../../../assets/images/xml.png')
    default:
      return require('../../../assets/images/info.png')
  }
}

const functions = {
  toggleShow,
  showIcon,
}

export default functions
