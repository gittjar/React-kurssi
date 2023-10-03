require('dotenv').config()
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
//const Phonebook = require('./models/phonebook');

app.use(cors())
app.use(morgan('tiny'));
app.use(express.json())

// Connect to your MongoDB database (use your own connection URL)
const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

// Handle errors if any during database connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a Mongoose schema that matches your data structure
const phonebookSchema = new mongoose.Schema({
  name: String,
  phonenumber: String,
});

const Phonebook = mongoose.model('Phonebook', phonebookSchema); // Define the model once

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
