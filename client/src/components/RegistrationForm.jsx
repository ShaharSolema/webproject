import { useState } from 'react';
import PropTypes from 'prop-types';
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
        if (!value) errors.username = 'לא הוזן שם משתמש';
        else if (!validator.isAlphanumeric(value)) errors.username = 'השם משתמש מכיל תווים שגויים';
        else if (value.length < 6) errors.username = 'שם משתמש חייב להיות יותר מ-6 אותיות';
        break;
      case 'email':
        if (!validator.isEmail(value)) errors.email = 'האימייל שגוי';
        break;
      case 'password':
        if (!passwordValidator(value)) {
          errors.password = 'הסיסמא חייבת להכיל לפחות 8 תווים, כולל אותיות קטנות, אות גדולה, מספרים ותו מיוחד';
        }
        break;
      case 'firstname':
        if (!value) errors.firstname = 'לא הוזן שם פרטי';
        else if (!validator.isAlpha(value, 'en-US', { ignore: ' ' }) && !validator.isAlpha(value, 'he', { ignore: ' ' })) errors.firstname = 'First name contains invalid characters!';
        else if (value.length < 2) errors.firstname = 'השם חייב להכיל יותר מ-2 אותיות';
        break;
      case 'lastname':
        if (!value) errors.lastname = 'לא הוזן שם משפחה';
        else if (!validator.isAlpha(value, 'en-US', { ignore: ' ' }) && !validator.isAlpha(value, 'he', { ignore: ' ' })) errors.lastname = 'Last name contains invalid characters!';
        else if (value.length < 2) errors.lastname = 'השם משפחה חייב להיות יותר מ-2 אותיות';
        break;
      case 'street':
        if (!value) errors.street = 'לא הוזן רחוב';
        else if (value.length < 5) errors.street = 'שם הרחוב חייב להיות יותר מ-5 אותיות';
        break;
      case 'streetnum':
        if (!value || isNaN(value)) errors.streetnum = 'לא הוזן מספר רחוב';
        break;
      case 'postalcode':
        if (!value || isNaN(value)) errors.postalcode = 'מיקוד שגוי';
        break;
      case 'city':
        if (!value) errors.city = 'לא הוזן עיר';
        else if (value.length < 5) errors.city = 'שם העיר חייב להיות יותר מ-5 אותיות';
        break;
      case 'telephone':
        if (!validator.isMobilePhone(value, 'he-IL')) errors.telephone = 'מספר פלאפון שגוי';
        break;
      case 'birthday':
        if (!value) errors.birthday = 'לא הוזן תאריך לידה';
        else {
          const birthDate = new Date(value);
          const today = new Date();
  
          if (birthDate > today) errors.birthday = 'תאריך הלידה לא יכול להיות אחרי התאריך הנוכחי';
        }
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
        window.location.href = '/';
      } else {
        setErrors({ form: result.error });
      }
    } catch (error) {
      console.error(':בעיה בהרשמה', error.message);
      setErrors({ form: 'ההרשמה נכשלה, נסה שנית מאוחר יותר' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>הרשמה</h1>
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
            required
          />
          {errors[field.name] && <p>{errors[field.name]}</p>}
        </div>
      ))}
      <button type="submit" disabled={isSubmitting}>הירשם</button>
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
