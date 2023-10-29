const express = require('express');
const blogsRouter = express.Router();
const Bloglist = require('../models/bloglist');
const User = require('../models/user'); // Import the User model
const verifyToken = require('../middleware/middleware');

// GET all blogs (populate)
blogsRouter.get('/', async (request, response) => {
  try {
    const blogs = await Bloglist.find({}).populate('user', 'username name');
    response.json(blogs);
  } catch (error) {
    console.error('Error fetching data:', error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET a specific blog by ID
blogsRouter.get('/:id', async (request, response) => {
  const id = request.params.id;

  try {
    const blog = await Bloglist.findById(id);
    if (!blog) {
      return response.status(404).json({ error: 'Sorry, Blog not found' });
    }
    response.json(blog);
  } catch (error) {
    console.error('Error fetching data:', error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST a new blog
// POST a new blog
blogsRouter.post('/', verifyToken ,async (request, response) => {
  const body = request.body;

  // Find a random user in your database
  const users = await User.find({});
  if (users.length === 0) {
    return response.status(404).json({ error: 'No users found' });
  }

  const randomUser = users[Math.floor(Math.random() * users.length)];

  // Create the new blog post associated with the random user
  const blog = new Bloglist({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: randomUser._id, // Associate the random user with the blog
  });

  try {
    const savedBlog = await blog.save();

    // Update the random user's blogs array with the new blog's ID
    randomUser.blogs = randomUser.blogs.concat(savedBlog._id);
    await randomUser.save();

    response.status(201).json(savedBlog);
  } catch (error) {
    console.error('Error saving data:', error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});




// DELETE a blog by ID
blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id;

  try {
    const deletedBlog = await Bloglist.findByIdAndRemove(id);
    if (!deletedBlog) {
      return response.status(404).json({ error: 'Blog not found' });
    }
    response.status(204).end(); // No content, successful deletion
  } catch (error) {
    console.error('Error deleting data:', error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT (update) a blog by ID
blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id;
  const updatedBlog = request.body;

  try {
    const result = await Bloglist.findByIdAndUpdate(id, updatedBlog, { new: true });
    if (!result) {
      return response.status(404).json({ error: 'Blog not found' });
    }
    response.json(result);
  } catch (error) {
    console.error('Error updating data:', error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = blogsRouter;
