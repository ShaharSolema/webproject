// src/components/LoginPopup.jsx
import { useState, useEffect } from 'react';
import { loginUser, checkLoginStatus, logoutUser } from '../utils/auth';
import { Link } from 'react-router-dom';

const LoginPopup = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [user, setUser] = useState(null);

  // Check if user is logged in on component mount
  useEffect(() => {
    const fetchLoginStatus = async () => {
      const status = await checkLoginStatus();
      if (status.isLoggedIn) {
        setUser(status.user);
      }
    };
    fetchLoginStatus();
  }, []);

  const handleLogin = async () => {
    const loginResult = await loginUser(formData);
    if (loginResult.success) {
      setUser(loginResult.user);
    } else {
      console.error('Login failed:', loginResult.error);
    }
  };

  const handleLogout = async () => {
    const logoutResult = await logoutUser();
    if (logoutResult.success) {
      setUser(null);
    } else {
      console.error('Logout failed:', logoutResult.error);
    }
  };

  return (
    <div className="login-popup">
      {user ? (
        <>
          <h3>Hello, {user.name}</h3>
          <button onClick={handleLogout} className="btn btn-primary mb-2">
            Logout
          </button>
        </>
      ) : (
        <>
          <h3>Login</h3>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
            className="form-control mb-2"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
            className="form-control mb-2"
          />
          <button onClick={handleLogin} className="btn btn-primary mb-2">
            Login
          </button>
          <Link to="/RegistrationForm" className="btn btn-secondary">
            Sign Up
          </Link>
        </>
      )}
    </div>
  );
};

export default LoginPopup;
