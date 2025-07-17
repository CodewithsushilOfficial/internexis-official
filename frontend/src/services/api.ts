import axios from 'axios'

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token')
      window.location.href = '/admin'
    }
    return Promise.reject(error)
  }
)

// API endpoints
export const apiEndpoints = {
  // Form submissions
  submitAmbassador: (data: any) => api.post('/api/ambassador', data),
  submitCareer: (data: any) => api.post('/api/career', data),
  submitInternship: (data: any) => api.post('/api/internship', data),
  submitContact: (data: any) => api.post('/api/contact', data),
  submitMentorship: (data: any) => api.post('/api/mentorship', data),

  // Admin endpoints
  adminLogin: (credentials: any) => api.post('/api/admin/login', credentials),
  getDashboardStats: () => api.get('/api/admin/dashboard'),
  getApplications: (type: string) => api.get(`/api/admin/applications/${type}`),
  updateApplicationStatus: (type: string, id: string, status: string) => 
    api.patch(`/api/admin/applications/${type}/${id}`, { status }),
  deleteApplication: (type: string, id: string) => 
    api.delete(`/api/admin/applications/${type}/${id}`),

  // Health check
  healthCheck: () => api.get('/health'),
}

export default api