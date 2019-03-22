import { call, put, fork, takeLatest } from 'redux-saga/effects'

import axios from '../libs/axios'
import DirectoryActions, { DirectoryTypes } from '../redux/directoryStore'

function* getMetadata({ prefix = '' }) {
  try {
    let metadata
    yield call(async () => {
      const { data } = await axios.get(`minios/file?prefix_name=${prefix}`)
      metadata = data
    })
    console.log('>>> [directoryMetadata.js:13] metadata : ', metadata)
    yield put(DirectoryActions.setMetadata(metadata.object_name, metadata))
  } catch (error) {
    console.log('>>> [directoryMetadata.js:15] error : ', error)
  }
}

function* getMetadataListener() {
  yield takeLatest(DirectoryTypes.GET_METADATA, getMetadata)
}

export default function* metadatasaga() {
  yield fork(getMetadataListener)
}
