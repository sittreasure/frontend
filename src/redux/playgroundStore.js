import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  toggleDirectory: null,
  setOpen: ['id'],
})

export const PlaygroundTypes = Types
export default Creators

const INITIAL_STATE = Immutable({
  directory: false,
  open: {
    id: null,
    name: null,
  },
})

const toggleDirectory = (state = INITIAL_STATE) => ({
  ...state,
  directory: !state.directory,
})

const setOpen = (state = INITIAL_STATE, { id }) => ({
  ...state,
  open: {
    id: id,
    name: id.split('/').pop(),
  },
})

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TOGGLE_DIRECTORY]: toggleDirectory,
  [Types.SET_OPEN]: setOpen,
})
