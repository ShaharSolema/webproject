// src/components/Header.jsx
import React from 'react';
import ButtonGroup from './ButtonGroup';
import Logo from './Logo';
import DropdownMenu from './DropdownMenu';

const Header = () => {
  return (
    <header className="row fixed-top bg-white py-2">
      {/* עמודה שמאלית עם כפתורים */}
      <div className="col d-flex align-items-center justify-content-start">
        <ButtonGroup />
      </div>

      {/* עמודת המרכז עם לוגו */}
      <div className="col-6 d-flex justify-content-center align-items-center">
        <Logo />
      </div>

      {/* עמודה ימנית עם כפתור תפריט נפתח */}
      <div className="col text-end d-flex align-items-center justify-content-end">
        <DropdownMenu />
      </div>
    </header>
  );
};

export default Header;
