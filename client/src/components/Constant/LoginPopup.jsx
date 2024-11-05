import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { loginUser, checkLoginStatus, logoutUser } from '../../utils/auth';
import RegistrationForm from '../RegistrationForm'; 
import logo from '../../styles/Michal.jpg';
import '../../styles/LoginPopup.css';
import UserUpdateForm from '../UserUpdateForm';

const LoginPopup = ({ onClose }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [showRegistration, setShowRegistration] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false); 
  const popupRef = useRef();

  const navigate = useNavigate();

  const fetchLoginStatus = async () => {
    const status = await checkLoginStatus();
    if (status.isLoggedIn) {
      setUser(status.user);
      setIsAdmin(status.user.manager);
    }
  };

  useEffect(() => {
    fetchLoginStatus();
  }, []);

  const handleAdminRedirect = (path) => {
    navigate(path);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' }); // גלילה לראש העמוד
    }, 100); // חיכוי קצר לניווט
    handleClose();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        handleClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleClose = () => {
    setIsExiting(true); 
    setTimeout(() => {
      onClose(); 
    }, 300); 
  };

  const handleLogin = async () => {
    const loginResult = await loginUser(formData);
    if (loginResult.success) {
      setUser(loginResult.user);
      setIsAdmin(loginResult.user.manager);
      setLoginError(null);
      navigate('/');
      handleClose();
    } else {
      setLoginError(loginResult.error);
    }
  };

  const handleLogout = async () => {
    const logoutResult = await logoutUser();
    if (logoutResult.success) {
      setUser(null);
      setIsAdmin(false);
      handleClose();
      navigate('/');
    } else {
      console.error('Logout failed:', logoutResult.error);
    }
  };

  const toggleRegistration = () => {
    setShowRegistration(!showRegistration);
  };

  const handleToggleUpdateForm = () => {
    setShowUpdateForm(!showUpdateForm);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && formData.username && formData.password) {
      handleLogin();
    }
  };

  return (
    <div className={`login-popup-overlay ${isExiting ? 'exit' : ''}`}>
      <div className="login-popup" ref={popupRef}>
        <h1>
          <img src={logo} alt="Logo" className="logo" />
        </h1>
        <hr className="divider" />
        {showRegistration ? (
          <RegistrationForm onBackToLogin={toggleRegistration} /> 
        ) : showUpdateForm ? (
          <UserUpdateForm user={user} onBackToLogin={handleToggleUpdateForm} />
        ) : user ? (
          <>
            <h3>{user.firstname}, היי</h3>
            <button onClick={handleLogout} className="btn btn-primary mb-2">
              יציאה מהמשתמש
            </button>
            {isAdmin && (
              <>
                <h4 className="admin-options-title">אפשרויות מנהל</h4>
                <div className="icon-row mb-2">
                  <i 
                    className="bi bi-person-fill-gear admin-icon" 
                    onClick={() => handleAdminRedirect('/usersadmin')}
                    title="עריכת משתמשים"
                  ></i>
                  <i 
                    className="bi bi-cart-plus admin-icon" 
                    onClick={() => handleAdminRedirect('/productsmanagement')}
                    title="ניהול מוצרים"
                  ></i>
                  <i 
                    className="bi bi-pie-chart-fill admin-icon" 
                    onClick={() => handleAdminRedirect('/statistics')}
                    title="סטטיסטיקה"
                  ></i>
                </div>
              </>
            )}

            <button onClick={handleToggleUpdateForm} className="btn btn-secondary mb-2">
              עדכן את פרטי החשבון
            </button>
          </>
        ) : (
          <>
            <h3>התחברות לחשבון</h3>
            <input
              type="text"
              name="username"
              placeholder="שם משתמש"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
              className="form-control mb-2"
            />
            <input
              type="password"
              name="password"
              placeholder="סיסמא"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
              onKeyDown={handleKeyDown}
              className="form-control mb-2"
            />
            {loginError && <p className="text-danger">{loginError}</p>}
            <button
              onClick={handleLogin}
              className="btn btn-primary mb-2"
              disabled={!formData.username || !formData.password}
            >
              היכנס/י לחשבונך
            </button>
            <button onClick={toggleRegistration} className="btn btn-secondary mb-2">
              אין לכם עדיין חשבון? לחץ ליצירת חשבון
            </button>
          </>
        )}
      </div>
      <div className="arrow-up"></div>
    </div>
  );
};

LoginPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default LoginPopup;
