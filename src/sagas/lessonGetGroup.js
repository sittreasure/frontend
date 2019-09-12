import { call, put, fork, takeEvery } from 'redux-saga/effects'

import axios from '../libs/axios'
import { accessToken } from '../utils'
import LessonActions, { LessonTypes } from '../redux/lessonStore'

function* getLessonGroup() {
  try {
    let group
    yield call(async () => {
      const { data } = await axios.get('/mainapi/v1/lessons/group/', {
        headers: {
          Authorization: `Bearer ${accessToken.getToken()}`,
        },
      })
      group = data
    })
    yield put(LessonActions.setLessonGroup(group))
  } catch (error) {
    console.log('>>> [lessonGetGroup.js:20] error : ', error)
  }
}

function* getLessonGroupListener() {
  yield takeEvery(LessonTypes.GET_LESSON_GROUP, getLessonGroup)
}

export default function* lessongroupsaga() {
  yield fork(getLessonGroupListener)
}
