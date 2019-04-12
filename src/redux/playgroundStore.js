import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  toggleDirectory: null,
  setOpen: ['id'],
  setIsCompile: ['isCompile'],
  compile: ['name'],
})

export const PlaygroundTypes = Types
export default Creators

const INITIAL_STATE = Immutable({
  directory: false,
  open: {
    id: null,
    name: null,
  },
  isCompile: null,
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

const setIsCompile = (state = INITIAL_STATE, { isCompile }) => ({
  ...state,
  isCompile: isCompile,
})

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TOGGLE_DIRECTORY]: toggleDirectory,
  [Types.SET_OPEN]: setOpen,
  [Types.SET_IS_COMPILE]: setIsCompile,
})
