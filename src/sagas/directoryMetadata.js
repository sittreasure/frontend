import { call, put, fork, takeEvery } from 'redux-saga/effects'

import axios from '../libs/axios'
import DirectoryActions, { DirectoryTypes } from '../redux/directoryStore'

function* getMetadata({ prefix = '' }) {
  try {
    let metadata
    yield call(async () => {
      const { data } = await axios.get(`minios/file?prefix_name=${prefix}`)
      metadata = data
    })
    yield put(DirectoryActions.setMetadata(metadata))
  } catch (error) {
    console.log('>>> [directoryMetadata.js:15] error : ', error)
  }
}

function* getMetadataListener() {
  yield takeEvery(DirectoryTypes.GET_METADATA, getMetadata)
}

export default function* metadatasaga() {
  yield fork(getMetadataListener)
}
