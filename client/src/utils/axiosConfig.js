import axios from 'axios';

// Create an instance of axios with default headers
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
});

// Set the token in the headers of every request if it exists
const token = localStorage.getItem('token');
if (token) {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default axiosInstance;
