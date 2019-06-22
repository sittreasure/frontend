import { call, fork, takeEvery } from 'redux-saga/effects'

import axios from '../libs/axios'
import { LoginTypes } from '../redux/loginStore'
import { accessToken } from '../utils'

function* loginFacebook({ id, name, surname, image }) {
  try {
    let token
    yield call(async () => {
      const { data } = await axios.post(
        '/mainapi/v1/user/fb-login/',
        {
          fbId: id,
          fbName: name,
          fbSurname: surname,
          fbImg: image,
        }
      )
      token = data.accessToken
    })
    accessToken.setToken(token)
  } catch (error) {
    console.log('>>> [loginFacebook.js:24] error : ', error)
  }
}

function* loginFacebookListener() {
  yield takeEvery(LoginTypes.LOGIN_FACEBOOK, loginFacebook)
}

export default function* loginfacebooksaga() {
  yield fork(loginFacebookListener)
}
