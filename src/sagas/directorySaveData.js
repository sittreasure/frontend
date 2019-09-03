import { call, put, fork, takeEvery } from 'redux-saga/effects'

import axios from '../libs/axios'
import { accessToken } from '../utils'
import DirectoryActions, { DirectoryTypes } from '../redux/directoryStore'

function* saveData({ id, objectData }) {
  try {
    let response
    yield call(async () => {
      const body = {
        name: id,
        objectData,
      }
      const { data } = await axios.post('/fileapi/v1/minios/file', body, {
        headers: {
          Authorization: `Bearer ${accessToken.getToken()}`,
        },
      })
      response = data
    })
    yield put(DirectoryActions.setSave(id, response.result))
  } catch (error) {
    console.log('>>> [playgroundSave.js:19] error : ', error)
  }
}

function* saveDataListener() {
  yield takeEvery(DirectoryTypes.SAVE_DATA, saveData)
}

export default function* savedatasaga() {
  yield fork(saveDataListener)
}
