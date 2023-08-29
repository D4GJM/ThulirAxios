import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:5042'; // Replace with your API URL

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/Account/login`, {
        UserName: username,
        Password: password,
      });

      if (response.status === 200) {
        const token = response.data.jwt;
        localStorage.setItem('token', token);

        // Check if the user is an admin based on credentials
        const isAdmin = username === 'admin@example.com' && password === 'AdminPassword123!';

        // Redirect based on user type
        if (isAdmin) {
          navigate('/admin-dashboard', { state: { token } });
        } else {
          navigate('/Applicant', { state: { token } });
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div>
      <div>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button onClick={handleLogin}>Login</button>
      {error && <div>{error}</div>}
    </div>
  );
}

export default Login;
