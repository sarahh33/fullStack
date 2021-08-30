import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  Route } from 'react-router-dom'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import Notification from './components/Notification'
import UserList from './components/UserList'

import { setNotification } from './reducers/notificationReducer'
import { setBlogs  } from './reducers/blogsReducer'
import { userLogged, userLogin,userLogout } from './reducers/userReducer'
import { likeBlog, toDeleteBlog  } from './reducers/blogsReducer'
import { userListDisplay } from './reducers/userListReducer'

const App = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [ blogs, { user } ] = useSelector((state) => [state.blogs, state.user])
  console.log(user)

  useEffect(() => {
    dispatch(userListDisplay())
    dispatch(setBlogs(''))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const currentUser = JSON.parse(loggedUserJSON)
      if (Date.now() - currentUser.stampedDate < 3600000) {
        dispatch(userLogged(currentUser))
        blogService.setToken(currentUser.token)
      } else {
        window.localStorage.removeItem('loggedNoteappUser')
      }
    }
  }, [])

  const handleLogin = async(event) => {
    event.preventDefault()
    try {
      console.log(password)
      await dispatch(userLogin({ username, password }))
      dispatch(setNotification(`${username} logged in`, 'success'))
    } catch (error) {
      dispatch(setNotification('wrong credentials', 'error'))
    }
  }

  const clearToken = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    dispatch(userLogout())
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
      dispatch(setNotification(`You voted for "${blog.title}"`, 'success'))
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

  if (!user) {
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
      <Route path="/users">
        <UserList />
      </Route>

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