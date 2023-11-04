import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import UserBlogs from './components/UserBlogs';
import loginService from './services/login';
import blogService from './services/blogs';
import './styles.css'; // Import the styles.css file

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' });
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    blogService.getAll().then(initialBlogs => {
      setBlogs(initialBlogs);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedBlogAppUser');
    setUser(null);
  };

  const addBlog = async (event) => {
    event.preventDefault();
    try {
      const returnedBlog = await blogService.create(newBlog);
      setBlogs(blogs.concat(returnedBlog));
      setNewBlog({ title: '', author: '', url: '' });
    } catch (error) {
      setErrorMessage('Error adding a new blog');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3003/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImdvZCIsImlkIjoiNjUzZTVjN2MxYWZhZTU2YjcwNmQyZDk0IiwiaWF0IjoxNjk4OTM4NzEyfQ.dGyEMEbidxien3s4ZC12BTSVbEedD7EbfuBtdzns7v0'
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Received Token:', data.token);
        localStorage.setItem('token', data.token);
        console.log('Stored Token:', localStorage.getItem('token'));
        const token = response.token;
        localStorage.setItem('loggedBlogAppUser', JSON.stringify(response));
        blogService.setToken(token);
        setUser(response);
        setUsername(data.name); // Set the username
        setPassword('');
      } else {
        setError('Authentication failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred during login.');
    }
  };

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          Username
          <input
            type="text"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password
          <input
            type="password"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    );
  };

  const blogForm = () => {
    return (
      <form onSubmit={addBlog}>
        <div>
          Title<br/>
          <input
            type="text"
            name="title"
            value={newBlog.title}
            onChange={handleBlogChange}
          />
        </div>
        <div>
          Author<br/>
          <input
            type="text"
            name="author"
            value={newBlog.author}
            onChange={handleBlogChange}
          />
        </div>
        <div>
          URL<br/>
          <input
            type="text"
            name="url"
            value={newBlog.url}
            onChange={handleBlogChange}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    );
  };

  const handleBlogChange = (event) => {
    const { name, value } = event.target;
    setNewBlog({
      ...newBlog,
      [name]: value
    });
  };

  const blogsToShow = showAll ? blogs : blogs.filter(blog => blog.important);

  return (
  
    <div className='main'>
      <h1>Blogs</h1>

      {user ? (
  <div>
    <p>Welcome, {username}! You are now logged in.</p>
    <button onClick={handleLogout}>Logout</button>
    {blogForm()}
    <UserBlogs />
  </div>
) : (
  loginForm()
)}

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
  {blogsToShow.map(blog => (
    <Blog key={blog.id} blog={blog} />
  ))}
</ul>
    </div>
  );
};

export default App;
