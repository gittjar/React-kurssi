require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const logger = require('./utils/logger');
const usersRouter = require('./controllers/users');
const middleware = require('./middleware/middleware');
const blogsRouter = require('./routes/blogs'); // Lisätään blogsRouter
const Bloglist = require('./models/bloglist');
const loginRouter = require('./controllers/login');

// Middleware
app.use(cors());
app.use(express.json());
app.use(middleware);
app.use('/api/users', usersRouter); // Prefix user-related routes with '/api/users'
app.use('/api/blogs', blogsRouter); // Käytetään määriteltyä blogsRouteria



// Connect to MongoDB
const url = process.env.MONGODB_URI;
logger.info('Connecting to MongoDB...');
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('Connected to MongoDB successfully!');
  })
  .catch((error) => {
    logger.error('Error connecting to MongoDB:', error.message);
  });

// Routes
usersRouter(app); // Pass the express app instance
app.use('/api/login', loginRouter);
app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter); // Prefix user-related routes with '/api/users'

// Info route
const startTime = new Date();
app.get('/info', async (req, res) => {
  try {
    const blogCount = await Bloglist.countDocuments({});
    const currentTime = new Date().toString();
    const uptimeInSeconds = Math.floor((new Date() - startTime) / 1000);

    res.send(`
      <div style="background-color: navy; height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <h2 style="color: fuchsia;">Bloglist has info for ${blogCount} blogs</h2>
        <h2 style="color: white;">Read blogs: /api/blogs</h2>
        <h2 style="color: fuchsia;">Server Status: Online</h2>
        <h2 style="color: white;">Server Uptime: ${uptimeInSeconds} seconds</h2>
        <span style="font-size: 1.4rem; color: green; background-color: black; padding: 1rem; border-radius: 0.8rem;">Current Time: ${currentTime}</span>
      </div>
    `);
  } catch (error) {
    logger.error('Error counting blogs:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = app;
