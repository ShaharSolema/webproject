import axios from 'axios';
import { API_ROUTES } from './apiRoutes';

export const checkLoginStatus = async () => {
  try {
    const response = await axios.get(API_ROUTES.AUTH.CHECK_LOGIN, { withCredentials: true });
    return response.data || { isLoggedIn: false }; // Ensure a fallback
  } catch (error) {
    console.error('Error checking login status:', error);
    return { isLoggedIn: false };
  }
};

export const loginUser = async (formData) => {
  try {
    const response = await axios.post(API_ROUTES.AUTH.LOGIN, formData, { withCredentials: true });
    const userData = response.data?.user
      ? { username: response.data.user.username, name: response.data.user.name }
      : null;

    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
    }

    return { success: !!userData, user: userData };
  } catch (error) {
    console.error('Error logging in:', error.response?.data || error.message);
    return { success: false, error: error.response?.data?.message || 'Login failed' };
  }
};

export const logoutUser = async () => {
  try {
    await axios.post(API_ROUTES.AUTH.LOGOUT, {}, { withCredentials: true });
    localStorage.removeItem('user');
    return { success: true };
  } catch (error) {
    console.error('Error logging out:', error.response?.data || error.message);
    return { success: false, error: error.response?.data?.message || 'Logout failed' };
  }
};
