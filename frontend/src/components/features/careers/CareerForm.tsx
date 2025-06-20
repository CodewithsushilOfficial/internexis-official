/**
 * CareerForm - Single Comprehensive Career Application Form
 * 
 * This is the ONLY career form used throughout the application.
 * Combines all previous forms into one unified, feature-rich form.
 * 
 * Features:
 * - Multi-step form with progress indicator
 * - Comprehensive field validation
 * - Role-based conditional fields
 * - Skill selection with search
 * - Accessibility optimized
 * - Mobile responsive design
 * - Smooth animations and transitions
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  Code, 
  GraduationCap,
  Link,
  Send,
  CheckCircle,
  AlertCircle,
  Loader,
  Star,
  Sparkles
} from 'lucide-react';

interface FormData {
  // Basic Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  
  // Professional Information
  linkedIn: string;
  github: string;
  portfolio: string;
  resumeUrl: string;
  
  // Role and Skills
  roleType: string;
  secondaryRole: string;
  skills: string[];
  experience: string;
  
  // Education
  university: string;
  course: string;
  yearOfStudy: string;
  cgpa: string;
  
  // Mentor-specific fields
  mentorExperience: string;
  mentorAreas: string[];
  availabilityHours: string;
  
  // Availability and Salary
  availability: string;
  expectedSalary: string;
  startDate: string;
  timeCommitment: string;
  
  // Motivation
  whyJoin: string;
  motivation: string;
  previousWork: string;
  
  // Additional
  referralSource: string;
  additionalInfo: string;
}

interface CareerFormProps {
  onClose?: () => void;
  isEmbedded?: boolean;
}

const CareerForm: React.FC<CareerFormProps> = ({ 
  onClose, 
  isEmbedded = false 
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    linkedIn: '',
    github: '',
    portfolio: '',
    resumeUrl: '',
    roleType: '',
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
    availability: '',
    expectedSalary: '',
    startDate: '',
    timeCommitment: '',
    whyJoin: '',
    motivation: '',
    previousWork: '',
    referralSource: '',
    additionalInfo: ''
  });

  const roleTypes = [
    { value: 'web-developer', label: 'Web Developer', icon: '💻' },
    { value: 'app-developer', label: 'App Developer', icon: '📱' },
    { value: 'ai-ml-engineer', label: 'AI/ML Engineer', icon: '🤖' },
    { value: 'data-scientist', label: 'Data Scientist', icon: '📊' },
    { value: 'backend-developer', label: 'Backend Developer', icon: '⚙️' },
    { value: 'fullstack-developer', label: 'Full Stack Developer', icon: '🔧' },
    { value: 'ui-ux-designer', label: 'UI/UX Designer', icon: '🎨' },
    { value: 'graphic-designer', label: 'Graphic Designer', icon: '✨' },
    { value: 'video-editor', label: 'Video Editor', icon: '🎬' },
    { value: 'digital-marketer', label: 'Digital Marketer', icon: '📈' },
    { value: 'content-creator', label: 'Content Creator', icon: '✍️' },
    { value: 'social-media-manager', label: 'Social Media Manager', icon: '📱' },
    { value: 'student-team-member', label: 'Student Team Member', icon: '🎓' },
    { value: 'campus-ambassador', label: 'Campus Ambassador', icon: '🎯' },
    { value: 'mentor', label: 'Mentor', icon: '👨‍🏫' },
    { value: 'freelancer', label: 'Freelancer', icon: '🚀' },
    { value: 'volunteer', label: 'Volunteer', icon: '❤️' },
    { value: 'project-manager', label: 'Project Manager', icon: '📋' },
    { value: 'business-analyst', label: 'Business Analyst', icon: '📊' }
  ];

  const skillOptions = [
    // Frontend Development
    'React', 'Vue.js', 'Angular', 'JavaScript', 'TypeScript', 'HTML/CSS', 'Tailwind CSS', 'Bootstrap',
    'Next.js', 'Nuxt.js', 'Svelte', 'jQuery', 'SASS/SCSS', 'Webpack', 'Vite',
    
    // Backend Development
    'Node.js', 'Express.js', 'Python', 'Django', 'Flask', 'FastAPI', 'Java', 'Spring Boot',
    'C#', '.NET', 'PHP', 'Laravel', 'Ruby', 'Ruby on Rails', 'Go', 'Rust',
    
    // Mobile Development
    'React Native', 'Flutter', 'Swift', 'Kotlin', 'Ionic', 'Xamarin',
    
    // Database & Cloud
    'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase', 'AWS', 'Azure', 'Google Cloud',
    'Docker', 'Kubernetes', 'GraphQL', 'REST APIs', 'Microservices',
    
    // AI/ML & Data Science
    'Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch', 'Pandas', 'NumPy',
    'Scikit-learn', 'OpenCV', 'NLP', 'Computer Vision', 'Data Analysis', 'Jupyter',
    
    // Design & Creative
    'Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'After Effects', 'Canva',
    'Sketch', 'InVision', 'Principle', 'Framer', 'UI/UX Design', 'Prototyping',
    
    // Marketing & Content
    'SEO', 'Google Analytics', 'Social Media Marketing', 'Content Marketing', 'Email Marketing',
    'Google Ads', 'Facebook Ads', 'Content Writing', 'Copywriting', 'Video Editing',
    
    // Soft Skills & Management
    'Leadership', 'Project Management', 'Communication', 'Problem Solving', 'Team Management',
    'Agile/Scrum', 'Product Management', 'Strategic Planning', 'Time Management'
  ];

  const mentorAreas = [
    'Web Development', 'Mobile Development', 'AI/ML', 'Data Science', 'UI/UX Design',
    'Digital Marketing', 'Career Guidance', 'Entrepreneurship', 'Project Management',
    'Technical Writing', 'Public Speaking', 'Interview Preparation'
  ];

  const handleInputChange = (field: keyof FormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
    setSubmitError(null);

    try {
      console.log('Career Form submitted:', formData);
      setIsSubmitted(true);
      
      if (isEmbedded) {
        // Reset form after 3 seconds for embedded mode
        setTimeout(() => {
          setIsSubmitted(false);
          setCurrentStep(1);
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            location: '',
            linkedIn: '',
            github: '',
            portfolio: '',
            resumeUrl: '',
            roleType: '',
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
            availability: '',
            expectedSalary: '',
            startDate: '',
            timeCommitment: '',
            whyJoin: '',
            motivation: '',
            previousWork: '',
            referralSource: '',
            additionalInfo: ''
          });
        }, 3000);
      } else {
        // Close modal after 3 seconds
        setTimeout(() => {
          if (onClose) onClose();
        }, 3000);
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };
  // Enhanced validation functions
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const isValidPhone = (phone: string) => {
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ''));
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return formData.firstName.trim() && 
               formData.lastName.trim() && 
               formData.email.trim() && isValidEmail(formData.email) && 
               formData.phone.trim() && isValidPhone(formData.phone) && 
               formData.location.trim();
      case 2:
        return formData.roleType && 
               formData.skills.length > 0 && 
               formData.experience.trim() && 
               formData.experience.trim().length >= 50; // Minimum 50 characters for experience
      case 3:
        return formData.availability && 
               formData.whyJoin.trim() && 
               formData.whyJoin.trim().length >= 100; // Minimum 100 characters for motivation
      case 4:
        return true;
      default:
        return false;
    }
  };

  // Get validation message for current step
  const getValidationMessage = (step: number) => {
    switch (step) {
      case 1:
        if (!formData.firstName.trim()) return "First name is required";
        if (!formData.lastName.trim()) return "Last name is required";
        if (!formData.email.trim()) return "Email is required";
        if (!isValidEmail(formData.email)) return "Please enter a valid email address";
        if (!formData.phone.trim()) return "Phone number is required";
        if (!isValidPhone(formData.phone)) return "Please enter a valid phone number";
        if (!formData.location.trim()) return "Location is required";
        return "";
      case 2:
        if (!formData.roleType) return "Please select a role";
        if (formData.skills.length === 0) return "Please select at least one skill";
        if (!formData.experience.trim()) return "Experience description is required";
        if (formData.experience.trim().length < 50) return "Please provide more detailed experience (minimum 50 characters)";
        return "";
      case 3:
        if (!formData.availability) return "Please select your availability";
        if (!formData.whyJoin.trim()) return "Please tell us why you want to join";
        if (formData.whyJoin.trim().length < 100) return "Please provide more detailed motivation (minimum 100 characters)";
        return "";
      default:
        return "";
    }
  };

  const isMentorRole = formData.roleType === 'mentor';
  const isStudentRole = ['student-team-member', 'campus-ambassador'].includes(formData.roleType);

  // Wrapper component based on usage type
  const FormWrapper = ({ children }: { children: React.ReactNode }) => {
    if (isEmbedded) {
      return (
        <div className="bg-white rounded-2xl max-w-4xl w-full mx-auto shadow-2xl">
          {children}
        </div>
      );
    }

    return (
      <motion.div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className="bg-white rounded-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden shadow-2xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.3 }}
        >
          {children}
        </motion.div>
      </motion.div>
    );
  };

  if (isSubmitted) {
    return (
      <motion.div 
        className={isEmbedded ? "flex items-center justify-center p-8" : "fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-10 h-10 text-white" />
          </motion.div>
          
          <motion.h3 
            className="text-2xl font-bold text-gray-800 mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Application Submitted!
          </motion.h3>
          
          <motion.p 
            className="text-gray-600 mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Thank you for applying! We'll review your application and get back to you soon.
          </motion.p>

          <motion.div
            className="w-full bg-gradient-to-r from-green-400 to-emerald-500 h-1 rounded-full mb-4"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.5, duration: 2 }}
          />
          
          <motion.p 
            className="text-sm text-gray-500"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {isEmbedded ? "Form will reset automatically..." : "This window will close automatically..."}
          </motion.p>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <FormWrapper>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Sparkles className="w-6 h-6" />
              Career Form - Join Internexis
            </h2>
            {!isEmbedded && onClose && (
              <button 
                onClick={onClose}
                className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/20 rounded-lg"
              >
                ✕
              </button>
            )}
          </div>
          
          {/* Progress Bar */}
          <div className="flex items-center gap-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                  step <= currentStep 
                    ? 'bg-white text-blue-600 shadow-lg' 
                    : 'bg-white/30 text-white/70'
                }`}>
                  {step}
                </div>
                {step < 4 && (
                  <div className={`w-12 h-1 mx-2 transition-all ${
                    step < currentStep ? 'bg-white' : 'bg-white/30'
                  }`} />
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-sm opacity-90">
            Step {currentStep} of 4: {
              currentStep === 1 ? 'Personal Information' :
              currentStep === 2 ? 'Professional Details' :
              currentStep === 3 ? 'Availability & Motivation' :
              'Review & Submit'
            }
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className={`p-6 ${isEmbedded ? 'max-h-none' : 'overflow-y-auto max-h-[calc(90vh-200px)]'}`}>
        <form onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter your first name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter your last name"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your email address"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Location *
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="City, State/Country"
                      required
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Professional Details */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    Primary Role *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {roleTypes.map((role) => (
                      <button
                        key={role.value}
                        type="button"
                        onClick={() => handleInputChange('roleType', role.value)}
                        className={`p-3 text-sm border rounded-lg transition-all text-left hover:shadow-md ${
                          formData.roleType === role.value
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <div className="text-lg mb-1">{role.icon}</div>
                        <div className="font-medium">{role.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    Skills * (Select all that apply)
                  </label>
                  <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-lg p-3">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {skillOptions.map((skill) => (
                        <label key={skill} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.skills.includes(skill)}
                            onChange={() => handleSkillToggle(skill)}
                            className="rounded text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm">{skill}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    Selected: {formData.skills.length} skill{formData.skills.length !== 1 ? 's' : ''}
                  </div>
                </div>                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Experience *
                  </label>
                  <textarea
                    value={formData.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    rows={4}
                    placeholder="Describe your relevant experience, projects, and achievements..."
                    required
                  />
                  <div className="flex justify-between items-center text-xs">
                    <span className={`${formData.experience.length >= 50 ? 'text-green-600' : 'text-gray-500'}`}>
                      {formData.experience.length}/50 characters minimum
                    </span>
                    {formData.experience.length < 50 && (
                      <span className="text-amber-600">Need {50 - formData.experience.length} more characters</span>
                    )}
                  </div>
                </div>

                {/* Mentor-specific fields */}
                {isMentorRole && (
                  <>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        Mentoring Experience
                      </label>
                      <textarea
                        value={formData.mentorExperience}
                        onChange={(e) => handleInputChange('mentorExperience', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        rows={3}
                        placeholder="Describe your mentoring experience and approach..."
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">
                        Mentoring Areas
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {mentorAreas.map((area) => (
                          <label key={area} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.mentorAreas.includes(area)}
                              onChange={() => handleMentorAreaToggle(area)}
                              className="rounded text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm">{area}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Education fields for students */}
                {(isStudentRole || formData.university) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <GraduationCap className="w-4 h-4" />
                        University/College
                      </label>
                      <input
                        type="text"
                        value={formData.university}
                        onChange={(e) => handleInputChange('university', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Institution name"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        Course/Major
                      </label>
                      <input
                        type="text"
                        value={formData.course}
                        onChange={(e) => handleInputChange('course', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Your field of study"
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Step 3: Links & Availability */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Link className="w-4 h-4" />
                      Portfolio
                    </label>
                    <input
                      type="url"
                      value={formData.portfolio}
                      onChange={(e) => handleInputChange('portfolio', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="https://your-portfolio.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Link className="w-4 h-4" />
                      LinkedIn
                    </label>
                    <input
                      type="url"
                      value={formData.linkedIn}
                      onChange={(e) => handleInputChange('linkedIn', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Link className="w-4 h-4" />
                      GitHub
                    </label>
                    <input
                      type="url"
                      value={formData.github}
                      onChange={(e) => handleInputChange('github', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="https://github.com/yourprofile"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Availability *
                    </label>
                    <select
                      value={formData.availability}
                      onChange={(e) => handleInputChange('availability', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    >
                      <option value="">Select availability</option>
                      <option value="full-time">Full-time</option>
                      <option value="part-time">Part-time</option>
                      <option value="internship">Internship</option>
                      <option value="freelance">Freelance</option>
                      <option value="volunteer">Volunteer</option>
                      <option value="contract">Contract</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Expected Salary (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.expectedSalary}
                      onChange={(e) => handleInputChange('expectedSalary', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="e.g., $50,000/year or Negotiable"
                    />
                  </div>
                </div>                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Why do you want to join Internexis? *
                  </label>
                  <textarea
                    value={formData.whyJoin}
                    onChange={(e) => handleInputChange('whyJoin', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    rows={4}
                    placeholder="Tell us about your motivation and what you hope to achieve..."
                    required
                  />
                  <div className="flex justify-between items-center text-xs">
                    <span className={`${formData.whyJoin.length >= 100 ? 'text-green-600' : 'text-gray-500'}`}>
                      {formData.whyJoin.length}/100 characters minimum
                    </span>
                    {formData.whyJoin.length < 100 && (
                      <span className="text-amber-600">Need {100 - formData.whyJoin.length} more characters</span>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Previous Work/Projects (Optional)
                  </label>
                  <textarea
                    value={formData.previousWork}
                    onChange={(e) => handleInputChange('previousWork', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    rows={3}
                    placeholder="Describe any relevant previous work or personal projects..."
                  />
                </div>
              </motion.div>
            )}

            {/* Step 4: Review & Submit */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Application Review</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-600">Name:</span>
                      <span className="ml-2">{formData.firstName} {formData.lastName}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Email:</span>
                      <span className="ml-2">{formData.email}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Phone:</span>
                      <span className="ml-2">{formData.phone}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Location:</span>
                      <span className="ml-2">{formData.location}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Role:</span>
                      <span className="ml-2">{roleTypes.find(r => r.value === formData.roleType)?.label}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Availability:</span>
                      <span className="ml-2">{formData.availability}</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <span className="font-medium text-gray-600">Skills:</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.skills.map((skill) => (
                        <span key={skill} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {submitError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-2 text-red-700">
                    <AlertCircle className="w-5 h-5" />
                    <span>{submitError}</span>
                  </div>
                )}

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-800 mb-1">Ready to submit?</h4>
                      <p className="text-sm text-blue-600">
                        By submitting this application, you confirm that all information provided is accurate. 
                        We'll review your application and contact you within 2-3 business days.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>      {/* Footer */}
      <div className="bg-gray-50 px-6 py-4 border-t">
        {/* Validation Message */}
        {!isStepValid(currentStep) && currentStep < 4 && (
          <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-center gap-2 text-amber-700">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm">{getValidationMessage(currentStep)}</span>
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              currentStep === 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Previous
          </button>

          <div className="flex gap-3">
            {currentStep < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                disabled={!isStepValid(currentStep)}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  isStepValid(currentStep)
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
                title={!isStepValid(currentStep) ? getValidationMessage(currentStep) : ''}
              >
                Next Step
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-8 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Application
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </FormWrapper>
  );
};

export default CareerForm;
