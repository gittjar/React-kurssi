require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const logger = require('./utils/logger');

const blogsRouter = require('./routes/blogs');
const Bloglist = require('./models/bloglist');


// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const url = process.env.MONGODB_URI;
logger.info('Connecting to MongoDB...');
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('Connected to MongoDB success!');
  })
  .catch((error) => {
    logger.error('Error connecting to MongoDB:', error.message);
  });

// Routes
app.use('/api/blogs', blogsRouter);

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
