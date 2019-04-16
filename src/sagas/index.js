import { all } from 'redux-saga/effects'

import directoryMetadata from './directoryMetadata'
import directoryData from './directoryData'
import playgroundCompile from './playgroundCompile'
import playgroundCheckCompile from './playgroundCheckCompile'
import playgroundCompileLog from './playgroundCompileLog'

export default function* () {
  yield all([
    directoryMetadata(),
    directoryData(),
    playgroundCompile(),
    playgroundCheckCompile(),
    playgroundCompileLog(),
  ])
}