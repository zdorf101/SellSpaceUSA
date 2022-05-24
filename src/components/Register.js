import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { api } from '../api';

const Register = ({ action, setToken, setUserData }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const isAuth = action === 'login';
  const title = isAuth ? 'Login' : 'Register';
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await api({
      url: `/users/${action}`,
      body: { user: { username, password } },
      method: 'POST',
    });
    const token = data?.data?.token;
    if (token) {
      localStorage.setItem('token', token);
      setUsername('');
      setPassword('');
      setToken(token);
      history.push('/');
    }
  };
  return (
    <div id='register-fields'>
      <h4 className='page-title'>{title}</h4>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Username'
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        ></input>
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        ></input>
        <button type='submit'>
          {action === 'register' ? 'Register' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Register;
