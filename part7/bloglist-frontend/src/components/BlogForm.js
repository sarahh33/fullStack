import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAu] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newLikes, setNewLikes]= useState('')

  const handleTitle=(event) => {setNewTitle(event.target.value)}
  const handleAu=(event) =>  {setNewAu(event.target.value)}
  const handleUrl=(event) =>  {setNewUrl(event.target.value)}
  const handleLikes=(event) =>  {setNewLikes(event.target.value)}

  const addBlog = (event) => {
    event.preventDefault()

    createBlog ({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes:newLikes
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
          id = 'title'
          value={newTitle}
          name='Title'
          onChange={handleTitle}
        /></div>
        <div>author: <input
          type='text'
          id ='author'
          value={newAuthor}
          name='Author'
          onChange={handleAu}
        /></div>
        <div>url: <input
          type='url'
          id ='url'
          value={newUrl}
          name="Url"
          onChange={handleUrl}
        /></div>
        <div>likes: <input
          type='likes'
          id ='likes'
          value={newLikes}
          name="likes"
          onChange={handleLikes}
        /></div>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default BlogForm