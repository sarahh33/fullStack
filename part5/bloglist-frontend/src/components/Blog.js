import React, { useState } from 'react'

const Blog = ({ blog, addLikes, deleteBlog }) => {
  const [detailVisible, setDetailVisible] = useState(false)

  const showWhenVisible = { display: detailVisible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  const toggleVisibility = () => {
    setDetailVisible(!detailVisible)
  }

  return (
    <div style={blogStyle} >
      <div className ='defaultDisplay'>
        <p>title: {blog.title}</p>
        <p>author:{blog.author}</p>
      </div>
      <button onClick={toggleVisibility}>show</button>
      <div style={showWhenVisible}>
        <p>
          likes: {blog.likes}
        </p>
        <button onClick={addLikes}>like</button>
        <p>url: {blog.url}</p>
        <button onClick={toggleVisibility}>hide</button></div>
      <button onClick={deleteBlog}>remove</button>
    </div>
  )
}

export default Blog