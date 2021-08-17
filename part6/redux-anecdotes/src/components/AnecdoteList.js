import React from 'react'
import { voting } from '../reducers/anecdoteReducer' //must have {}
import { useDispatch,useSelector } from 'react-redux'

const Anecdote = (props) => {
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()

    const vote = (id) => {
        console.log('vote', id)
        dispatch(voting(id))
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
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      </div>
)
}

export default Anecdote