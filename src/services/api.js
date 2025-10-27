import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Localhost URL
// const API_URL = 'https://feedback-server-six.vercel.app/api';  // Production URL 

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Feedback API
export const feedbackAPI = {
  create: (data) => api.post('/feedback', data),
  getAll: (search = '') => api.get(`/feedback?search=${search}`),
  getStats: () => api.get('/feedback/stats'),
  delete: (id) => api.delete(`/feedback/${id}`)
};


// Admin API
export const adminAPI = {
  register: (data) => api.post('/admin/register', data),
  login: (data) => api.post('/admin/login', data),
  getProfile: () => api.get('/admin/profile')
};

export default api;
