import { call, put, fork, takeEvery } from 'redux-saga/effects'

import axios from '../libs/axios'
import { accessToken } from '../utils'
import PlaygroundActions, { PlaygroundTypes } from '../redux/playgroundStore'

function* compile({ name }) {
  try {
    let jenkinsResult
    yield call(async () => {
      const body = {
        jobName: name,
        folder: 'playground',
      }
      const { data } = await axios.post('/mainapi/v1/jenkins/', body, {
        headers: {
          Authorization: `Bearer ${accessToken.getToken()}`,
        },
      })
      jenkinsResult = data
    })
    yield put(PlaygroundActions.setIsCompile(jenkinsResult.result))
  } catch (error) {
    console.log('>>> [playgroundCompile.js:18] error : ', error)
  }
}

function* compileListener() {
  yield takeEvery(PlaygroundTypes.COMPILE, compile)
}

export default function* compilesaga() {
  yield fork(compileListener)
}
