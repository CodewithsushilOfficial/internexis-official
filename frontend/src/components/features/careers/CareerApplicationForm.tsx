import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  GraduationCap, 
  Briefcase, 
  Link as LinkIcon, 
  Upload,
  CheckCircle,
  AlertCircle,
  Code,
  Smartphone,
  Brain,
  Video,
  Palette,
  TrendingUp,
  Award,
  MapPin,
  Heart,
  Users
} from 'lucide-react';
import './ModernFormStyles.css';

interface FormData {
  // Basic Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  // Professional Information
  linkedinUrl: string;
  portfolioUrl: string;
  resumeUrl: string;
  
  // Role and Skills
  primaryRole: string;
  secondaryRole: string;
  skills: string[];
  experience: string;
  
  // Education (for students)
  university: string;
  course: string;
  yearOfStudy: string;
  cgpa: string;
  
  // Mentor-specific fields
  mentorExperience: string;
  mentorAreas: string[];
  availabilityHours: string;
  
  // Motivation
  motivation: string;
  whyInternexis: string;
  
  // Availability
  startDate: string;
  timeCommitment: string;
  
  // Additional
  referralSource: string;
  additionalInfo: string;
}

const CareerApplicationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    linkedinUrl: '',
    portfolioUrl: '',
    resumeUrl: '',
    primaryRole: '',
    secondaryRole: '',
    skills: [],
    experience: '',
    university: '',
    course: '',
    yearOfStudy: '',
    cgpa: '',
    mentorExperience: '',
    mentorAreas: [],
    availabilityHours: '',
    motivation: '',
    whyInternexis: '',
    startDate: '',
    timeCommitment: '',
    referralSource: '',
    additionalInfo: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const roles = [
    { id: 'web-developer', label: 'Web Developer', icon: Code, category: 'technical' },
    { id: 'app-developer', label: 'App Developer', icon: Smartphone, category: 'technical' },
    { id: 'ai-ml-engineer', label: 'AI/ML Engineer', icon: Brain, category: 'technical' },
    { id: 'video-editor', label: 'Video Editor', icon: Video, category: 'creative' },
    { id: 'graphic-designer', label: 'Graphic Designer', icon: Palette, category: 'creative' },
    { id: 'digital-marketer', label: 'Digital Marketer', icon: TrendingUp, category: 'marketing' },
    { id: 'mentor', label: 'Mentor', icon: Award, category: 'guidance' },
    { id: 'campus-ambassador', label: 'Campus Ambassador', icon: MapPin, category: 'outreach' },
    { id: 'volunteer', label: 'Volunteer', icon: Heart, category: 'support' },
    { id: 'project-manager', label: 'Project Manager', icon: Users, category: 'management' },
    { id: 'other', label: 'Other', icon: Briefcase, category: 'other' }
  ];

  const skillOptions = [
    // Technical Skills
    'JavaScript', 'Python', 'React', 'Node.js', 'Java', 'C++', 'Flutter', 'React Native',
    'Machine Learning', 'Data Science', 'AI', 'Deep Learning', 'TensorFlow', 'PyTorch',
    'HTML/CSS', 'TypeScript', 'Angular', 'Vue.js', 'PHP', 'Ruby', 'Go', 'Rust',
    
    // Creative Skills
    'Adobe Photoshop', 'Adobe Illustrator', 'Figma', 'Adobe Premiere Pro', 'After Effects',
    'Blender', 'Sketch', 'InDesign', 'Canva', 'Video Editing', 'Motion Graphics',
    
    // Marketing Skills
    'SEO', 'Social Media Marketing', 'Content Marketing', 'Google Analytics', 'Facebook Ads',
    'Google Ads', 'Email Marketing', 'Copywriting', 'Brand Strategy', 'Digital Strategy',
    
    // Soft Skills
    'Leadership', 'Communication', 'Project Management', 'Team Building', 'Problem Solving',
    'Time Management', 'Public Speaking', 'Event Management', 'Research', 'Writing'
  ];

  const mentorAreas = [
    'Technical Guidance', 'Career Counseling', 'Interview Preparation', 'Portfolio Review',
    'Industry Insights', 'Skill Development', 'Project Mentoring', 'Academic Support',
    'Entrepreneurship', 'Professional Networking', 'Resume Building', 'Soft Skills'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSkillToggle = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleMentorAreaToggle = (area: string) => {
    setFormData(prev => ({
      ...prev,
      mentorAreas: prev.mentorAreas.includes(area)
        ? prev.mentorAreas.filter(a => a !== area)
        : [...prev.mentorAreas, area]
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);    try {
      // Validate required fields based on role
      const baseRequiredFields = ['firstName', 'lastName', 'email', 'phone', 'primaryRole'];
      const requiredFields = [...baseRequiredFields];
      
      // Add role-specific required fields
      if (formData.primaryRole === 'mentor') {
        requiredFields.push('mentorExperience');
        if (formData.mentorAreas.length === 0) {
          setMessage({
            type: 'error',
            text: 'Please select at least one mentoring area for mentor role'
          });
          setIsSubmitting(false);
          return;
        }
      }
      
      // Check for motivation fields - at least one must be filled
      if (!formData.motivation && !formData.whyInternexis) {
        setMessage({
          type: 'error',
          text: 'Please share your motivation for applying'
        });
        setIsSubmitting(false);
        return;
      }
      
      // Check for availability
      if (!formData.timeCommitment && !formData.availabilityHours) {
        setMessage({
          type: 'error',
          text: 'Please select your time commitment or availability'
        });
        setIsSubmitting(false);
        return;
      }
      
      // Check for referral source
      if (!formData.referralSource) {
        setMessage({
          type: 'error',
          text: 'Please tell us how you heard about us'
        });
        setIsSubmitting(false);
        return;
      }

      const missingFields = requiredFields.filter(field => !formData[field as keyof FormData]);
      
      if (missingFields.length > 0) {
        setMessage({
          type: 'error',
          text: `Please fill in all required fields: ${missingFields.join(', ')}`
        });
        setIsSubmitting(false);
        return;
      }

      // Validate skills - at least one skill required
      if (formData.skills.length === 0) {
        setMessage({
          type: 'error',
          text: 'Please select at least one skill'
        });
        setIsSubmitting(false);
        return;
      }      // Validate experience field - minimum length required
      if (!formData.experience || formData.experience.trim().length < 10) {
        setMessage({
          type: 'error',
          text: 'Please provide a detailed description of your experience (minimum 10 characters)'
        });
        setIsSubmitting(false);
        return;
      }
      
      // Validate URLs if provided
      const urlRegex = /^https?:\/\/.+/;
      const linkedinRegex = /^https?:\/\/(www\.)?linkedin\.com\/.+/;
      
      // Portfolio URL validation
      if (formData.portfolioUrl && formData.portfolioUrl.trim() !== '') {
        if (!urlRegex.test(formData.portfolioUrl)) {
          setMessage({
            type: 'error',
            text: 'Please provide a valid URL for your portfolio (should start with http:// or https://)'
          });
          setIsSubmitting(false);
          return;
        }
      }
      
      // LinkedIn URL validation
      if (formData.linkedinUrl && formData.linkedinUrl.trim() !== '') {
        if (!linkedinRegex.test(formData.linkedinUrl)) {
          setMessage({
            type: 'error',
            text: 'Please provide a valid LinkedIn URL (should start with http://linkedin.com/ or https://linkedin.com/)'
          });
          setIsSubmitting(false);
          return;
        }
      }
      
      // Resume URL validation
      if (formData.resumeUrl && formData.resumeUrl.trim() !== '') {
        if (!urlRegex.test(formData.resumeUrl)) {
          setMessage({
            type: 'error',
            text: 'Please provide a valid URL for your resume (should start with http:// or https://)'
          });
          setIsSubmitting(false);
          return;
        }
      }// Prepare data for API
      const applicationData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        location: 'India', // Default location
        roleType: formData.primaryRole,
        skills: formData.skills,
        experience: formData.experience.trim(),
        // Only include URLs if they're valid and non-empty
        portfolioUrl: formData.portfolioUrl && formData.portfolioUrl.trim() !== '' ? formData.portfolioUrl.trim() : undefined,
        linkedinUrl: formData.linkedinUrl && formData.linkedinUrl.trim() !== '' ? formData.linkedinUrl.trim() : undefined,
        githubUrl: undefined, // Not collected in current form
        university: formData.university?.trim() || undefined,
        course: formData.course?.trim() || undefined,
        yearOfStudy: formData.yearOfStudy?.trim() || undefined,
        cgpa: formData.cgpa?.trim() || undefined,
        expertise: formData.mentorAreas.length > 0 ? formData.mentorAreas : undefined,
        yearsOfExperience: formData.mentorExperience ? parseInt(formData.mentorExperience) || 0 : undefined,
        currentRole: formData.secondaryRole?.trim() || undefined,
        company: undefined, // Not collected in current form
        mentorshipExperience: formData.mentorExperience?.trim() || undefined,        // Combine both motivation fields to ensure we meet backend requirements
        motivation: `${formData.whyInternexis.trim()}\n\n${formData.motivation.trim()}`,
        availability: formData.timeCommitment || `${formData.availabilityHours} hours/week`,
        heardAboutUs: formData.referralSource
      };

      // Simulate form submission (frontend only)
      console.log('Form submitted:', applicationData);
      
      // Show success message
      setMessage({
        type: 'success',
        text: `Application submitted successfully! (Frontend demo - no backend integration) Welcome to the Internexis family! 🎉`
      });

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        linkedinUrl: '',
        portfolioUrl: '',
        resumeUrl: '',
        primaryRole: '',
        secondaryRole: '',
        skills: [],
        experience: '',
          university: '',
          course: '',
          yearOfStudy: '',
          cgpa: '',
          mentorExperience: '',
          mentorAreas: [],
          availabilityHours: '',
          motivation: '',
          whyInternexis: '',
          startDate: '',
          timeCommitment: '',
          referralSource: '',
          additionalInfo: ''        });
        setCurrentStep(1);
    } catch (error) {
      console.error('Application submission error:', error);
      setMessage({
        type: 'error',
        text: 'Failed to submit application. Please check your internet connection and try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStudentRole = () => {
    return ['web-developer', 'app-developer', 'ai-ml-engineer', 'video-editor', 'graphic-designer', 'digital-marketer'].includes(formData.primaryRole);
  };

  const isMentorRole = () => {
    return formData.primaryRole === 'mentor';
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderBasicInfo();
      case 2:
        return renderRoleAndSkills();
      case 3:
        return renderEducationAndExperience();
      case 4:
        return renderMotivationAndAvailability();
      default:
        return renderBasicInfo();
    }
  };
  const renderBasicInfo = () => (
    <div className="space-y-8">      <div className="text-center mb-8">
        <motion.h3 
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-2xl font-bold text-gray-900 mb-2"
        >
          Basic Information
        </motion.h3>
        <p className="text-gray-600">Let's start with your basic details</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div 
          initial={{ x: -20, opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }} 
          transition={{ delay: 0.1 }}
          className="glow-effect"
        >        <label className="block text-sm font-bold text-gray-700 mb-3">
          First Name <span className="text-red-500">*</span>
        </label>
        <div className="relative focus-ring rounded-xl">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
            className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 transition-all duration-300 bg-white"
            placeholder="Enter your first name"
          />
        </div>
        </motion.div>

        <motion.div 
          initial={{ x: 20, opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }} 
          transition={{ delay: 0.2 }}
          className="glow-effect"
        >        <label className="block text-sm font-bold text-gray-700 mb-3">
          Last Name <span className="text-red-500">*</span>
        </label>
        <div className="relative focus-ring rounded-xl">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
            className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all duration-300 bg-white"
            placeholder="Enter your last name"
          />
        </div>
        </motion.div>

        <motion.div 
          initial={{ x: -20, opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }} 
          transition={{ delay: 0.3 }}
          className="glow-effect"
        >        <label className="block text-sm font-bold text-gray-700 mb-3">
          Email Address <span className="text-red-500">*</span>
        </label>
        <div className="relative focus-ring rounded-xl">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 transition-all duration-300 bg-white"
            placeholder="your.email@example.com"
          />
        </div>
        </motion.div>

        <motion.div 
          initial={{ x: 20, opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }} 
          transition={{ delay: 0.4 }}
          className="glow-effect"
        >        <label className="block text-sm font-bold text-gray-700 mb-3">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <div className="relative focus-ring rounded-xl">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
            className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all duration-300 bg-white"
            placeholder="+91 XXXXX XXXXX"
          />
        </div>
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ delay: 0.5 }}
          className="glow-effect"
        >        <label className="block text-sm font-bold text-gray-700 mb-3">
          LinkedIn Profile
        </label>
        <div className="relative focus-ring rounded-xl">
          <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
          <input
            type="url"
            name="linkedinUrl"
            value={formData.linkedinUrl}
            onChange={handleInputChange}
            className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 transition-all duration-300 bg-white"
            placeholder="https://linkedin.com/in/yourprofile"
          />
        </div>
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ delay: 0.6 }}
          className="glow-effect"
        >        <label className="block text-sm font-bold text-gray-700 mb-3">
          Portfolio/Website
        </label>
        <div className="relative focus-ring rounded-xl">
          <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
          <input
            type="url"
            name="portfolioUrl"
            value={formData.portfolioUrl}
            onChange={handleInputChange}
            className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all duration-300 bg-white"
            placeholder="https://yourportfolio.com"
          />
        </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ delay: 0.7 }}
        className="glow-effect"
      >        <label className="block text-sm font-bold text-gray-700 mb-3">
          Resume/CV Link
        </label>
        <div className="relative focus-ring rounded-xl">
          <Upload className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
          <input
            type="url"
            name="resumeUrl"
            value={formData.resumeUrl}
            onChange={handleInputChange}
            className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 transition-all duration-300 bg-white"
            placeholder="Link to your resume (Google Drive, Dropbox, etc.)"
          />
        </div>
        <p className="text-sm text-gray-500 mt-2">Share a link to your resume or CV (PDF preferred)</p>
      </motion.div>
    </div>
  );
  const renderRoleAndSkills = () => (
    <div className="space-y-8">      <div className="text-center mb-8">
        <motion.h3 
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-2xl font-bold text-gray-900 mb-2"
        >
          Role & Skills
        </motion.h3>
        <p className="text-gray-600">Tell us about your interests and capabilities</p>
      </div>

      {/* Primary Role Selection */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <label className="block text-sm font-bold text-gray-700 mb-6">
          Primary Role <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {roles.map((role, index) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className={`relative cursor-pointer rounded-xl transition-all duration-300 overflow-hidden card-hover ${
                formData.primaryRole === role.id
                  ? 'shadow-lg'
                  : 'border border-gray-200'
              }`}
              onClick={() => setFormData(prev => ({ ...prev, primaryRole: role.id }))}
            >              <div className={`absolute inset-0 transition-opacity duration-300 ${
                formData.primaryRole === role.id
                  ? 'opacity-100 bg-blue-50'
                  : 'opacity-0 hover:opacity-100 bg-gray-50'
              }`}></div>
              
              <div className="flex items-center space-x-3 relative z-10 p-4">                <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 ${
                  formData.primaryRole === role.id 
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white border border-gray-200 text-gray-500 group-hover:text-purple-500'
                }`}>
                  <role.icon className="h-6 w-6" />
                </div>
                <div>
                  <h4 className={`text-base font-medium ${
                    formData.primaryRole === role.id 
                      ? 'text-purple-800' 
                      : 'text-gray-800'
                  }`}>{role.label}</h4>
                  <p className="text-xs text-gray-500 capitalize">{role.category}</p>
                </div>
              </div>
              
              {formData.primaryRole === role.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-3 right-3 z-10"
                >
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Secondary Role (Optional) */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="glow-effect"
      >        <label className="block text-sm font-bold text-gray-700 mb-3">
          Secondary Role (Optional)
        </label>
        <div className="relative focus-ring rounded-xl">
          <select
            name="secondaryRole"
            value={formData.secondaryRole}
            onChange={handleInputChange}
            className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all duration-300 bg-white appearance-none"
            style={{ backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M6 9l6 6 6-6\"/></svg>')", backgroundRepeat: "no-repeat", backgroundPosition: "right 1rem center", backgroundSize: "1.5em 1.5em" }}
          >
            <option value="">Select a secondary role (optional)</option>
            {roles.filter(role => role.id !== formData.primaryRole).map((role) => (
              <option key={role.id} value={role.id}>{role.label}</option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Skills Selection */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >        <label className="block text-sm font-bold text-gray-700 mb-3">
          Skills & Technologies
        </label>
        <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-xl p-6 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {skillOptions.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + index * 0.01 }}
                className={`cursor-pointer px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center ${                  formData.skills.includes(skill)
                    ? 'bg-blue-600 text-white shadow-md transform scale-105'
                    : 'bg-white border border-gray-200 text-gray-700 hover:border-indigo-300 hover:text-indigo-600 hover:shadow-sm'
                }`}
                onClick={() => handleSkillToggle(skill)}
              >
                {formData.skills.includes(skill) && (
                  <CheckCircle className="h-4 w-4 flex-shrink-0 mr-2" />
                )}
                <span>{skill}</span>
              </motion.div>
            ))}
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Selected: <span className="font-semibold text-indigo-600">{formData.skills.length}</span> skills
        </p>
      </motion.div>

      {/* Experience Level */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="glow-effect"
      >        <label className="block text-sm font-bold text-gray-700 mb-3">
          Experience & Projects
        </label>
        <div className="relative focus-ring rounded-xl">
          <textarea
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
            rows={5}
            className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 transition-all duration-300 bg-white resize-none"
            placeholder="Describe your relevant experience, projects, internships, or any work you've done related to your chosen role..."
          />
        </div>
      </motion.div>
    </div>
  );
  const renderEducationAndExperience = () => (
    <div className="space-y-8">      <div className="text-center mb-8">
        <motion.h3 
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-2xl font-bold text-gray-900 mb-2"
        >
          {isStudentRole() ? 'Education Details' : 'Professional Background'}
        </motion.h3>
        <p className="text-gray-600">
          {isStudentRole() 
            ? 'Help us understand your academic background' 
            : 'Tell us about your professional experience'
          }
        </p>
      </div>

      {/* Educational Information (for student roles) */}
      {isStudentRole() && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glow-effect">              <label className="block text-sm font-bold text-gray-700 mb-3">
                University/College
              </label>
              <div className="relative focus-ring rounded-xl">
                <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                <input
                  type="text"
                  name="university"
                  value={formData.university}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 transition-all duration-300 bg-white"
                  placeholder="Your university name"
                />
              </div>
            </div>

            <div className="glow-effect">              <label className="block text-sm font-bold text-gray-700 mb-3">
                Course/Branch
              </label>
              <div className="relative focus-ring rounded-xl">
                <input
                  type="text"
                  name="course"
                  value={formData.course}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all duration-300 bg-white"
                  placeholder="e.g., Computer Science Engineering"
                />
              </div>
            </div>

            <div className="glow-effect">              <label className="block text-sm font-bold text-gray-700 mb-3">
                Year of Study
              </label>
              <div className="relative focus-ring rounded-xl">
                <select
                  name="yearOfStudy"
                  value={formData.yearOfStudy}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 transition-all duration-300 bg-white appearance-none"
                  style={{ backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M6 9l6 6 6-6\"/></svg>')", backgroundRepeat: "no-repeat", backgroundPosition: "right 1rem center", backgroundSize: "1.5em 1.5em" }}
                >
                  <option value="">Select year</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                  <option value="Final Year">Final Year</option>
                  <option value="Masters">Masters</option>
                  <option value="PhD">PhD</option>
                </select>
              </div>
            </div>

            <div className="glow-effect">              <label className="block text-sm font-bold text-gray-700 mb-3">
                CGPA/Percentage
              </label>
              <div className="relative focus-ring rounded-xl">
                <input
                  type="text"
                  name="cgpa"
                  value={formData.cgpa}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all duration-300 bg-white"
                  placeholder="e.g., 8.5 CGPA or 85%"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Mentor-specific fields */}
      {isMentorRole() && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div className="glow-effect">            <label className="block text-sm font-bold text-gray-700 mb-3">
              Professional Experience <span className="text-red-500">*</span>
            </label>
            <div className="relative focus-ring rounded-xl">
              <textarea
                name="mentorExperience"
                value={formData.mentorExperience}
                onChange={handleInputChange}
                rows={5}
                className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 transition-all duration-300 bg-white resize-none"
                placeholder="Describe your professional background, years of experience, current role, and expertise areas..."
              />
            </div>
          </div>
          
          <div>            <label className="block text-sm font-bold text-gray-700 mb-6">
              Mentoring Areas <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 border border-gray-200 p-6 rounded-xl bg-gray-50">
              {mentorAreas.map((area, index) => (
                <motion.div
                  key={area}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + index * 0.03 }}
                  className={`cursor-pointer px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${                    formData.mentorAreas.includes(area)
                      ? 'bg-blue-600 text-white shadow-md transform scale-105'
                      : 'bg-white border border-gray-200 text-gray-700 hover:border-purple-300 hover:text-purple-600 hover:shadow-sm'
                  }`}
                  onClick={() => handleMentorAreaToggle(area)}
                >
                  {formData.mentorAreas.includes(area) && (
                    <CheckCircle className="h-4 w-4 inline-block mr-2" />
                  )}
                  {area}
                </motion.div>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Selected: <span className="font-semibold text-purple-600">{formData.mentorAreas.length}</span> areas
            </p>
          </div>

          <div className="glow-effect">            <label className="block text-sm font-bold text-gray-700 mb-3">
              Weekly Availability
            </label>
            <div className="relative focus-ring rounded-xl">
              <select
                name="availabilityHours"
                value={formData.availabilityHours}
                onChange={handleInputChange}
                className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all duration-300 bg-white appearance-none"
                style={{ backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M6 9l6 6 6-6\"/></svg>')", backgroundRepeat: "no-repeat", backgroundPosition: "right 1rem center", backgroundSize: "1.5em 1.5em" }}
              >
                <option value="">Select availability</option>
                <option value="2-4 hours">2-4 hours per week</option>
                <option value="4-6 hours">4-6 hours per week</option>
                <option value="6-8 hours">6-8 hours per week</option>
                <option value="8+ hours">8+ hours per week</option>
              </select>
            </div>
          </div>
        </motion.div>
      )}

      {/* Time Commitment */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glow-effect"
      >        <label className="block text-sm font-bold text-gray-700 mb-3">
          Time Commitment
        </label>
        <div className="relative focus-ring rounded-xl">
          <select
            name="timeCommitment"
            value={formData.timeCommitment}
            onChange={handleInputChange}
            className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 transition-all duration-300 bg-white appearance-none"
            style={{ backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M6 9l6 6 6-6\"/></svg>')", backgroundRepeat: "no-repeat", backgroundPosition: "right 1rem center", backgroundSize: "1.5em 1.5em" }}
          >
            <option value="">Select time commitment</option>
            <option value="Part-time (5-10 hours/week)">Part-time (5-10 hours/week)</option>
            <option value="Part-time (10-20 hours/week)">Part-time (10-20 hours/week)</option>
            <option value="Full-time (20+ hours/week)">Full-time (20+ hours/week)</option>
            <option value="Flexible">Flexible</option>
          </select>
        </div>
      </motion.div>

      {/* Start Date */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glow-effect"
      >        <label className="block text-sm font-bold text-gray-700 mb-3">
          Preferred Start Date
        </label>
        <div className="relative focus-ring rounded-xl">
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleInputChange}
            className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all duration-300 bg-white"
          />
        </div>
      </motion.div>
    </div>
  );
  const renderMotivationAndAvailability = () => (
    <div className="space-y-8">      <div className="text-center mb-8">
        <motion.h3 
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-2xl font-bold text-gray-900 mb-2"
        >
          Tell Us About Yourself
        </motion.h3>
        <p className="text-gray-600">Share your motivation and goals with us</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glow-effect"
      >        <label className="block text-sm font-bold text-gray-700 mb-3">
          Why do you want to join Internexis? <span className="text-red-500">*</span>
        </label>
        <div className="relative focus-ring rounded-xl">
          <textarea
            name="whyInternexis"
            value={formData.whyInternexis}
            onChange={handleInputChange}
            rows={5}
            className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 transition-all duration-300 bg-white resize-none"
            placeholder="Tell us what attracts you to Internexis and how you see yourself contributing to our mission..."
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glow-effect"
      >        <label className="block text-sm font-bold text-gray-700 mb-3">
          What motivates you in your chosen role? <span className="text-red-500">*</span>
        </label>
        <div className="relative focus-ring rounded-xl">
          <textarea
            name="motivation"
            value={formData.motivation}
            onChange={handleInputChange}
            rows={5}
            className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all duration-300 bg-white resize-none"
            placeholder="Share your passion, goals, and what drives you to excel in this role..."
          />
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glow-effect"
      >        <label className="block text-sm font-bold text-gray-700 mb-3">
          How did you hear about us? <span className="text-red-500">*</span>
        </label>
        <div className="relative focus-ring rounded-xl">
          <select
            name="referralSource"
            value={formData.referralSource}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 transition-all duration-300 bg-white appearance-none"
            style={{ backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M6 9l6 6 6-6\"/></svg>')", backgroundRepeat: "no-repeat", backgroundPosition: "right 1rem center", backgroundSize: "1.5em 1.5em" }}
          >
            <option value="">Select source</option>
            <option value="Social Media">Social Media</option>
            <option value="University">University/College</option>
            <option value="Friend/Referral">Friend/Referral</option>
            <option value="Career Fair">Career Fair</option>
            <option value="Online Search">Online Search</option>
            <option value="Campus Ambassador">Campus Ambassador</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glow-effect"
      >        <label className="block text-sm font-bold text-gray-700 mb-3">
          Additional Information
        </label>
        <div className="relative focus-ring rounded-xl">
          <textarea
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all duration-300 bg-white resize-none"
            placeholder="Anything else you'd like us to know about you? (Optional)"
          />
        </div>
      </motion.div>
    </div>
  );  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-200 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
      </div>

      {/* Form Header */}
      <div className="text-center mb-10 relative">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Career Application Form
          </h2>
          <p className="text-lg text-gray-600">
            Your journey with Internexis starts here!
          </p>
        </motion.div>
      </div>

      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          {Array.from({ length: totalSteps }, (_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.1 }}              className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold transition-all duration-300 ${
                i + 1 <= currentStep
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              {i + 1 <= currentStep && i + 1 < currentStep ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                i + 1
              )}
            </motion.div>
          ))}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
            transition={{ duration: 0.5 }}
            className="h-full rounded-full bg-blue-600"
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span className={currentStep === 1 ? 'font-bold text-purple-600' : ''}>Basic Info</span>
          <span className={currentStep === 2 ? 'font-bold text-purple-600' : ''}>Role & Skills</span>
          <span className={currentStep === 3 ? 'font-bold text-purple-600' : ''}>Background</span>
          <span className={currentStep === 4 ? 'font-bold text-purple-600' : ''}>Motivation</span>
        </div>
      </div>      {/* Message Display */}
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-8 p-6 rounded-2xl flex items-start gap-4 relative overflow-hidden ${
            message.type === 'success'
              ? 'border-2 border-green-200'
              : 'border-2 border-red-200'
          }`}
        >          <div className={`absolute inset-0 ${
            message.type === 'success'
              ? 'bg-green-50'
              : 'bg-red-50'
          } opacity-90`}></div>
          
          <div className={`relative z-10 p-2 rounded-full ${
            message.type === 'success'
              ? 'bg-green-100 text-green-600'
              : 'bg-red-100 text-red-600'
          }`}>
            {message.type === 'success' ? (
              <CheckCircle className="h-6 w-6 flex-shrink-0" />
            ) : (
              <AlertCircle className="h-6 w-6 flex-shrink-0" />
            )}
          </div>
          
          <p className="font-medium leading-relaxed relative z-10 text-gray-800">{message.text}</p>
        </motion.div>
      )}      {/* Form Content */}
      <form onSubmit={handleSubmit} className="relative z-10">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4 }}
        >
          {renderStepContent()}
        </motion.div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200/50">
          <motion.button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 1}
            whileHover={currentStep !== 1 ? { scale: 1.05 } : {}}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              currentStep === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50 hover:text-purple-600 hover:shadow-md'
            }`}
          >
            Previous
          </motion.button>

          <div className="text-sm font-medium text-gray-500 bg-white/80 backdrop-blur px-4 py-2 rounded-full shadow-sm">
            Step {currentStep} of {totalSteps}
          </div>

          {currentStep < totalSteps ? (
            <motion.button
              type="button"
              onClick={nextStep}
              whileHover={{ scale: 1.05 }}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl shadow-md hover:shadow-lg"
            >
              Next
            </motion.button>
          ) : (
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={!isSubmitting ? { scale: 1.05 } : {}}
              className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed group relative overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-90 transition-opacity duration-500 bg-blue-500/20"></span>
              
              {isSubmitting ? (
                <span className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                  Submitting...
                </span>
              ) : (
                <span className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Submit Application
                </span>
              )}
            </motion.button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CareerApplicationForm;
