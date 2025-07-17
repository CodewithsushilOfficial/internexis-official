import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { 
  Mail, 
  Phone, 
  Code, 
  ExternalLink, 
  Upload, 
  User, 
  MapPin, 
  Clock, 
  Award, 
  MessageCircle,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Send
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface FormData {
  fullName: string;
  email: string;
  whatsapp: string;
  location: string;
  domain: string;
  techStack: string;
  experience: string;
  currentRole: string;
  company: string;
  linkedin: string;
  github: string;
  bio: string;
  availability: string;
  languages: string[];
  motivation: string;
  resume: File | null;
}

const ApplyMentorPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    whatsapp: '',
    location: '',
    domain: '',
    techStack: '',
    experience: '',
    currentRole: '',
    company: '',
    linkedin: '',
    github: '',
    bio: '',
    availability: '',
    languages: [],
    motivation: '',
    resume: null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
    });

    document.title = 'Apply as Mentor - Internexis Technologies';
  }, []);

  const domains = [
    'Web Development',
    'App Development',
    'AI/ML',
    'Data Science',
    'UI/UX Design',
    'Cybersecurity',
    'DevOps',
    'Blockchain',
    'Cloud Computing',
    'Digital Marketing'
  ];

  const experienceLevels = [
    '1-2 years',
    '2-3 years',
    '3-5 years',
    '5-8 years',
    '8+ years'
  ];

  const availabilityOptions = [
    'Weekends only',
    'Weekday evenings',
    'Flexible hours',
    'Specific time slots'
  ];

  const languageOptions = [
    'Hindi',
    'English',
    'Telugu',
    'Tamil',
    'Kannada',
    'Malayalam',
    'Gujarati',
    'Marathi',
    'Bengali',
    'Punjabi'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLanguageChange = (language: string) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter(l => l !== language)
        : [...prev.languages, language]
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        resume: file
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically send the data to your backend
      console.log('Form submitted:', formData);
      
      setSubmitStatus('success');
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg rounded-3xl p-12 border border-white/30 dark:border-gray-700/30 shadow-2xl text-center max-w-2xl mx-auto"
        >
          <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">
            🎉 Application Submitted Successfully!
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Thank you for your interest in becoming a mentor! Our team will review your application and get back to you within 3-5 business days.
          </p>
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">What's Next?</h3>
            <ul className="text-left space-y-2 text-gray-600 dark:text-gray-300">
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Application review (1-2 days)
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Quick interview call (if selected)
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Profile creation and platform onboarding
              </li>
            </ul>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/mentorship"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105"
            >
              Back to Mentorship
            </Link>
            <Link
              to="/mentorship/mentors"
              className="bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 px-8 py-3 rounded-full font-medium border-2 border-purple-600 dark:border-purple-400 hover:bg-purple-50 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
            >
              View Our Mentors
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 pt-20">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative z-10 px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Link 
            to="/mentorship"
            className="inline-flex items-center text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 mb-8 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Mentorship Home
          </Link>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              🙋 Become a Mentor at Internexis
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Are you passionate about mentoring? Want to give back to the tech community? 
              Join our network of mentors and guide the next generation of developers, designers, and innovators.
            </p>
          </motion.div>

          {/* Benefits Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-3xl p-8 border border-white/30 dark:border-gray-700/30 shadow-xl mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
              🧑‍🏫 Benefits for Mentors
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: Award, title: 'Official Recognition by Internexis', desc: 'Get featured on our website and social media' },
                { icon: CheckCircle, title: 'Certificate of Contribution', desc: 'Receive official certification for your mentoring efforts' },
                { icon: User, title: 'Personal Branding', desc: 'Build your professional profile and network' },
                { icon: MessageCircle, title: 'Host Workshops/Webinars', desc: 'Opportunity to conduct sessions for larger audiences' },
              ].map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white mb-1">{benefit.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Application Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg rounded-3xl p-8 border border-white/30 dark:border-gray-700/30 shadow-2xl"
          >
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
              📝 Mentor Application Form
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <User className="h-4 w-4 inline mr-2" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/20 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Mail className="h-4 w-4 inline mr-2" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/20 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Phone className="h-4 w-4 inline mr-2" />
                    WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/20 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="+91 9876543210"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <MapPin className="h-4 w-4 inline mr-2" />
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/20 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="City, Country"
                  />
                </div>
              </div>

              {/* Professional Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Code className="h-4 w-4 inline mr-2" />
                    Domain/Technology *
                  </label>
                  <select
                    name="domain"
                    value={formData.domain}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/20 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 dark:text-white"
                  >
                    <option value="">Select your domain</option>
                    {domains.map(domain => (
                      <option key={domain} value={domain} className="bg-white dark:bg-gray-800">
                        {domain}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Award className="h-4 w-4 inline mr-2" />
                    Experience Level *
                  </label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/20 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 dark:text-white"
                  >
                    <option value="">Select experience level</option>
                    {experienceLevels.map(level => (
                      <option key={level} value={level} className="bg-white dark:bg-gray-800">
                        {level}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Code className="h-4 w-4 inline mr-2" />
                  Technical Skills/Stack *
                </label>
                <textarea
                  name="techStack"
                  value={formData.techStack}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-4 py-3 bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/20 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="e.g., React, Node.js, Python, MongoDB, AWS, etc."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Current Role *
                  </label>
                  <input
                    type="text"
                    name="currentRole"
                    value={formData.currentRole}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/20 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="e.g., Software Engineer, Data Scientist"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Current Company *
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/20 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="Company name"
                  />
                </div>
              </div>

              {/* Social Profiles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <ExternalLink className="h-4 w-4 inline mr-2" />
                    LinkedIn Profile *
                  </label>
                  <input
                    type="url"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/20 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <ExternalLink className="h-4 w-4 inline mr-2" />
                    GitHub Profile (Optional)
                  </label>
                  <input
                    type="url"
                    name="github"
                    value={formData.github}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/20 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="https://github.com/yourusername"
                  />
                </div>
              </div>

              {/* Availability */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Clock className="h-4 w-4 inline mr-2" />
                  Availability *
                </label>
                <select
                  name="availability"
                  value={formData.availability}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/20 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 dark:text-white"
                >
                  <option value="">Select your availability</option>
                  {availabilityOptions.map(option => (
                    <option key={option} value={option} className="bg-white dark:bg-gray-800">
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* Languages */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Languages (Select all that apply) *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {languageOptions.map(language => (
                    <label key={language} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.languages.includes(language)}
                        onChange={() => handleLanguageChange(language)}
                        className="w-4 h-4 text-purple-600 bg-white/10 border-white/20 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-800/10 dark:border-gray-700/20"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{language}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Short Bio / Introduction *
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/20 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Tell us about yourself, your expertise, and why you want to be a mentor..."
                />
              </div>

              {/* Motivation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Why do you want to be a mentor? *
                </label>
                <textarea
                  name="motivation"
                  value={formData.motivation}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-4 py-3 bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/20 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Share your motivation for mentoring students..."
                />
              </div>

              {/* Resume Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Upload className="h-4 w-4 inline mr-2" />
                  Upload Resume (Optional)
                </label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="w-full px-4 py-3 bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/20 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                />
                {formData.resume && (
                  <p className="mt-2 text-sm text-green-600 dark:text-green-400">
                    ✓ {formData.resume.name} selected
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 px-6 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Submitting Application...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <Send className="h-5 w-5 mr-2" />
                      Submit Application
                    </span>
                  )}
                </button>
              </div>
            </form>

            {/* Note */}
            <div className="mt-6 p-4 bg-blue-500/20 rounded-xl border border-blue-500/30">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-blue-800 dark:text-blue-200">Application Review Process</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                    Applications are reviewed manually by our team. Selected mentors receive official recognition 
                    on our platform and can start mentoring students immediately after approval.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ApplyMentorPage;
