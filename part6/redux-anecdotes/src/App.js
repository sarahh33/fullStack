import React from 'react'
import NewAnecdote from './components/AnecdoteForm'
import Anecdote from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <Anecdote />
      <NewAnecdote />
    </div>
  )
}

export default App