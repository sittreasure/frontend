import { call, put, fork, takeEvery, select } from 'redux-saga/effects'

import axios from '../libs/axios'
import { accessToken } from '../utils'
import LessonActions, { LessonTypes } from '../redux/lessonStore'

function* editLesson({ id, data }) {
  try {
    const user = yield select(state => state.userStore.user)
    yield call(async () => {
      const body = {
        description: data,
        addedBy: user.id,
      }
      await axios.patch(`/mainapi/v1/lessons/${id}/`, body, {
        headers: {
          Authorization: `Bearer ${accessToken.getToken()}`,
        },
      })
    })
    yield put(LessonActions.getLesson())
  } catch (error) {
    console.log('>>> [lessonEditLesson.js:23] error : ', error)
  }
}

function* editLessonListener() {
  yield takeEvery(LessonTypes.EDIT_LESSON, editLesson)
}

export default function* editlessonsaga() {
  yield fork(editLessonListener)
}
