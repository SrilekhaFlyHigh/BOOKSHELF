import React, { useState } from 'react';
import 'styles/login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Static check for successful login
    if (email && password) {
      setMessage('Login successful');
    } else {
      setMessage('Please fill in both fields');
    }
  };

  return (
    <div className="">
      <h3>Please login here</h3>
      <form onSubmit={handleLogin}>
        <div className='loginform'>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="loginbtn" type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;

