import { Link } from 'react-router-dom';
import { useState } from 'react';
import '../../styles/LoginPopup.css';
import { API_ROUTES } from '../../utils/apiRoutes';
import axios from 'axios'; // Ensure axios is imported

const LoginPopup = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent any default behavior (only needed if inside a <form> element)

    try {
      const response = await axios.post(API_ROUTES.AUTH.LOGIN, formData);
      console.log(response.data); // Handle success response

      const userData = {
        username: response.data.username,
        name: response.data.firstname,
      };
      localStorage.setItem('user', JSON.stringify(userData)); // Save name and username in local storage

      // Optionally redirect or perform other actions
      window.location.href = '/welcome'; // Update this to your welcome page

    } catch (error) {
      console.error('Error logging in:', error.response?.data || error.message);
    }
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
