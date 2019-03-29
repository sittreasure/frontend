import { call, put, fork, takeEvery } from 'redux-saga/effects'

import axios from '../libs/axios'
import DirectoryActions, { DirectoryTypes } from '../redux/directoryStore'

function* getData({ id = '' }) {
  try {
    let objectData
    yield call(async () => {
      const { data } = await axios.get(`minios/file?object_name=${id}`)
      objectData = data
    })
    yield put(DirectoryActions.setData(id, objectData.object_data))
  } catch (error) {
    console.log('>>> [directoryData.js:15] error : ', error)
  }
}

function* getDataListener() {
  yield takeEvery(DirectoryTypes.GET_DATA, getData)
}

export default function* datasaga() {
  yield fork(getDataListener)
}
