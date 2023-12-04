const express = require('express');
const blogsRouter = express.Router();
const Bloglist = require('../models/bloglist');
const User = require('../models/user');
const verifyToken = require('../middleware/middleware');

// GET blogs for the authenticated user
// http://localhost:3003/api/blogs/user/blogs
blogsRouter.get('/user/blogs', verifyToken, async (request, response) => {
  try {
    const user = request.user; // The user data from the token

    const userBlogs = await Bloglist.find({ user: user.id }).populate('user', 'username name');
    response.json(userBlogs);
  } catch (error) {
    console.error('Error fetching user blogs:', error);
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
// POST a new blog by the authenticated user
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

// PUT (update) the likes of a blog by ID
blogsRouter.put('/:id/like', verifyToken, async (request, response) => {
  const blogId = request.params.id;
  const userId = request.user.id;

  try {
    console.log('Decoded Token:', request.user);
    console.log('Blog ID:', blogId);
    console.log('User ID:', userId);
    const blog = await Bloglist.findById(blogId);
    console.log('Found Blog:', blog);


    if (!blog) {
      return response.status(404).json({ error: 'Blog not found' });
    }

    if (!Array.isArray(blog.likes)) {
      return response.status(500).json({ error: 'Invalid blog data' });
    }

    if (blog.likes.includes(userId)) {
      return response.status(400).json({ error: 'You have already liked this blog' });
    }

    blog.likes.push(userId);
    blog.likesCount = blog.likes.length;

    const updatedBlog = await blog.save();

    const responseData = {
      likes: updatedBlog.likesCount,
    };

    response.json(responseData);
  } catch (error) {
    console.error('Error updating likes:', error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});





module.exports = blogsRouter;
