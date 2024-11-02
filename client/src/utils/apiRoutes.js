
export const API_ROUTES = {
  AUTH: {
    REGISTER: `/auth/register`,
    LOGIN: `/auth/login`,
    LOGOUT: `/auth/logout`,
    CHECK_LOGIN: `/auth/checkLogin`,
  },
  USERS: {
    CREATE: `/users`,
    GET_ALL: `/users`,
    GET_BY_ID: (id) => `/users/${id}`,
    UPDATE: (id) => `/users/${id}`,
    DELETE: (id) => `/users/${id}`,
  },
  PRODUCTS: {
    CREATE: `/products`,
    GET_ALL: `/products`,
    GET_BY_ID: (id) => `/products/${id}`,
    UPDATE: (id) => `/products/${id}`,
    DELETE: (id) => `/products/${id}`,
    SEARCH: `/products/search`,
  },
  CARTS: {
    CREATE_OR_UPDATE: `/carts`,
    GET_BY_USER: (userId) => `/carts/${userId}`,
    UPDATE_ITEM: (userId) => `/carts/${userId}`,
    DELETE_ITEM: (userId, productId) => `/carts/${userId}/${productId}`,
  },
};
