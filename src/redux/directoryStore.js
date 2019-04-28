import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  getMetadata: ['prefix'],
  setMetadata: ['datas'],
  addFolder: ['id', 'data'],
  getData: ['id'],
  setData: ['id', 'data'],
  setSave: ['id', 'save'],
  addFile: ['id', 'data'],
  removeData: ['id'],
  removeFile: ['id'],
  getFileType: null,
  setFileType: ['fileTypes'],
  setContextMenu: ['show', 'x', 'y', 'overflow', 'isDir'],
  setContextMenuId: ['id'],
  toggleContextMenuNewFolder: null,
  toggleContextMenuNewFile: null,
  toggleContextMenuRemove: null,
})

export const DirectoryTypes = Types
export default Creators

const INITIAL_STATE = Immutable({
  directory: [],
  fileType: [],
  contextMenu: {
    show: false,
    x: 0,
    y: 0,
    overflow: false,
    isDir: false,
    id: null,
    showNewFolder: false,
    showNewFile: false,
    showRemove: false,
  },
})

const patternMetadatas = (datas, prefixName) => {
  let directory = []
  prefixName = prefixName.split('/')
  prefixName.pop()
  datas.map(data => {
    let name = data.name.split('/')
    prefixName.map(() => name.shift())
    let metadata = {
      id: data.name,
      name: name.join('/'),
      data: null,
      save: true,
    }
    if (data.isDir) {
      metadata.isDir = true
      metadata.data = []
      delete metadata.save
    }
    directory.push(metadata)
  })
  return directory
}

const addMetadata = (parents, metadatas) => {
  parents.map(data => {
    if (metadatas[0].name.search(data.id) !== -1) {
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

const createFolder = (parents, id, data) => {
  for (let i = 0; i < parents.length; i++) {
    const child = parents[i]
    if (child.isDir && child.id === id) {
      child.data = [
        ...child.data,
        data,
      ]
      break
    }
    else {
      if (child.isDir && id.search(child.id) !== -1) {
        createFolder(child.data, id, data)
      }
    }
  }
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

const addSave = (parents, id, data) => {
  for (let i = 0; i < parents.length; i++) {
    const child = parents[i]
    if (child.id === id) {
      child.save = data
      break
    }
    else {
      if (child.isDir && id.search(child.id) !== -1) {
        addSave(child.data, id, data)
      }
    }
  }
  return [...parents]
}

const createFile = (parents, id, data) => {
  for (let i = 0; i < parents.length; i++) {
    const child = parents[i]
    if (child.isDir && child.id === id) {
      child.data = [
        ...child.data,
        data,
      ]
      break
    }
    else {
      if (child.isDir && id.search(child.id) !== -1) {
        createFile(child.data, id, data)
      }
    }
  }
  return [...parents]
}

const deleteFile = (parents, id) => {
  for (let i = 0; i < parents.length; i++) {
    const child = parents[i]
    if (child.id === id) {
      parents.splice(i, 1)
      break
    }
    else {
      if (child.isDir && id.search(child.id) !== -1) {
        deleteFile(child.data, id)
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

const addFolder = (state = INITIAL_STATE, { id, data }) => {
  if (id === 'playground/') {
    return {
      ...state,
      directory: [
        ...state.directory,
        data,
      ],
    }
  }
  return {
    ...state,
    directory: createFolder(state.directory, id, data),
  }
}

const setData = (state = INITIAL_STATE, { id, data }) => ({
  ...state,
  directory: addData(state.directory, id, data),
})

const setSave = (state = INITIAL_STATE, { id, save }) => ({
  ...state,
  directory: addSave(state.directory, id, save),
})

const addFile = (state = INITIAL_STATE, { id, data }) => {
  if (id === 'playground/') {
    return {
      ...state,
      directory: [
        ...state.directory,
        data,
      ],
    }
  }
  return {
    ...state,
    directory: createFile(state.directory, id, data),
  }
}

const removeFile = (state = INITIAL_STATE, { id }) => ({
  ...state,
  directory: deleteFile(state.directory, id),
})

const setFileType = (state = INITIAL_STATE, { fileTypes }) => ({
  ...state,
  fileType: fileTypes,
})

const setContextMenu = (state = INITIAL_STATE, { show, x, y, overflow, isDir }) => ({
  ...state,
  contextMenu: {
    ...state.contextMenu,
    show,
    x,
    y,
    overflow,
    isDir,
  },
})

const setContextMenuId = (state = INITIAL_STATE, { id }) => ({
  ...state,
  contextMenu: {
    ...state.contextMenu,
    id,
  },
})

const toggleContextMenuNewFolder = (state = INITIAL_STATE) => ({
  ...state,
  contextMenu: {
    ...state.contextMenu,
    showNewFolder: !state.contextMenu.showNewFolder,
  },
})

const toggleContextMenuNewFile = (state = INITIAL_STATE) => ({
  ...state,
  contextMenu: {
    ...state.contextMenu,
    showNewFile: !state.contextMenu.showNewFile,
  },
})

const toggleContextMenuRemove = (state = INITIAL_STATE) => ({
  ...state,
  contextMenu: {
    ...state.contextMenu,
    showRemove: !state.contextMenu.showRemove,
  },
})

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_METADATA]: setMetadata,
  [Types.ADD_FOLDER]: addFolder,
  [Types.SET_DATA]: setData,
  [Types.SET_SAVE]: setSave,
  [Types.ADD_FILE]: addFile,
  [Types.REMOVE_FILE]: removeFile,
  [Types.SET_FILE_TYPE]: setFileType,
  [Types.SET_CONTEXT_MENU]: setContextMenu,
  [Types.SET_CONTEXT_MENU_ID]: setContextMenuId,
  [Types.TOGGLE_CONTEXT_MENU_NEW_FOLDER]: toggleContextMenuNewFolder,
  [Types.TOGGLE_CONTEXT_MENU_NEW_FILE]: toggleContextMenuNewFile,
  [Types.TOGGLE_CONTEXT_MENU_REMOVE]: toggleContextMenuRemove,
})
