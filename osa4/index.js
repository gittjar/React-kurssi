require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const Bloglist = require('./models/bloglist'); // Import the Bloglist model

app.use(cors());
app.use(express.json());

// Connect to your MongoDB database using the provided URI in .env
const url = process.env.MONGODB_URI;
console.log('Im message from index.js');

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });
  

  app.get('/api/blogs', async (request, response) => {
    try {
      const blogs = await Bloglist.find({});
      response.json(blogs);
    } catch (error) {
      console.error('Error fetching data:', error);
      response.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  app.post('/api/blogs', async (request, response) => {
    const blog = new Bloglist(request.body);
  
    try {
      const savedBlog = await blog.save();
      response.status(201).json(savedBlog);
    } catch (error) {
      console.error('Error saving data:', error);
      response.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

  app.get('/info', async (req, res) => {
    try {
      const blogCount = await Bloglist.countDocuments({});
      const currentTime = new Date().toString();
      res.send(`
        <div style="background-color: navy; height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center;">
          <h2 style="color: fuchsia;">Bloglist has info for ${blogCount} blogs</h2>
          <span style="font-size: 1.4rem; color: green; background-color: black; padding: 1rem; border-radius: 0.8rem;">Today is: ${currentTime}</span>
        </div>
      `);
    } catch (error) {
      console.error('Error counting blogs:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
