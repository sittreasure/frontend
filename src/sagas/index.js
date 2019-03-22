import { all } from 'redux-saga/effects'

import directoryMetadata from './directoryMetadata'

export default function* () {
  yield all([
    directoryMetadata(),
  ])
}
