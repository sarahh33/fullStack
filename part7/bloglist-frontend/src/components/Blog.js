import React, { useState } from 'react'


const Blog = ({ blog, addLikes, username, deleteBlog }) => {
  if (!blog) {
    return null
  }

  console.log(username)
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
    <div style={blogStyle} datacy = {'blogList'}>
      <div className ='defaultDisplay'>
        <p>title: {blog.title}</p>
        <p>author:{blog.author}</p>
        <button onClick={toggleVisibility} className='show'>show</button>
      </div>
      <div style={showWhenVisible} className='clickToShow'>
        <p className='likes'>
          likes: {blog.likes}
        </p>
        <button onClick={addLikes} className='like'>like</button>
        <p>url: {blog.url}</p>
        <button onClick={toggleVisibility} className='close'>hide</button></div>
      <button onClick={deleteBlog}>remove</button>
    </div>
  )
}

export default Blog