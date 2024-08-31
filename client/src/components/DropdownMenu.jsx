import React from 'react';
import { Link } from 'react-router-dom';

const DropdownMenu = () => {
  return (
    <div className="btn-group dropstart">
      <button
        type="button"
        className="btn btn-custom no-caret"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i className="bi bi-list"></i> {/* אייקון של תפריט */}
      </button>
      <ul className="dropdown-menu">
        <li><Link className="dropdown-item" to="/courses">קורסים והשתלמויות</Link></li>
        <li><Link className="dropdown-item" to="/product-store">חנות מוצרים</Link></li>
        <li><Link className="dropdown-item" to="/about">קצת עליי</Link></li>
        <li><Link className="dropdown-item" to="/faq">שאלות ותשובות</Link></li>
        <li><Link className="dropdown-item" to="/contact">יצירת קשר</Link></li>
      </ul>
    </div>
  );
};

export default DropdownMenu;
