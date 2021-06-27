const express = require('express')
const app = express()
const morgan = require('morgan')

const cors = require('cors')

app.use(cors())

app.use(express.static('build'))

app.use(express.json())

morgan.token('new', (request,response)=>{
  console.log(request.body)
  return JSON.stringify({"name":request.body.name, "number":request.body.number})
})

let persons=[ 
    {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  }]


  app.get('/info', (request,response)=>{
      response.send(`<p>Phonebook has info for ${persons.length} people </br>${Date()}</p>`)
  })

  app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

 app.get('/api/persons/:id', (request,response)=>{
     const id = Number(request.params.id)
     const person = persons.find(person=> person.id ===id)
     response.json(person)
 })

app.delete('/api/persons/:id',(request, response)=>{
    const id = Number(request.params.id)
    persons= persons.filter(person=> person.id !== id)

    response.status(204).end()
})


app.use(morgan(':method :url :status :res[content-length] - :response-time ms :new'))

app.post('/api/persons', (request, response)=>{
    const getId = Math.floor(Math.random()*1000)
     

    const body = request.body
    if (!body.name) {
      return response.status(400).json({ 
        error: 'name missing' 
      })
    }
    if (!body.number) {
      return response.status(400).json({ 
        error: 'number missing' 
      })
    }

    const person={
      content: body.content,
      data: new Date(),
      id: getId,
    }
    
    if (persons.some(person=> person.name ===body.name)){
      console.log(persons)
      return response.status(400).json({ 
        error: 'name must be unique'})
    }
    else{persons= persons.concat(person)
    response.json(person)}
    
})
  
  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })