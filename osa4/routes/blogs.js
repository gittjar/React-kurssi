const express = require('express');
const blogsRouter = express.Router();
const Bloglist = require('../models/bloglist');
const User = require('../models/user'); // Import the User model




// GET all blogs
blogsRouter.get('/', async (request, response) => {
  try {
    const blogs = await Bloglist.find({});
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
blogsRouter.post('/', async (request, response) => {
  const body = request.body;

  // Find the user based on the provided user ID
// Assuming you have already parsed the request body into 'body'

// Find the user by their username
const user = await User.findOne({ username: body.username });

if (!user) {
  return response.status(404).json({ error: 'User not found' });
}
// Create the new blog post associated with the user
const blog = new Bloglist({
  title: body.title,
  author: body.author,
  url: body.url,
  likes: body.likes,
  user: user._id,
});

try {
  const savedBlog = await blog.save();
  
  // Update the user's blogs array with the new blog's ID
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

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
