const toggleShow = (event, component) => {
  event.preventDefault()
  component.setState({
    show: !component.state.show,
  })
}

const functions = {
  toggleShow,
}

export default functions
