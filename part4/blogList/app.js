const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const notesRouter = require('./controllers/blogs')
const logger = require('./utils/logger')
const mongoose = require('mongoose')



logger.info('connecting to', config.mongoUrl)

mongoose.connect(config.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

app.use(cors())
app.use(express.json())
app.use('/api/blogs', notesRouter)

module.exports=app