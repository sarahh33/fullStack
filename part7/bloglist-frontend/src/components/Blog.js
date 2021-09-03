import React, { useState } from 'react'
import Comments from './Comments'
import { Button } from '@material-ui/core'


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
        <b>Likes:{blog.likes}</b><Button onClick={addLikes} >like</Button>
        <p><Button onClick={toggleVisibility} className='show'>show</Button></p>
      </div>
      <div style={showWhenVisible} className='clickToShow'>
        <b>added by:{blog.author}</b>

        <Button onClick={toggleVisibility} >hide</Button></div>
      <Button onClick={deleteBlog}>remove</Button>
      <Comments comments={blog.comments} id = {blog._id}/>
    </div>
  )
}

export default Blog