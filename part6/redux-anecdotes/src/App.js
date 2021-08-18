import React from 'react'
import NewAnecdote from './components/AnecdoteForm'
import Anecdote from './components/AnecdoteList'
import Notification from './components/Notification'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Anecdote />
      <NewAnecdote />
    </div>
  )
}

export default App