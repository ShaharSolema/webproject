import React, { useState } from 'react';
import '../styles/RegistrationForm.css';
import { loginUser } from '../utils/auth'; // Import loginUser from auth.js

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Password validator
  const passwordValidator = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  // Form validation
  const validate = () => {
    let errors = {};
    // Implement validation logic...

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setTimeout(() => {
      if (name === 'password' && !passwordValidator(value)) {
        setErrors((prevErrors) => ({ ...prevErrors, password: 'Invalid password format' }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
      }
    }, 500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      // Use loginUser from auth.js for the registration
      const result = await loginUser(formData);
      if (result.success) {
        window.location.href = '/welcome'; // Redirect on success
      } else {
        setErrors({ form: result.error });
      }
    } catch (error) {
      console.error('Error registering:', error.message);
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Register</h1>
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
      <button type="submit" disabled={isSubmitting}>Register</button>
    </form>
  );
};

export default RegistrationForm;
