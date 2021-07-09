require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const Phone = require('./models/person')


const cors = require('cors')
const { request } = require('express')

app.use(cors())

app.use(express.static('build'))

app.use(express.json())



morgan.token('new', (request, response) => {
  console.log(request.body)
  return JSON.stringify({ "name": request.body.name, "number": request.body.number })
})

app.get('/info', (request, response) => {
  response.send(`<p>Phonebook has info for ${persons.length} people </br>${Date()}</p>`)
})

app.get('/api/persons', (request, response) => {
  Phone.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response,next) => {
  
  Phone.findById(request.params.id)
  .then(note=>{
    if(note){
      response.json(note)
    }else{
      response.status(404).end()
    }
  })
.catch(error =>next(error))
})



app.use(morgan(':method :url :status :res[content-length] - :response-time ms :new'))

app.post('/api/persons', (request, response) => {
  const body = request.body
  console.log(body)
  
  const person = new Phone({
    name: body.name,
    number: body.number,
    date: new Date(),
  })


  if (body.name === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }
 
  else{    
  
  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
  }

})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Phone.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Phone.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})


const errorHandler = (error, request, response, next) => {
  console.log(error. message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})