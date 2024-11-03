import { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Logo from '../Logo'; // ייבוא רכיב הלוגו

const MenuButton = () => {
  const styles = {
    nav: {
      margin: '10px',
    },
    logo: {
      position: 'absolute',
      bottom: '100px', /* מיקום הלוגו 100 פיקסלים מהתחתית */
      left: '0',
      width: '100%',
      display: 'flex',
      justifyContent: 'center', /* ליישר את הלוגו במרכז */
    },
    subtext: {
      textAlign: 'right',
    },
  };

  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [showSubmenu, setShowSubmenu] = useState(false);
  const offcanvasRef = useRef(null);

  const toggleOffcanvas = () => {
    // כאשר התפריט הראשי נסגר, גם סגור את תפריט הקורסים והשתלמויות
    setShowOffcanvas(prev => {
      if (prev) setShowSubmenu(false); // סגור את תפריט הקורסים והשתלמויות
      return !prev;
    });
  };

  const toggleSubmenu = () => setShowSubmenu(prev => !prev);

  const handleClickOutside = (event) => {
    if (offcanvasRef.current && !offcanvasRef.current.contains(event.target)) {
      setShowOffcanvas(false);
      setShowSubmenu(false); // סגור את תפריט הקורסים והשתלמויות
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="navbar bg-light" style={styles.nav}>
      <button 
        className="navbar-toggler" 
        type="button" 
        onClick={toggleOffcanvas}
        aria-controls="offcanvasNavbar"
      >
        <span 
          className="navbar-toggler-icon" 
        ></span>
      </button>
      <div 
        className={`offcanvas offcanvas-end${showOffcanvas ? ' show' : ''}`} 
        tabIndex="-1" 
        id="offcanvasNavbar" 
        aria-labelledby="offcanvasNavbarLabel"
        ref={offcanvasRef}
      >
        <div className="offcanvas-header">
          <button 
            type="button" 
            className="btn-close" 
            onClick={() => {
              setShowOffcanvas(false);
              setShowSubmenu(false); // סגור את תפריט הקורסים והשתלמויות
            }}
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">דף הבית</a>
            </li>
            <li className="nav-item">
              <a 
                className="nav-link" 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  toggleSubmenu();
                }}
              >
                קורסים והשתלמויות
              </a>
              {showSubmenu && (
                <ul className="dropdown-menu show" style={styles.subtext}>
                  <li><a className="dropdown-item" href="/advanced">קורסים מתקדמים</a></li>
                  <li><a className="dropdown-item" href="/beginner">קורסים למתחילים</a></li>
                  <li><a className="dropdown-item" href="/workshops">סדנאות</a></li>
                </ul>
              )}
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/productstore">חנות מוצרים</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about">קצת עליי</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/faq">שאלות ותשובות</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contact">יצירת קשר</a>
            </li>
          </ul>
        </div>
        <div style={styles.logo}>
          <Logo />
        </div>
      </div>
    </nav>
  );
};

export default MenuButton;
