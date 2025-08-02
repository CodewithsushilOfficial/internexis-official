import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import {
  CreateDigitalSolutionData,
  UpdateDigitalSolutionData,
  CreateInternshipOpportunityData,
  UpdateInternshipOpportunityData,
  CreateJobOpportunityData,
  UpdateJobOpportunityData,
  CreateHackathonEventData,
  UpdateHackathonEventData,
  CreateWorkWithUsData,
  UpdateWorkWithUsData,
  CreateMentorshipData,
  UpdateMentorshipData,
  CreateCareerGuidanceData,
  UpdateCareerGuidanceData,
  CreateFreelanceProjectData,
  UpdateFreelanceProjectData,
  ProjectStatusUpdate,
  LoginCredentials,
} from "../types/api";

// Configuration
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT || "10000");
const RETRY_ATTEMPTS = parseInt(import.meta.env.VITE_API_RETRY_ATTEMPTS || "3");
const TOKEN_KEY = import.meta.env.VITE_JWT_STORAGE_KEY || "adminToken";

// Response type for API calls
interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: any[];
  timestamp: string;
}

// Extend AxiosRequestConfig to include metadata
declare module 'axios' {
  export interface InternalAxiosRequestConfig {
    metadata?: {
      startTime: Date;
    };
  }
}

// Create axios instance with default config
const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_URL,
    timeout: API_TIMEOUT,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
  });

  // Request interceptor to include auth token and logging
  instance.interceptors.request.use(
    (config) => {
      // Add timestamp to all requests
      config.metadata = { startTime: new Date() };
      
      // Add auth token if available
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // Log request in development
      if (import.meta.env.DEV && import.meta.env.VITE_SHOW_CONSOLE_LOGS === 'true') {
        console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`, {
          data: config.data,
          params: config.params,
        });
      }

      return config;
    },
    (error) => {
      console.error("❌ Request Error:", error);
      return Promise.reject(error);
    }
  );

  // Response interceptor for error handling and logging
  instance.interceptors.response.use(
    (response: AxiosResponse<ApiResponse>) => {
      // Calculate request duration
      const endTime = new Date();
      const startTime = response.config.metadata?.startTime || endTime;
      const duration = endTime.getTime() - startTime.getTime();

      // Log response in development
      if (import.meta.env.DEV && import.meta.env.VITE_SHOW_CONSOLE_LOGS === 'true') {
        console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url} (${duration}ms)`, {
          status: response.status,
          data: response.data,
        });
      }

      return response;
    },
    async (error: AxiosError<ApiResponse>) => {
      const originalRequest = error.config as any;

      // Log error in development
      if (import.meta.env.DEV) {
        console.error(`❌ API Error: ${error.config?.method?.toUpperCase()} ${error.config?.url}`, {
          status: error.response?.status,
          message: error.response?.data?.message || error.message,
          data: error.response?.data,
        });
      }

      // Handle 401 Unauthorized
      if (error.response?.status === 401) {
        // Clear token and redirect to login
        localStorage.removeItem(TOKEN_KEY);
        
        // Only redirect if not already on admin login page
        if (!window.location.pathname.includes('/admin')) {
          window.location.href = '/admin';
        }
        
        return Promise.reject({
          ...error,
          message: 'Session expired. Please login again.',
        });
      }

      // Handle 403 Forbidden
      if (error.response?.status === 403) {
        return Promise.reject({
          ...error,
          message: 'You do not have permission to perform this action.',
        });
      }

      // Implement retry logic for network errors
      if (
        !originalRequest._retry &&
        originalRequest._retryCount < RETRY_ATTEMPTS &&
        isRetryableError(error)
      ) {
        originalRequest._retry = true;
        originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;

        // Exponential backoff
        const delay = Math.pow(2, originalRequest._retryCount) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));

        console.log(`🔄 Retrying request (${originalRequest._retryCount}/${RETRY_ATTEMPTS}): ${originalRequest.url}`);
        return instance(originalRequest);
      }

      // Return formatted error
      return Promise.reject({
        ...error,
        message: error.response?.data?.message || error.message || 'An unexpected error occurred',
        errors: error.response?.data?.errors,
      });
    }
  );

  return instance;
};

// Helper function to determine if error is retryable
const isRetryableError = (error: AxiosError): boolean => {
  return (
    !error.response || // Network error
    error.response.status >= 500 || // Server error
    error.response.status === 408 || // Request timeout
    error.response.status === 429 // Too many requests
  );
};

