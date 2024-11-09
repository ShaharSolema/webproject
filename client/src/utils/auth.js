import axios from 'axios';
import { API_ROUTES } from './apiRoutes';
import axiosInstanse from './axiosConfig';

// Check login status function
export const checkLoginStatus = async () => {
  try {
    const response = await axiosInstanse.get(API_ROUTES.AUTH.CHECK_LOGIN, { withCredentials: true });
    return response.data || { isLoggedIn: false, user: null };
  } catch (error) {
    console.error('Error checking login status:', error);
    return { isLoggedIn: false, user: null };
  }
};

// Login user function
export const loginUser = async (formData) => {
  try {
    const response = await axiosInstanse.post(API_ROUTES.AUTH.LOGIN, formData, { withCredentials: true });
    

    const userData = response.data?.user;
    
    return { 
      success: !!userData, 
      user: userData ? {
        username: userData.username,
        name: userData.firstname,
        isAdmin: userData.manager, // Ensure this field is in the response
      } : null
    };
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
    return { success: true };
  } catch (error) {
    console.error('Error logging out:', error.response?.data || error.message);
    return { success: false, error: error.response?.data?.message || 'Logout failed' };
  }
};

export const fetchUserData = async () => {
  // Implement fetching user data based on your API
  const response = await fetch(API_ROUTES.USERS.GET_BY_ID(userId)); // Replace userId with the actual ID
  if (!response.ok) throw new Error('Failed to fetch user data');
  return response.json();
};

// Fetch all products function
export const fetchProducts = async () => {
  try {
    const response = await axiosInstanse.get(API_ROUTES.PRODUCTS.GET_ALL);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error.response?.data || error.message);
    throw new Error('Failed to fetch products');
  }
};

// Add product function
export const addProduct = async (product) => {
  try {
    const response = await axiosInstanse.post(API_ROUTES.PRODUCTS.CREATE, product, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Error adding product:', error.response?.data || error.message);
    throw new Error('Failed to add product');
  }
};

// Update product function
export const updateProduct = async (id, product) => {
  try {
    const response = await axiosInstanse.put(API_ROUTES.PRODUCTS.UPDATE(id), product, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error.response?.data || error.message);
    throw new Error('Failed to update product');
  }
};

// Delete product function
export const deleteProduct = async (id) => {
  try {
    const response = await axiosInstanse.delete(API_ROUTES.PRODUCTS.DELETE(id), { withCredentials: true });
    return response.status === 200;
  } catch (error) {
    console.error('Error deleting product:', error.response?.data || error.message);
    throw new Error('Failed to delete product');
  }
};

export const updateUser = async (userData) => {
  try {
    const response = await axiosInstanse.put(API_ROUTES.USERS.UPDATE(userData.id), userData, { withCredentials: true });
    
    
    // Check if we have the updated data in the response
    if (response.data && response.status === 200) {  
      return { 
        success: true,
        user: {
          firstname: userData.firstname,
          lastname: userData.lastname,
          email: userData.email,
          street: userData.street,
          streetnum: userData.streetnum,
          postalcode: userData.postalcode,
          city: userData.city,
          telephone: userData.telephone,
          birthday: userData.birthday,
          manager: userData.manager,
        }
      };
    }

    return { 
      success: false,
      error: 'Failed to update user data'
    };
  } catch (error) {
    console.error('Error updating user:', error.response?.data || error.message);
    return { success: false, error: error.response?.data?.message || 'Update failed' };
  }
};

export const getCart = async (userId) => {
  try {
    if (!userId) {
      return { items: [], error: 'No logged in user' };
    }

    const response = await axiosInstanse.get(API_ROUTES.CARTS.GET_BY_USER(userId), { 
      withCredentials: true 
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching cart:', error);
    return { items: [], error: 'Error fetching cart' };
  }
};

export const updateCartItem = async (userId, productId, quantity) => {
  try {
    const response = await axiosInstanse.put(
      API_ROUTES.CARTS.UPDATE_ITEM(userId), 
      {
        productId,
        quantity
      },
      { withCredentials: true }
    );
    
    // Dispatch cartUpdated event after successful update
    window.dispatchEvent(new CustomEvent('cartUpdated'));
    
    return response.data;
  } catch (error) {
    console.error('Error updating cart:', error);
    throw new Error('Failed to update cart');
  }
};

export const removeCartItem = async (userId, productId) => {
  try {
    const response = await axiosInstanse.delete(API_ROUTES.CARTS.DELETE_ITEM(userId, productId),{ withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Error removing item from cart:', error);
    throw error;
  }
};

export const createOrder = async (orderData) => {
    try {
        const response = await axiosInstanse.post(API_ROUTES.ORDERS.CREATE, orderData, {
            withCredentials: true
        });

        if (response.data.success) {
            // Explicitly clear the cart after successful order
            await clearCart();
            
            return { 
                success: true, 
                orderId: response.data.orderId,
                purchaseNumber: response.data.purchaseNumber 
            };
        } else {
            // Display the error message to the user
            alert(response.data.message || 'Failed to create order');
            return { success: false };
        }
    } catch (error) {
        console.error('Error creating order:', error);
        // Display the error message to the user
        alert(error.response?.data?.message || 'אירעה שגיאה בביצוע ההזמנה');
        return { success: false };
    }
};

export const getAllOrders = async () => {
    try {
        const response = await axiosInstanse.get(API_ROUTES.ORDERS.ALL, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw new Error('Failed to fetch orders');
    }
};

export const updateOrderStatus = async (orderId, status) => {
    try {
        const response = await axiosInstanse.patch(
            API_ROUTES.ORDERS.UPDATE_STATUS(orderId),
            { status },
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        console.error('Error updating order status:', error);
        throw new Error('Failed to update order status');
    }
};

// Modify the clearCart function
export const clearCart = async () => {
    try {
        const response = await axiosInstanse.post(
            API_ROUTES.CARTS.CREATE_OR_UPDATE, 
            { items: [] },  // Send empty items array
            { withCredentials: true }
        );
        
        // Trigger cart update event
        window.dispatchEvent(new CustomEvent('cartUpdated'));
        
        return { success: true };
    } catch (error) {
        console.error('Error clearing cart:', error);
        return { 
            success: false, 
            error: error.response?.data?.message || 'Failed to clear cart'
        };
    }
};

export const getUserOrders = async () => {
    try {
        // First check login status to get current user
        const loginStatus = await checkLoginStatus();
        if (!loginStatus.isLoggedIn || !loginStatus.user?._id) {
            throw new Error('User not authenticated');
        }

        const response = await axiosInstanse.get(API_ROUTES.ORDERS.GET_USER_ORDERS(loginStatus.user._id), {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user orders:', error);
        throw new Error('Failed to fetch user orders');
    }
};