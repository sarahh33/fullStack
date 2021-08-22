import anecdoteService from '../services/anecdotes'
const initialState = 'Nothing happens yet'

const notiReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'VOTING_NOTI':
      return `You voted '${action.data.content}' `
    case 'INITIAL':
      return initialState
    default:
      return state
  }
}

let time
export const notiChange = (content, delay) => {
  return async dispatch => {
    clearTimeout(time)

    dispatch({
      type: 'VOTING_NOTI',
      data: { content }
    })
    time = setTimeout(() => { (dispatch(notiBack())) }, delay*1000);
    
  }
}

const notiBack = () => {
  console.log('notiback')
  return ({
    type: 'INITIAL',
    initialState
  })
}

export default notiReducer