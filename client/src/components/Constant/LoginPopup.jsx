import { useState, useEffect, useRef } from 'react'; 
import PropTypes from 'prop-types'; 
import { loginUser, checkLoginStatus, logoutUser } from '../../utils/auth';
import RegistrationForm from '../RegistrationForm'; 
import logo from '../../styles/Michal.jpg'; // ייבוא הלוגו
import '../../styles/LoginPopup.css';

const LoginPopup = ({ onClose }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [user, setUser] = useState(null);
  const [loginError, setLoginError] = useState(null);
  const [showRegistration, setShowRegistration] = useState(false);
  const [isExiting, setIsExiting] = useState(false); // חדש: מצב יציאה
  const popupRef = useRef();

  useEffect(() => {
    const fetchLoginStatus = async () => {
      const status = await checkLoginStatus();
      if (status.isLoggedIn) {
        setUser(status.user);
      }
    };
    fetchLoginStatus();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        handleClose(); // סגירת הפופאפ
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleClose = () => {
    setIsExiting(true); // הפעלת אנימציית יציאה
    setTimeout(() => {
      onClose(); // סגור את הפופאפ לאחר 300ms (משך האנימציה)
    }, 300); 
  };

  const handleLogin = async () => {
    const loginResult = await loginUser(formData);
    if (loginResult.success) {
      setUser(loginResult.user);
      setLoginError(null); // אפס שגיאה במקרה של הצלחה
    } else {
      setLoginError(loginResult.error); // עדכן שגיאה במקרה של כישלון
    }
  };

  const handleLogout = async () => {
    const logoutResult = await logoutUser();
    if (logoutResult.success) {
      setUser(null);
    } else {
      console.error('Logout failed:', logoutResult.error);
    }
  };

  const toggleRegistration = () => {
    setShowRegistration(!showRegistration);
  };

  return (
    <div className={`login-popup-overlay ${isExiting ? 'exit' : ''}`}>
      <div className="login-popup" ref={popupRef}>
        <h1>
          <img src={logo} alt="Logo" className="logo" /> {/* הצגת הלוגו */}
        </h1>
        <hr className="divider" /> {/* קו חוצץ */}
        {showRegistration ? (
          <RegistrationForm onBackToLogin={toggleRegistration} /> 
        ) : user ? (
          <>
            <h3>{user.name},היי</h3>
            <button onClick={handleLogout} className="btn btn-primary mb-2">
              יציאה מהמשתמש
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
      <div className="arrow-up"></div> {/* חץ למעלה */}
    </div>
  );
};

// הגדרת PropTypes
LoginPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default LoginPopup;