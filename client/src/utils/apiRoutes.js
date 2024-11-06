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
  STATISTICS: {
    USER_REGISTRATIONS: `statistics/registrations`,
    USER_ENGAGEMENT: `statistics/user-engagement`,
    PRODUCT_SALES: `statistics/sales`,
    CART_ITEMS: `statistics/cart-items`,
    MONTHLY_INCOME: `/statistics/income`,
  },
  ORDERS: {
    CREATE: `/orders/create`,
    ALL: `/orders/all`,
    UPDATE_STATUS: (orderId) => `/orders/${orderId}/status`,
  },
};
