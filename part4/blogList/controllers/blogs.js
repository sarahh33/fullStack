const notesRouter = require('express').Router()
const Blog = require('../models/blog')



notesRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
  })
  
notesRouter.post('/', async (request, response, next) => {
    const body = request.body

    const blog = new Blog({
      title: String,
      author: String,
      url: String,
      likes: Number || 0
    })
    if (body.likes !== undefined){
      const savedBlog = await blog.save()
      response.json(savedBlog)
    }
    else{
      blog.likes = 0
      const savedBlog = await blog.save()
      response.json(savedBlog)
    }
  })

  module.exports=notesRouter