import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  getMetadata: ['prefix'],
  setMetadata: ['datas'],
  getData: ['id'],
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
      save: true,
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
    if (metadatas[0].object_name.search(data.id) !== -1) {
      if (data.data.length === 0) {
        data.data = patternMetadatas(metadatas, data.id)
      }
      else {
        addMetadata(data.data, metadatas)
      }
    }
  })
  return [...parents]
}

const addData = (parents, id, data) => {
  for (let i = 0; i < parents.length; i++) {
    const child = parents[i]
    if (child.id === id) {
      child.data = data
      break
    }
    else {
      if (child.isDir && id.search(child.id) !== -1) {
        addData(child.data, id, data)
      }
    }
  }
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

const setData = (state = INITIAL_STATE, { id, data }) => ({
  ...state,
  directory: addData(state.directory, id, data),
})

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_METADATA]: setMetadata,
  [Types.SET_DATA]: setData,
})
