
const API_PREFIX = "/api";

export const API_ROUTES = {
  AUTH: {
    REGISTER: `${API_PREFIX}/auth/register`,
    LOGIN: `${API_PREFIX}/auth/login`,
    LOGOUT: `${API_PREFIX}/auth/logout`,
  },
  USERS: {
    CREATE: `${API_PREFIX}/users`,
    GET_ALL: `${API_PREFIX}/users`,
    GET_BY_ID: (id) => `${API_PREFIX}/users/${id}`,
    UPDATE: (id) => `${API_PREFIX}/users/${id}`,
    DELETE: (id) => `${API_PREFIX}/users/${id}`,
  },
  PRODUCTS: {
    CREATE: `${API_PREFIX}/products`,
    GET_ALL: `${API_PREFIX}/products`,
    GET_BY_ID: (id) => `${API_PREFIX}/products/${id}`,
    UPDATE: (id) => `${API_PREFIX}/products/${id}`,
    DELETE: (id) => `${API_PREFIX}/products/${id}`,
    SEARCH: `${API_PREFIX}/products/search`,
  },
  CARTS: {
    CREATE_OR_UPDATE: `${API_PREFIX}/carts`,
    GET_BY_USER: (userId) => `${API_PREFIX}/carts/${userId}`,
    UPDATE_ITEM: (userId) => `${API_PREFIX}/carts/${userId}`,
    DELETE_ITEM: (userId, productId) => `${API_PREFIX}/carts/${userId}/${productId}`,
  },
};