// Create API instance
const api = createAxiosInstance();

// Health check API
export const healthAPI = {
  check: () => api.get<ApiResponse>("/health"),
  ping: () => api.get<ApiResponse>("/"),
};

// Authentication API
export const authAPI = {
  login: (credentials: LoginCredentials) => 
    api.post<ApiResponse<{ token: string; admin: any }>>("/api/admin/login", credentials),
  
  logout: () => 
    api.post<ApiResponse>("/api/admin/logout"),
  
  verify: () => 
    api.get<ApiResponse<any>>("/api/admin/verify"),
  
  getProfile: () => 
    api.get<ApiResponse<any>>("/api/admin/profile"),
  
  updateProfile: (data: { name?: string; email?: string }) =>
    api.put<ApiResponse<any>>("/api/admin/profile", data),
  
  changePassword: (data: { currentPassword: string; newPassword: string; confirmPassword: string }) =>
    api.put<ApiResponse>("/api/admin/change-password", data),
};

// Admin Dashboard API
export const dashboardAPI = {
  getStats: () => api.get<ApiResponse<any>>("/api/admin/dashboard/stats"),
};

// Ambassador API
export const ambassadorAPI = {
  // Public endpoints
  submit: (data: any) => 
    api.post<ApiResponse<any>>("/api/ambassador", data),
  
  checkStatus: (email: string) =>
    api.get<ApiResponse<any>>(`/api/ambassador/status/${encodeURIComponent(email)}`),

  // Admin endpoints
  getAll: (params?: any) => 
    api.get<ApiResponse<any>>("/api/ambassador/admin/all", { params }),
  
  getById: (id: string) => 
    api.get<ApiResponse<any>>(`/api/ambassador/admin/${id}`),
  
  updateStatus: (id: string, data: { status: string; notes?: string }) =>
    api.put<ApiResponse<any>>(`/api/ambassador/admin/${id}/status`, data),
  
  update: (id: string, data: any) =>
    api.put<ApiResponse<any>>(`/api/ambassador/admin/${id}`, data),
  
  delete: (id: string) =>
    api.delete<ApiResponse>(`/api/ambassador/admin/${id}`),
  
  getStats: () =>
    api.get<ApiResponse<any>>("/api/ambassador/admin/stats/overview"),
  
  export: (params?: any) =>
    api.get("/api/ambassador/admin/export", { params, responseType: 'blob' }),
};

// Career API
export const careerAPI = {
  submit: (data: any) => api.post<ApiResponse<any>>("/api/career", data),
  getAll: (params?: any) => api.get<ApiResponse<any>>("/api/career/admin/all", { params }),
  getById: (id: string) => api.get<ApiResponse<any>>(`/api/career/admin/${id}`),
  update: (id: string, data: any) => api.put<ApiResponse<any>>(`/api/career/admin/${id}`, data),
  delete: (id: string) => api.delete<ApiResponse>(`/api/career/admin/${id}`),
  export: (params?: any) => api.get("/api/career/admin/export", { params, responseType: 'blob' }),
};

// Internship API
export const internshipAPI = {
  submit: (data: any) => api.post<ApiResponse<any>>("/api/internship", data),
  getAll: (params?: any) => api.get<ApiResponse<any>>("/api/internship/admin/all", { params }),
  getById: (id: string) => api.get<ApiResponse<any>>(`/api/internship/admin/${id}`),
  update: (id: string, data: any) => api.put<ApiResponse<any>>(`/api/internship/admin/${id}`, data),
  delete: (id: string) => api.delete<ApiResponse>(`/api/internship/admin/${id}`),
  export: (params?: any) => api.get("/api/internship/admin/export", { params, responseType: 'blob' }),
};

// Digital Solutions API
export const digitalSolutionsAPI = {
  getAll: () => api.get<ApiResponse<any>>("/api/digital-solutions"),
  getAllAdmin: (params?: any) => api.get<ApiResponse<any>>("/api/digital-solutions/admin/all", { params }),
  getById: (id: string) => api.get<ApiResponse<any>>(`/api/digital-solutions/${id}`),
  create: (data: CreateDigitalSolutionData) =>
    api.post<ApiResponse<any>>("/api/digital-solutions/admin", data),
  update: (id: string, data: UpdateDigitalSolutionData) =>
    api.put<ApiResponse<any>>(`/api/digital-solutions/admin/${id}`, data),
  delete: (id: string) => api.delete<ApiResponse>(`/api/digital-solutions/admin/${id}`),
  getCategories: () => api.get<ApiResponse<string[]>>("/api/digital-solutions/categories/list"),
};

