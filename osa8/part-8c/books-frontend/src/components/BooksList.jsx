import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

// GraphQL query to fetch all books
const BOOKS_QUERY = gql`
query AllBooks($genre: String) {
  allBooks(genre: $genre) {
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



// GraphQL query to fetch all genres
const GENRES_QUERY = gql`
query AllGenres {
  allGenres
}
`;

function BooksList() {
  const [genre, setGenre] = useState(null); // new state variable for the selected genre
  const { loading: loadingBooks, error: errorBooks, data: dataBooks, refetch: refetchBooks } = useQuery(BOOKS_QUERY, {
    variables: { genre },
    pollInterval: 10000, // fetch data every 10 seconds
  });
  const { loading: loadingGenres, error: errorGenres, data: dataGenres } = useQuery(GENRES_QUERY);
  const [deleteBook] = useMutation(DELETE_BOOK);
  const [lastDeletedBook, setLastDeletedBook] = useState(null);

  if (loadingBooks || loadingGenres) return <p>Loading...</p>;
  if (errorBooks || errorGenres) return <p>Error :(</p>;

  const handleDelete = async (title) => {
    await deleteBook({ variables: { title } });
    setLastDeletedBook(title);
    refetchBooks(); // refetch data after deleting a book
  };

  const handleGenreSelect = (genre) => {
    console.log('Selected genre:', genre); // log the selected genre
    setGenre(genre);
    refetchBooks().then(() => {
      console.log('Books refetched'); // log when the books are refetched
    });
  };

  return (
    <div>
      {dataGenres.allGenres.map((genre) => (
        <button className='filter-button' key={genre} onClick={() => handleGenreSelect(genre)}>{genre}</button>
      ))}
      <button className='filter-button' onClick={() => handleGenreSelect(null)}>All</button>
      {lastDeletedBook && <h2>Deleted successfully: {lastDeletedBook}</h2>}
      <div className="booklist-main">
        {dataBooks.allBooks.map(({ title, published, author }) => (
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