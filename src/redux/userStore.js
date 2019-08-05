import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  loginFacebook: ['id', 'name', 'surname', 'image'],
  me: null,
  setUser: ['user'],
})

export const UserTypes = Types
export default Creators

const INITIAL_STATE = Immutable({
  user: null,
})

const setUser = (state = INITIAL_STATE, { user }) => ({
  ...state,
  user,
})

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_USER]: setUser,
})
