import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';


// LOGIN: username: 'ekauser', password: 'secret'
const LOGIN_MUTATION = gql`
mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    value
  }
}
`;

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, { error }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      const token = data.login.value;
      localStorage.setItem('user-token', token);
      onLogin(token, username);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    login({ variables: { username, password } });
  };

  return (
    <form onSubmit={handleSubmit} className='loginform dark-background'>
    <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
    <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
    <button type="submit">Login</button>
    {error && <p>Error :(</p>}
  </form>
  );
}

export default LoginForm;