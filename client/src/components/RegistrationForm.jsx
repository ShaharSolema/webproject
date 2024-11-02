import { useState } from 'react';
import PropTypes from 'prop-types'; // ייבוא PropTypes
import '../styles/RegistrationForm.css';
import { registerUser } from '../utils/auth';
import validator from 'validator';

const RegistrationForm = ({ onBackToLogin }) => {
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

  const passwordValidator = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const validateField = (field, value) => {
    const errors = {};

    switch (field) {
      case 'username':
        if (!value) errors.username = 'Username is required';
        else if (!validator.isAlphanumeric(value)) errors.username = 'Username contains invalid characters!';
        else if (value.length<6) errors.username='Username must be more than 6 characters';
        break;
      case 'email':
        if (!validator.isEmail(value)) errors.email = 'Invalid email format';
        break;
      case 'password':
        if (!passwordValidator(value)) {
          errors.password = 'Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character';
        }
        break;
      case 'firstname':
        if (!value) errors.firstname = 'First name is required';
        else if (!validator.isAlpha(value, 'en-US', { ignore: ' ' })&&!validator.isAlpha(value, 'he', { ignore: ' ' })) errors.firstname = 'First name contains invalid characters!';
        else if (value.length<2) errors.username='Firstname must be more than 2 characters';

        break;
      case 'lastname':
        if (!value) errors.lastname = 'Last name is required';
        else if (!validator.isAlpha(value, 'en-US', { ignore: ' ' })&&!validator.isAlpha(value, 'he', { ignore: ' ' })) errors.lastname = 'Last name contains invalid characters!';
        else if (value.length<2) errors.username='Lastname must be more than 2 characters';

        break;
      case 'street':
        if (!value) errors.street = 'Street is required';
        else if (value.length<5) errors.username='Street must be more than 5 characters';

        break;
      case 'streetnum':
        if (!value || isNaN(value)) errors.streetnum = 'Street number must be a number';
        break;
      case 'postalcode':
        if (!value || isNaN(value)) errors.postalcode = 'Invalid postal code';
        break;
      case 'city':
        if (!value) errors.city = 'City is required';
        else if (value.length<5) errors.username='City must be more than 5 characters';

        break;
      case 'telephone':
        if (!validator.isMobilePhone(value, 'he-IL')) errors.telephone = 'Invalid telephone number';
        break;
      case 'birthday':
        if (!value) errors.birthday = 'Birthday is required';
        break;
      default:
        break;
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({ ...prevData, [name]: value }));

    // Run field-specific validation for real-time feedback
    const fieldErrors = validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: fieldErrors[name] || '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};
    Object.keys(formData).forEach((field) => {
      const fieldError = validateField(field, formData[field]);
      if (Object.keys(fieldError).length > 0) {
        validationErrors[field] = fieldError[field];
      }
    });

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);

    try {
      const result = await registerUser(formData);
      if (result.success) {
        window.location.href = '/app';
      } else {
        setErrors({ form: result.error });
      }
    } catch (error) {
      console.error('Error registering:', error.message);
      setErrors({ form: 'Registration failed. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Register</h1>
      {[
        { label: 'Username', name: 'username', type: 'text' },
        { label: 'Email', name: 'email', type: 'email' },
        { label: 'Password', name: 'password', type: 'password' },
        { label: 'First Name', name: 'firstname', type: 'text' },
        { label: 'Last Name', name: 'lastname', type: 'text' },
        { label: 'Street', name: 'street', type: 'text' },
        { label: 'Street Number', name: 'streetnum', type: 'number' },
        { label: 'Postal Code', name: 'postalcode', type: 'text' },
        { label: 'City', name: 'city', type: 'text' },
        { label: 'Telephone', name: 'telephone', type: 'text' },
        { label: 'Birthday', name: 'birthday', type: 'date' },
      ].map((field) => (
        <div key={field.name}>
          <label>{field.label}:</label>
          <input
            type={field.type}
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            required
          />
          {errors[field.name] && <p>{errors[field.name]}</p>}
        </div>
      ))}
      <button type="submit" disabled={isSubmitting}>Register</button>
      {errors.form && <p className="error">{errors.form}</p>}
      <button onClick={onBackToLogin} className="back-to-login-btn">
        חזרה להתחברות
        </button>
    </form>
  );
};

// הוספת PropTypes לרכיב
RegistrationForm.propTypes = {
  onBackToLogin: PropTypes.func.isRequired, // הגדרת onBackToLogin
};

export default RegistrationForm;
