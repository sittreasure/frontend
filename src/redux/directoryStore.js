import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  getMetadata: ['prefix'],
  setMetadata: ['datas'],
  getData: null,
  setData: ['id', 'data'],
})

export const DirectoryTypes = Types
export default Creators

const INITIAL_STATE = Immutable({
  directory: [],
})

// const findDirectory = (id, data) => {

// }

const setMetadata = (state = INITIAL_STATE, { datas }) => {
  let directory = []
  datas.map(data => {
    let name = data.object_name.split('/')
    name.shift()
    let metadata = {
      id: data.object_name,
      objectName: name.join('/'),
      isDir: false,
      data: null,
    }
    if (data.is_dir) {
      metadata.isDir = true
      metadata.data = []
    }
    directory.push(metadata)
  })
  if (state.directory.length === 0) {
    return {
      ...state,
      directory: directory,
    }
  }

}

const setData = () => ({})
// const setData = (state = INITIAL_STATE, { id, data }) => ({
//   ...state,
// })

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_METADATA]: setMetadata,
  [Types.SET_DATA]: setData,
})
