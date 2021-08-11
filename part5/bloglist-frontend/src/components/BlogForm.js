import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAu] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitle=(event) => {setNewTitle(event.target.value)}
  const handleAu=(event) =>  {setNewAu(event.target.value)}
  const handleUrl=(event) =>  {setNewUrl(event.target.value)}

  const addBlog = (event) => {
    event.preventDefault()

    createBlog ({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })

    setNewTitle('')
    setNewAu('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>create new blog</h2>
      <form onSubmit={addBlog}>
        <div>title: <input
          type='text'
          value={newTitle}
          name='Title'
          onChange={handleTitle}
        /></div>
        <div>author: <input
          type='text'
          value={newAuthor}
          name='Author'
          onChange={handleAu}
        /></div>
        <div>url: <input
          type='url'
          value={newUrl}
          name="Url"
          onChange={handleUrl}
        /></div>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default BlogForm