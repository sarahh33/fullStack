const notesRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')


notesRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name:1})

  response.json(blogs)
})

notesRouter.post('/', async (request, response, next) => {
  const body = request.body

  const user = await User.findById(body.userId)
  console.log(user, body)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes:body.likes,
    
  })
  console.log(blog)

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.json(savedBlog.toJSON())
})

notesRouter.delete('/:id', async (request, response, next) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

notesRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  console.log(body)

  const blog = {
    author: body.author,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
  console.log(updatedBlog)
})


module.exports = notesRouter