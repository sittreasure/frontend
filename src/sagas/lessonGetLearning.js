import { call, put, fork, takeEvery } from 'redux-saga/effects'

import axios from '../libs/axios'
import { accessToken } from '../utils'
import LessonActions, { LessonTypes } from '../redux/lessonStore'

function* getLessonLearning() {
  try {
    let learnings
    yield call(async () => {
      const { data } = await axios.get('/mainapi/v1/lessons/learning/', {
        headers: {
          Authorization: `Bearer ${accessToken.getToken()}`,
        },
      })
      learnings = data
    })
    const learned = []
    learnings.map(learning => learned.push(learning.lesson))
    yield put(LessonActions.setLessonLearning(learned))
    yield put(LessonActions.setCurrentLesson(learned[learned.length - 1]))
  } catch (error) {
    console.log('>>> [lessonGetLearning.js:23] error : ', error)
  }
}

function* getLessonLearningListener() {
  yield takeEvery(LessonTypes.GET_LESSON_LEARNING, getLessonLearning)
}

export default function* lessonlearningsaga() {
  yield fork(getLessonLearningListener)
}
