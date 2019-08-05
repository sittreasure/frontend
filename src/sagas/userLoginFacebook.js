import { call, fork, takeEvery } from 'redux-saga/effects'

import axios from '../libs/axios'
import { UserTypes } from '../redux/userStore'
import { accessToken } from '../utils'

function* loginFacebook({ id, name, surname, image }) {
  try {
    yield call(async () => {
      const { data } = await axios.post('/mainapi/v1/user/fb-login/', {
        fbId: id,
        fbName: name,
        fbSurname: surname,
        fbImg: image,
      })
      await accessToken.setToken(data.accessToken)
    })
  } catch (error) {
    console.log('>>> [loginFacebook.js:19] error : ', error)
  }
}

function* loginFacebookListener() {
  yield takeEvery(UserTypes.LOGIN_FACEBOOK, loginFacebook)
}

export default function* loginfacebooksaga() {
  yield fork(loginFacebookListener)
}
