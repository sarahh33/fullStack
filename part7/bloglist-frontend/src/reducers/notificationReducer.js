const notificationReducer = (state = {}, action) => {
  switch (action.type) {
  case 'NOTIFICATION':
    return { message: action.payload.message, color:action.payload.color }
  case 'CLEAR':
    return {}
  default:
    return state

  }
}
let time

export const setNotification = ( message, color ) => async (dispatch) => {
  console.log(`message ${message}`)
  dispatch({
    type:'NOTIFICATION',
    payload:{ message, color }
  })
  clearTimeout(time)

  time = setTimeout(() => {
    dispatch({ type:'CLEAR' })
  }, 10000)
}

export const setClearNoti = () => {
  return { type:'CLEAR' }
}

export default notificationReducer