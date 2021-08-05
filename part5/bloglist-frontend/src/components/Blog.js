import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [detailVisible, setDetailVisible] = useState(false)

  
  const showWhenVisible = { display: detailVisible ? '' : 'none' }
  console.log(showWhenVisible)
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
      <div style={blogStyle}>
        title: {blog.title}
        <button onClick={toggleVisibility}>show</button>
        <div style={showWhenVisible}>
          <p>
            likes: {blog.likes}
          <button>like</button>
          </p> 
          
          <p>url: {blog.url}</p>
        <button onClick={toggleVisibility}>hide</button></div>
      </div>
    )
}

export default Blog