// Internship Opportunities API
export const internshipOpportunitiesAPI = {
  getAll: (params?: any) => api.get<ApiResponse<any>>("/api/internships/opportunities", { params }),
  getAllAdmin: (params?: any) => api.get<ApiResponse<any>>("/api/internships/admin/opportunities/all", { params }),
  getFeatured: () => api.get<ApiResponse<any>>("/api/internships/opportunities/featured"),
  getUrgent: () => api.get<ApiResponse<any>>("/api/internships/opportunities/urgent"),
  getLatest: () => api.get<ApiResponse<any>>("/api/internships/opportunities/latest"),
  getById: (id: string) => api.get<ApiResponse<any>>(`/api/internships/opportunities/${id}`),
  create: (data: CreateInternshipOpportunityData) =>
    api.post<ApiResponse<any>>("/api/internships/admin/opportunities", data),
  update: (id: string, data: UpdateInternshipOpportunityData) =>
    api.put<ApiResponse<any>>(`/api/internships/admin/opportunities/${id}`, data),
  delete: (id: string) =>
    api.delete<ApiResponse>(`/api/internships/admin/opportunities/${id}`),
  incrementApplications: (id: string) =>
    api.patch<ApiResponse<any>>(`/api/internships/opportunities/${id}/apply`),
  getFilters: () => api.get<ApiResponse<any>>("/api/internships/opportunities/filters/data"),
};

// Job Opportunities API
export const jobOpportunitiesAPI = {
  getAll: (params?: any) => api.get<ApiResponse<any>>("/api/jobs/jobs", { params }),
  getAllAdmin: (params?: any) => api.get<ApiResponse<any>>("/api/jobs/admin/jobs/all", { params }),
  getFeatured: () => api.get<ApiResponse<any>>("/api/jobs/jobs/featured"),
  getUrgent: () => api.get<ApiResponse<any>>("/api/jobs/jobs/urgent"),
  getLatest: () => api.get<ApiResponse<any>>("/api/jobs/jobs/latest"),
  getRemote: () => api.get<ApiResponse<any>>("/api/jobs/jobs/remote"),
  getById: (id: string) => api.get<ApiResponse<any>>(`/api/jobs/jobs/${id}`),
  create: (data: CreateJobOpportunityData) =>
    api.post<ApiResponse<any>>("/api/jobs/admin/jobs", data),
  update: (id: string, data: UpdateJobOpportunityData) =>
    api.put<ApiResponse<any>>(`/api/jobs/admin/jobs/${id}`, data),
  delete: (id: string) => api.delete<ApiResponse>(`/api/jobs/admin/jobs/${id}`),
  incrementApplications: (id: string) =>
    api.patch<ApiResponse<any>>(`/api/jobs/jobs/${id}/apply`),
  getFilters: () => api.get<ApiResponse<any>>("/api/jobs/jobs/filters/data"),
};

// Hackathon Events API
export const hackathonEventsAPI = {
  getAll: (params?: any) => api.get<ApiResponse<any>>("/api/hackathons/events", { params }),
  getAllAdmin: (params?: any) => api.get<ApiResponse<any>>("/api/hackathons/admin/events/all", { params }),
  getUpcoming: () => api.get<ApiResponse<any>>("/api/hackathons/events/upcoming"),
  getFeatured: () => api.get<ApiResponse<any>>("/api/hackathons/events/featured"),
  getById: (id: string) => api.get<ApiResponse<any>>(`/api/hackathons/events/${id}`),
  create: (data: CreateHackathonEventData) =>
    api.post<ApiResponse<any>>("/api/hackathons/admin/events", data),
  update: (id: string, data: UpdateHackathonEventData) =>
    api.put<ApiResponse<any>>(`/api/hackathons/admin/events/${id}`, data),
  delete: (id: string) => api.delete<ApiResponse>(`/api/hackathons/admin/events/${id}`),
  register: (id: string, data: any) =>
    api.post<ApiResponse<any>>(`/api/hackathons/events/${id}/register`, data),
};

