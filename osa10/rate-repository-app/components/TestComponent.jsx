import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const AUTHENTICATE = gql`
  mutation Authenticate($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;

const TestComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [authenticate, { data }] = useMutation(AUTHENTICATE);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await authenticate({ variables: { credentials: { username, password } } });
      console.log(result.data.authenticate.accessToken);
      setMessage('Login successful');
    } catch (error) {
      console.error(error);
      setMessage('Login failed');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default TestComponent;