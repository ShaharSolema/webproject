import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/RegistrationForm.css'; 
import { updateUser } from '../utils/auth'; 
import validator from 'validator';

const UserUpdateForm = ({ user, onBackToLogin }) => {
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

  // Pre-fill the form with existing user data
  useEffect(() => {
    if (user) {
      const formattedBirthday = user.birthday ? new Date(user.birthday).toISOString().split('T')[0] : '';
      
      setFormData({
        username: user.username || '',
        email: user.email || '',
        firstname: user.firstname || '',
        lastname: user.lastname || '',
        street: user.street || '',
        streetnum: user.streetnum || '',
        postalcode: user.postalcode || '',
        city: user.city || '',
        telephone: user.telephone || '',
        birthday: formattedBirthday, 
      });
    }
  }, [user]);

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
        else if (value.length < 2) errors.street = 'שם הרחוב חייב להיות יותר מ-2 אותיות';
        break;
      case 'streetnum':
        if (!value || isNaN(value)) errors.streetnum = 'לא הוזן מספר רחוב';
        break;
      case 'postalcode':
        if (!value || isNaN(value)) errors.postalcode = 'מיקוד שגוי';
        break;
      case 'city':
        if (!value) errors.city = 'לא הוזן עיר';
        else if (value.length < 2) errors.city = 'שם העיר חייב להיות יותר מ-5 אותיות';
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
        const userDataWithId = { ...formData, id: user._id }; 
        const result = await updateUser(userDataWithId); 
        

        if (result.success) {
          alert('עדכון פרטים בוצע בהצלחה');
          window.location.href = '/'; 
        } else {
          setErrors({ form: result.error || 'אירעה שגיאה בעדכון הפרטים' });
        }
    } catch (error) {
      console.error('שגיאה בעדכון הפרטים', error);
      setErrors({ form: 'העדכון נכשל. נסה שנית מאוחר יותר' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>עדכון פרטי משתמש</h1>
      {[
        { label: 'אימייל', name: 'email', type: 'email' },
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
            required={!field.optional} // Mark as required unless it's optional
          />
          {errors[field.name] && <p>{errors[field.name]}</p>}
        </div>
      ))}
      <button type="submit" disabled={isSubmitting}>עדכן פרטים</button>
      {errors.form && <p className="error">{errors.form}</p>}
      <button onClick={onBackToLogin} className="back-to-login-btn">
        חזרה להתחברות
      </button>
    </form>
  );
};

// PropTypes for the UserUpdateForm component
UserUpdateForm.propTypes = {
  user: PropTypes.object.isRequired, // Make sure to pass the current user data as a prop
  onBackToLogin: PropTypes.func.isRequired, // Define onBackToLogin prop
};

export default UserUpdateForm;
