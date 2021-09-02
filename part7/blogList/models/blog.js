const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number || 0,
    user:{
      type: mongoose.Schema.Types.ObjectId,
      ref:'User'
    },
    comments: [String]
  })

  module.exports= mongoose.model('Blog', blogSchema)