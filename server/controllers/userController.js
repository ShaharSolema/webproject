import { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/RegistrationForm.css';
import { API_ROUTES } from '../utils/apiRoutes';
import validator from 'validator';

const UserUpdateForm = ({ initialData, onBack, onUpdateSuccess }) => {
  const [formData, setFormData] = useState({
    username: initialData.username || '',
    email: initialData.email || '',
    password: '', // Leave blank, only change if needed
    firstname: initialData.firstname || '',
    lastname: initialData.lastname || '',
    street: initialData.street || '',
    streetnum: initialData.streetnum || '',
    postalcode: initialData.postalcode || '',
    city: initialData.city || '',
    telephone: initialData.telephone || '',
    birthday: initialData.birthday || '',
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
        else if (value.length < 6) errors.username = 'Username must be more than 6 characters';
        break;
      case 'email':
        if (!validator.isEmail(value)) errors.email = 'Invalid email format';
        break;
      case 'password':
        if (value && !passwordValidator(value)) {
          errors.password = 'Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character';
        }
        break;
      case 'firstname':
        if (!value) errors.firstname = 'First name is required';
        else if (!validator.isAlpha(value, 'en-US', { ignore: ' ' }) && !validator.isAlpha(value, 'he', { ignore: ' ' })) errors.firstname = 'First name contains invalid characters!';
        else if (value.length < 2) errors.firstname = 'Firstname must be more than 2 characters';
        break;
      case 'lastname':
        if (!value) errors.lastname = 'Last name is required';
        else if (!validator.isAlpha(value, 'en-US', { ignore: ' ' }) && !validator.isAlpha(value, 'he', { ignore: ' ' })) errors.lastname = 'Last name contains invalid characters!';
        else if (value.length < 2) errors.lastname = 'Lastname must be more than 2 characters';
        break;
      case 'street':
        if (!value) errors.street = 'Street is required';
        else if (value.length < 5) errors.street = 'Street must be more than 5 characters';
        break;
      case 'streetnum':
        if (!value || isNaN(value)) errors.streetnum = 'Street number must be a number';
        break;
      case 'postalcode':
        if (!value || isNaN(value)) errors.postalcode = 'Invalid postal code';
        break;
      case 'city':
        if (!value) errors.city = 'City is required';
        else if (value.length < 5) errors.city = 'City must be more than 5 characters';
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
      const response = await fetch(API_ROUTES.USERS.UPDATE(initialData.id), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        onUpdateSuccess();
      } else {
        setErrors({ form: result.message });
      }
    } catch (error) {
      console.error('Error updating user data:', error.message);
      setErrors({ form: 'Update failed. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Update Account</h1>
      {[
        { label: ':שם משתמש', name: 'username', type: 'text' },
        { label: ':אימייל', name: 'email', type: 'email' },
        { label: ':סיסמא', name: 'password', type: 'password' },
        { label: ':שם פרטי', name: 'firstname', type: 'text' },
        { label: ':שם משפחה', name: 'lastname', type: 'text' },
        { label: ':רחוב', name: 'street', type: 'text' },
        { label: ':מספר רחוב', name: 'streetnum', type: 'number' },
        { label: ':מיקוד', name: 'postalcode', type: 'text' },
        { label: ':עיר', name: 'city', type: 'text' },
        { label: ':מספר פלאפון', name: 'telephone', type: 'text' },
        { label: ':תאריך לידה', name: 'birthday', type: 'date' },
      ].map((field) => (
        <div key={field.name}>
          <label>{field.label}:</label>
          <input
            type={field.type}
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            required={field.name !== 'password'}
          />
          {errors[field.name] && <p>{errors[field.name]}</p>}
        </div>
      ))}
      <button type="submit" disabled={isSubmitting}>Update</button>
      {errors.form && <p className="error">{errors.form}</p>}
      <button type="button" onClick={onBack} className="back-to-login-btn">
        חזרה
      </button>
    </form>
  );
};

UserUpdateForm.propTypes = {
  initialData: PropTypes.object.isRequired,
  onBack: PropTypes.func.isRequired,
  onUpdateSuccess: PropTypes.func.isRequired,
};

export default UserUpdateForm;
