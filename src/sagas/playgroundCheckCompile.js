import { call, put, fork, takeEvery } from 'redux-saga/effects'

import axios from '../libs/axios'
import { accessToken } from '../utils'
import PlaygroundActions, { PlaygroundTypes } from '../redux/playgroundStore'

function* checkCompile({ name }) {
  try {
    let jenkinsResult
    yield call(async () => {
      const { data } = await axios.get('/mainapi/v1/jenkins/build/', {
        params: {
          job_name: name,
        },
        headers: {
          Authorization: `Bearer ${accessToken.getToken()}`,
        },
      })
      jenkinsResult = data
    })
    if (!jenkinsResult.result) {
      yield put(PlaygroundActions.setIsCompile(jenkinsResult.result))
    }
  } catch (error) {
    console.log('>>> [playgroundCheckCompile.js:17] error : ', error)
  }
}

function* checkCompileListener() {
  yield takeEvery(PlaygroundTypes.CHECK_COMPILE, checkCompile)
}

export default function* checkcompilesaga() {
  yield fork(checkCompileListener)
}
