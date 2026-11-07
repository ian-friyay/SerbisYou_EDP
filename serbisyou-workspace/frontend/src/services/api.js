import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

/**
 * Pre-configured Axios instance for SerbisYou backend communication
 */
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor to attach authentication token (Supabase JWT) if available
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('serbisyou_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for centralized error handling
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('[API Error]:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const servicesApi = {
  getAll: (params) => apiClient.get('/services', { params }),
  create: (data) => apiClient.post('/services', data),
  getById: (id) => apiClient.get(`/services/${id}`),
};

export const healthApi = {
  check: () => axios.get(`${import.meta.env.VITE_API_BASE_URL?.replace('/api', '') || ''}/health`),
};

export default apiClient;
