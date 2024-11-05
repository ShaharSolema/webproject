import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const Logo = ({ closeOffcanvas }) => {
  const location = useLocation();

  const handleLogoClick = () => {
    if (location.pathname === "/") {
      // גלילה לראש העמוד אם כבר בדף הבית
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else {
      // מעבר לדף הבית אם לא נמצאים שם
      closeOffcanvas(); // סוגר את כל הדברים שפתוחים
    }
  };

  return (
    <Link to="/" onClick={handleLogoClick} style={{ display: 'flex', justifyContent: 'center' }}>
      <img
        src="src/styles/Michal.jpg"
        alt="Michal Nail Art Logo"
        className="img-fluid"
        style={{ maxWidth: '200px', maxHeight: '50px' }}
      />
    </Link>
  );
};

Logo.propTypes = {
  closeOffcanvas: PropTypes.func.isRequired,
};

export default Logo;