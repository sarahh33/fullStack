import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdotes'

const NewAnecdote = (props) => {
    const dispatch = useDispatch()

    const addNewAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        const newAnec = await anecdoteService.createNew(content)
        console.log(`222 `)
        console.log( newAnec)
        dispatch(createAnecdote(newAnec))
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addNewAnecdote}>
                <div><input name='anecdote' /></div>
                <button type='submit'>create</button>
            </form>
            </div>
    )
}

export default NewAnecdote