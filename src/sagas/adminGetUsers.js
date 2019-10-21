import { call, put, fork, takeEvery } from 'redux-saga/effects'

import axios from '../libs/axios'
import { accessToken } from '../utils'
import AdminActions, { AdminTypes } from '../redux/adminStore'

function* getUsers() {
  try {
    let users
    yield call(async () => {
      const { data } = await axios.get('/mainapi/v1/admins/userStat/', {
        headers: {
          Authorization: `Bearer ${accessToken.getToken()}`,
        },
      })
      users = data
    })
    yield put(AdminActions.setUsers(users))
  } catch (error) {
    console.log('>>> [adminGetUsers.js:20] error : ', error)
  }
}

function* getUsersListener() {
  yield takeEvery(AdminTypes.GET_USERS, getUsers)
}

export default function* userssaga() {
  yield fork(getUsersListener)
}
