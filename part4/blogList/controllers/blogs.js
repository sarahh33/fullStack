const notesRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

notesRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

notesRouter.post('/', middleware.userExtractor,async (request, response) => {
  const body = request.body
  const user = request.user

 
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.json(savedBlog)
})

notesRouter.delete('/:id', async (request, response, next) => {
  
  const user = request.user
  const blogsFromUser = user.blogs
  
  if (blogsFromUser.includes(request.params.id)){
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }
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