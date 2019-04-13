import { call, put, fork, takeEvery } from 'redux-saga/effects'

import axios from '../libs/axios'
import PlaygroundActions, { PlaygroundTypes } from '../redux/playgroundStore'

function* getCompileLog({ name }) {
  try {
    let jenkinsResult
    yield call(async () => {
      const { data } = await axios.get(`/mainapi/v1/jenkins/log/?job_name=${name}`)
      jenkinsResult = data
    })
    yield put(PlaygroundActions.setCompileLog(jenkinsResult.log))
  } catch (error) {
    console.log('>>> [pkaygroundCompileLog.js:15] error : ', error)
  }
}

function* getCompileLogListener() {
  yield takeEvery(PlaygroundTypes.GET_COMPILE_LOG, getCompileLog)
}

export default function* compilelogsaga() {
  yield fork(getCompileLogListener)
}
