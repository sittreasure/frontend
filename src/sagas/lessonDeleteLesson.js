import { call, put, fork, takeEvery } from 'redux-saga/effects'

import axios from '../libs/axios'
import { accessToken } from '../utils'
import LessonActions, { LessonTypes } from '../redux/lessonStore'

function* deleteLesson({ id }) {
  try {
    yield call(async () => {
      await axios.delete(`/mainapi/v1/lessons/${id}/`, {
        headers: {
          Authorization: `Bearer ${accessToken.getToken()}`,
        },
      })
    })
    yield put(LessonActions.getLesson())
  } catch (error) {
    console.log('>>> [lessonDeleteLesson.js:18] error : ', error)
  }
}

function* deleteLessonListener() {
  yield takeEvery(LessonTypes.DELETE_LESSON, deleteLesson)
}

export default function* deletelessonsaga() {
  yield fork(deleteLessonListener)
}
