require('dotenv').config()
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const Phonebook = require('./models/phonebook');

app.use(cors())
app.use(morgan('tiny'));
app.use(express.json())

// Connect to your MongoDB database using the provided URI in .env
// 
const url = process.env.MONGODB_URI;

console.log('connecting to', url);

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  });

// Handle errors if any during database connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// GET persons
app.get('/api/persons', (req, res) => {
  Phonebook.find({})
    .then((persons) => {
      res.json(persons);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

// GET persons by id
app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id;

  Phonebook.findById(id)
    .then((person) => {
      if (!person) {
        // If no person with the given ID is found, return a 404 response
        return res.status(404).json({ error: 'Person not found' });
      }
      res.json(person);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

// DELETE
app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id;

  Phonebook.findByIdAndRemove(id)
    .then((deletedPerson) => {
      if (!deletedPerson) {
        // If no person with the given ID is found, return a 404 response
        return res.status(404).json({ error: 'Person not found' });
      }
      res.status(204).end(); // Successfully deleted, send a 204 (No Content) response
    })
    .catch((error) => {
      console.error('Error deleting data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

// PUT
app.put('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  const updatedPerson = req.body;

  Phonebook.findByIdAndUpdate(id, updatedPerson, { new: true })
    .then((person) => {
      if (!person) {
        // If no person with the given ID is found, return a 404 response
        return res.status(404).json({ error: 'Person not found' });
      }
      res.json(person); // Send the updated person as JSON
    })
    .catch((error) => {
      console.error('Error updating data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});






app.post('/api/persons', (req, res) => {
  const body = req.body;

  if (!body.name || !body.phonenumber) {
    return res.status(400).json({
      error: 'Name or phonenumber is missing',
    });
  }

  const person = new Phonebook({
    name: body.name,
    phonenumber: body.phonenumber,
  });

  person
    .save()
    .then((savedPerson) => {
      console.log(`Added ${savedPerson.name} number ${savedPerson.phonenumber} to phonebook.`);
      res.json(savedPerson);
    })
    .catch((error) => {
      console.error('Error saving data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

app.get('/info', (req, res) => {
  Phonebook.countDocuments({})
    .then((personCount) => {
      const currentTime = new Date().toString();
      res.send(`
        <p>Phonebook has info for ${personCount} people</p>
        <p>${currentTime}</p>
      `);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
