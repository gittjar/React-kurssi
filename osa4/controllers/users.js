const express = require('express');
const usersRouter = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;
  console.log('Received POST request data:', { username, name, password });

  if (!username || !password) {
    return response.status(400).json({ error: 'Username and password are required' });
  }
  
  try {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      passwordHash,
    });

    const savedUser = await user.save();

    response.status(201).json(savedUser);
  } catch (error) {
    console.error('Error creating user:', error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});


usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

module.exports = (app) => {
  app.use('/api/users', usersRouter); 
};