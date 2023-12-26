import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const ADD_BOOK = gql`
  mutation AddBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      title
      author {
        name
      }
    }
  }
`;

function AddBookForm() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [published, setPublished] = useState('');
  const [genres, setGenres] = useState('');

  const [addBook] = useMutation(ADD_BOOK);

  const handleSubmit = (event) => {
    event.preventDefault();

    addBook({ variables: { title, author, published: parseInt(published), genres: genres.split(',') } });

    setTitle('');
    setAuthor('');
    setPublished('');
    setGenres('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <br></br>
      <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author" required />
      <br></br>
      <input value={published} onChange={(e) => setPublished(e.target.value)} placeholder="Published" required />
      <br></br>
      <input value={genres} onChange={(e) => setGenres(e.target.value)} placeholder="Genres (comma-separated)" required />
      <br></br>
      <button type="submit">Add Book</button>
    </form>
  );
}

export default AddBookForm;