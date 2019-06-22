import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  loginFacebook: ['id', 'name', 'surname', 'image'],
})

export const LoginTypes = Types
export default Creators
