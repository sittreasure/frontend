import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  getCardStat: null,
  setCardStat: ['stat'],
  getChartStat: null,
  setChartStat: ['stat'],
  getUsers: null,
  setUsers: ['users'],
  changeRoleUser: ['id', 'isAdmin'],
  deleteUser: ['id'],
})

export const AdminTypes = Types
export default Creators

const INITIAL_STATE = Immutable({
  cardStat: {},
  chartStat: {},
  users: [],
})

const setCardStat = (state = INITIAL_STATE, { stat }) => ({
  ...state,
  cardStat: stat,
})

const setChartStat = (state = INITIAL_STATE, { stat }) => ({
  ...state,
  chartStat: stat,
})

const setUsers = (state = INITIAL_STATE, { users }) => ({
  ...state,
  users,
})

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_CARD_STAT]: setCardStat,
  [Types.SET_CHART_STAT]: setChartStat,
  [Types.SET_USERS]: setUsers,
})
