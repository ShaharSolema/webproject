import { Link } from 'react-router-dom';

const Logo = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // גלילה חלקה לראש העמוד
    });
  };

  return (
    <Link to="/" onClick={scrollToTop} style={{ display: 'flex', justifyContent: 'center' }}>
      <img
        src="src/styles/Michal.jpg"
        alt="Michal Nail Art Logo"
        className="img-fluid"
        style={{ maxWidth: '200px', maxHeight: '50px' }}
      />
    </Link>
  );
};

export default Logo;
