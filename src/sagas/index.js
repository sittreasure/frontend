import { all } from 'redux-saga/effects'

import directoryMetadata from './directoryMetadata'
import directoryData from './directoryData'
import playgroundCompile from './playgroundCompile'

export default function* () {
  yield all([
    directoryMetadata(),
    directoryData(),
    playgroundCompile(),
  ])
}
