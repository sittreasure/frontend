import { call, put, fork, takeEvery } from 'redux-saga/effects'

import axios from '../libs/axios'
import { accessToken } from '../utils'
import AdminActions, { AdminTypes } from '../redux/adminStore'

function* changeUserRole({ id, isAdmin }) {
  try {
    yield call(async () => {
      await axios.patch(
        `/mainapi/v1/user/${id}/`,
        { isAdmin },
        {
          headers: {
            Authorization: `Bearer ${accessToken.getToken()}`,
          },
        }
      )
    })
    yield put(AdminActions.getUsers())
  } catch (error) {
    console.log('>>> [adminChangeUserRole.js:22] error : ', error)
  }
}

function* changeUserRoleListener() {
  yield takeEvery(AdminTypes.CHANGE_ROLE_USER, changeUserRole)
}

export default function* changeuserrolesaga() {
  yield fork(changeUserRoleListener)
}
