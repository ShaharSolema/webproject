import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/">
      <img
        src="src\styles\Michal.jpg"
        alt="MichalNail Art Logo"
        className="img-fluid"
        style={{ maxWidth: '200px', maxHeight: '50px' }}
      />
    </Link>
  );
};

export default Logo;
