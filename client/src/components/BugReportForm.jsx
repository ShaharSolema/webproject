import React, { useState, useEffect } from 'react';
import axiosInstanse from '../utils/axiosConfig';
import { API_ROUTES } from '../utils/apiRoutes';
import { bugReportValidations } from '../utils/validations';

const BugReportForm = ({ onClose }) => {
  const [bugReport, setBugReport] = useState({
    title: '',
    description: '',
    reporterInfo: {
      name: '',
      email: ''
    }
  });
  const [errors, setErrors] = useState({
    title: '',
    description: '',
    email: ''
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const validateField = (name, value) => {
    if (name === 'email') {
      return bugReportValidations.email.validate(value);
    }
    return bugReportValidations[name].validate(value);
  };

  const handleBugReportChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'email' || name === 'name') {
      setBugReport(prev => ({
        ...prev,
        reporterInfo: {
          ...prev.reporterInfo,
          [name]: value
        }
      }));
      
      if (name === 'email') {
        const error = validateField(name, value);
        setErrors(prev => ({
          ...prev,
          [name]: error
        }));
      }
    } else {
      setBugReport(prev => ({
        ...prev,
        [name]: value
      }));
      
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  useEffect(() => {
    const isValid = !errors.title && !errors.description && !errors.email &&
                   bugReport.title && bugReport.description;
    setIsFormValid(isValid);
  }, [bugReport, errors]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const titleError = validateField('title', bugReport.title);
    const descriptionError = validateField('description', bugReport.description);
    const emailError = validateField('email', bugReport.reporterInfo.email);

    const newErrors = {
      title: titleError,
      description: descriptionError,
      email: emailError
    };

    setErrors(newErrors);

    if (!titleError && !descriptionError && !emailError) {
      try {
        await axiosInstanse.post(API_ROUTES.BUGS.CREATE, bugReport);
        alert('תודה על הדיווח! נטפל בהקדם');
        onClose();
      } catch (error) {
        console.error('Error submitting bug report:', error);
        alert('אירעה שגיאה בשליחת הדיווח. אנא נסה שוב מאוחר יותר');
      }
    }
  };

  return (
    <div className="bug-report-overlay" style={{ zIndex: 100000000 }} onClick={(e) => e.target.classList.contains('bug-report-overlay') && onClose()}>
      <div className="bug-report-popup" style={{ zIndex: 10000000 }}>
        <div className="popup-header">
          <h3>דווח/י על תקלה</h3>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          {/* Form fields remain the same */}
          <div className="form-group">
            <label htmlFor="title">כותרת *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={bugReport.title}
              onChange={handleBugReportChange}
              onBlur={handleBlur}
              className={errors.title ? 'error' : ''}
              placeholder="הכנס כותרת (לפחות 3 תווים)"
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="description">תיאור *</label>
            <textarea
              id="description"
              name="description"
              value={bugReport.description}
              onChange={handleBugReportChange}
              onBlur={handleBlur}
              className={errors.description ? 'error' : ''}
              placeholder="הכנס תיאור מפורט (לפחות 10 תווים)"
            />
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="name">שם (לא חובה)</label>
            <input
              type="text"
              id="name"
              name="name"
              value={bugReport.reporterInfo.name}
              onChange={handleBugReportChange}
              placeholder="הכנס את שמך"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">אימייל (לא חובה)</label>
            <input
              type="email"
              id="email"
              name="email"
              value={bugReport.reporterInfo.email}
              onChange={handleBugReportChange}
              onBlur={handleBlur}
              className={errors.email ? 'error' : ''}
              placeholder="your@email.com"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <button 
            type="submit" 
            disabled={!isFormValid}
            className={!isFormValid ? 'disabled' : ''}
          >
            שלח דיווח
          </button>
        </form>
      </div>
    </div>
  );
};

export default BugReportForm; 