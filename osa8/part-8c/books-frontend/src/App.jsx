import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost:4000', // replace with your server's URL
  cache: new InMemoryCache()
});

// GraphQL query to fetch all books
const BOOKS_QUERY = gql`
  query GetBooks {
    allBooks {
      title
      author {
        name
      }
      published
      genres
    }
  }
`;

// Component to display the list of books
function BooksList() {
  const { loading, error, data } = useQuery(BOOKS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.allBooks.map(({ title, author, published, genres }) => (
    <div key={title}>
      <h3>{title}</h3>
      <p>Author: {author.name}</p>
      <p>Published: {published}</p>
      <p>Genres: {genres.join(', ')}</p>
    </div>
  ));
}

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