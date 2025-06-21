import axios, { AxiosError } from 'axios';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 
  (import.meta.env.PROD 
    ? 'https://internexis-official.onrender.com' // Correct production backend
    : 'http://localhost:5000'); // Development backend

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // Increased timeout for render cold starts
  headers: {
    'Content-Type': 'application/json',
  },
});

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
      const response = await api.post('/api/ambassador', data);
      return response.data;    } catch (error: unknown) {
      console.error('Ambassador application error:', error);
      const axiosError = error as AxiosError<{message?: string; errors?: string[]}>;
      throw {
        success: false,
        message: axiosError.response?.data?.message || 'Failed to submit application',
        errors: axiosError.response?.data?.errors || []
      };
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
    // Transform legacy data to new format
    const transformedData: AmbassadorFormData = {
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      phone: data.phone,
      college: data.university,
      whyYouWantToJoin: data.whyInternexis
    };
    
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
      const response = await api.post('/api/admin/login', { email, password });
      return response.data;
    } catch (error: unknown) {
      console.error('Admin login error:', error);
      const axiosError = error as AxiosError<{message?: string}>;
      throw {
        success: false,
        message: axiosError.response?.data?.message || 'Login failed'
      };
    }
  },

  async getDashboardStats() {
    try {
      const [ambassadorRes, careerRes, internshipRes] = await Promise.all([
        api.get('/api/ambassador'),
        api.get('/api/career'),
        api.get('/api/internship')
      ]);

      const ambassadorData = ambassadorRes.data.data || [];
      const careerData = careerRes.data.data || [];
      const internshipData = internshipRes.data.data || [];

      // Calculate statistics
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();

      const thisMonthApplications = [
        ...ambassadorData,
        ...careerData,
        ...internshipData
      ].filter(app => {
        const submittedDate = new Date(app.submittedAt);
        return submittedDate.getMonth() === currentMonth && 
               submittedDate.getFullYear() === currentYear;
      }).length;

      const pendingApplications = [
        ...ambassadorData,
        ...careerData,
        ...internshipData
      ].filter(app => app.status === 'pending').length;

      return {
        success: true,
        data: {
          totalApplications: ambassadorData.length + careerData.length + internshipData.length,
          campusAmbassadors: ambassadorData.length,
          careerApplications: careerData.length,
          internshipApplications: internshipData.length,
          pendingApplications,
          thisMonthApplications
        }
      };
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
      const [ambassadorRes, careerRes, internshipRes] = await Promise.all([
        api.get('/api/ambassador'),
        api.get('/api/career'),
        api.get('/api/internship')
      ]);

      const ambassadorData = ambassadorRes.data.data || [];
      const careerData = careerRes.data.data || [];
      const internshipData = internshipRes.data.data || [];      // Transform and combine all applications
      const allApplications: DashboardApplication[] = [
        ...ambassadorData.map((app: ApiApplication) => ({
          id: app._id,
          name: app.name,
          email: app.email,
          type: 'Campus Ambassador',
          status: app.status || 'pending',
          submittedAt: app.submittedAt,
          college: app.college
        })),
        ...careerData.map((app: ApiApplication) => ({
          id: app._id,
          name: app.name,
          email: app.email,
          type: 'Career Application',
          status: app.status || 'pending',
          submittedAt: app.submittedAt,
          position: app.position
        })),
        ...internshipData.map((app: ApiApplication) => ({
          id: app._id,
          name: app.name,
          email: app.email,
          type: 'Internship',
          status: app.status || 'pending',
          submittedAt: app.submittedAt,
          domain: app.domain,
          college: app.college
        }))
      ];

      // Sort by submission date (newest first) and limit
      const recentApplications = allApplications
        .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
        .slice(0, limit);

      return {
        success: true,
        data: recentApplications
      };
    } catch (error: unknown) {
      console.error('Recent applications error:', error);
      const axiosError = error as AxiosError<{message?: string}>;
      throw {
        success: false,
        message: axiosError.response?.data?.message || 'Failed to fetch recent applications'
      };
    }
  },

  async getApplicationsByType(type: 'ambassador' | 'career' | 'internship') {
    try {
      const response = await api.get(`/api/${type}`);
      return response.data;
    } catch (error: unknown) {
      console.error(`${type} applications error:`, error);
      const axiosError = error as AxiosError<{message?: string}>;
      throw {
        success: false,
        message: axiosError.response?.data?.message || `Failed to fetch ${type} applications`
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

// Export default service for backward compatibility
export default campusAmbassadorService;
