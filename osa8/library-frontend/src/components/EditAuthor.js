import React, { useState } from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

const SET_AUTHOR_BORN = gql`
  mutation setAuthorBorn($name: String!, $born: Int!) {
    setAuthorBorn(name: $name, born: $born) {
      name
      born
    }
  }
`;

const GET_AUTHORS = gql`
  query {
    allAuthors {
      name
    }
  }
`;

const AuthorEdit = () => {
  const { loading, error: queryError, data } = useQuery(GET_AUTHORS);
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
      setAuthorName('');
      setBornYear('');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (queryError) return <p>Error fetching authors: {queryError.message}</p>;

  const authors = data.allAuthors;

  return (
    <div>
      <h2>edit author</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      author name<br></br>
      <select
        value={authorName}
        onChange={(event) => setAuthorName(event.target.value)}
      >
        <option value="" disabled>Select an author</option>
        {authors.map((author) => (
          <option key={author.name} value={author.name}>
            {author.name}
          </option>
        ))}
      </select><br></br>
      born year<br></br>
      <input
        type="number"
        placeholder="Born Year"
        value={bornYear}
        onChange={(event) => setBornYear(event.target.value)}
      /><br></br>
      <button onClick={updateAuthorBorn}>update author
      <ArrowForwardIosRoundedIcon className='iconfwd' fontSize="small"></ArrowForwardIosRoundedIcon>
      </button>
    </div>
  );
};

export default AuthorEdit;
