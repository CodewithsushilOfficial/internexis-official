// Common types
export interface APIResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  count?: number;
}

// Digital Solutions Types
export interface DigitalSolution {
  _id?: string;
  title: string;
  description: string;
  category: string;
  features: string[];
  technologies: string[];
  price: {
    startingPrice: number;
    currency: string;
  };
  duration: string;
  image?: string;
  portfolioLink?: string;
  isActive: boolean;
  priority: number;
  createdAt?: string;
  updatedAt?: string;
}

export type CreateDigitalSolutionData = Omit<
  DigitalSolution,
  "_id" | "createdAt" | "updatedAt"
>;
export type UpdateDigitalSolutionData = Partial<CreateDigitalSolutionData>;

// Internship Opportunity Types
export interface InternshipOpportunity {
  _id?: string;
  title: string;
  company: string;
  companyLogo?: string;
  description: string;
  domain: string;
  skills: string[];
  responsibilities: string[];
  requirements: string[];
  duration: string;
  mode: string;
  location: string;
  stipend: {
    amount: number;
    currency: string;
    period: string;
  };
  eligibility: {
    education: string[];
    year: string[];
  };
  applicationLink: string;
  contactEmail: string;
  startDate: string;
  applicationDeadline: string;
  isActive: boolean;
  isFeatured: boolean;
  isUrgent: boolean;
  applicationsCount: number;
  benefits: string[];
  tags: string[];
  createdAt?: string;
  updatedAt?: string;
}

export type CreateInternshipOpportunityData = Omit<
  InternshipOpportunity,
  "_id" | "createdAt" | "updatedAt" | "applicationsCount"
>;
export type UpdateInternshipOpportunityData =
  Partial<CreateInternshipOpportunityData>;

