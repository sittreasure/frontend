import { all } from 'redux-saga/effects'

import directoryMetadata from './directoryMetadata'
import directoryData from './directoryData'

export default function* () {
  yield all([
    directoryMetadata(),
    directoryData(),
  ])
}
