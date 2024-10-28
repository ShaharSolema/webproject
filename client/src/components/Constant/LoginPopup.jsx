import { Link } from 'react-router-dom';
import { useState } from 'react';
import '../../styles/LoginPopup.css';

const LoginPopup = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = () => {
    // Implement login logic here
    console.log('Logging in with:', formData);
  };

  return (
    <div className="login-popup">
      <h3>Login</h3>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        className="form-control mb-2"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="form-control mb-2"
      />
      <button onClick={handleLogin} className="btn btn-primary mb-2">Login</button>
      <Link to="/RegistrationForm" className="btn btn-secondary">Sign Up</Link>
    </div>
  );
};

export default LoginPopup;
