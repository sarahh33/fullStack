import React from 'react'

const LoginForm = ({handleLogin, handleUserChange, handlePassChange, username, password
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

  export default LoginForm