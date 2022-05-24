import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import './loginform.css';

const BASE_URL =
  'https://strangers-things.herokuapp.com/api/2202-ftb-pt-web-pt';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${BASE_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          username: username,
          password: password,
        },
      }),
    });

    if (res) {
      const data = await res.json();
      const token = data.data.token;
      localStorage.setItem('token', token);
      setUsername('');
      setPassword('');
    }

    setUsername('');
    setPassword('');
    history.push('/profile');
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className='container'>
        <label>Username</label>
        <input
          type='text'
          value={username}
          placeholder='Username'
          onChange={(e) => setUsername(e.target.value)}
        ></input>

        <label>Password</label>
        <input
          type='text'
          value={password}
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type='submit'>Login</button>
      </div>
    </form>
  );
};

export default Login;
