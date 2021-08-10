import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
  handleLogin,
  handleUserChange,
  handlePassChange,
  username,
  password
}) => (

  <form onSubmit={handleLogin}>
    <div>
      username
      <input
        type="text"
        value={username}
        name="Username"
        onChange={handleUserChange}
      />
    </div>
    <div>
      password
      <input
        type="password"
        value={password}
        name="Password"
        onChange={handlePassChange}
      />
    </div>
    <button type="submit">login</button>
  </form>
)


LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUserChange: PropTypes.func.isRequired,
  handlePassChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm