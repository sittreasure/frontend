const key = 'token'

const getToken = () => localStorage.getItem(key)
const setToken = token => localStorage.setItem(key, token)
const removeToken = () => localStorage.removeItem(key)

export default {
  getToken,
  setToken,
  removeToken,
}
