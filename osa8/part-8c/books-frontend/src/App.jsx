import React from 'react';
import { useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom'; // Removed Switch
import './styles.css';
import BooksList from './components/BooksList';
import LoginForm from './components/LoginForm';
import AddBookForm from './components/AddBookForm';
import UpdateAuthorForm from './components/UpdateAuthorForm';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost:4000', // replace with your server's URL
  cache: new InMemoryCache()
});

// Main App component
function App() {
  const [token, setToken] = useState(localStorage.getItem('user-token'));
  const [username, setUsername] = useState(null); // new state variable for the username

  const handleLogin = (newToken, username) => {
    setToken(newToken);
    setUsername(username); // set the username
  };

  const handleLogout = () => {
    localStorage.removeItem('user-token');
    setToken(null);
    setUsername(null); // clear the username when the user logs out
  };

  return (
    <ApolloProvider client={client}>
      <Router>
        <h2>My Book List App</h2>

        {token ? (
          <>
            <nav>
              <Link to="/show-books"><button>Show Books</button></Link>
              <Link to="/add-book"><button>Add Book</button></Link>
              <Link to="/update-author"><button>Update Author</button></Link>
              <button onClick={handleLogout}>Logout</button>
            </nav>

            <p>Hello, {username}! Good to see you.</p>

            <Routes>
              <Route path="/add-book" element={<AddBookForm />} />
              <Route path="/show-books" element={<BooksList />} />
              <Route path="/update-author" element={<UpdateAuthorForm />} />
            </Routes>
          </>
        ) : (
          <Routes>
            <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
            <Route path="*" element={<Navigate to="/login" />} /> {/* Redirect to login page */}

          </Routes>
        )}
      </Router>
    </ApolloProvider>
  );
}

export default App;