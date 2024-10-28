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
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Client-side password validation
  const passwordValidator = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  // Basic client-side validation based on schema
  const validate = () => {
    let errors = {};

    // Validation logic (same as before)...

    setErrors(errors);

    // Return true if no errors
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate field when it changes, with a delay
    setTimeout(() => {
      if (name === 'password' && !passwordValidator(value)) {
        setErrors((prevErrors) => ({ ...prevErrors, password: 'Invalid password format' }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' })); // Clear error
      }
    }, 500); // 500ms delay for validation feedback
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!validate()) {
      return; // Stop submission if validation fails
    }

    setIsSubmitting(true); // Indicate form is being submitted

    try {
      const response = await axios.post('http://localhost:3000/api/auth/register', formData);
      console.log(response.data); // Handle success response
      const userData={
        username:response.data.user.username,
        name:response.data.user.firstname
      }
      localStorage.setItem('user',JSON.stringify(userData)); //save name and username in local storage
      window.location.href = '/welcome'; //TODO Change this to your welcome page

    } catch (error) {
      console.error('Error registering:', error.response?.data || error.message);
      setIsSubmitting(false); // Reset submission state on error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Register</h1> {/* Added a heading */}
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
