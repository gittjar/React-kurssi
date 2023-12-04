import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import UserBlogs from './components/UserBlogs';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';
import './styles.css'; // Import the styles.css file
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';
import { setNotification, clearNotification } from './reducers/notificationReducer';
import { useDispatch, useSelector } from 'react-redux';
import { createBlog } from './actions/blogActions';



const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' });
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [failureMessage, setFailureMessage] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch(); // Use useDispatch to dispatch actions



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
    setUsername(''); // Set the username 0
    setPassword('');
  };

  const addBlog = async (event) => {
    event.preventDefault();
    try {
      const returnedBlog = await blogService.create(newBlog);
      dispatch(createBlog(returnedBlog)); // Dispatch the action
      setNewBlog({ title: '', author: '', url: '' });

      // Dispatch a success notification
      dispatch(setNotification({ type: 'success', message: 'Blog created successfully!' }));

      // Hide the notification after some time
      setTimeout(() => {
        dispatch(clearNotification());
      }, 5000);
    } catch (error) {
      // Dispatch an error notification
      dispatch(setNotification({ type: 'error', message: 'Error adding a new blog' }));

      // Hide the notification after some time
      setTimeout(() => {
        dispatch(clearNotification());
      }, 5000);
    }
  };

 
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImdvZCIsImlkIjoiNjUzZTVjN2MxYWZhZTU2YjcwNmQyZDk0IiwiaWF0IjoxNjk4OTM4NzEyfQ.dGyEMEbidxien3s4ZC12BTSVbEedD7EbfuBtdzns7v0';

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      console.log('Before fetch:', username, password);

      const response = await fetch('http://localhost:3003/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
      },
        body: JSON.stringify({ username, password }),
      });

      console.log('After fetch:', response);


      if (response.ok) {
        const data = await response.json();
        const token = data.token; // Declare token here

        console.log('Received Token:', data.token);
        localStorage.setItem('token', data.token);
        console.log('Stored Token:', localStorage.getItem('token'));
        //const token = response.token;
        //localStorage.setItem('loggedBlogAppUser', JSON.stringify(response));
        localStorage.setItem('token', token);

        blogService.setToken(token);
        setUser(response);
        setUsername(data.name); // Set the username
        setPassword('');
        showSuccessMessage('Login successful.'); // Näytä onnistunut ilmoitus
      } else {
        setError('Authentication failed. Please check your credentials.');
        showFailureMessage('Login failed.'); // Näytä epäonnistunut ilmoitus

      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred during login.');
      showFailureMessage('Login failed.'); // Näytä epäonnistunut ilmoitus

    }
  };

  
  const handleBlogChange = (event) => {
    const { name, value } = event.target;
    setNewBlog({
      ...newBlog,
      [name]: value
    });
  };

    // Lisää funktio onnistuneen ilmoituksen näyttämiseksi
    const showSuccessMessage = (message) => {
      setSuccessMessage(message);
  
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000); // Piilota ilmoitus 5 sekunnin kuluttua
    };
  
    // Lisää funktio epäonnistuneen ilmoituksen näyttämiseksi
    const showFailureMessage = (message) => {
      setFailureMessage(message);
  
      setTimeout(() => {
        setFailureMessage(null);
      }, 5000); // Piilota ilmoitus 5 sekunnin kuluttua
    };

  // Function to toggle sorting order
  const toggleSortingOrder = () => {
    setSortAsc(!sortAsc);
  };

  // Sort blogs based on the selected sorting order
  const sortedBlogs = [...blogs].sort((a, b) => {
    if (sortAsc) {
      return a.likes - b.likes; // Ascending order
    } else {
      return b.likes - a.likes; // Descending order
    }
  });


  
  const blogsToShow = showAll ? sortedBlogs : sortedBlogs.filter(blog => blog.important);
  

  return (
    <div className='main'>
         {/* Notifications */}
               {/* Notifications */}
              {notification && (
              <div className={`notification ${notification.type}`}>
              {notification.message}
               </div>
              )}

        {successMessage && <div className="success-notification">{successMessage}</div>}
      {failureMessage && <div className="failure-notification">{failureMessage}</div>}

      


      <h1>Blogs</h1>

    

      {user ? (
        <div>
          <p>Welcome, {username}! You are now logged in.</p>
          <button onClick={handleLogout}>Logout</button>
          <BlogForm // Käytä BlogForm-komponenttia tässä
            newBlog={newBlog}
            handleBlogChange={handleBlogChange}
            addBlog={addBlog}
          />
    <button onClick={toggleSortingOrder}>
        Sort by Likes: {sortAsc ? 'Ascending' : 'Descending'}
      </button>
          <ul>
            {blogsToShow.map(blog => (
              <Blog key={blog.id} blog={blog} />
            ))}
          </ul>
        </div>
      ) : (
        <LoginForm
        handleLogin={handleLogin}
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
      />
      )}
  
   
  
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          Jotakin tekstiä: {showAll ? 'Moikka' : 'Heippa'}
        </button>
      </div>
  
      {user && (
        <Togglable buttonLabel='Load Blogs'>
          <UserBlogs />
        </Togglable>
      )}
    </div>
  );
      };
export default App;
