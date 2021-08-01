const logger = require('./logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const notesRouter = require('express').Router()



const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path: ', request.path)
    logger.info('Body: ', request.body)
    logger.info('---')
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({error:'unknown endpoint'})
}

const errorHandler = (error, request, response, next) => {
    if (error.name ==='CastError'){
        return response.status(400).send({
            error:'malformmated id'
        })
    }
    else if (error.name === 'ValidationError'){
        return response.status(400).json({
            error:error.message
        })
    }
    else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({
            error: 'invalid token'
        })
    }
}

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      request.token =  authorization.substring(7)
    }
    console.log('rrequest',request.token)

    next()
}

const userExtractor = async (request, response, next) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    
    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
      }

      request.user = await User.findById(decodedToken.id)
    console.log('USER',request.user) 
    next()
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor
  }