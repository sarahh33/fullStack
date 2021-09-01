import loginService from '../services/login'
import blogService from '../services/blogs'

const userReducer =(state = {}, action) => {
  switch (action.type) {
  case 'LOGIN':
  case 'AFTERLOG':
    console.log('starting point')
    console.log(action.data)
    return  action.data
  case 'LOGOUT':
    return {}
  default:
    return state
  }
}

export const userLogged = (user) => {
  return {
    type: 'AFTERLOG',
    data: { user }
  }
}

export const userLogout =() => {
  return { type:'LOGOUT' }
}

export const userLogin =({ username, password }) => {
  return async (dispatch) => {
    const user = await loginService.login( username, password )
    blogService.setToken (user.token)
    window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
    dispatch({ type: 'LOGIN', data: { user } })
  }
}

export default userReducer