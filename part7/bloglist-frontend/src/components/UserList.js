import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UserList = () => {
  const userList = useSelector((state) => state.userList)

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Blogs created</th>
          </tr>
          {userList.map((user) => (
            <tr key = {user.id}>
              <td>
                <Link to={ `/users/${user.id}`}>{ user.name }</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}</tbody>
      </table>

    </div>
  )
}

export default UserList