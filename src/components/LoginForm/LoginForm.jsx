import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import './LoginForm.css';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  };

  return (
    <form className='formPanel' onSubmit={login}>
      <div className='login-container'>
        <div className='mb-3 col-lg-8'>
          <div className='row'>
            <h2 className='login-header' style={{ justifyContent: 'center', alignItems: 'center' }}>
              Login
            </h2>
          </div>
          <div className='row'>
            <label htmlFor='username' className='form-label'>
              Username:
              <input
                className='form-control'
                type='text'
                placeholder='Username'
                name='username'
                required
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </label>
          </div>
          <div className='row'>
            <label htmlFor='password'>
              Password:
              <input
                className='form-control'
                placeholder='Password'
                type='password'
                name='password'
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>
          </div>
        </div>
      </div>
      {errors.loginMessage && (
        <h3 className='alert' role='alert'>
          {errors.loginMessage}
        </h3>
      )}

      <div>
        <input className='login-btn' type='submit' name='submit' value='Log In' />
      </div>
    </form>
  );
}

export default LoginForm;
