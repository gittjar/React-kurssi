const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const bloglist = require('../models/bloglist');

const api = supertest(app);

// Define your test cases
describe('Blog API tests', () => {
  // This is just a basic example to test if the endpoint returns JSON data.
  test('blogs are returned as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
// blog contains id property
  test('blogs have an "id" property', async () => {
    const response = await api.get('/api/blogs');
    const blogs = response.body;
  
    blogs.forEach((blog) => {
      expect(blog.id).toBeDefined();
    });
  });

// test valid blog
test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'https://testblog.com',
      likes: 5,
    };
  
    // Get the initial number of blogs
    const initialResponse = await api.get('/api/blogs');
    const initialBlogs = initialResponse.body;
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);
  
    // Check if the total number of blogs has increased by 1
    const response = await api.get('/api/blogs');
    expect(response.body.length).toBe(initialBlogs.length + 1);
  
    // Check if the new blog contains the expected properties
    const addedBlog = response.body.find((blog) => blog.title === 'Test Blog');
    expect(addedBlog).toBeDefined();
    expect(addedBlog.title).toBe('Test Blog');
    expect(addedBlog.author).toBe('Test Author');
    expect(addedBlog.url).toBe('https://testblog.com');
    expect(addedBlog.likes).toBe(5);
  });

  
  test('valid blog without likes, it sets likes to 0', async () => {
    const newBlog = {
      title: 'Test Blog',
      // 'likes' field is not included
    };
  
    // Add a new blog without specifying 'likes'
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);
  
    // Check if the newly added blog has the 'likes' field
    const response = await api.get('/api/blogs');
    const addedBlog = response.body.find((blog) => blog.title === 'Test Blog');
    expect(addedBlog).toBeDefined();
  
    // Check if the 'likes' field is set to 0 or is a numeric value
    const likes = addedBlog.likes;
    expect(likes).toBeDefined();
    expect(typeof likes).toBe('number');
  });
  
  test('deleting a blog by ID', async () => {
    const blogsAtStart = await bloglist.find({});
    const blogToDelete = blogsAtStart[0];
  
    const response = await api
      .delete(`/api/blogs/${blogToDelete._id}`)
      .expect(204);
  
    const blogsAtEnd = await bloglist.find({});
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);
  });
  
  
  
  
  


});

afterAll(async () => {
  await mongoose.connection.close();
});
