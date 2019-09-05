import { all } from 'redux-saga/effects'

import userLoginFacebook from './userLoginFacebook'
import userMe from './userMe'
import directoryCreateBucket from './directoryCreateBucket'
import directoryMetadata from './directoryMetadata'
import directoryData from './directoryData'
import directoryRemoveData from './directoryRemoveData'
import directorySaveData from './directorySaveData'
import directoryFileType from './directoryFileType'
import playgroundCompile from './playgroundCompile'
import playgroundCheckCompile from './playgroundCheckCompile'
import playgroundCompileLog from './playgroundCompileLog'

export default function*() {
  yield all([
    userLoginFacebook(),
    userMe(),
    directoryCreateBucket(),
    directoryMetadata(),
    directoryData(),
    directoryRemoveData(),
    directorySaveData(),
    directoryFileType(),
    playgroundCompile(),
    playgroundCheckCompile(),
    playgroundCompileLog(),
  ])
}
