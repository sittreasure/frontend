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

const openContextMenu = (event, dispatch, id) => {
  const DirectoryActions = require('../../../redux/directoryStore').default
  event.preventDefault()
  const clickX = event.clientX
  const clickY = event.clientY
  const windowHeight = window.innerHeight
  const overflow = clickY + 120 >= windowHeight
  
  let x = clickX + 5
  let y
  if (overflow) {
    y = windowHeight - clickY - 5
  } else {
    y = clickY + 5
  }
  dispatch(DirectoryActions.setContextMenu(true, x, y, overflow))
  dispatch(DirectoryActions.setContextMenuId(id))
}

const functions = {
  toggleShow,
  showIcon,
  openContextMenu,
}

export default functions