// Work With Us API
export const workWithUsAPI = {
  getAll: (params?: any) => api.get<ApiResponse<any>>("/api/work-with-us/positions", { params }),
  getAllAdmin: (params?: any) => api.get<ApiResponse<any>>("/api/work-with-us/admin/positions/all", { params }),
  getById: (id: string) => api.get<ApiResponse<any>>(`/api/work-with-us/positions/${id}`),
  create: (data: CreateWorkWithUsData) =>
    api.post<ApiResponse<any>>("/api/work-with-us/admin/positions", data),
  update: (id: string, data: UpdateWorkWithUsData) =>
    api.put<ApiResponse<any>>(`/api/work-with-us/admin/positions/${id}`, data),
  delete: (id: string) => api.delete<ApiResponse>(`/api/work-with-us/admin/positions/${id}`),
  apply: (id: string, data: any) =>
    api.post<ApiResponse<any>>(`/api/work-with-us/positions/${id}/apply`, data),
};

// Mentorship API
export const mentorshipAPI = {
  getAll: (params?: any) => api.get<ApiResponse<any>>("/api/mentorship/programs", { params }),
  getAllAdmin: (params?: any) => api.get<ApiResponse<any>>("/api/mentorship/admin/programs/all", { params }),
  getById: (id: string) => api.get<ApiResponse<any>>(`/api/mentorship/programs/${id}`),
  create: (data: CreateMentorshipData) =>
    api.post<ApiResponse<any>>("/api/mentorship/admin/programs", data),
  update: (id: string, data: UpdateMentorshipData) =>
    api.put<ApiResponse<any>>(`/api/mentorship/admin/programs/${id}`, data),
  delete: (id: string) => api.delete<ApiResponse>(`/api/mentorship/admin/programs/${id}`),
  enroll: (id: string, data: any) =>
    api.post<ApiResponse<any>>(`/api/mentorship/programs/${id}/enroll`, data),
};

// Career Guidance API
export const careerGuidanceAPI = {
  getAll: (params?: any) => api.get<ApiResponse<any>>("/api/career-guidance/sessions", { params }),
  getAllAdmin: (params?: any) => api.get<ApiResponse<any>>("/api/career-guidance/admin/sessions/all", { params }),
  getById: (id: string) => api.get<ApiResponse<any>>(`/api/career-guidance/sessions/${id}`),
  create: (data: CreateCareerGuidanceData) =>
    api.post<ApiResponse<any>>("/api/career-guidance/admin/sessions", data),
  update: (id: string, data: UpdateCareerGuidanceData) =>
    api.put<ApiResponse<any>>(`/api/career-guidance/admin/sessions/${id}`, data),
  delete: (id: string) => api.delete<ApiResponse>(`/api/career-guidance/admin/sessions/${id}`),
  book: (id: string, data: any) =>
    api.post<ApiResponse<any>>(`/api/career-guidance/sessions/${id}/book`, data),
};

// Freelance Projects API
export const freelanceProjectsAPI = {
  getAll: (params?: any) => api.get<ApiResponse<any>>("/api/freelance-projects/projects", { params }),
  getAllAdmin: (params?: any) => api.get<ApiResponse<any>>("/api/freelance-projects/admin/projects/all", { params }),
  getById: (id: string) => api.get<ApiResponse<any>>(`/api/freelance-projects/projects/${id}`),
  create: (data: CreateFreelanceProjectData) =>
    api.post<ApiResponse<any>>("/api/freelance-projects/admin/projects", data),
  update: (id: string, data: UpdateFreelanceProjectData) =>
    api.put<ApiResponse<any>>(`/api/freelance-projects/admin/projects/${id}`, data),
  delete: (id: string) => api.delete<ApiResponse>(`/api/freelance-projects/admin/projects/${id}`),
  updateStatus: (id: string, data: ProjectStatusUpdate) =>
    api.patch<ApiResponse<any>>(`/api/freelance-projects/admin/projects/${id}/status`, data),
  bid: (id: string, data: any) =>
    api.post<ApiResponse<any>>(`/api/freelance-projects/projects/${id}/bid`, data),
};

// Utility functions
export const apiUtils = {
  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    const token = localStorage.getItem(TOKEN_KEY);
    return !!token;
  },

  // Get auth token
  getToken: (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
  },

  // Set auth token
  setToken: (token: string): void => {
    localStorage.setItem(TOKEN_KEY, token);
  },

  // Remove auth token
  removeToken: (): void => {
    localStorage.removeItem(TOKEN_KEY);
  },

  // Format error message
  formatError: (error: any): string => {
    if (error?.response?.data?.message) {
      return error.response.data.message;
    }
    if (error?.message) {
      return error.message;
    }
    return 'An unexpected error occurred';
  },

  // Download file from blob response
  downloadFile: (blob: Blob, filename: string): void => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  },
};

// Export the main API instance
export default api;
