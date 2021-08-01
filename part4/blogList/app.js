const config = require('./utils/config')
const express = require('express')
const app = express()
require('express-async-errors')
const middleware = require('./utils/middleware')
const cors = require('cors')

const notesRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

const loginRouter = require('./controllers/login')




logger.info('connecting to', config.mongoUrl)

mongoose.connect(config.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })


app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)


//// use the middleware only in /api/blogs routes
app.use('/api/blogs', middleware.userExtractor,notesRouter) 
// do not need to add '/api/blogs' part in POST or GET request 
app.use('/api/users', usersRouter) // never forgot the firt '/'
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports=app