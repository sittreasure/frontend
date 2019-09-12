import { call, put, fork, takeEvery } from 'redux-saga/effects'

import axios from '../libs/axios'
import { accessToken } from '../utils'
import LessonActions, { LessonTypes } from '../redux/lessonStore'

function* getLesson() {
  try {
    let lessons
    yield call(async () => {
      const { data } = await axios.get('/mainapi/v1/lessons/', {
        headers: {
          Authorization: `Bearer ${accessToken.getToken()}`,
        },
      })
      lessons = data
    })
    yield put(LessonActions.setLesson(lessons))
  } catch (error) {
    console.log('>>> [lessonGetLesson.js:20] error : ', error)
  }
}

function* getLessonListener() {
  yield takeEvery(LessonTypes.GET_LESSON, getLesson)
}

export default function* lessonsaga() {
  yield fork(getLessonListener)
}
