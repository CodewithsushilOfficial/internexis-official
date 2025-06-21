import axios, { AxiosError } from 'axios';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 
  (import.meta.env.PROD 
    ? 'https://internexis-official.onrender.com' // Correct production backend
    : 'http://localhost:5000'); // Development backend

console.log('🔗 API Configuration:', {
  API_BASE_URL,
  env: import.meta.env.MODE,
  prod: import.meta.env.PROD
});

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // Increased timeout for render cold starts
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for debugging and authentication
api.interceptors.request.use(
  (config) => {
    // Add admin token to requests if available
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken && (config.url?.includes('/admin/') || config.url?.includes('/api/admin/'))) {
      config.headers.Authorization = `Bearer ${adminToken}`;
    }
    
    console.log('Making API request:', {
      url: config.url,
      method: config.method,
      baseURL: config.baseURL,
      data: config.data,
      hasAuthToken: !!config.headers.Authorization
    });
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log('API response received:', {
      status: response.status,
      data: response.data
    });
    return response;
  },
  (error) => {
    console.error('Response interceptor error:', {
      message: error.message,
      code: error.code,
      status: error.response?.status,
      data: error.response?.data
    });
    return Promise.reject(error);
  }
);

// Type definitions for form data
export interface AmbassadorFormData {
  name: string;
  email: string;
  phone: string;
  college: string;
  whyYouWantToJoin: string;
}

export interface CareerFormData {
  name: string;
  email: string;
  phone: string;
  position: string;
  resumeLink: string;
}

export interface InternshipFormData {
  name: string;
  email: string;
  phone: string;
  domain: string;
  college: string;
}

// API Response types
export interface ApiApplication {
  _id: string;
  name: string;
  email: string;
  submittedAt: string;
  status?: string;
  college?: string;
  position?: string;
  domain?: string;
  phone?: string;
  whyYouWantToJoin?: string;
  resumeLink?: string;
}

export interface DashboardApplication {
  id: string;
  name: string;
  email: string;
  type: string;
  status: string;
  submittedAt: string;
  college?: string;
  position?: string;
  domain?: string;
}

// Ambassador Service
export const ambassadorService = {
  async submitApplication(data: AmbassadorFormData) {
    try {
      console.log('Sending ambassador application data:', data);
      console.log('API Base URL:', API_BASE_URL);
      
      const response = await api.post('/api/ambassador', data);
      console.log('Ambassador application response:', response.data);
      return response.data;
    } catch (error: unknown) {
      console.error('Axios ambassador application error:', error);
      
      // Try with fetch as fallback if axios fails
      try {
        console.log('Trying with fetch as fallback...');
        const fetchResponse = await fetch(`${API_BASE_URL}/api/ambassador`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        
        const fetchData = await fetchResponse.json();
        
        if (fetchResponse.ok) {
          console.log('Fetch successful:', fetchData);
          return fetchData;
        } else {
          console.error('Fetch error response:', fetchData);
          throw {
            success: false,
            message: fetchData.message || 'Failed to submit application',
            errors: fetchData.errors || []
          };
        }
      } catch (fetchError) {
        console.error('Both axios and fetch failed:', fetchError);
        throw {
          success: false,
          message: 'Network error: Could not connect to server. Please check if the backend is running.',
          errors: []
        };
      }
    }
  }
};

// Career Service
export const careerService = {
  async submitApplication(data: CareerFormData) {
    try {
      const response = await api.post('/api/career', data);
      return response.data;    } catch (error: unknown) {
      console.error('Career application error:', error);
      const axiosError = error as AxiosError<{message?: string; errors?: string[]}>;
      throw {
        success: false,
        message: axiosError.response?.data?.message || 'Failed to submit application',
        errors: axiosError.response?.data?.errors || []
      };
    }
  }
};

// Internship Service
export const internshipService = {
  async submitApplication(data: InternshipFormData) {
    try {
      const response = await api.post('/api/internship', data);
      return response.data;    } catch (error: unknown) {
      console.error('Internship application error:', error);
      const axiosError = error as AxiosError<{message?: string; errors?: string[]}>;
      throw {
        success: false,
        message: axiosError.response?.data?.message || 'Failed to submit application',
        errors: axiosError.response?.data?.errors || []
      };
    }
  }
};

// Legacy Campus Ambassador types and service for backward compatibility
export interface CampusAmbassadorFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  university: string;
  course: string;
  yearOfStudy: string;
  cgpa: string;
  linkedinUrl: string;
  portfolioUrl?: string;
  skills: string[];
  experience: string;
  motivation: string;
  whyInternexis: string;
  availabilityHours: string;
  startDate: string;
  referralSource: string;
  additionalInfo?: string;
  submittedAt?: string;
}

