import { call, put, fork, takeEvery } from 'redux-saga/effects'

import axios from '../libs/axios'
import { accessToken } from '../utils'
import DirectoryActions, { DirectoryTypes } from '../redux/directoryStore'

function* createBucket() {
  try {
    let hasBucket
    yield call(async () => {
      const { data } = await axios.post('fileapi/v1/minios/bucket/', null, {
        headers: {
          Authorization: `Bearer ${accessToken.getToken()}`,
        },
      })
      hasBucket = data.result
    })
    yield put(DirectoryActions.setHasBucket(hasBucket))
  } catch (error) {
    console.log('>>> [directoryCreateBucket.js:20] error : ', error)
  }
}

function* createBucketListener() {
  yield takeEvery(DirectoryTypes.CREATE_BUCKET, createBucket)
}

export default function* createbucketsaga() {
  yield fork(createBucketListener)
}
