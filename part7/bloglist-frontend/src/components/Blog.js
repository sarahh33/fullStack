import React, { useState } from 'react'
import Comments from './Comments'


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
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setDetailVisible(!detailVisible)
  }

  return (
    <div style={blogStyle} datacy = {'blogList'}>
      <div className ='defaultDisplay'>
        <h2>blog app</h2>
        Url: <a href={blog.url}>  {blog.url}</a>
        <h2>Title: {blog.title}</h2>
        <b>Likes:{blog.likes}</b><button onClick={addLikes} className='like'>like</button>
        <p><button onClick={toggleVisibility} className='show'>show</button></p>
      </div>
      <div style={showWhenVisible} className='clickToShow'>
        <b>added by:{blog.author}</b>

        <button onClick={toggleVisibility} className='close'>hide</button></div>
      <button onClick={deleteBlog}>remove</button>
      <Comments comments={blog.comments} id = {blog._id}/>
    </div>
  )
}

export default Blog