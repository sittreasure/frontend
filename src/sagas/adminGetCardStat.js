import { call, put, fork, takeEvery } from 'redux-saga/effects'

import axios from '../libs/axios'
import { accessToken } from '../utils'
import AdminActions, { AdminTypes } from '../redux/adminStore'

function* getCardStat() {
  try {
    let stat
    yield call(async () => {
      const { data } = await axios.get('/mainapi/v1/admins/cardStat/', {
        headers: {
          Authorization: `Bearer ${accessToken.getToken()}`,
        },
      })
      stat = data
    })
    yield put(AdminActions.setCardStat(stat))
  } catch (error) {
    console.log('>>> [adminGetCardStat.js:20] error : ', error)
  }
}

function* getCardStatListener() {
  yield takeEvery(AdminTypes.GET_CARD_STAT, getCardStat)
}

export default function* cardstatsaga() {
  yield fork(getCardStatListener)
}
