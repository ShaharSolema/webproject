import axios from 'axios';

// Create an instance of axios with default headers
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
});


export default axiosInstance;
