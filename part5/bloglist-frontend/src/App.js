import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { setNotification } from './reducers/notificationReducer'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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
      const newBlog = await blogService
        .create(newObejct)
      setBlogs(blogs.concat(newBlog))
      dispatch(setNotification(`a new blog ${newBlog.title} by ${newBlog.author} added!`, 'success'))
    } catch (error) { dispatch(setNotification('failed to add', 'error')) }
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
      dispatch(setNotification('something wrong', 'error'))
    }

  }

  const deleteBlog = async (blog) => {
    try {
      if (blog.user.username === user.username && window.confirm(`Remove ${blog.title} by ${blog.author}`)) {

        blogService
          .remove(blog)
      }
      else { return }

      setBlogs(blogs.filter(every => every._id !== blog._id))

      dispatch(setNotification(`Blog ${blog.title} is deleted`, 'success'))
    }
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