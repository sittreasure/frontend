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

const patternMetadatas = (datas, prefixName) => {
  let directory = []
  prefixName = prefixName.split('/')
  prefixName.pop()
  datas.map(data => {
    let name = data.object_name.split('/')
    prefixName.map(() => name.shift())
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
  return directory
}

const addMetadata = (parents, metadatas) => {
  parents.map(data => {
    if (data.isDir) {
      if (metadatas[0].object_name.search(data.id) !== -1) {
        let inside = data.data
        if (inside.length === 0) {
          data.data = patternMetadatas(metadatas, data.id)
        }
        else {
          addMetadata(inside, metadatas)
        }
      }
    }
  })
  return [...parents]
}

const setMetadata = (state = INITIAL_STATE, { datas }) => {
  if (state.directory.length === 0) {
    return {
      ...state,
      directory: patternMetadatas(datas, 'playground/'),
    }
  }
  return {
    ...state,
    directory: addMetadata(state.directory, datas),
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
