// API Service Configuration
import { API_CONFIG } from '@constants/index';

// Create axios instance with base configuration
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for authentication
apiClient.interceptors.request.use(
  (config) => {
    // Add admin token to requests if available
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken && (config.url?.includes('/admin/') || config.url?.includes('/api/admin/'))) {
      config.headers.Authorization = `Bearer ${adminToken}`;
    }
    
    console.log('🔗 API Request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      baseURL: config.baseURL,
    });
    
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', {
      status: response.status,
      url: response.config.url,
      data: response.data,
    });
    return response;
  },
  (error) => {
    console.error('❌ Response Error:', {
      status: error.response?.status,
      url: error.config?.url,
      message: error.message,
      data: error.response?.data,
    });
    
    // Handle specific error cases
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('adminToken');
      window.location.href = '/admin-login';
    }
    
    return Promise.reject(error);
  }
);

// Export configured API client
export default apiClient;
