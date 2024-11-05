import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoginPopup from './Constant/LoginPopup';
import Cart from './Cart';
import { checkLoginStatus } from '../utils/auth';

const ButtonGroup = () => {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showCartPopup, setShowCartPopup] = useState(false);
  const [user, setUser] = useState(null);

  // Fetch user data when component mounts
  const checkAuth = async () => {
    const status = await checkLoginStatus();
    if (status.isLoggedIn) {
      setUser(status.user);
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const toggleLoginPopup = () => {
    setShowLoginPopup(!showLoginPopup);
  };

  const closeLoginPopup = async () => {
    setShowLoginPopup(false);
    // Refresh user status when login popup closes
    await checkAuth();
  };

  const toggleCartPopup = () => {
    setShowCartPopup(prev => !prev);
  };

  const closeCartPopup = () => {
    setShowCartPopup(false);
  };

  const buttonStyle = {
    width: '60px', // רוחב הכפתור
    height: '60px', // גובה הכפתור
    padding: '10px', // מרווח פנימי
    fontSize: '10px', // גודל טקסט קטן יותר
  };
  
  return (
    <>
      <button style={buttonStyle} className="btn btn-light me-2" onClick={toggleLoginPopup}>
        <i className="bi bi-person-fill"></i> {/* User icon */}
      </button>  

      {showLoginPopup && <LoginPopup onClose={closeLoginPopup} setGlobalUser={setUser} />}

      <button style={buttonStyle} className="btn btn-light me-2" onClick={toggleCartPopup}>
        <i className="bi bi-bag-heart"></i> {/* Bag icon */}
      </button>

      <Cart 
        isOpen={showCartPopup}
        onClose={closeCartPopup}
        user={user}
        key={user ? user._id : 'no-user'} // Force re-render when user changes
      />
    </>
  );
};

export default ButtonGroup;