import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5042'; // Replace with your API URL

function Signup() {
  const [message, setMessage] = useState('');
  const [registrationData, setRegistrationData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    handleConfirmEmail();
  }, []);

  const handleRegister = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/Account/register`, {
        FirstName: registrationData.firstName,
        LastName: registrationData.lastName,
        Email: registrationData.email,
        Password: registrationData.password,
      });
      console.log(response);
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error: ' + error.response.data);
    }
  };

  const handleConfirmEmail = async () => {
    try {
      const token = new URLSearchParams(window.location.search).get('token');
      const email = new URLSearchParams(window.location.search).get('email');

      if (!token || !email) {
        setMessage('Invalid confirmation link');
        return;
      }

      const response = await axios.get(`${API_BASE_URL}/api/Account/confirm_email`, {
        params: { token, Email: email },
      });

      setMessage(response.data);
    } catch (error) {
      setMessage('Error confirming email');
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRegistrationData({
      ...registrationData,
      [name]: value,
    });
  };

  return (
    <div>
      <div>
        <label>First Name:</label>
        <input type="text" name="firstName" value={registrationData.firstName} onChange={handleInputChange} />
      </div>
      <div>
        <label>Last Name:</label>
        <input type="text" name="lastName" value={registrationData.lastName} onChange={handleInputChange} />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={registrationData.email} onChange={handleInputChange} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" value={registrationData.password} onChange={handleInputChange} />
      </div>
      <button onClick={handleRegister}>Register</button>
      <div>{message}</div>
    </div>
  );
}

export default Signup;
