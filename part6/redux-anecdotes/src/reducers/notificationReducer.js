const initialState = 'nothing happens'

const notiReducer = (state=initialState, action)=> {
    switch(action.type) {
        case 'VOTING_NOTI':
            return `You votes '${action.data.content}' `
        case 'INITIAL':
          return initialState
        default:
            return state
    }
}


export const notiChange = (content) => {
    return ({
      type: 'VOTING_NOTI',
      data: { content }
    })
  }

export default notiReducer