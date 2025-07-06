import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../redux/slices/authSlice';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    const fakeToken = Date.now().toString(); // generate dummy token
    dispatch(login({ username, token: fakeToken }));
    localStorage.setItem('auth_token', fakeToken);
    localStorage.setItem('username', username);
    navigate('/');
  };

  return (
    <div className='login-container flex-item'>
      <input id='email-user-input' className='email-input' value={username} onChange={(e) => setUsername(e.target.value)} />
      <button className='login-btn' onClick={handleLogin} placeholder="Enter email" >Login</button>
    </div>
  );
};

export default Login;
