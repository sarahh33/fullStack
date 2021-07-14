const notesRouter = require('express').Router()
const Blog = require('../models/blog')

notesRouter.get('/', (request, response) => {
    Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
  })

notesRouter.get('/api/blogs', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })
  
notesRouter.post('/api/blogs', (request, response) => {
    const blog = new Blog(request.body)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
      .catch(error=>{console.log(error)})
  })

  module.exports=notesRouter