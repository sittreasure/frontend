import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  toggleDirectory: null,
  setOpen: ['id'],
  setName: ['name'],
  setIsCompile: ['isCompile'],
  compile: ['name'],
  checkCompile: ['name'],
  getCompileLog: ['name'],
  setCompileLog: ['log'],
  save: ['id', 'objectData'],
})

export const PlaygroundTypes = Types
export default Creators

const INITIAL_STATE = Immutable({
  directory: false,
  open: {
    id: null,
    name: null,
  },
  name: null,
  isCompile: null,
  compileLog: null,
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

const setName = (state = INITIAL_STATE, { name }) => ({
  ...state,
  name: name,
})

const setIsCompile = (state = INITIAL_STATE, { isCompile }) => ({
  ...state,
  isCompile: isCompile,
})

const setCompileLog = (state = INITIAL_STATE, { log }) => ({
  ...state,
  compileLog: log,
})

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TOGGLE_DIRECTORY]: toggleDirectory,
  [Types.SET_OPEN]: setOpen,
  [Types.SET_NAME]: setName,
  [Types.SET_IS_COMPILE]: setIsCompile,
  [Types.SET_COMPILE_LOG]: setCompileLog,
})
