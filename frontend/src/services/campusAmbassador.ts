import { apiClient } from './api';

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
  portfolioUrl: string;
  skills: string[];
  experience: string;
  motivation: string;
  whyInternexis: string;
  availabilityHours: string;
  startDate: string;
  achievements: string;
  socialMediaLinks: {
    linkedin?: string;
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
  referralSource: string;
  additionalInfo: string;
  termsAccepted: boolean;
  privacyAccepted: boolean;
}

export interface CampusAmbassadorResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}

export const campusAmbassadorService = {
  async submitApplication(formData: CampusAmbassadorFormData): Promise<CampusAmbassadorResponse> {
    try {
      const response = await apiClient.post('/api/campus-ambassador/apply', formData);
      return {
        success: true,
        message: 'Application submitted successfully!',
        data: response.data
      };
    } catch (error: any) {
      return {
        success: false,
        message: 'Failed to submit application',
        error: error.response?.data?.message || error.message
      };
    }
  },

  async getApplicationStatus(email: string): Promise<CampusAmbassadorResponse> {
    try {
      const response = await apiClient.get(`/api/campus-ambassador/status/${email}`);
      return {
        success: true,
        message: 'Status retrieved successfully',
        data: response.data
      };
    } catch (error: any) {
      return {
        success: false,
        message: 'Failed to get application status',
        error: error.response?.data?.message || error.message
      };
    }
  },

  async getAllApplications(): Promise<CampusAmbassadorResponse> {
    try {
      const response = await apiClient.get('/api/campus-ambassador/applications');
      return {
        success: true,
        message: 'Applications retrieved successfully',
        data: response.data
      };
    } catch (error: any) {
      return {
        success: false,
        message: 'Failed to get applications',
        error: error.response?.data?.message || error.message
      };
    }
  }
};
