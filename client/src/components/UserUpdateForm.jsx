import { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/RegistrationForm.css';
import validator from 'validator';

const UserUpdateForm = ({ onUpdateSuccess }) => {
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
        if (!value) errors.username = 'יש למלא שם משתמש';
        else if (!validator.isAlphanumeric(value)) errors.username = 'שם המשתמש מכיל תווים לא חוקיים!';
        else if (value.length < 6) errors.username = 'שם המשתמש צריך להיות יותר מ-6 תווים';
        break;
      case 'email':
        if (!validator.isEmail(value)) errors.email = 'פורמט אימייל לא חוקי';
        break;
      case 'password':
        if (value && !passwordValidator(value)) {
          errors.password = 'הסיסמה צריכה להיות באורך של לפחות 8 תווים ולכלול תו גדול, קטן, מספר ותו מיוחד';
        }
        break;
      case 'firstname':
        if (!value) errors.firstname = 'יש למלא שם פרטי';
        else if (!validator.isAlpha(value, 'en-US', { ignore: ' ' }) && !validator.isAlpha(value, 'he', { ignore: ' ' })) errors.firstname = 'שם פרטי מכיל תווים לא חוקיים!';
        else if (value.length < 2) errors.firstname = 'שם פרטי צריך להיות יותר מ-2 תווים';
        break;
      case 'lastname':
        if (!value) errors.lastname = 'יש למלא שם משפחה';
        else if (!validator.isAlpha(value, 'en-US', { ignore: ' ' }) && !validator.isAlpha(value, 'he', { ignore: ' ' })) errors.lastname = 'שם משפחה מכיל תווים לא חוקיים!';
        else if (value.length < 2) errors.lastname = 'שם משפחה צריך להיות יותר מ-2 תווים';
        break;
      case 'street':
        if (!value) errors.street = 'יש למלא רחוב';
        else if (value.length < 5) errors.street = 'הרחוב צריך להיות יותר מ-5 תווים';
        break;
      case 'streetnum':
        if (!value || isNaN(value)) errors.streetnum = 'מספר רחוב חייב להיות מספר';
        break;
      case 'postalcode':
        if (!value || isNaN(value)) errors.postalcode = 'מיקוד לא חוקי';
        break;
      case 'city':
        if (!value) errors.city = 'יש למלא עיר';
        else if (value.length < 5) errors.city = 'העיר צריכה להיות יותר מ-5 תווים';
        break;
      case 'telephone':
        if (!validator.isMobilePhone(value, 'he-IL')) errors.telephone = 'מספר פלאפון לא חוקי';
        break;
      case 'birthday':
        if (!value) errors.birthday = 'יש למלא תאריך לידה';
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
      const result = await updateUserData(formData); // Call API to update user data
      if (result.success) {
        onUpdateSuccess(); // Callback on successful update
      } else {
        setErrors({ form: result.error });
      }
    } catch (error) {
      console.error('Error updating user data:', error.message);
      setErrors({ form: 'העדכון נכשל. אנא נסו שוב מאוחר יותר.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>עדכון פרטי חשבון</h1>
      {[
        { label: 'שם משתמש', name: 'username', type: 'text' },
        { label: 'אימייל', name: 'email', type: 'email' },
        { label: 'סיסמה', name: 'password', type: 'password' },
        { label: 'שם פרטי', name: 'firstname', type: 'text' },
        { label: 'שם משפחה', name: 'lastname', type: 'text' },
        { label: 'רחוב', name: 'street', type: 'text' },
        { label: 'מספר רחוב', name: 'streetnum', type: 'number' },
        { label: 'מיקוד', name: 'postalcode', type: 'text' },
        { label: 'עיר', name: 'city', type: 'text' },
        { label: 'מספר פלאפון', name: 'telephone', type: 'text' },
        { label: 'תאריך לידה', name: 'birthday', type: 'date' },
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
          {errors[field.name] && <p className="error">{errors[field.name]}</p>}
        </div>
      ))}
      <button type="submit" disabled={isSubmitting}>עדכן</button>
      {errors.form && <p className="error">{errors.form}</p>}
    </form>
  );
};

UserUpdateForm.propTypes = {
  onUpdateSuccess: PropTypes.func.isRequired,
};

export default UserUpdateForm;
