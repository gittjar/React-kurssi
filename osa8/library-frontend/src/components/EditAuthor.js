import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const SET_AUTHOR_BORN = gql`
  mutation setAuthorBorn($name: String!, $born: Int!) {
    setAuthorBorn(name: $name, born: $born) {
      name
      born
    }
  }
`;

const AuthorEdit = () => {
  const [authorName, setAuthorName] = useState('');
  const [bornYear, setBornYear] = useState('');
  const [error, setError] = useState(null);
  const [setAuthorBorn] = useMutation(SET_AUTHOR_BORN);

  const updateAuthorBorn = async () => {
    try {
      setError(null); // Reset error on each attempt
      await setAuthorBorn({
        variables: {
          name: authorName,
          born: parseInt(bornYear),
        },
      });
      // Handle success, e.g., show a success message
      console.log('Author born year updated successfully');
    } catch (error) {
      console.error('Error updating author born year:', error);
      setError('Sorry, no name found!');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Author Name"
        value={authorName}
        onChange={(event) => setAuthorName(event.target.value)}
      />
      <input
        type="number"
        placeholder="Born Year"
        value={bornYear}
        onChange={(event) => setBornYear(event.target.value)}
      />
      <button onClick={updateAuthorBorn}>Update Author</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default AuthorEdit;
