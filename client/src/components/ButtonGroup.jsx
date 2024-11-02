import { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginPopup from './Constant/LoginPopup';

const ButtonGroup = () => {
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const toggleLoginPopup = () => {
    setShowLoginPopup(!showLoginPopup);
  };

  const closeLoginPopup = () => {
    setShowLoginPopup(false);
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

      {showLoginPopup && <LoginPopup onClose={closeLoginPopup} />}

      <Link to="/cart">
        <button className="btn btn-light me-2">
          <i className="bi bi-bag-heart"></i> {/* Bag icon */}
        </button>
      </Link>
    </>
  );
};

export default ButtonGroup;