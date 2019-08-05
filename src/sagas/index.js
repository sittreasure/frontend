import { all } from 'redux-saga/effects'

import userLoginFacebook from './userLoginFacebook'
import userMe from './userMe'
import directoryMetadata from './directoryMetadata'
import directoryData from './directoryData'
import directoryRemoveData from './directoryRemoveData'
import directoryFileType from './directoryFileType'
import playgroundCompile from './playgroundCompile'
import playgroundCheckCompile from './playgroundCheckCompile'
import playgroundCompileLog from './playgroundCompileLog'
import playgroundSave from './playgroundSave'

export default function*() {
  yield all([
    userLoginFacebook(),
    userMe(),
    directoryMetadata(),
    directoryData(),
    directoryRemoveData(),
    directoryFileType(),
    playgroundCompile(),
    playgroundCheckCompile(),
    playgroundCompileLog(),
    playgroundSave(),
  ])
}
