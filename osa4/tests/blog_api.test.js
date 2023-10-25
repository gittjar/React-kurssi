const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const chai = require('chai');
const expect = chai.expect;

const api = supertest(app);

// Describe your test cases for the Blog API
describe('Blog API tests', () => {
  // ... (your existing Blog API tests)

  // Describe your test cases for the User API
  describe('User API tests', () => {
    test('users are returned as JSON', async () => {
      await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/);
    });

    test('users have an "id" property', async () => {
      const response = await api.get('/api/users');
      const users = response.body;
  
      users.forEach((user) => {
        expect(user.id).toBeDefined();
      });
    });

    test('a valid user can be added', async () => {
      const newUser = {
        username: 'testuser',
        name: 'Test User',
        password: 'testpassword',
      };
  
      // Get the initial number of users
      const initialResponse = await api.get('/api/users');
      const initialUsers = initialResponse.body;
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect('Content-Type', /application\/json/);
  
      // Check if the total number of users has increased by 1
      const response = await api.get('/api/users');
      expect(response.body.length).toBe(initialUsers.length + 1);
  
      // Check if the new user contains the expected properties
      const addedUser = response.body.find((user) => user.username === 'testuser');
      expect(addedUser).toBeDefined();
      expect(addedUser.username).toBe('testuser');
      expect(addedUser.name).toBe('Test User');
      // Note: You may want to skip hashing the password here for testing.
      // You can hash it in production code.
      // expect(addedUser.password).not.toBe('testpassword');
    });
  });

  // ... (your existing code for deleting blogs)
  describe('Deleting a blog by ID', () => {
    let blogsAtStart;
    let blogToDelete;
  
    beforeEach(async () => {
      // Get the initial number of blogs before each test
      blogsAtStart = await bloglist.find({});
      if (blogsAtStart.length > 0) {
        // Make sure there's at least one blog to delete for the test
        blogToDelete = blogsAtStart[0];
      } else {
        // Create a blog to delete if there are no blogs in the database
        const newBlog = new bloglist({
          title: 'Test Blog to Delete',
          author: 'Test Author',
          url: 'https://testblog.com',
          likes: 5,
        });
        blogToDelete = await newBlog.save();
      }
    });
  
    it('should delete a blog and return status code 204', async () => {
      const response = await chai.request(app)
        .delete(`/api/blogs/${blogToDelete._id}`);
  
      expect(response).to.have.status(204);
  
      const blogsAtEnd = await bloglist.find({});
      expect(blogsAtEnd).to.have.lengthOf(blogsAtStart.length - 1);
    });
  });

  
  afterAll(async () => {
    await mongoose.connection.close();
  });
});
