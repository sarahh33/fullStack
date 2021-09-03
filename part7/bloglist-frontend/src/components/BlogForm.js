import React, { useState } from 'react'
import { Form , Button } from 'react-bootstrap'

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
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>Title: </Form.Label>
          <Form.Control
            type='text'
            id = 'title'
            value={newTitle}
            name='Title'
            onChange={handleTitle}
          />
          <Form.Label>Author: </Form.Label>
          <Form.Control
            type='text'
            id ='author'
            value={newAuthor}
            name='Author'
            onChange={handleAu}
          />
          <Form.Label>Url: </Form.Label>
          <Form.Control
            type='url'
            id ='url'
            value={newUrl}
            name="Url"
            onChange={handleUrl}
          />
          <Form.Label>Likes: </Form.Label>
          <Form.Control
            type='likes'
            id ='likes'
            value={newLikes}
            name="likes"
            onChange={handleLikes}
          />
          <Button type="submit">save</Button></Form.Group>
      </Form>
    </div>
  )
}

export default BlogForm