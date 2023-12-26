import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

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

// GraphQL mutation to delete a book
const DELETE_BOOK = gql`
mutation DeleteBook($title: String!) {
  deleteBook(title: $title) {
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
  const { loading, error, data, refetch } = useQuery(BOOKS_QUERY, {
    pollInterval: 10000, // fetch data every 10 seconds
  });
  const [deleteBook] = useMutation(DELETE_BOOK);
  const [lastDeletedBook, setLastDeletedBook] = useState(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const handleDelete = async (title) => {
    await deleteBook({ variables: { title } });
    setLastDeletedBook(title);
    refetch(); // refetch data after deleting a book
  };

  return (
    <div>
      {lastDeletedBook && <h2>Deleted successfully: {lastDeletedBook}</h2>}
      <div className="booklist-main">
        {data.allBooks.map(({ title, published, author }) => (
          <section key={title} className='book-card'>
            <h4>{published} - {title}</h4>
            <p>Author: {author ? author.name : 'Unknown'}</p>
            <p>Born: {author ? author.born : 'Unknown'}</p>
            <button onClick={() => handleDelete(title)}>Delete</button>
          </section>
        ))}
      </div>
    </div>
  );
}

export default BooksList;