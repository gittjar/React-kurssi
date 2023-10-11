const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

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

  test('blogs have an "id" property', async () => {
    const response = await api.get('/api/blogs');
    const blogs = response.body;
  
    blogs.forEach((blog) => {
      expect(blog.id).toBeDefined();
    });
  });


});

afterAll(async () => {
  await mongoose.connection.close();
});
