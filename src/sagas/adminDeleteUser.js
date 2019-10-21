import { call, put, fork, takeEvery } from 'redux-saga/effects'

import axios from '../libs/axios'
import { accessToken } from '../utils'
import AdminActions, { AdminTypes } from '../redux/adminStore'

function* deleteUser({ id }) {
  try {
    yield call(async () => {
      await axios.delete(`/mainapi/v1/user/${id}/`, {
        headers: {
          Authorization: `Bearer ${accessToken.getToken()}`,
        },
      })
    })
    yield put(AdminActions.getUsers())
  } catch (error) {
    console.log('>>> [adminDeleteUser.js:21] error : ', error)
  }
}

function* deleteUserListener() {
  yield takeEvery(AdminTypes.DELETE_USER, deleteUser)
}

export default function* deleteUsersaga() {
  yield fork(deleteUserListener)
}
