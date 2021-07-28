const notesRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')


notesRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

notesRouter.post('/', async (request, response, next) => {
  const body = request.body

  const user = await User.findById(body.userId)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })
  if (body.title === undefined || body.url === undefined) {
    response.status(400).end()

  }
  else if (body.likes === undefined) {
    blog.likes = 0
    const savedBlog = await blog.save()
    response.json(savedBlog)
  }
  else {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(savedBlog)
  }
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