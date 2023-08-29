import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';


const API_BASE_URL = 'http://localhost:5042'; // Replace with your API URL


const ApplicantForm = () => {
  const [applicantData, setApplicantData] = useState({
    title: '',
    dob: '',
    gender: '',
    phoneNo: '',
    email: '',
    address: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });

  const location = useLocation(); // Get the location object
  const jwtToken = location.state ? location.state.token : null; // Retrieve the token

  const handleChange = (e) => {
    const { name, value } = e.target;
    setApplicantData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/api/Applicant/app`, applicantData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
         
        },
      });

      // Handle success, e.g., show a success message or redirect
      console.log('Applicant created:', response.data);
    } catch (error) {
      // Handle error, e.g., show an error message
      console.error('Error creating applicant:', error);
    }
  };

  return (
    <div>
      <h2>Create Applicant</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={applicantData.title}
          onChange={handleChange}
          placeholder="Title"
        />
        <input
          type="date"
          name="dob"
          value={applicantData.dob}
          onChange={handleChange}
          placeholder="Date of Birth"
        />
        <select
          name="gender"
          value={applicantData.gender}
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <input
          type="tel"
          name="phoneNo"
          value={applicantData.phoneNo}
          onChange={handleChange}
          placeholder="Phone Number"
        />
        <input
          type="email"
          name="email"
          value={applicantData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="text"
          name="address"
          value={applicantData.address}
          onChange={handleChange}
          placeholder="Address"
        />
        <input
          type="text"
          name="street"
          value={applicantData.street}
          onChange={handleChange}
          placeholder="Street"
        />
        <input
          type="text"
          name="city"
          value={applicantData.city}
          onChange={handleChange}
          placeholder="City"
        />
        <input
          type="text"
          name="state"
          value={applicantData.state}
          onChange={handleChange}
          placeholder="State"
        />
        <input
          type="text"
          name="zip"
          value={applicantData.zip}
          onChange={handleChange}
          placeholder="ZIP"
        />
        <input
          type="text"
          name="country"
          value={applicantData.country}
          onChange={handleChange}
          placeholder="Country"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ApplicantForm;
