
import React from 'react';

const LoginForm = ({ handleLogin, username, password, setUsername, setPassword }) => {
  return (
  
    <form onSubmit={handleLogin}>
      <section className='loginform'>
      <div>
        Username<br/>
        <input
          type="text"
          value={username}
          name="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password<br/>
        <input
          type="password"
          value={password}
          name="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Login</button>
      </section>
    </form>
  );
};

export default LoginForm;
