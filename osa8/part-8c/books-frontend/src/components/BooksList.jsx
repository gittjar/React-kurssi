import React from 'react';
import { useQuery, gql } from '@apollo/client';

// GraphQL query to fetch all books
const BOOKS_QUERY = gql`
query AllBooks {
  allBooks {
    title
    published
    author {
      name
      born
    }
  }
}
`;

function BooksList() {
    const { loading, error, data } = useQuery(BOOKS_QUERY);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
  
    return data.allBooks.map(({ title, published, author }) => (
      <section key={title} className='book-card'>
        <h4>{published} - {title}</h4>
        <p>Author: {author ? author.name : 'Unknown'}</p>
        <p>Born: {author ? author.born : 'Unknown'}</p>

      </section>
    ));
}

export default BooksList;