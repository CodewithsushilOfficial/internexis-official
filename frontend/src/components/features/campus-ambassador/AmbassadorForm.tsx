import React, { useState, useEffect } from "react";
import { campusAmbassadorService, CampusAmbassadorFormData } from "../../../lib/services";

const AmbassadorForm: React.FC = () => {
  // Add CSS animations to the document head
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
      }
      
      @keyframes float-delayed {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-15px); }
      }
      
      @keyframes blob {
        0%, 100% { transform: translate(0px, 0px) scale(1); }
        33% { transform: translate(30px, -50px) scale(1.1); }
        66% { transform: translate(-20px, 20px) scale(0.9); }
      }
      
      .animate-float {
        animation: float 6s ease-in-out infinite;
      }
      
      .animate-float-delayed {
        animation: float-delayed 8s ease-in-out infinite;
        animation-delay: 2s;
      }
      
      .animate-blob {
        animation: blob 7s infinite;
      }
      
      .animation-delay-2000 {
        animation-delay: 2s;
      }
    `;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

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

  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  
  const [missingFields, setMissingFields] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    
    // Handle skills as an array
    if (name === 'skills') {
      const skillsArray = value.split(',').map(skill => skill.trim()).filter(skill => skill);
      setFormData((prev) => ({
        ...prev,
        [name]: skillsArray,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setIsSubmitting(true);
    
    // Validate required fields
    const requiredFields: (keyof CampusAmbassadorFormData)[] = [
      'firstName', 'lastName', 'email', 'phone', 'university', 
      'course', 'yearOfStudy', 'cgpa', 'linkedinUrl', 'skills',
      'experience', 'motivation', 'whyInternexis', 'availabilityHours',
      'startDate', 'referralSource'
    ];
    
    const missing = requiredFields.filter(field => {
      const value = formData[field];
      const isEmpty = !value || (typeof value === 'string' && !value.trim()) || 
                     (Array.isArray(value) && value.length === 0);
      return isEmpty;
    });
    
    setMissingFields(missing);
    
    if (missing.length > 0) {
      setMessage({
        type: "error",
        text: `Please fill in all required fields: ${missing.join(', ')}`
      });
      setIsSubmitting(false);
      
      // Scroll to the form section
      document.getElementById('ambassador-form')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    
    try {
      const result = await campusAmbassadorService.submitApplication(formData);
      
      if (result.success) {
        setMissingFields([]);
        setMessage({
          type: "success",
          text: `Application submitted successfully! Welcome to the Internexis Ambassador Program!`,
        });

        // Reset form on success
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
          additionalInfo: "",
        });
      } else {
        setMessage({
          type: "error",
          text: "Failed to submit application. Please try again."
        });
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      setMessage({
        type: "error",
        text: "Failed to submit application. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="ambassador-form" className="py-20 relative overflow-hidden min-h-screen">
      {/* Hero Background with University Campus Image */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/90 via-purple-900/85 to-pink-900/90 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=1920&q=80" 
          alt="University Campus" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Floating 3D Elements */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-400/20 rounded-full blur-xl animate-float" />
        <div className="absolute top-40 right-32 w-24 h-24 bg-purple-400/20 rounded-full blur-lg animate-float-delayed" />
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-pink-400/15 rounded-full blur-2xl animate-blob" />
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-cyan-400/20 rounded-full blur-lg animate-float animation-delay-2000" />
      </div>
      
      <div className="relative z-30 max-w-4xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mb-6 shadow-2xl animate-float">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-4">
            Ambassador Application
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Join our exclusive Campus Ambassador Program and become the face of Internexis at your university
          </p>
        </div>

        {/* Message Display */}
        {message && (
          <div className={`mb-8 p-6 rounded-xl shadow-lg ${
            message.type === "success" 
              ? "bg-green-500/20 border border-green-400/30 text-green-100" 
              : "bg-red-500/20 border border-red-400/30 text-red-100"
          }`}>
            <div className="flex items-center">
              {message.type === "success" ? (
                <svg className="w-6 h-6 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="w-6 h-6 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              <p className="font-medium">{message.text}</p>
            </div>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8">
            {/* Personal Information Section */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm">1</span>
                </div>
                Personal Information
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-white/90 font-medium">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl bg-white/10 border backdrop-blur-sm text-white placeholder-white/60 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                      missingFields.includes('firstName') ? 'border-red-400 focus:ring-red-400' : 'border-white/30'
                    }`}
                    placeholder="Enter your first name"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-white/90 font-medium">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl bg-white/10 border backdrop-blur-sm text-white placeholder-white/60 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                      missingFields.includes('lastName') ? 'border-red-400 focus:ring-red-400' : 'border-white/30'
                    }`}
                    placeholder="Enter your last name"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-white/90 font-medium">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl bg-white/10 border backdrop-blur-sm text-white placeholder-white/60 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                      missingFields.includes('email') ? 'border-red-400 focus:ring-red-400' : 'border-white/30'
                    }`}
                    placeholder="your.email@university.edu"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-white/90 font-medium">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl bg-white/10 border backdrop-blur-sm text-white placeholder-white/60 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                      missingFields.includes('phone') ? 'border-red-400 focus:ring-red-400' : 'border-white/30'
                    }`}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
            </div>

            {/* Academic Information Section */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                Academic Information
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                  <label className="block text-white/90 font-medium">University/College *</label>
                  <input
                    type="text"
                    name="university"
                    value={formData.university}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl bg-white/10 border backdrop-blur-sm text-white placeholder-white/60 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                      missingFields.includes('university') ? 'border-red-400 focus:ring-red-400' : 'border-white/30'
                    }`}
                    placeholder="Enter your university or college name"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-white/90 font-medium">Course/Major *</label>
                  <input
                    type="text"
                    name="course"
                    value={formData.course}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl bg-white/10 border backdrop-blur-sm text-white placeholder-white/60 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                      missingFields.includes('course') ? 'border-red-400 focus:ring-red-400' : 'border-white/30'
                    }`}
                    placeholder="e.g., Computer Science, Business"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-white/90 font-medium">Year of Study *</label>
                  <select
                    name="yearOfStudy"
                    value={formData.yearOfStudy}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl bg-white/10 border backdrop-blur-sm text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                      missingFields.includes('yearOfStudy') ? 'border-red-400 focus:ring-red-400' : 'border-white/30'
                    }`}
                  >
                    <option value="" className="bg-gray-800">Select Year</option>
                    <option value="1st Year" className="bg-gray-800">1st Year</option>
                    <option value="2nd Year" className="bg-gray-800">2nd Year</option>
                    <option value="3rd Year" className="bg-gray-800">3rd Year</option>
                    <option value="4th Year" className="bg-gray-800">4th Year</option>
                    <option value="Graduate" className="bg-gray-800">Graduate</option>
                    <option value="Post Graduate" className="bg-gray-800">Post Graduate</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-white/90 font-medium">CGPA/GPA *</label>
                  <input
                    type="text"
                    name="cgpa"
                    value={formData.cgpa}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl bg-white/10 border backdrop-blur-sm text-white placeholder-white/60 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                      missingFields.includes('cgpa') ? 'border-red-400 focus:ring-red-400' : 'border-white/30'
                    }`}
                    placeholder="e.g., 3.7/4.0 or 8.5/10.0"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-white/90 font-medium">LinkedIn Profile *</label>
                  <input
                    type="url"
                    name="linkedinUrl"
                    value={formData.linkedinUrl}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl bg-white/10 border backdrop-blur-sm text-white placeholder-white/60 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                      missingFields.includes('linkedinUrl') ? 'border-red-400 focus:ring-red-400' : 'border-white/30'
                    }`}
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>
              </div>
            </div>

            {/* Skills & Experience Section */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-teal-600 flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
                Skills & Experience
              </h3>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-white/90 font-medium">Skills *</label>
                  <input
                    type="text"
                    name="skills"
                    value={Array.isArray(formData.skills) ? formData.skills.join(', ') : ''}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl bg-white/10 border backdrop-blur-sm text-white placeholder-white/60 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                      missingFields.includes('skills') ? 'border-red-400 focus:ring-red-400' : 'border-white/30'
                    }`}
                    placeholder="e.g., Social Media Marketing, Event Management, Communication (comma-separated)"
                  />
                  <p className="text-white/60 text-sm">Separate skills with commas</p>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-white/90 font-medium">Portfolio/Website URL</label>
                  <input
                    type="url"
                    name="portfolioUrl"
                    value={formData.portfolioUrl}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 backdrop-blur-sm text-white placeholder-white/60 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="https://yourportfolio.com (optional)"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-white/90 font-medium">Relevant Experience *</label>
                  <textarea
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full px-4 py-3 rounded-xl bg-white/10 border backdrop-blur-sm text-white placeholder-white/60 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none ${
                      missingFields.includes('experience') ? 'border-red-400 focus:ring-red-400' : 'border-white/30'
                    }`}
                    placeholder="Describe your relevant experience in leadership, marketing, events, or similar roles..."
                  />
                </div>
              </div>
            </div>

            {/* Motivation Section */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm">4</span>
                </div>
                Motivation & Commitment
              </h3>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-white/90 font-medium">Why do you want to be a Campus Ambassador? *</label>
                  <textarea
                    name="motivation"
                    value={formData.motivation}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full px-4 py-3 rounded-xl bg-white/10 border backdrop-blur-sm text-white placeholder-white/60 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none ${
                      missingFields.includes('motivation') ? 'border-red-400 focus:ring-red-400' : 'border-white/30'
                    }`}
                    placeholder="Share your motivation and what drives you to represent Internexis..."
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-white/90 font-medium">Why Internexis? *</label>
                  <textarea
                    name="whyInternexis"
                    value={formData.whyInternexis}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full px-4 py-3 rounded-xl bg-white/10 border backdrop-blur-sm text-white placeholder-white/60 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none ${
                      missingFields.includes('whyInternexis') ? 'border-red-400 focus:ring-red-400' : 'border-white/30'
                    }`}
                    placeholder="What attracts you to Internexis and our mission?"
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-white/90 font-medium">Weekly Availability *</label>
                    <select
                      name="availabilityHours"
                      value={formData.availabilityHours}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-xl bg-white/10 border backdrop-blur-sm text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                        missingFields.includes('availabilityHours') ? 'border-red-400 focus:ring-red-400' : 'border-white/30'
                      }`}
                    >
                      <option value="" className="bg-gray-800">Select Hours</option>
                      <option value="5-10 hours" className="bg-gray-800">5-10 hours</option>
                      <option value="10-15 hours" className="bg-gray-800">10-15 hours</option>
                      <option value="15-20 hours" className="bg-gray-800">15-20 hours</option>
                      <option value="20+ hours" className="bg-gray-800">20+ hours</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-white/90 font-medium">Preferred Start Date *</label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-xl bg-white/10 border backdrop-blur-sm text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                        missingFields.includes('startDate') ? 'border-red-400 focus:ring-red-400' : 'border-white/30'
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information Section */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm">5</span>
                </div>
                Additional Information
              </h3>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-white/90 font-medium">How did you hear about us? *</label>
                  <select
                    name="referralSource"
                    value={formData.referralSource}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl bg-white/10 border backdrop-blur-sm text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                      missingFields.includes('referralSource') ? 'border-red-400 focus:ring-red-400' : 'border-white/30'
                    }`}
                  >
                    <option value="" className="bg-gray-800">Select Source</option>
                    <option value="Social Media" className="bg-gray-800">Social Media</option>
                    <option value="University Career Fair" className="bg-gray-800">University Career Fair</option>
                    <option value="Friend Referral" className="bg-gray-800">Friend Referral</option>
                    <option value="Online Search" className="bg-gray-800">Online Search</option>
                    <option value="Email Newsletter" className="bg-gray-800">Email Newsletter</option>
                    <option value="Other" className="bg-gray-800">Other</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-white/90 font-medium">Additional Information</label>
                  <textarea
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 backdrop-blur-sm text-white placeholder-white/60 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                    placeholder="Any additional information you'd like to share? (optional)"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center pt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-12 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-xl shadow-2xl transition-all duration-300 ${
                  isSubmitting 
                    ? 'opacity-70 cursor-not-allowed' 
                    : 'hover:from-blue-700 hover:to-purple-700 hover:shadow-3xl transform hover:scale-105'
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
    </div>
  );
};

export default AmbassadorForm;
