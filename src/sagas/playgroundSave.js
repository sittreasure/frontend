import { call, put, fork, takeEvery } from 'redux-saga/effects'

import axios from '../libs/axios'
import { PlaygroundTypes } from '../redux/playgroundStore'
import DirectoryActions from '../redux/directoryStore'

function* save({ id, objectData }) {
  try {
    let response
    yield call(async () => {
      const body = {
        name: id,
        objectData: objectData,
      }
      const { data } = await axios.post('/fileapi/v1/minios/file', body)
      response = data
    })
    yield put(DirectoryActions.setSave(id, response.result))
  } catch (error) {
    console.log('>>> [playgroundSave.js:20] error : ', error)
  }
}

function* saveListener() {
  yield takeEvery(PlaygroundTypes.SAVE, save)
}

export default function* savesaga() {
  yield fork(saveListener)
}
