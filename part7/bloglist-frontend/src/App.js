import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, useRouteMatch, Link, Switch } from 'react-router-dom'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import User from './components/User'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import Notification from './components/Notification'
import UserList from './components/UserList'

import { setNotification } from './reducers/notificationReducer'

import { setBlogs } from './reducers/blogsReducer'
import { userLogged, userLogin, userLogout } from './reducers/userReducer'
import { likeBlog, toDeleteBlog } from './reducers/blogsReducer'
import { userListDisplay } from './reducers/userListReducer'

import { Form, Button } from 'react-bootstrap'

const Menu = ({ user, token }) => {
  const style = { padding: 5, margin: 5 }
  return (
    <div style={{ background: 'yellow', padding: 5 }}>
      <Link to='/' style={style}>Blogs</Link>
      <Link to='/users' style={style}>Users</Link>
      <b>{user.name} logged in </b>
      <Button onClick={token}>logout</Button>
    </div>
  )
}

const App = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [blogs, { user }, userList] = useSelector((state) => [state.blogs, state.user, state.userList])

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

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      console.log(password)
      await dispatch(userLogin({ username, password }))
      setUsername('')
      setPassword('')
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
    <div>
      <Form  onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username: </Form.Label>
          <Form.Control
            type="text"
            id='username'
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
          < Form.Label>
            password:
          </Form.Label>
          <Form.Control
            type="password"
            id="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)} />
          <Button type="submit" id='login'>login</Button>
        </Form.Group>
      </Form>
    </div>
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
      if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
        dispatch(toDeleteBlog(blog))
        dispatch(setNotification(`Blog ${blog.title} is deleted`, 'success'))
      }
    }
    catch (error) {
      dispatch(setNotification(`You do not have the permission to delete ${blog.title}`, 'error'))

    }

  }

  const userMatched = useRouteMatch('/users/:id')
  const userObject = userMatched
    ? userList.find(user => user.id === userMatched.params.id)
    : null
  const blogMatched = useRouteMatch('/blogs/:id')
  const blogObject = blogMatched
    ? blogs.find(blog => blog._id.toString() === blogMatched.params.id.toString())
    : null
  console.log(blogObject)

  if (!user || user === undefined) {
    return (
      <div className='container'>
        <h2>Log in to application</h2>
        <Notification />
        {loginForm()}
      </div>
    )
  }

  return (
    <div className='container'>
      <Menu user={user} token={clearToken} />
      <Notification />
      <Switch>
        <Route path='/blogs/:id'>
          <Blog blog={blogObject} addLikes={() => addLikes(blogObject)} username={user.username} deleteBlog={() => deleteBlog(blogObject)} />
        </Route>
        <Route path='/users/:id'>
          <User user={userObject} />
        </Route>
        <Route path='/users'>
          <UserList />
        </Route>
        <Route path='/'>
          <Togglable buttonLabel='create new blog'>
            <BlogForm createBlog={addBlog} />
          </Togglable>

          <h2>Blogs</h2>
          <b>{blogs.sort((a, b) => b.likes - a.likes).map(blog =>
            <div style={{ border: 'solid', padding: 5, margin: 5 }} key={blog._id} ><Link to={`/blogs/${blog._id}`}>{blog.title}</Link></div>
          )}</b>
        </Route>
      </Switch>
    </div>
  )
}


export default App