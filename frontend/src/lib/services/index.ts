import axios, { AxiosError } from 'axios';

// API Configuration
const API_BASE_URL = import.meta.env.PROD 
  ? '' // Use relative URLs in production (same domain)
  : 'http://localhost:5000'; // Use full URL in development

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
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

// Export default service for backward compatibility
export default campusAmbassadorService;
