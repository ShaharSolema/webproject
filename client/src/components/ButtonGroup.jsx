// src/components/ButtonGroup.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ButtonGroup = () => {
  return (
    <>
      <Link to="/profile">
        <button className="btn btn-light me-2 btn-large">
          <i className="bi bi-person-fill"></i> {/* אייקון של משתמש */}
        </button>
      </Link>
      <Link to="/cart">
        <button className="btn btn-light me-2">
          <i className="bi bi-bag-heart"></i> {/* אייקון של תיק */}
        </button>
      </Link>
    </>
  );
};

export default ButtonGroup;
