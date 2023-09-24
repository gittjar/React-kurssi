const express = require('express')
const app = express()

app.use(express.json())



let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    phonenumber: "040-1234567"
  },
  {
    id: 2,
    name: "Ada Lovelace",
    phonenumber: "03-903490"
  },
  {
    id: 3,
    name: "Jack Sparrow",
    phonenumber: "044-1234567"
  },
  {
    id: 4,
    name: "Mikko Mallikas",
    phonenumber: "0500-6667770"
  }
]

app.get('/', (req, res) => {
    res.send('<h1>Puhelinluettelo Backend</h1>')
  })
  
  app.get('/api/persons', (req, res) => {
    res.json(persons)
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })

  const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      : 0
    return maxId + 1
  }
  
  app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (!body.name) {
      return response.status(400).json({ 
        error: 'name missing' 
      })
    }
  
    const person = {
      name: body.name,
      phonenumber: body.phonenumber,
      id: generateId(),
    }
  
    persons = persons.concat(person)
    response.json(person)
  })
  
  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })