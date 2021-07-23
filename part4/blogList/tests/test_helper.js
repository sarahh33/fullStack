const Blog = require('../models/blog')
const initialBlogs = [
    {
        title: "abc",
        author: "String",
        url: "www.baidu.com",
        likes: 132,
        id:1
    },
    {
        title: "abc2",
        author: "String",
        url: "www.baidu.com",
        likes: 132,
        id:2
    },
    {
        title: "abc33",
        author: "String3",
        url: "www.baidu.com",
        likes: 333,
        id:3
    }

]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', author: "don't know" })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}