import  userListService  from '../services/user'

const userListReducer = (state = [], action) => {
  switch (action.type) {
  case 'SHOWALL':
    return action.data.users
  default:
    return state
  }
}

export const userListDisplay= () => {
  return async (dispatch) => {
    const response = await userListService.getAllUsers()
    dispatch({
      type:'SHOWALL',
      data: { users:response }
    })
  }
}

export default userListReducer