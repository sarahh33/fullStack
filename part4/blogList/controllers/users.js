const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')


usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  console.log(users)
  response.json(users)
})

usersRouter.post('/', async (request, response, next) => {
  const body = request.body
  console.log('my prtien 1111')
  console.log(body)

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })
  console.log(user)

  const savedUser = await user.save()

  response.json(savedUser)
})

module.exports = usersRouter

module.exports = usersRouter