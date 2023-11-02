import React, { useState } from 'react';
import UserBlogs from './UserBlogs';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      // Send a POST request to your server for authentication
      const response = await fetch('http://localhost:3003/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Authentication was successful
        const data = await response.json();
        const token = data.token; // Assuming the server sends back a token

        // Store the token in localStorage
        localStorage.setItem('token', token);

        // Set the loggedIn state to true
        setLoggedIn(true);
      } else {
        // Authentication failed
        setError('Authentication failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred during login.');
    }
  };

  if (loggedIn) {
    // User is logged in, render the authenticated content
    return (
      <div>
        <h2>Welcome, {username}!</h2>
        {/* Render the UserBlogs component to display the user's blogs */}
        <UserBlogs />
      </div>
    );
  }

  return (
    <div>
      <h3>Login</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default Login;
