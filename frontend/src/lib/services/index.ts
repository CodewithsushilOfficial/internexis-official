// Frontend-only services (no backend integration)

// Type definitions for Campus Ambassador form data
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

// Frontend-only Campus Ambassador Service
export const campusAmbassadorService = {
  async submitApplication(data: CampusAmbassadorFormData) {
    // Simulate form submission (frontend only)
    console.log('Campus Ambassador Application submitted (frontend only):', data);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return success response
    return {
      success: true,
      message: 'Application submitted successfully! (Frontend demo - no backend integration)',
      data: { submittedAt: new Date().toISOString() }
    };
  },

  async validateForm(data: Partial<CampusAmbassadorFormData>) {
    const errors: string[] = [];
    
    if (!data.firstName?.trim()) errors.push('First name is required');
    if (!data.lastName?.trim()) errors.push('Last name is required');
    if (!data.email?.trim()) errors.push('Email is required');
    if (!data.phone?.trim()) errors.push('Phone is required');
    if (!data.university?.trim()) errors.push('University is required');
    if (!data.course?.trim()) errors.push('Course is required');
    if (!data.yearOfStudy?.trim()) errors.push('Year of study is required');
    if (!data.cgpa?.trim()) errors.push('CGPA is required');
    if (!data.linkedinUrl?.trim()) errors.push('LinkedIn URL is required');
    if (!data.skills || data.skills.length === 0) errors.push('At least one skill is required');
    if (!data.experience?.trim()) errors.push('Experience is required');
    if (!data.motivation?.trim()) errors.push('Motivation is required');
    if (!data.whyInternexis?.trim()) errors.push('Why Internexis is required');
    if (!data.availabilityHours?.trim()) errors.push('Availability hours is required');
    if (!data.startDate?.trim()) errors.push('Start date is required');
    if (!data.referralSource?.trim()) errors.push('Referral source is required');
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
};

// Export default service for backward compatibility
export default campusAmbassadorService;
