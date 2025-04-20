import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import bgImage from '../assets/login-pic.jpg';

export const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8080/urban-food/admin/login', 
        {
          adminUsername: credentials.username,
          adminPassword: credentials.password
        }
      );
  
      // Log the entire response to check its structure
      console.log(response.data);
  
      // Assuming the backend returns "SUCCESS" or "FAILURE" as a string
      const result = response.data;  // Now response.data is a string (SUCCESS or FAILURE)
  
      if (result === 'SUCCESS') {
        navigate('/dashboard');
      } else {
        alert('Invalid username or password');
      }
  
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred while logging in. Please try again.');
    }
  };
  

  return (
    <div
      className="login-background"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className='container'>
        <div className="header">
          <div className="text">Login</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          <div className="input">
            <input
              type="text"
              placeholder="Enter your Username"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            />
          </div>
          <div className="input">
            <input
              type="password"
              placeholder="Enter your Password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
          </div>
        </div>
        <div className="submit-container">
          <div className="submit" onClick={handleLogin}>
            Login
          </div>
        </div>
      </div>
    </div>
  );
};
