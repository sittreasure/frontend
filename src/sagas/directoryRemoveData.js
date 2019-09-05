import { call, put, fork, takeEvery } from 'redux-saga/effects'

import axios from '../libs/axios'
import { accessToken } from '../utils'
import DirectoryActions, { DirectoryTypes } from '../redux/directoryStore'

function* removeData({ id }) {
  try {
    let response
    yield call(async () => {
      const { data } = await axios.delete('/fileapi/v1/minios/file', {
        params: {
          object_name: id,
        },
        headers: {
          Authorization: `Bearer ${accessToken.getToken()}`,
        },
      })
      response = data
    })
    if (response.result) {
      yield put(DirectoryActions.removeFile(id))
    }
  } catch (error) {
    console.log('>>> [directoryRemoveData.js:17] error : ', error)
  }
}

function* removeDataListener() {
  yield takeEvery(DirectoryTypes.REMOVE_DATA, removeData)
}

export default function* removedatasaga() {
  yield fork(removeDataListener)
}
