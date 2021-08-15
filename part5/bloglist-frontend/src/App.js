import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'


const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className='error'>
      {message}
    </div>
  )
}

const Success = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className='success'>
      {message}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const clearToken = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          id = 'username'
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          id = "password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" id='login'>login</button>
    </form>
  )

  const addBlog = (newObejct) => {
    blogService
      .create(newObejct)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })
  }

  const addLikes = async (blog) => {

    try {
      const updatedBlog = {
        title: blog.title,
        id: blog._id,
        author: blog.author,
        likes: blog.likes + 1,
        url: blog.url
      }
      blogService
        .putLikes(updatedBlog)
      setBlogs(blogs.map(blog => blog._id !== updatedBlog.id ? blog : updatedBlog))
    } catch (exception) {

      setErrorMessage('something wrong')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }

  const deleteBlog = async (blog) => {
    try {
      if (blog.user.username===user.username && window.confirm(`Remove ${blog.title} by ${blog.author}`)) {

        blogService
          .remove(blog)}
      else{return}
      setBlogs(blogs.filter(every => every._id !== blog._id))
      setSuccessMessage(`Blog ${blog.title} is deleted`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)

    }
    catch (excetion) {
      setErrorMessage(`Youe do not have the permission to delete ${blog.title}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={errorMessage} />
        <Success message={successMessage} />
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} />
      <Success message={successMessage} />
      <b>{user.name} logged in </b>
      <button onClick={clearToken}>logout</button>

      <Togglable buttonLabel='create new blog'>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      <h2>Blogs</h2>
      <b>{blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog._id} blog={blog} addLikes={() => addLikes(blog)} deleteBlog={() => deleteBlog(blog)} />
      )}</b>


    </div>
  )
}


export default App