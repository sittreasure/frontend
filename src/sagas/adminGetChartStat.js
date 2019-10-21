import { call, put, fork, takeEvery } from 'redux-saga/effects'

import axios from '../libs/axios'
import { accessToken } from '../utils'
import AdminActions, { AdminTypes } from '../redux/adminStore'

function* getChartStat() {
  try {
    let stat
    yield call(async () => {
      const { data } = await axios.get('/mainapi/v1/admins/chartStat/', {
        headers: {
          Authorization: `Bearer ${accessToken.getToken()}`,
        },
      })
      stat = data
    })
    yield put(AdminActions.setChartStat(stat))
  } catch (error) {
    console.log('>>> [adminGetChartStat.js:20] error : ', error)
  }
}

function* getChartStatListener() {
  yield takeEvery(AdminTypes.GET_CHART_STAT, getChartStat)
}

export default function* chartstatsaga() {
  yield fork(getChartStatListener)
}
