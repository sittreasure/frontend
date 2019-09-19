import { call, put, fork, takeEvery, select } from 'redux-saga/effects'

import axios from '../libs/axios'
import { accessToken } from '../utils'
import LessonActions, { LessonTypes } from '../redux/lessonStore'

function* learnLesson({ id }) {
  try {
    const user = yield select(state => state.userStore.user)
    yield call(async () => {
      const body = {
        user: user.id,
        lesson: id,
      }
      await axios.post('mainapi/v1/lessons/learning/', body, {
        headers: {
          Authorization: `Bearer ${accessToken.getToken()}`,
        },
      })
    })
    yield put(LessonActions.getLessonLearning())
  } catch (error) {
    console.log('>>> [lessonLearnLesson.js:23] error : ', error)
  }
}

function* learnLessonListener() {
  yield takeEvery(LessonTypes.LEARN_LESSON, learnLesson)
}

export default function* learnlessonsaga() {
  yield fork(learnLessonListener)
}
