import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  getLessonGroup: null,
  setLessonGroup: ['group'],
  getLessonLearning: null,
  setLessonLearning: ['learned'],
})

export const LessonTypes = Types
export default Creators

const INITIAL_STATE = Immutable({
  group: [],
  learned: [],
})

const setLessonGroup = (state = INITIAL_STATE, { group }) => ({
  ...state,
  group,
})

const setLessonLearning = (state = INITIAL_STATE, { learned }) => ({
  ...state,
  learned,
})

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_LESSON_GROUP]: setLessonGroup,
  [Types.SET_LESSON_LEARNING]: setLessonLearning,
})