// Legacy Campus Ambassador Service (keeping for backward compatibility)
export const campusAmbassadorService = {
  async submitApplication(data: CampusAmbassadorFormData) {
    // First test connection
    console.log('Testing connection before submission...');
    const connectionTest = await testConnection();
    
    if (!connectionTest.success) {
      throw {
        success: false,
        message: `Cannot connect to server: ${connectionTest.error}. Please ensure the backend server is running on http://localhost:5000`,
        errors: []
      };
    }
    
    // Validate required fields before transformation
    const errors: string[] = [];
    
    if (!data.firstName?.trim()) errors.push('First name is required');
    if (!data.lastName?.trim()) errors.push('Last name is required');
    if (!data.email?.trim()) errors.push('Email is required');
    if (!data.phone?.trim()) errors.push('Phone number is required');
    if (!data.university?.trim()) errors.push('University is required');
    if (!data.motivation?.trim()) errors.push('Why you want to be a Campus Ambassador is required');
    
    if (errors.length > 0) {
      throw {
        success: false,
        message: 'Please fill in all required fields',
        errors
      };
    }
    
    // Transform legacy data to new format
    const transformedData: AmbassadorFormData = {
      name: `${data.firstName.trim()} ${data.lastName.trim()}`,
      email: data.email.trim(),
      phone: data.phone.trim(),
      college: data.university.trim(),
      whyYouWantToJoin: data.motivation.trim()
    };
    
    console.log('Transformed data being sent:', transformedData);
    
    return ambassadorService.submitApplication(transformedData);
  },

  async validateForm(data: Partial<CampusAmbassadorFormData>) {
    const errors: string[] = [];
    
    if (!data.firstName?.trim()) errors.push('First name is required');
    if (!data.lastName?.trim()) errors.push('Last name is required');
    if (!data.email?.trim()) errors.push('Email is required');
    if (!data.phone?.trim()) errors.push('Phone is required');
    if (!data.university?.trim()) errors.push('University is required');
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
};

// Admin Service
export const adminService = {
  async login(email: string, password: string) {
    try {
      console.log('🔑 Admin Service: Attempting login with:', {
        email,
        passwordLength: password.length,
        apiBaseUrl: API_BASE_URL
      });
      
      const response = await api.post('/api/admin/login', { email, password });
      
      console.log('✅ Admin Service: Login response received:', {
        status: response.status,
        success: response.data.success,
        message: response.data.message
      });
      
      return response.data;
    } catch (error: unknown) {
      console.error('❌ Admin Service: Login error:', error);
      
      const axiosError = error as AxiosError<{message?: string; success?: boolean}>;
      
      // Log detailed error information
      console.error('❌ Error details:', {
        message: axiosError.message,
        code: axiosError.code,
        status: axiosError.response?.status,
        statusText: axiosError.response?.statusText,
        responseData: axiosError.response?.data
      });
      
      // Return structured error response
      if (axiosError.response?.data) {
        return axiosError.response.data;
      }
      
      // Return generic error for network issues
      return {
        success: false,
        message: axiosError.code === 'ERR_NETWORK' 
          ? 'Network error: Cannot connect to server. Please check if the backend is running.'
          : axiosError.message || 'Login failed'
      };
    }
  },
  async getDashboardStats() {
    try {
      const response = await api.get('/api/admin/dashboard/stats');
      return response.data;
    } catch (error: unknown) {
      console.error('Dashboard stats error:', error);
      const axiosError = error as AxiosError<{message?: string}>;
      throw {
        success: false,
        message: axiosError.response?.data?.message || 'Failed to fetch dashboard data'
      };
    }
  },
  async getRecentApplications(limit: number = 10) {
    try {
      const response = await api.get(`/api/admin/dashboard/recent/${limit}`);
      return response.data;
    } catch (error: unknown) {
      console.error('Recent applications error:', error);
      const axiosError = error as AxiosError<{message?: string}>;
      throw {
        success: false,
        message: axiosError.response?.data?.message || 'Failed to fetch recent applications'
      };
    }
  },
  async getApplicationsByType(type: 'ambassador' | 'career' | 'internship', params?: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
  }) {
    try {
      const queryParams = new URLSearchParams();
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.limit) queryParams.append('limit', params.limit.toString());
      if (params?.status) queryParams.append('status', params.status);
      if (params?.search) queryParams.append('search', params.search);
      
      const url = `/api/admin/applications/${type}${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
      const response = await api.get(url);
      return response.data;
    } catch (error: unknown) {
      console.error(`${type} applications error:`, error);
      const axiosError = error as AxiosError<{message?: string}>;
      throw {
        success: false,
        message: axiosError.response?.data?.message || `Failed to fetch ${type} applications`
      };
    }
  },

  async updateApplicationStatus(type: 'ambassador' | 'career' | 'internship', id: string, status: string) {
    try {
      const response = await api.patch(`/api/admin/applications/${type}/${id}/status`, { status });
      return response.data;
    } catch (error: unknown) {
      console.error('Update application status error:', error);
      const axiosError = error as AxiosError<{message?: string}>;
      throw {
        success: false,
        message: axiosError.response?.data?.message || 'Failed to update application status'
      };
    }
  },

  async deleteApplication(type: 'ambassador' | 'career' | 'internship', id: string) {
    try {
      console.log(`🗑️ Admin Service: Deleting ${type} application with ID:`, id);
      
      const response = await api.delete(`/api/admin/applications/${type}/${id}`);
      
      console.log('✅ Admin Service: Application deleted successfully:', response.data);
      return response.data;
    } catch (error: unknown) {      console.error('❌ Admin Service: Delete application error:', error);
      const axiosError = error as AxiosError<{message?: string}>;
      
      // Return structured error response
      return {
        success: false,
        message: axiosError.response?.data?.message || 'Failed to delete application'
      };
    }
  },

  // Export methods
  async exportApplications(type: 'ambassador' | 'career' | 'internship', format: 'xlsx' | 'csv' = 'xlsx') {
    try {
      console.log(`📤 Admin Service: Exporting ${type} applications in ${format} format`);
      
      const response = await api.get(`/api/admin/export/${type}?format=${format}`, {
        responseType: 'blob',
      });
      
      // Create blob and download
      const blob = new Blob([response.data], {
        type: format === 'xlsx' 
          ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          : 'text/csv'
      });
      
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${type}-applications-${new Date().toISOString().split('T')[0]}.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      console.log('✅ Admin Service: Export completed successfully');
      return { success: true, message: `${type} applications exported successfully` };
    } catch (error: unknown) {
      console.error('❌ Admin Service: Export error:', error);
      const axiosError = error as AxiosError<{message?: string}>;
      
      return {
        success: false,
        message: axiosError.response?.data?.message || `Failed to export ${type} applications`
      };
    }
  },

  async exportAllApplications() {
    try {
      console.log('📤 Admin Service: Exporting all applications');
      
      const response = await api.get('/api/admin/export-all', {
        responseType: 'blob',
      });
      
      // Create blob and download
      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });
      
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `internexis-all-applications-${new Date().toISOString().split('T')[0]}.xlsx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      console.log('✅ Admin Service: All applications exported successfully');
      return { success: true, message: 'All applications exported successfully' };
    } catch (error: unknown) {
      console.error('❌ Admin Service: Export all error:', error);
      const axiosError = error as AxiosError<{message?: string}>;
      
      return {
        success: false,
        message: axiosError.response?.data?.message || 'Failed to export all applications'
      };
    }
  }
};

// Add request interceptor for better error handling
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    if (error.response) {
      console.error(`API Error: ${error.response.status} ${error.response.config.url}`, error.response.data);
    } else if (error.request) {
      console.error('API Network Error:', error.message);
    } else {
      console.error('API Setup Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Connection test function
export const testConnection = async () => {
  try {
    console.log('Testing connection to:', API_BASE_URL);
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Connection test successful:', data);
      return { success: true, data };
    } else {
      console.error('❌ Connection test failed:', response.status, response.statusText);
      return { success: false, error: `HTTP ${response.status}: ${response.statusText}` };
    }
  } catch (error) {
    console.error('❌ Connection test error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

// Export default service for backward compatibility
export default campusAmbassadorService;
