import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { setNotification } from './reducers/notificationReducer'
import { setBlogs  } from './reducers/blogsReducer'
import Notification from './components/Notification'

import { useDispatch, useSelector } from 'react-redux'

import { likeBlog, toDeleteBlog  } from './reducers/blogsReducer'

const App = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogs = useSelector(state => state.blogs)
  console.log('here')

  useEffect(() => {
    dispatch(setBlogs(''))
  }, [dispatch])

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
      dispatch(setNotification(`${user.username} logged in`, 'success'))
    } catch (error) {
      dispatch(setNotification('wrong credentials', 'error'))
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
          id='username'
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          id="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" id='login'>login</button>
    </form>
  )

  const addBlog = async (newObejct) => {
    try {
      await dispatch(setBlogs(newObejct))
      dispatch(setNotification(`a new blog ${newObejct.title} by ${newObejct.author} added!`, 'success'))
    } catch (error) { dispatch(setNotification('failed to add', 'error')) }
  }


  const addLikes = async (blog) => {
    try {
      await dispatch(likeBlog(blog))
    } catch (exception) {
      dispatch(setNotification('something wrong', 'error'))
    }

  }

  const deleteBlog = async (blog) => {
    try {
      if (window.confirm(`Remove ${blog.title} by ${blog.author}`))
      {
        dispatch(toDeleteBlog(blog))
        dispatch(setNotification(`Blog ${blog.title} is deleted`, 'success'))
      }}
    catch (excetion) {
      dispatch(setNotification(`Youe do not have the permission to delete ${blog.title}`, 'error'))

    }

  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
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