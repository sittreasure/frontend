import { call, put, fork, takeEvery } from 'redux-saga/effects'

import axios from '../libs/axios'
import { accessToken } from '../utils'
import DirectoryActions, { DirectoryTypes } from '../redux/directoryStore'

function* getFileType() {
  try {
    let fileType
    yield call(async () => {
      const { data } = await axios.get(
        '/fileapi/v1/file/',
        {
          headers: {
            Authorization: `Bearer ${accessToken.getToken()}`,
          },
        }
      )
      fileType = data
    })
    yield put(DirectoryActions.setFileType(fileType))
  } catch (error) {
    console.log('>>> [directoryFileType.js:15] error : ', error)
  }
}

function* getFileTypeListener() {
  yield takeEvery(DirectoryTypes.GET_FILE_TYPE, getFileType)
}

export default function* filetypesaga() {
  yield fork(getFileTypeListener)
}
