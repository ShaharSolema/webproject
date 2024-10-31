import axios from 'axios';
import { API_ROUTES } from './apiRoutes';
import axiosInstanse from './axiosConfig';

// Check login status function
export const checkLoginStatus = async () => {
  try {
    const response = await axiosInstanse.get(API_ROUTES.AUTH.CHECK_LOGIN, { withCredentials: true });
    return response.data || { isLoggedIn: false };
  } catch (error) {
    console.error('Error checking login status:', error);
    return { isLoggedIn: false };
  }
};

// Login user function
export const loginUser = async (formData) => {
  try {
    const response = await axiosInstanse.post(API_ROUTES.AUTH.LOGIN, formData, { withCredentials: true });
    
    // Log the entire response for debugging
    console.log('Login API Response:', response.data);
    
    const userData = response.data?.user
      ? {
          username: response.data.user.username,
          name: response.data.user.firstname, // Ensure this field exists in the response
        }
      : null;

    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData)); // Save user data to localStorage
    }

    return { success: !!userData, user: userData };
  } catch (error) {
    console.error('Error logging in:', error.response?.data || error.message);
    return { success: false, error: error.response?.data?.message || 'Login failed' };
  }
};


// Register user function
export const registerUser = async (formData) => {
  try {
    const response = await axiosInstanse.post(API_ROUTES.AUTH.REGISTER, formData, { withCredentials: true });
    const userData = response.data?.user
      ? { username: response.data.user.username, name: response.data.user.firstname }
      : null;

    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData)); // Save user data to localStorage
    }

    return { success: true, user: userData };
  } catch (error) {
    console.error('Error registering:', error.response?.data || error.message);
    return { success: false, error: error.response?.data?.message || 'Registration failed' };
  }
};

// Logout user function
export const logoutUser = async () => {
  try {
    await axiosInstanse.post(API_ROUTES.AUTH.LOGOUT, {}, { withCredentials: true });
    localStorage.removeItem('user'); // Remove user data from localStorage on logout
    return { success: true };
  } catch (error) {
    console.error('Error logging out:', error.response?.data || error.message);
    return { success: false, error: error.response?.data?.message || 'Logout failed' };
  }
};
