import { call, put, fork, takeEvery } from 'redux-saga/effects'

import axios from '../libs/axios'
import UserActions, { UserTypes } from '../redux/userStore'
import { accessToken } from '../utils'

function* me() {
  try {
    let user
    yield call(async () => {
      const { data } = await axios.get('/mainapi/v1/user/me/', {
        headers: {
          Authorization: `Bearer ${accessToken.getToken()}`,
        },
      })
      user = data
    })
    yield put(UserActions.setUser(user))
  } catch (error) {
    console.log('>>> [userMe.js:20] error : ', error)
  }
}

function* meListener() {
  yield takeEvery(UserTypes.ME, me)
}

export default function* mesaga() {
  yield fork(meListener)
}
