import Anecdote from '../components/AnecdoteList'
import anecdoteService from '../services/anecdotes'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return state.concat(action.data)
    case 'VOTING':
      const id = action.data.id
      const anecdoteToChange = action.data
      console.log(`333 ${anecdoteToChange}`)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote)
    case 'INIT_ANEC':
      return action.data

  }

  return state
}

export const voting = (anecdote) => {

  return async dispatch => {
    const changedAnecdote = await anecdoteService.addVotes(anecdote)
    dispatch ({type: 'VOTING',
    data: anecdote})
  }
}

export const createAnecdote = content => {

  return async dispatch => {
    const newAnec = await anecdoteService.createNew(content)
    dispatch({type: 'NEW_ANECDOTE',
    data:newAnec})
  }
}

export const initialAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANEC',
      data: anecdotes
    })
  }
}
export default anecReducer