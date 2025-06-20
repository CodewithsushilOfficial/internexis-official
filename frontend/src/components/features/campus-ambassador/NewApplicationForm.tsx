import React, { useState } from "react";

// Form data interface
interface CampusAmbassadorFormData {
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
  referralSource: string;
  additionalInfo: string;
}

const NewApplicationForm: React.FC = () => {
  const [formData, setFormData] = useState<CampusAmbassadorFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    university: "",
    course: "",
    yearOfStudy: "",
    cgpa: "",
    linkedinUrl: "",
    portfolioUrl: "",
    skills: [],
    experience: "",
    motivation: "",
    whyInternexis: "",
    availabilityHours: "",
    startDate: "",
    referralSource: "",
    additionalInfo: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    if (name === 'skills') {
      // Handle skills as comma-separated values converted to array
      const skillsArray = value.split(',').map(skill => skill.trim()).filter(skill => skill);
      setFormData(prev => ({
        ...prev,
        [name]: skillsArray,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validateForm = (): string[] => {
    const requiredFields: (keyof CampusAmbassadorFormData)[] = [
      'firstName', 'lastName', 'email', 'phone', 'university', 
      'course', 'yearOfStudy', 'cgpa', 'linkedinUrl', 'skills',
      'experience', 'motivation', 'whyInternexis', 'availabilityHours',
      'startDate', 'referralSource'
    ];
    
    return requiredFields.filter(field => {
      const value = formData[field];
      return !value || (typeof value === 'string' && !value.trim()) || 
             (Array.isArray(value) && value.length === 0);
    });
  };  const submitToBackend = async (data: CampusAmbassadorFormData) => {
    try {
      console.log('Form data submitted (frontend only):', data);
      
      // Simulate successful submission
      return {
        success: true,
        message: 'Application submitted successfully! (Frontend demo - no backend integration)',
        data: { submittedAt: new Date().toISOString() }      };
    } catch (error) {
      console.error('Submission error:', error);
      return {
        success: false,
        message: 'Failed to submit application. Please try again.',
        fallback: false
      };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    
    const missingFields = validateForm();
    if (missingFields.length > 0) {
      setMessage({
        type: "error",
        text: `Please fill in all required fields: ${missingFields.join(', ')}`
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const result = await submitToBackend(formData);
        if (result.success) {
        setMessage({
          type: "success",
          text: result.message || "Application submitted successfully! Welcome to the Internexis Ambassador Program!"
        });
        
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          university: "",
          course: "",
          yearOfStudy: "",
          cgpa: "",
          linkedinUrl: "",
          portfolioUrl: "",
          skills: [],
          experience: "",
          motivation: "",
          whyInternexis: "",
          availabilityHours: "",
          startDate: "",
          referralSource: "",
          additionalInfo: "",        });
      } else {
        setMessage({
          type: "error",
          text: result.message || "Failed to submit application"
        });
      }
    } catch (error) {
      console.error('Submission error:', error);
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Failed to submit application"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Campus Ambassador Application
          </h1>
          <p className="text-xl text-blue-200">
            Join our elite team of campus leaders and make a difference
          </p>
        </div>

        {/* Message Display */}
        {message && (
          <div className={`mb-8 p-4 rounded-lg ${
            message.type === 'success' 
              ? 'bg-green-100 border border-green-400 text-green-700' 
              : 'bg-red-100 border border-red-400 text-red-700'
          }`}>
            <p className="font-medium">{message.text}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
          {/* Personal Information */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-medium mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your first name"
                />
              </div>
              
              <div>
                <label className="block text-white font-medium mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your last name"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="your.email@university.edu"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="+91 9876543210"
                />
              </div>
            </div>
          </div>

          {/* Academic Information */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Academic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-white font-medium mb-2">
                  University/College *
                </label>
                <input
                  type="text"
                  name="university"
                  value={formData.university}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Your university name"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  Course/Degree *
                </label>
                <input
                  type="text"
                  name="course"
                  value={formData.course}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="B.Tech Computer Science"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  Year of Study *
                </label>
                <select
                  name="yearOfStudy"
                  value={formData.yearOfStudy}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="" className="text-gray-800">Select Year</option>
                  <option value="1st Year" className="text-gray-800">1st Year</option>
                  <option value="2nd Year" className="text-gray-800">2nd Year</option>
                  <option value="3rd Year" className="text-gray-800">3rd Year</option>
                  <option value="4th Year" className="text-gray-800">4th Year</option>
                  <option value="Postgraduate" className="text-gray-800">Postgraduate</option>
                </select>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  CGPA/Grade *
                </label>
                <input
                  type="text"
                  name="cgpa"
                  value={formData.cgpa}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="8.5 or A grade"
                />
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Professional Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-medium mb-2">
                  LinkedIn Profile *
                </label>
                <input
                  type="url"
                  name="linkedinUrl"
                  value={formData.linkedinUrl}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  Portfolio URL (Optional)
                </label>
                <input
                  type="url"
                  name="portfolioUrl"
                  value={formData.portfolioUrl}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="https://yourportfolio.com"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-white font-medium mb-2">
                  Skills (comma-separated) *
                </label>
                <input
                  type="text"
                  name="skills"
                  value={Array.isArray(formData.skills) ? formData.skills.join(', ') : ''}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Leadership, Marketing, Communication, Event Management"
                />
              </div>
            </div>
          </div>

          {/* Experience & Motivation */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Experience & Motivation</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-white font-medium mb-2">
                  Previous Experience *
                </label>
                <textarea
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                  placeholder="Describe your leadership experience, projects, or relevant background..."
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  Why do you want to become a Campus Ambassador? *
                </label>
                <textarea
                  name="motivation"
                  value={formData.motivation}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                  placeholder="Share your motivation and what excites you about this opportunity..."
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  Why Internexis specifically? *
                </label>
                <textarea
                  name="whyInternexis"
                  value={formData.whyInternexis}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                  placeholder="Tell us why you chose Internexis and what you know about our mission..."
                />
              </div>
            </div>
          </div>

          {/* Availability & Additional Info */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Availability & Additional Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-medium mb-2">
                  Time Availability (hours per week) *
                </label>
                <select
                  name="availabilityHours"
                  value={formData.availabilityHours}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="" className="text-gray-800">Select availability</option>
                  <option value="5-10 hours" className="text-gray-800">5-10 hours per week</option>
                  <option value="10-15 hours" className="text-gray-800">10-15 hours per week</option>
                  <option value="15-20 hours" className="text-gray-800">15-20 hours per week</option>
                  <option value="20+ hours" className="text-gray-800">20+ hours per week</option>
                </select>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  When can you start? *
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  How did you hear about us? *
                </label>
                <input
                  type="text"
                  name="referralSource"
                  value={formData.referralSource}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Social media, friend, website, etc."
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  Additional Information (Optional)
                </label>
                <textarea
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                  placeholder="Any additional information you'd like to share..."
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-12 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-lg shadow-lg transition-all duration-300 ${
                isSubmitting 
                  ? 'opacity-70 cursor-not-allowed' 
                  : 'hover:from-blue-700 hover:to-purple-700 hover:shadow-xl transform hover:scale-105'
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting Application...
                </>
              ) : (
                'Submit Application'
              )}
            </button>
            
            <p className="mt-4 text-white/80 text-sm">
              Your information is secure and will be processed within 24-48 hours
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewApplicationForm;
