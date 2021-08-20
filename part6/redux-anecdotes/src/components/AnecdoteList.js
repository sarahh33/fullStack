import React from 'react'
import { voting } from '../reducers/anecdoteReducer' //must have {}
import { useDispatch,useSelector } from 'react-redux'
import { notiChange, notiBack } from '../reducers/notificationReducer'

const Anecdote = (props) => {
  
    const anecdotes = useSelector((state) => {
      return state.anec.filter((anec => anec.content.includes(state.filter)))
    })
    
    console.log( `anecdote ${anecdotes}`)
    const dispatch = useDispatch()

    const vote = (anecdote) => {
        console.log('vote', anecdote.id)
        dispatch(voting(anecdote.id))
        dispatch(notiChange(anecdote.content))
        setTimeout(() => {(dispatch(notiBack()))}, 5000);                
    }
return(
    <div>
    {anecdotes.sort((a,b) => b.votes -a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
      </div>
)
}

export default Anecdote