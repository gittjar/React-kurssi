import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import './styles.css';
import BooksList from './components/BooksList';
// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost:4000', // replace with your server's URL
  cache: new InMemoryCache()
});





// Main App component
function App() {
  return (
    <ApolloProvider client={client}>
      <h2>My Book List</h2>
      <BooksList />
    </ApolloProvider>
  );
}

export default App;