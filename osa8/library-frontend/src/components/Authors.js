// components/Authors.js
import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

const Authors = (props) => {
  const { loading, error, data } = useQuery(GET_AUTHORS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const authors = data.allAuthors;

  return (
    <div>
      <h2>authors</h2>
      <div className="authors-container">
      {authors.map((author) => (
        <div key={author.name} className="author-card">
          <h3>{author.name}</h3>
          <p>Born: {author.born}</p>
          <p>Books: {author.bookCount}</p>
        </div>
      ))}
    </div>

    </div>
  );
};

export default Authors;
