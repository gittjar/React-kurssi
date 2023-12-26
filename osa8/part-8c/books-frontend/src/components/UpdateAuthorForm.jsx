import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const EDIT_AUTHOR = gql`
  mutation EditAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`;

function UpdateAuthorForm() {
  const [name, setName] = useState('');
  const [born, setBorn] = useState('');
  const [message, setMessage] = useState(null);
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    onCompleted: () => {
      setMessage(`Author updated: ${name} and born is successfully set up!`);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    editAuthor({ variables: { name, setBornTo: parseInt(born) } });

    setName('');
    setBorn('');
  };

  return (
    <div>
        <h3>Update author</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <input value={name} onChange={({ target }) => setName(target.value)} required placeholder='Name' />
        </div>
        <div>
          <input value={born} onChange={({ target }) => setBorn(target.value)} required placeholder='Born'/>
        </div>
        <button type="submit">update author</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default UpdateAuthorForm;