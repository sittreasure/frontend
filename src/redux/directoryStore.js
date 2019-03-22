import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  getMetadata: ['prefix'],
  setMetadata: ['id', 'data'],
  getData: null,
  setData: ['id', 'data'],
})

export const DirectoryTypes = Types
export default Creators

const INITIAL_STATE = Immutable({
  directory: [],
})

const setMetadata = () => ({})
// const setMetadata = (state = INITIAL_STATE, { id, data }) => ({
//   ...state
// })

const setData = () => ({})
// const setData = (state = INITIAL_STATE, { id, data }) => ({
//   ...state,
// })

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_METADATA]: setMetadata,
  [Types.SET_DATA]: setData,
})
