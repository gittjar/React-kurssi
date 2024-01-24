const axios = require('axios');


// This is test code for the blog-backend server.
const testLogin = async () => {
  try {
    const response = await axios.post('http://localhost:3000/api/login', {
      username: 'miguel',
      password: 'salasana',
    });

    const data = response.data;

    if (response.status === 200) {
      console.log('Login successful!');
      console.log('Username:', data.username);
      console.log('Token:', data.token);
    } else {
      console.log('Login failed with status:', response.status);
      console.log('Message:', data.error);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

testLogin();