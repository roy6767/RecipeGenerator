import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor - for adding auth tokens, etc.
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - for global error handling
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      // Server responded with error status
      console.error('API Error:', error.response.data);
      
      // Handle specific status codes
      if (error.response.status === 401) {
        // Unauthorized - redirect to login
        localStorage.removeItem('authToken');
        window.location.href = '/auth';
      }
    } else if (error.request) {
      // Request made but no response
      console.error('Network Error:', error.request);
    } else {
      // Something else happened
      console.error('Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// API service methods
const apiService = {
  // User endpoints
  users: {
    getAll: () => api.get('/api/users'),
    getById: (id) => api.get(`/api/users/${id}`),
    create: (data) => api.post('/api/users', data),
    update: (id, data) => api.put(`/api/users/${id}`, data),
    delete: (id) => api.delete(`/api/users/${id}`)
  },

  // Health check
  healthCheck: () => api.get('/'),

  // Add more service methods as needed
  // Example:
  // auth: {
  //   login: (credentials) => api.post('/api/auth/login', credentials),
  //   register: (data) => api.post('/api/auth/register', data),
  //   logout: () => api.post('/api/auth/logout')
  // }
};

export default apiService;
