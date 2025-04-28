// SignupForm.js

import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../../Schedule/Header';
import Footer from '../../Schedule/Footer';
import './SignupForm.css'; // Make sure this import is added

const SignupForm = () => {
  const [formData, setFormData] = useState({
    userID: '',
    username: '',
    role: '',
    age: '',
    phoneno: '',
    gender: '',
    address: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to create a new user
      const response = await axios.post('http://localhost:5000/api/users/signup', formData);

      if (response.data.message === "User created successfully") {
        toast.success("Account created successfully!");
        setTimeout(() => {
          // Redirect to login page after a short delay
          window.location.href = "/login";
        }, 2000);
      }
    } catch (error) {
      toast.error("Error creating user: " + (error.response?.data.message || "Something went wrong!"));
    }
  };

  return (
    <div className="signup-container">
      <Header /> {/* Add Header here */}
      <div className="signup-form-container">
        <div className="signup-form">
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="userID"
              value={formData.userID}
              onChange={handleChange}
              placeholder="User ID"
              required
            />
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              required
            />
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="Role"
              required
            />
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Age"
              required
            />
            <input
              type="tel"
              name="phoneno"
              value={formData.phoneno}
              onChange={handleChange}
              placeholder="Phone Number"
              required
            />
            <input
              type="text"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              placeholder="Gender"
              required
            />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
            <input type="submit" value="Sign Up" />
          </form>
        </div>
      </div>
      <Footer /> {/* Add Footer here */}
    </div>
  );
};

export default SignupForm;
