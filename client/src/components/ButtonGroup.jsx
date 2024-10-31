// src/components/ButtonGroup.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginPopup from './Constant/LoginPopup';

const ButtonGroup = () => {
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const toggleLoginPopup = () => {
    setShowLoginPopup(!showLoginPopup);
  };

  return (
    <>
      <button className="btn btn-light me-2 btn-large" onClick={toggleLoginPopup}>
        <i className="bi bi-person-fill"></i> {/* User icon */}
      </button>

      {showLoginPopup && <LoginPopup />}

      <Link to="/cart">
        <button className="btn btn-light me-2">
          <i className="bi bi-bag-heart"></i> {/* Bag icon */}
        </button>
      </Link>
    </>
  );
};

export default ButtonGroup;
