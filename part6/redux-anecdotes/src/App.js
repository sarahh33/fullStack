import React from 'react'
import NewAnecdote from './components/AnecdoteForm'
import Anecdote from './components/AnecdoteList'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Anecdote />
      <NewAnecdote />
    </div>
  )
}

export default App