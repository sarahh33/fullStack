import anecdoteService from '../services/anecdotes'
const initialState = 'Nothing happens yet'

const notiReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'VOTING_NOTI':
      console.log('123')
      console.log(action.content)
      return `You voted '${action.data.content}' `
    case 'INITIAL':
      return initialState
    default:
      return state
  }
}

let time
export const notiChange = (content, time) => {
  return async dispatch => {
    clearTimeout(time)
    dispatch({type: 'VOTING_NOTI',
    data: {content}  })
    time = setTimeout(() => {(dispatch(notiBack()))}, 5000);
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