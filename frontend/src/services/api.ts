import axios from 'axios';
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
  LoginCredentials
} from '../types/api';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      window.location.href = '/admin';
    }
    return Promise.reject(error);
  }
);

// Digital Solutions API
export const digitalSolutionsAPI = {
  getAll: () => api.get('/api/digital-solutions'),
  getAllAdmin: () => api.get('/api/digital-solutions/admin/all'),
  getById: (id: string) => api.get(`/api/digital-solutions/${id}`),
  create: (data: CreateDigitalSolutionData) => api.post('/api/digital-solutions/admin', data),
  update: (id: string, data: UpdateDigitalSolutionData) => api.put(`/api/digital-solutions/admin/${id}`, data),
  delete: (id: string) => api.delete(`/api/digital-solutions/admin/${id}`),
  getCategories: () => api.get('/api/digital-solutions/categories/list'),
};

// Internship Opportunities API
export const internshipOpportunitiesAPI = {
  getAll: () => api.get('/api/internships/opportunities'),
  getAllAdmin: () => api.get('/api/internships/admin/opportunities/all'),
  getFeatured: () => api.get('/api/internships/opportunities/featured'),
  getUrgent: () => api.get('/api/internships/opportunities/urgent'),
  getLatest: () => api.get('/api/internships/opportunities/latest'),
  getById: (id: string) => api.get(`/api/internships/opportunities/${id}`),
  create: (data: CreateInternshipOpportunityData) => api.post('/api/internships/admin/opportunities', data),
  update: (id: string, data: UpdateInternshipOpportunityData) => api.put(`/api/internships/admin/opportunities/${id}`, data),
  delete: (id: string) => api.delete(`/api/internships/admin/opportunities/${id}`),
  incrementApplications: (id: string) => api.patch(`/api/internships/opportunities/${id}/apply`),
  getFilters: () => api.get('/api/internships/opportunities/filters/data'),
};

// Job Opportunities API
export const jobOpportunitiesAPI = {
  getAll: () => api.get('/api/jobs/jobs'),
  getAllAdmin: () => api.get('/api/jobs/admin/jobs/all'),
  getFeatured: () => api.get('/api/jobs/jobs/featured'),
  getUrgent: () => api.get('/api/jobs/jobs/urgent'),
  getLatest: () => api.get('/api/jobs/jobs/latest'),
  getRemote: () => api.get('/api/jobs/jobs/remote'),
  getById: (id: string) => api.get(`/api/jobs/jobs/${id}`),
  create: (data: CreateJobOpportunityData) => api.post('/api/jobs/admin/jobs', data),
  update: (id: string, data: UpdateJobOpportunityData) => api.put(`/api/jobs/admin/jobs/${id}`, data),
  delete: (id: string) => api.delete(`/api/jobs/admin/jobs/${id}`),
  incrementApplications: (id: string) => api.patch(`/api/jobs/jobs/${id}/apply`),
  getFilters: () => api.get('/api/jobs/jobs/filters/data'),
  getStats: () => api.get('/api/jobs/admin/jobs/stats'),
};

// Hackathon Events API
export const hackathonEventsAPI = {
  getAll: () => api.get('/api/hackathons'),
  getAllAdmin: () => api.get('/api/hackathons/admin/all'),
  getUpcoming: () => api.get('/api/hackathons/upcoming'),
  getFeatured: () => api.get('/api/hackathons/featured'),
  getById: (id: string) => api.get(`/api/hackathons/${id}`),
  create: (data: CreateHackathonEventData) => api.post('/api/hackathons/admin', data),
  update: (id: string, data: UpdateHackathonEventData) => api.put(`/api/hackathons/admin/${id}`, data),
  delete: (id: string) => api.delete(`/api/hackathons/admin/${id}`),
  updateStatus: (id: string, status: string) => api.patch(`/api/hackathons/admin/${id}/status`, { status }),
};

