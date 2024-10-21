import React, { useState } from 'react';
import axios from 'axios';
//import '../styles/LoginForm.css'; // Import your CSS styles if needed
import { useHistory } from 'react-router-dom';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState(''); // State for login errors
  const history = useHistory(); // Hook for navigation

  const validate = () => {
    let errors = {};
    
    // Email: valid email
    if (!formData.email.match(/^\S+@\S+\.\S+$/)) {
      errors.email = 'Invalid email address';
    }

    // Password: Required field
    if (!formData.password) {
      errors.password = 'Password is required';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!validate()) {
      return; // Stop submission if validation fails
    }

    try {
      const response = await axios.post('http://localhost:3000/api/login', formData);
      console.log(response.data); // Handle success response
      
      // Store the JWT in localStorage
      localStorage.setItem('token', response.data.token);
      
      // Redirect to the desired route after successful login
      history.push('/dashboard'); // Change to your desired route

    } catch (error) {
      console.error('Error logging in:', error.response?.data || error.message);
      setLoginError(error.response?.data.message || 'Login failed. Please try again.'); // Set login error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && <p>{errors.email}</p>}
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {errors.password && <p>{errors.password}</p>}
      </div>
      <button type="submit">Login</button>
      {loginError && <p className="error">{loginError}</p>} {/* Display login error */}
    </form>
  );
};

export default LoginForm;
