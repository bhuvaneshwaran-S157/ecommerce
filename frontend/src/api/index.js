import axios from 'axios'

const api = axios.create({ baseURL: '/api' })

export const userApi = {
  register: (data) => api.post('/users/register', data),
  login: (data) => api.post('/users/login', data),
  getById: (id) => api.get(`/users/${id}`),
  update: (id, data) => api.put(`/users/${id}`, data),
}

export const productApi = {
  getAll: (params) => api.get('/products', { params }),
  getById: (id) => api.get(`/products/${id}`),
  getCategories: () => api.get('/products/categories'),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`),
}

export const cartApi = {
  getCart: (userId) => api.get(`/cart/${userId}`),
  addItem: (userId, data) => api.post(`/cart/${userId}/items`, data),
  updateItem: (userId, itemId, data) => api.put(`/cart/${userId}/items/${itemId}`, data),
  removeItem: (userId, itemId) => api.delete(`/cart/${userId}/items/${itemId}`),
  clearCart: (userId) => api.delete(`/cart/${userId}`),
}

export const orderApi = {
  checkout: (userId, data) => api.post(`/orders/checkout/${userId}`, data),
  getUserOrders: (userId) => api.get(`/orders/user/${userId}`),
  getOrder: (orderId) => api.get(`/orders/${orderId}`),
  updateStatus: (orderId, status) => api.patch(`/orders/${orderId}/status`, null, { params: { status } }),
}

export const reviewApi = {
  getReviews: (productId) => api.get(`/products/${productId}/reviews`),
  addReview: (productId, userId, data) => api.post(`/products/${productId}/reviews`, data, { params: { userId } }),
}

export default api
