require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')


const Note = require('./models/note')
console.log(Note)


app.use(cors())
app.use(express.static('build'))
app.use(express.json())

const password = process.argv[2]
const url =
  `mongodb+srv://fullStack:${password}@cluster0.wxvsp.mongodb.net/note-app?retryWrites=true&w=majority`




let notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: "2019-05-17-30T17:30:31/098Z",
    important: true
  }, {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true
  }
]


app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => { response.json(notes) })
})

app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      next(error)
    })
})

const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  nest(error)
}
app.use(errorHandler)

app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})



const generatedId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/notes', (request, response, next) => {
  const body = request.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })

  note
    .save()
    .then(savedNote => savedNote.toJSON()
    )
    .then(savedFormttedNote =>{
      response.json(savedFormttedNote)
    })
    .catch(error => next(error))
})

app.put('/api/notes/:id', (request, response, next) => {
  const body = request.body
  const note = {
    content: body.content,
    important: body.important,
  }
  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(uodatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