// Job Opportunity Types
export interface JobOpportunity {
  _id?: string;
  title: string;
  company: string;
  companyLogo?: string;
  description: string;
  jobType: string;
  department: string;
  category: string;
  experience: string;
  skills: string[];
  responsibilities: string[];
  requirements: string[];
  qualifications: string[];
  location: string;
  salary: {
    min: number;
    max: number;
    currency: string;
    period: string;
    negotiable: boolean;
  };
  benefits: string[];
  applicationLink: string;
  contactEmail: string;
  applicationDeadline: string;
  isActive: boolean;
  isFeatured: boolean;
  isUrgent: boolean;
  isRemote: boolean;
  applicationsCount: number;
  views: number;
  companyWebsite?: string;
  tags: string[];
  postedBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type CreateJobOpportunityData = Omit<
  JobOpportunity,
  "_id" | "createdAt" | "updatedAt" | "applicationsCount" | "views"
>;
export type UpdateJobOpportunityData = Partial<CreateJobOpportunityData>;

// Hackathon Event Types
export interface HackathonEvent {
  _id?: string;
  title: string;
  description: string;
  eventType: "hackathon" | "tech-event" | "workshop" | "conference";
  startDate: string;
  endDate: string;
  location: string;
  registrationDeadline: string;
  maxParticipants: number;
  registrationFee: number;
  prizes: string[];
  requirements: string[];
  contactEmail: string;
  websiteUrl?: string;
  isActive: boolean;
  isFeatured?: boolean;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type CreateHackathonEventData = Omit<
  HackathonEvent,
  "_id" | "createdAt" | "updatedAt"
>;
export type UpdateHackathonEventData = Partial<CreateHackathonEventData>;

// Work With Us Types
export interface WorkWithUs {
  _id?: string;
  title: string;
  description: string;
  jobType: string;
  department: string;
  location: string;
  experience: string;
  skills: string[];
  responsibilities: string[];
  requirements: string[];
  salary: {
    min: number;
    max: number;
    currency: string;
    negotiable: boolean;
  };
  benefits: string[];
  applicationLink: string;
  contactEmail: string;
  deadline: string;
  isActive: boolean;
  isUrgent: boolean;
  applicationsCount: number;
  createdAt?: string;
  updatedAt?: string;
}

export type CreateWorkWithUsData = Omit<
  WorkWithUs,
  "_id" | "createdAt" | "updatedAt" | "applicationsCount"
>;
export type UpdateWorkWithUsData = Partial<CreateWorkWithUsData>;

// Mentorship Types
export interface Mentorship {
  _id?: string;
  mentorName: string;
  mentorTitle: string;
  expertise: string[];
  description: string;
  experience: string;
  company: string;
  mentorImage?: string;
  linkedinProfile?: string;
  sessionTypes: string[];
  pricing: {
    sessionPrice: number;
    currency: string;
    duration: string;
  };
  availability: {
    timezone: string;
    preferredDays: string[];
    preferredTime: string;
  };
  bookingLink: string;
  contactEmail: string;
  rating: number;
  totalSessions: number;
  isActive: boolean;
  isFeatured: boolean;
  languages: string[];
  createdAt?: string;
  updatedAt?: string;
}

export type CreateMentorshipData = Omit<
  Mentorship,
  "_id" | "createdAt" | "updatedAt" | "totalSessions"
>;
export type UpdateMentorshipData = Partial<CreateMentorshipData>;

// Career Guidance Types
export interface CareerGuidance {
  _id?: string;
  title: string;
  description: string;
  contentType: string;
  category: string;
  targetAudience: string;
  content: string;
  author: {
    name: string;
    title: string;
    image?: string;
  };
  tags: string[];
  featuredImage?: string;
  externalLink?: string;
  duration?: string;
  difficulty: string;
  isPublished: boolean;
  isFeatured: boolean;
  views: number;
  likes: number;
  publishedDate: string;
  createdAt?: string;
  updatedAt?: string;
}

export type CreateCareerGuidanceData = Omit<
  CareerGuidance,
  "_id" | "createdAt" | "updatedAt" | "views" | "likes"
>;
export type UpdateCareerGuidanceData = Partial<CreateCareerGuidanceData>;

// Freelance Project Types
export interface FreelanceProject {
  _id?: string;
  title: string;
  description: string;
  category: string;
  client: {
    name: string;
    company?: string;
    location?: string;
    testimonial?: string;
    rating: number;
  };
  technologies: string[];
  projectImages: string[];
  liveLink?: string;
  githubLink?: string;
  portfolioLink?: string;
  startDate: string;
  endDate?: string;
  duration: string;
  budget: {
    amount: number;
    currency: string;
  };
  status: string;
  projectType: string;
  isShowcase: boolean;
  isFeatured: boolean;
  challenges: string[];
  solutions: string[];
  keyFeatures: string[];
  completionPercentage: number;
  createdAt?: string;
  updatedAt?: string;
}

export type CreateFreelanceProjectData = Omit<
  FreelanceProject,
  "_id" | "createdAt" | "updatedAt"
>;
export type UpdateFreelanceProjectData = Partial<CreateFreelanceProjectData>;

export interface ProjectStatusUpdate {
  status: string;
  completionPercentage?: number;
  endDate?: string;
}

// Admin Types
export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: string;
    username: string;
    role: string;
  };
}

export interface DashboardStats {
  totalInternships: number;
  totalJobs: number;
  totalMentors: number;
  totalProjects: number;
  totalEvents: number;
  totalApplications: number;
  totalUsers: number;
  monthlyGrowth: number;
}

export interface RecentActivity {
  id: string;
  action: string;
  timestamp: string;
  type: string;
  details?: string;
}

// Filter Types
export interface FilterData {
  categories?: string[];
  jobTypes?: string[];
  experiences?: string[];
  departments?: string[];
  locations?: string[];
  domains?: string[];
  modes?: string[];
  durations?: string[];
  targetAudiences?: string[];
  contentTypes?: string[];
  difficulties?: string[];
}

// Generic Error Type
export interface APIError {
  message: string;
  status?: number;
  data?: unknown;
}
