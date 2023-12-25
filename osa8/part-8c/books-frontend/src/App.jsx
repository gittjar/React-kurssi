import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import './styles.css';
import BooksList from './components/BooksList';
import LoginForm from './components/LoginForm';
import { useState } from 'react';


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
      <h2>My Book List App</h2>


      {token ? (
        <>
        <button onClick={handleLogout}>Logout</button>
        <p>Hello, {username}! Good to see you.</p> {/* display the username */}


        <section className='main'>
          <BooksList />
          </section>

        </>
      ) : (
        <LoginForm onLogin={handleLogin} />
        
      )}

      
    </ApolloProvider>
  );
}

export default App;