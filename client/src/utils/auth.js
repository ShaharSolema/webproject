import axios from 'axios';
import { API_ROUTES } from './apiRoutes';

// Check if the user is logged in by verifying the JWT in the cookie
export const checkLoginStatus = async () => {
  try {
    const response = await axios.get(API_ROUTES.AUTH.CHECK_LOGIN, { withCredentials: true });
    return response.data; // { isLoggedIn: true/false, user: {username, name, etc.} }
  } catch (error) {
    console.error('Error checking login status:', error);
    return { isLoggedIn: false };
  }
};

// Login function that saves the user data to local storage and sets the token cookie
export const loginUser = async (formData) => {
  try {
    const response = await axios.post(API_ROUTES.AUTH.LOGIN, formData, { withCredentials: true });
    const userData = {
      username: response.data.user.username,
      name: response.data.user.name,
    };
    localStorage.setItem('user', JSON.stringify(userData)); // Optionally save non-sensitive user data

    return { success: true, user: userData };
  } catch (error) {
    console.error('Error logging in:', error.response?.data || error.message);
    return { success: false, error: error.response?.data?.message || error.message };
  }
};

// Logout function that clears the token cookie and removes user data from local storage
export const logoutUser = async () => {
  try {
    await axios.post(API_ROUTES.AUTH.LOGOUT, {}, { withCredentials: true });
    localStorage.removeItem('user');
    return { success: true };
  } catch (error) {
    console.error('Error logging out:', error.response?.data || error.message);
    return { success: false, error: error.response?.data?.message || error.message };
  }
};
