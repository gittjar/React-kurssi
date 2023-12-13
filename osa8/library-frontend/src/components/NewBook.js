import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const ADD_BOOK = gql`
  mutation addBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      title
      author {
        name
      }
    }
  }
`;

const NewBook = (props) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [published, setPublished] = useState('');
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);

  const [addBook] = useMutation(ADD_BOOK);

  if (!props.show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    // Call the addBook mutation
    try {
      await addBook({
        variables: {
          title,
          author,
          published: parseInt(published),
          genres,
        }, catch (error) {
          console.error('Error:', error);
        },
      });

      // Clear the form
      setTitle('');
      setPublished('');
      setAuthor('');
      setGenres([]);
      setGenre('');
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre('');
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title<br></br>
          <input value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author<br></br>
          <input value={author} onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          published<br></br>
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          add genres<br></br>
          <input value={genre} onChange={({ target }) => setGenre(target.value)} />
          <button onClick={addGenre} type="button">
            add genre<br></br>
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <br></br>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
