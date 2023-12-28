import React, { useState, useEffect } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useLazyQuery } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
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

const USER_QUERY = gql`
query User($username: String!) {
  user(username: $username) {
    username
    favoriteGenre
  }
}
`;

// Main App component
function App() {
  const [token, setToken] = useState(localStorage.getItem('user-token'));
  const [username, setUsername] = useState(null);
  const [favoriteGenre, setFavoriteGenre] = useState(null);

  const [getUser, { loading, data }] = useLazyQuery(USER_QUERY);

  const handleLogin = (newToken, username) => {
    setToken(newToken);
    setUsername(username);
    getUser({ variables: { username } }); // fetch the user's favorite genre
  };

  const handleLogout = () => {
    localStorage.removeItem('user-token');
    setToken(null);
    setUsername(null);
    setFavoriteGenre(null);
  };

  useEffect(() => {
    if (data && data.user) {
      setFavoriteGenre(data.user.favoriteGenre);
    }
  }, [data]);

  return (
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

          <p>Hello, {username}! Good to see you. Your favorite genre is {favoriteGenre}.</p>

          <Routes>
            <Route path="/add-book" element={<AddBookForm />} />
            <Route path="/show-books" element={<BooksList />} />
            <Route path="/update-author" element={<UpdateAuthorForm />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </Router>
  );
}

function AppWithProvider() {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
}

export default AppWithProvider;