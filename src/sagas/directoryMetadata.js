import { call, put, fork, takeEvery } from 'redux-saga/effects'

import axios from '../libs/axios'
import { accessToken } from '../utils'
import DirectoryActions, { DirectoryTypes } from '../redux/directoryStore'

function* getMetadata({ prefix = '' }) {
  try {
    let metadata
    yield call(async () => {
      const { data } = await axios.get('/fileapi/v1/minios/file/', {
        params: {
          prefix_name: prefix,
        },
        headers: {
          Authorization: `Bearer ${accessToken.getToken()}`,
        },
      })
      if (data.length === 0) {
        const { data } = await axios.get('/fileapi/v1/minios/folder/', {
          params: {
            folder_name: prefix,
          },
          headers: {
            Authorization: `Bearer ${accessToken.getToken()}`,
          },
        })
        if (data.result) {
          const { data } = await axios.get('/fileapi/v1/minios/file/', {
            params: {
              prefix_name: prefix,
            },
            headers: {
              Authorization: `Bearer ${accessToken.getToken()}`,
            },
          })
          metadata = data
        }
      } else {
        metadata = data
      }
    })
    yield put(DirectoryActions.setMetadata(metadata))
  } catch (error) {
    console.log('>>> [directoryMetadata.js:45] error : ', error)
  }
}

function* getMetadataListener() {
  yield takeEvery(DirectoryTypes.GET_METADATA, getMetadata)
}

export default function* metadatasaga() {
  yield fork(getMetadataListener)
}
