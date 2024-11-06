import { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Logo from '../Logo';

const MenuButton = () => {
  const styles = {
    nav: {
      margin: '10px',
    },
    logo: {
      position: 'absolute',
      bottom: '100px', // מיקום הלוגו 100 פיקסלים מהתחתית
      left: '0',
      width: '100%',
      display: 'flex',
      justifyContent: 'center', // ליישר את הלוגו במרכז
    },
    subtext: {
      textAlign: 'right',
    },
  };

  const [isHovered, setIsHovered] = useState(false);
  const [isCloseHovered, setIsCloseHovered] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [showSubmenu, setShowSubmenu] = useState(false);
  const offcanvasRef = useRef(null);

  const toggleOffcanvas = () => {
    setShowOffcanvas(prev => !prev);
    if (showOffcanvas) setShowSubmenu(false);
  };

  const toggleSubmenu = () => setShowSubmenu(prev => !prev);

  const handleClickOutside = (event) => {
    if (offcanvasRef.current && !offcanvasRef.current.contains(event.target)) {
      setShowOffcanvas(false);
      setShowSubmenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="navbar bg-light" style={{ margin: '10px', backgroundColor: '#ffffff' }}>
      <button 
        className="navbar-toggler"
        type="button"
        onClick={toggleOffcanvas}
        aria-controls="offcanvasNavbar"
        
        style={{
          backgroundColor: isHovered ? 'rgba(230, 230, 230, 0.8)' : '#ffffff',
          boxShadow:'none',
          transition: 'background-color 0.3s ease',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div 
        className={`offcanvas offcanvas-end ${showOffcanvas ? 'show' : ''}`}
        tabIndex="-1"
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
        ref={offcanvasRef}
        style={{
          backgroundColor: '#ffffff',
          transition: 'transform 0.3s ease',
          transform: showOffcanvas ? 'translateX(0)' : 'translateX(100%)',
          visibility: showOffcanvas ? 'visible' : 'hidden',
          height: '100vh', // הפנל יתפוס את כל גובה המסך
          zIndex: 1050, // לוודא שהפנל מעל תוכן אחר
        }}
      >
        <div className="offcanvas-header">
          <button 
            type="button"
            className="btn-close"
            onClick={() => setShowOffcanvas(false)}
            style={{
              backgroundColor: isCloseHovered ? 'rgba(230, 230, 230, 0.8)' : 'transparent',
              border: 'none',
            }}
            onMouseEnter={() => setIsCloseHovered(true)}
            onMouseLeave={() => setIsCloseHovered(false)}
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
                <ul className="dropdown-menu show" style={{ textAlign: 'right' }}>
                  <li><a className="dropdown-item" href="/beginner">קורסים למתחילים</a></li>
                  <li><a className="dropdown-item" href="/advanced">קורסים מתקדמים</a></li>
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

      <style jsx>{`
        .nav-link {
          transition: background-color 0.3s ease, color 0.3s ease; /* אנימציה חלקה */
        }

        .nav-link:hover {
          background-color: rgba(230, 230, 230, 0.8); /* צבע רקע כשיש ריחוף */
          color: #000; /* צבע טקסט כשיש ריחוף */
        }

        .offcanvas {
          transition: transform 0.3s ease; /* אנימציה חלקה */
        }
      `}</style>
    </nav>
  );
};



export default MenuButton;