// Work With Us API
export const workWithUsAPI = {
  getAll: () => api.get('/api/work-with-us'),
  getAllAdmin: () => api.get('/api/work-with-us/admin/all'),
  getUrgent: () => api.get('/api/work-with-us/urgent'),
  getLatest: () => api.get('/api/work-with-us/latest'),
  getById: (id: string) => api.get(`/api/work-with-us/${id}`),
  create: (data: CreateWorkWithUsData) => api.post('/api/work-with-us/admin', data),
  update: (id: string, data: UpdateWorkWithUsData) => api.put(`/api/work-with-us/admin/${id}`, data),
  delete: (id: string) => api.delete(`/api/work-with-us/admin/${id}`),
  incrementApplications: (id: string) => api.patch(`/api/work-with-us/${id}/apply`),
  getFilters: () => api.get('/api/work-with-us/filters/data'),
};

// Mentorship API
export const mentorshipAPI = {
  getAll: () => api.get('/api/mentorship'),
  getAllAdmin: () => api.get('/api/mentorship/admin/all'),
  getFeatured: () => api.get('/api/mentorship/featured'),
  getByExpertise: (expertise: string) => api.get(`/api/mentorship/expertise/${expertise}`),
  getById: (id: string) => api.get(`/api/mentorship/${id}`),
  create: (data: CreateMentorshipData) => api.post('/api/mentorship/admin', data),
  update: (id: string, data: UpdateMentorshipData) => api.put(`/api/mentorship/admin/${id}`, data),
  delete: (id: string) => api.delete(`/api/mentorship/admin/${id}`),
  incrementSessions: (id: string) => api.patch(`/api/mentorship/${id}/session`),
  getExpertiseAreas: () => api.get('/api/mentorship/filters/expertise'),
};

// Career Guidance API
export const careerGuidanceAPI = {
  getAll: () => api.get('/api/career-guidance'),
  getAllAdmin: () => api.get('/api/career-guidance/admin/all'),
  getFeatured: () => api.get('/api/career-guidance/featured'),
  getLatest: () => api.get('/api/career-guidance/latest'),
  getPopular: () => api.get('/api/career-guidance/popular'),
  getByCategory: (category: string) => api.get(`/api/career-guidance/category/${category}`),
  getById: (id: string) => api.get(`/api/career-guidance/${id}`),
  create: (data: CreateCareerGuidanceData) => api.post('/api/career-guidance/admin', data),
  update: (id: string, data: UpdateCareerGuidanceData) => api.put(`/api/career-guidance/admin/${id}`, data),
  delete: (id: string) => api.delete(`/api/career-guidance/admin/${id}`),
  like: (id: string) => api.patch(`/api/career-guidance/${id}/like`),
  getFilters: () => api.get('/api/career-guidance/filters/options'),
};

// Freelance Projects API
export const freelanceProjectsAPI = {
  getAll: () => api.get('/api/freelance-projects'),
  getAllAdmin: () => api.get('/api/freelance-projects/admin/all'),
  getPortfolio: () => api.get('/api/freelance-projects/portfolio'),
  getFeatured: () => api.get('/api/freelance-projects/featured'),
  getCompleted: () => api.get('/api/freelance-projects/completed'),
  getOngoing: () => api.get('/api/freelance-projects/ongoing'),
  getByCategory: (category: string) => api.get(`/api/freelance-projects/category/${category}`),
  getById: (id: string) => api.get(`/api/freelance-projects/${id}`),
  create: (data: CreateFreelanceProjectData) => api.post('/api/freelance-projects/admin', data),
  update: (id: string, data: UpdateFreelanceProjectData) => api.put(`/api/freelance-projects/admin/${id}`, data),
  delete: (id: string) => api.delete(`/api/freelance-projects/admin/${id}`),
  updateStatus: (id: string, data: ProjectStatusUpdate) => api.patch(`/api/freelance-projects/admin/${id}/status`, data),
  getStats: () => api.get('/api/freelance-projects/admin/stats'),
};

// Admin API
export const adminAPI = {
  login: (credentials: LoginCredentials) => 
    api.post('/api/admin/login', credentials),
  getDashboardStats: () => api.get('/api/admin/dashboard/stats'),
  getRecentActivity: () => api.get('/api/admin/recent-activity'),
};

export default api;
