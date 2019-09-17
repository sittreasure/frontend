import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  getLesson: null,
  setLesson: ['lessons'],
  getLessonGroup: null,
  setLessonGroup: ['group'],
  getLessonLearning: null,
  setLessonLearning: ['learned'],
  toggleLessonList: null,
  setCurrentLesson: ['id'],
  learnLesson: ['id'],
})

export const LessonTypes = Types
export default Creators

const INITIAL_STATE = Immutable({
  lessons: [],
  group: [],
  learned: [],
  openList: false,
  currentLesson: null,
})

const setLesson = (state = INITIAL_STATE, { lessons }) => ({
  ...state,
  lessons,
})

const setLessonGroup = (state = INITIAL_STATE, { group }) => ({
  ...state,
  group,
})

const setLessonLearning = (state = INITIAL_STATE, { learned }) => ({
  ...state,
  learned,
})

const toggleLessonList = (state = INITIAL_STATE) => ({
  ...state,
  openList: !state.openList,
})

const setCurrentLesson = (state = INITIAL_STATE, { id }) => ({
  ...state,
  currentLesson: id,
})

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_LESSON]: setLesson,
  [Types.SET_LESSON_GROUP]: setLessonGroup,
  [Types.SET_LESSON_LEARNING]: setLessonLearning,
  [Types.TOGGLE_LESSON_LIST]: toggleLessonList,
  [Types.SET_CURRENT_LESSON]: setCurrentLesson,
})
