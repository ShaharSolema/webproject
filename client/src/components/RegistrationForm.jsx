import React, { useState } from 'react';
import axios from 'axios';
import '../styles/RegistrationForm.css';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    street: '',
    streetnum: '',
    postalcode: '',
    city: '',
    telephone: '',
    birthday: '',
  });

  const [errors, setErrors] = useState({});

  // Client-side password validation
  const passwordValidator = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  // Basic client-side validation based on schema
  const validate = () => {
    let errors = {};

    // Username: alphanumeric, minimum 6 characters
    if (!formData.username.match(/^[a-zA-Z0-9]{6,}$/)) {
      errors.username = 'Username must be at least 6 characters and alphanumeric';
    }

    // Email: valid email
    if (!formData.email.match(/^\S+@\S+\.\S+$/)) {
      errors.email = 'Invalid email address';
    }

    // Password: At least 8 characters with uppercase, lowercase, number, and special character
    if (!passwordValidator(formData.password)) {
      errors.password = 'Password must be at least 8 characters, with uppercase, lowercase, number, and special character';
    }

    // First name: Alphabetic, at least 2 characters
    if (!formData.firstname.match(/^[a-zA-Z\s]{2,}$/)) {
      errors.firstname = 'First name must contain only alphabetic characters and be at least 2 characters long';
    }

    // Last name: Alphabetic, at least 2 characters
    if (!formData.lastname.match(/^[a-zA-Z\s]{2,}$/)) {
      errors.lastname = 'Last name must contain only alphabetic characters and be at least 2 characters long';
    }

    // Street: Alphabetic, at least 5 characters
    if (!formData.street.match(/^[a-zA-Z\s]{5,}$/)) {
      errors.street = 'Street name must be alphabetic and at least 5 characters long';
    }

    // Street number: Positive integer
    if (!Number.isInteger(Number(formData.streetnum)) || Number(formData.streetnum) <= 0) {
      errors.streetnum = 'Street number must be a positive integer';
    }

    // Postal code: Numeric only
    if (!formData.postalcode.match(/^[0-9]+$/)) {
      errors.postalcode = 'Postal code must be numeric';
    }

    // City: Alphabetic, at least 5 characters
    if (!formData.city.match(/^[a-zA-Z\s]{5,}$/)) {
      errors.city = 'City name must be alphabetic and at least 5 characters long';
    }

    // Telephone: Valid Israeli phone number format (or adjust based on region)
    if (!formData.telephone.match(/^05\d{8}$/)) {
      errors.telephone = 'Telephone number must be a valid Israeli mobile number (e.g., 05XXXXXXXX)';
    }

    // Birthday: Should not be in the future
    if (new Date(formData.birthday) > new Date()) {
      errors.birthday = 'Birthday cannot be in the future';
    }

    setErrors(errors);

    // Return true if no errors
    return Object.keys(errors).length === 0;
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
      const response = await axios.post('http://localhost:3000/api/auth/register', formData);
      console.log(response.data); // Handle success response

      // Store the JWT in localStorage
      localStorage.setItem('token', response.data.token);

      // Optionally, redirect to a different page or show a success message
      // For example, you can redirect to the login page
      // window.location.href = '/login';

    } catch (error) {
      console.error('Error registering:', error.response?.data || error.message);
    }
};


  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        {errors.username && <p>{errors.username}</p>}
      </div>
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
      <div>
        <label>First Name:</label>
        <input
          type="text"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          required
        />
        {errors.firstname && <p>{errors.firstname}</p>}
      </div>
      <div>
        <label>Last Name:</label>
        <input
          type="text"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          required
        />
        {errors.lastname && <p>{errors.lastname}</p>}
      </div>
      <div>
        <label>Street:</label>
        <input
          type="text"
          name="street"
          value={formData.street}
          onChange={handleChange}
          required
        />
        {errors.street && <p>{errors.street}</p>}
      </div>
      <div>
        <label>Street Number:</label>
        <input
          type="number"
          name="streetnum"
          value={formData.streetnum}
          onChange={handleChange}
          required
        />
        {errors.streetnum && <p>{errors.streetnum}</p>}
      </div>
      <div>
        <label>Postal Code:</label>
        <input
          type="text"
          name="postalcode"
          value={formData.postalcode}
          onChange={handleChange}
          required
        />
        {errors.postalcode && <p>{errors.postalcode}</p>}
      </div>
      <div>
        <label>City:</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        />
        {errors.city && <p>{errors.city}</p>}
      </div>
      <div>
        <label>Telephone:</label>
        <input
          type="text"
          name="telephone"
          value={formData.telephone}
          onChange={handleChange}
          required
        />
        {errors.telephone && <p>{errors.telephone}</p>}
      </div>
      <div>
        <label>Birthday:</label>
        <input
          type="date"
          name="birthday"
          value={formData.birthday}
          onChange={handleChange}
          required
        />
        {errors.birthday && <p>{errors.birthday}</p>}
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
