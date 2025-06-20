import React, { useState, useEffect } from "react";
import { campusAmbassadorService, CampusAmbassadorFormData } from "../../../lib/services";

const ApplicationForm: React.FC = () => {
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
  }, []);  const [formData, setFormData] = useState<CampusAmbassadorFormData>({
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
  
  const [missingFields, setMissingFields] = useState<string[]>([]);  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Debug log to check if service method exists
  console.log("Campus Ambassador Service:", campusAmbassadorService);
  console.log("Submit Application Method:", campusAmbassadorService.submitApplication);const handleInputChange = (
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
  };  const handleSubmit = async (e: React.FormEvent) => {
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
    
    // Debug - check what's missing
    console.log("Form data before validation:", formData);
    
    const missing = requiredFields.filter(field => {
      const value = formData[field];
      const isEmpty = !value || (typeof value === 'string' && !value.trim()) || 
                     (Array.isArray(value) && value.length === 0);
      console.log(`Field ${field}: ${isEmpty ? 'Empty' : 'Has value'}`, value);
      return isEmpty;
    });
    
    setMissingFields(missing);
    
    if (missing.length > 0) {
      console.log("Missing fields:", missing);
      setMessage({
        type: "error",
        text: `Please fill in all required fields: ${missing.join(', ')}`
      });
      setIsSubmitting(false);
      
      // Scroll to the form section
      document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    
    try {
      console.log("Submitting form data:", formData);
      
      // Directly call the service method
      const result = await campusAmbassadorService.submitApplication(formData);
      console.log("Form submission result:", result);
      
      if (result.success) {
        setMissingFields([]); // Clear missing fields on success
        setMessage({
          type: "success",
          text: `Application submitted successfully! ${result.data?.referralCode ? `Your referral code is: ${result.data.referralCode}. ` : ''}Welcome to the Internexis Ambassador Program!`,
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
        // Handle error from API
        setMessage({
          type: "error",
          text: result.error || "Failed to submit application. Please try again."
        });
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      let errorMessage = "Failed to submit application. Please try again.";
      
      if (error instanceof Error) {
        errorMessage = `${error.name}: ${error.message}`;
        console.error("Error stack:", error.stack);
      }
      
      setMessage({
        type: "error",
        text: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div id="application-form" className="py-20 relative overflow-hidden min-h-screen">
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
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
        {/* 3D Geometric Shapes */}
        <div className="absolute top-[10%] right-[5%] w-32 h-32 opacity-20">
          <img 
            src="https://cdn.iconscout.com/3d/premium/thumb/cube-5806537-4849847.png" 
            alt="3D Cube" 
            className="w-full h-full animate-float"
          />
        </div>
        <div className="absolute bottom-[15%] left-[8%] w-24 h-24 opacity-30">
          <img 
            src="https://cdn.iconscout.com/3d/premium/thumb/sphere-5806538-4849848.png" 
            alt="3D Sphere" 
            className="w-full h-full animate-float-delayed"
          />
        </div>
        <div className="absolute top-[30%] left-[15%] w-20 h-20 opacity-25">
          <img 
            src="https://cdn.iconscout.com/3d/premium/thumb/pyramid-5806540-4849850.png" 
            alt="3D Pyramid" 
            className="w-full h-full animate-pulse"
          />
        </div>
        
        {/* Animated Gradient Orbs */}
        <div className="absolute top-[20%] right-[10%] w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-[20%] left-[10%] w-80 h-80 bg-gradient-to-r from-pink-500/10 to-orange-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto px-6 relative z-30">
        {/* Hero Section with Student Images */}
        <div className="text-center mb-20">
          {/* Student Success Stories Images */}
          <div className="flex justify-center items-center mb-8 space-x-4">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1494790108755-2616c96053a0?w=100&h=100&fit=crop&crop=face" 
                alt="Successful Student 1" 
                className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
              />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" 
                alt="Successful Student 2" 
                className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
              />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" 
                alt="Successful Student 3" 
                className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
              />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
          </div>
          
          <div className="inline-flex items-center px-8 py-4 bg-white/20 backdrop-blur-lg rounded-full mb-8 border border-white/30 shadow-xl">
            <div className="w-8 h-8 mr-3">
              <img 
                src="https://cdn.iconscout.com/icon/premium/png-256-thumb/rocket-launch-2-1176486.png" 
                alt="Rocket Icon" 
                className="w-full h-full"
              />
            </div>
            <span className="text-xl font-bold text-white">
              Join 500+ Elite Campus Ambassadors
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight">
            <span className="block text-white drop-shadow-lg">Become a</span>
            <span className="block bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent drop-shadow-lg">
              Campus Leader
            </span>
          </h1>
          
          <p className="text-xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-8 drop-shadow-md">
            Transform your university experience. Lead initiatives, build networks, earn rewards, 
            and make a lasting impact on your campus community.
          </p>
          
          {/* Achievement Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-300 mb-2">500+</div>
              <div className="text-white/80 text-sm">Active Ambassadors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-300 mb-2">₹50K+</div>
              <div className="text-white/80 text-sm">Average Earnings</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-300 mb-2">200+</div>
              <div className="text-white/80 text-sm">Partner Universities</div>
            </div>
          </div>
        </div>        <div className="max-w-5xl mx-auto">          {/* Success/Error Message */}
          {message && (
            <div className={`mb-8 p-6 rounded-2xl border-2 backdrop-blur-lg shadow-2xl ${
              message.type === 'success' 
                ? 'bg-green-500/20 border-green-400/50 text-green-100' 
                : 'bg-red-500/20 border-red-400/50 text-red-100'
            }`}>
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full mr-4 flex items-center justify-center ${
                  message.type === 'success' ? 'bg-green-500' : 'bg-red-500'
                }`}>
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={
                      message.type === 'success' ? "M5 13l4 4L19 7" : "M6 18L18 6M6 6l12 12"
                    } />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-lg">{message.text}</p>
                  {message.type === 'error' && (
                    <p className="text-sm mt-1">
                      Please check your form inputs and try again. If the problem persists, contact support.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Form with Glass Morphism */}
          <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-2xl rounded-3xl p-10 md:p-16 shadow-2xl border border-white/20 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
              <img 
                src="https://cdn.iconscout.com/3d/premium/thumb/graduation-cap-5806535-4849845.png" 
                alt="Graduation Cap" 
                className="w-full h-full"
              />
            </div>
            
            {/* Personal Information Section */}
            <div className="mb-16">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl mr-4 flex items-center justify-center shadow-lg">
                  <img 
                    src="https://cdn.iconscout.com/icon/premium/png-256-thumb/user-profile-1-1164001.png" 
                    alt="Profile Icon" 
                    className="w-6 h-6 brightness-0 invert"
                  />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">Personal Information</h3>
                  <p className="text-white/70">Let's get to know you better</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">                <div className="group">
                  <label className="text-sm font-semibold text-white/90 mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-6 py-4 rounded-2xl border-2 border-white/20 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/30 transition-all duration-300 bg-white/10 backdrop-blur-sm text-white placeholder-white/50"
                    placeholder="Enter your first name"
                  />
                </div>                <div className="group">
                  <label className="text-sm font-semibold text-white/90 mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-6 py-4 rounded-2xl border-2 border-white/20 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/30 transition-all duration-300 bg-white/10 backdrop-blur-sm text-white placeholder-white/50"
                    placeholder="Enter your last name"
                  />
                </div>                <div className="group">
                  <label className="text-sm font-semibold text-white/90 mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-6 py-4 rounded-2xl border-2 border-white/20 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/30 transition-all duration-300 bg-white/10 backdrop-blur-sm text-white placeholder-white/50"
                    placeholder="your.email@university.edu"
                  />
                </div>                <div className="group">
                  <label className="text-sm font-semibold text-white/90 mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-6 py-4 rounded-2xl border-2 border-white/20 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/30 transition-all duration-300 bg-white/10 backdrop-blur-sm text-white placeholder-white/50"
                    placeholder="+91 9876543210"
                  />
                </div>
              </div>
            </div>            {/* Academic Information Section */}
            <div className="mb-16">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl mr-4 flex items-center justify-center shadow-lg">
                  <img 
                    src="https://cdn.iconscout.com/icon/premium/png-256-thumb/university-1-1164017.png" 
                    alt="University Icon" 
                    className="w-6 h-6 brightness-0 invert"
                  />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">Academic Information</h3>
                  <p className="text-white/70">Tell us about your educational background</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group md:col-span-2">
                  <label className="text-sm font-semibold text-white/90 mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    University/College Name *
                  </label>
                  <input
                    type="text"
                    name="university"
                    value={formData.university}
                    onChange={handleInputChange}
                    required
                    className="w-full px-6 py-4 rounded-2xl border-2 border-white/20 focus:border-blue-400 focus:ring-4 focus:ring-blue-400/30 transition-all duration-300 bg-white/10 backdrop-blur-sm text-white placeholder-white/50"
                    placeholder="Indian Institute of Technology, Delhi"
                  />
                </div>

                <div className="group">
                  <label className="text-sm font-semibold text-white/90 mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Course/Degree *
                  </label>
                  <input
                    type="text"
                    name="course"
                    value={formData.course}
                    onChange={handleInputChange}
                    required
                    className="w-full px-6 py-4 rounded-2xl border-2 border-white/20 focus:border-blue-400 focus:ring-4 focus:ring-blue-400/30 transition-all duration-300 bg-white/10 backdrop-blur-sm text-white placeholder-white/50"
                    placeholder="B.Tech Computer Science"
                  />
                </div>

                <div className="group">
                  <label className="text-sm font-semibold text-white/90 mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 9l2 2 4-4" />
                    </svg>
                    Year of Study *
                  </label>
                  <select
                    name="yearOfStudy"
                    value={formData.yearOfStudy}
                    onChange={handleInputChange}
                    required
                    className="w-full px-6 py-4 rounded-2xl border-2 border-white/20 focus:border-blue-400 focus:ring-4 focus:ring-blue-400/30 transition-all duration-300 bg-white/10 backdrop-blur-sm text-white"
                  >
                    <option value="" className="text-gray-800">Select Year</option>
                    <option value="1st Year" className="text-gray-800">1st Year</option>
                    <option value="2nd Year" className="text-gray-800">2nd Year</option>
                    <option value="3rd Year" className="text-gray-800">3rd Year</option>
                    <option value="4th Year" className="text-gray-800">4th Year</option>
                    <option value="5th Year" className="text-gray-800">5th Year</option>
                    <option value="Postgraduate" className="text-gray-800">Postgraduate</option>
                  </select>
                </div>

                <div className="group">
                  <label className="text-sm font-semibold text-white/90 mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                    CGPA/Grade *
                  </label>
                  <input
                    type="text"
                    name="cgpa"
                    value={formData.cgpa}
                    onChange={handleInputChange}
                    required
                    className="w-full px-6 py-4 rounded-2xl border-2 border-white/20 focus:border-blue-400 focus:ring-4 focus:ring-blue-400/30 transition-all duration-300 bg-white/10 backdrop-blur-sm text-white placeholder-white/50"
                    placeholder="8.5 or A grade"
                  />
                </div>
              </div>
            </div>            {/* Social Media Section */}
            <div className="mb-16">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl mr-4 flex items-center justify-center shadow-lg">
                  <img 
                    src="https://cdn.iconscout.com/icon/premium/png-256-thumb/social-media-1-1164024.png" 
                    alt="Social Media Icon" 
                    className="w-6 h-6 brightness-0 invert"
                  />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">Social Media Presence</h3>
                  <p className="text-white/70">Connect with us on social platforms</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group">
                  <label className="text-sm font-semibold text-white/90 mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v6a2 2 0 01-2 2H10a2 2 0 01-2-2V6" />
                    </svg>
                    LinkedIn Profile
                  </label>
                  <input
                    type="url"
                    name="linkedinUrl"
                    value={formData.linkedinUrl}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 rounded-2xl border-2 border-white/20 focus:border-purple-400 focus:ring-4 focus:ring-purple-400/30 transition-all duration-300 bg-white/10 backdrop-blur-sm text-white placeholder-white/50"
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>

                <div className="group">
                  <label className="text-sm font-semibold text-white/90 mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Instagram Handle (Optional)
                  </label>                  <input
                    type="url"
                    name="portfolioUrl"
                    value={formData.portfolioUrl}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 rounded-2xl border-2 border-white/20 focus:border-purple-400 focus:ring-4 focus:ring-purple-400/30 transition-all duration-300 bg-white/10 backdrop-blur-sm text-white placeholder-white/50"
                    placeholder="https://instagram.com/yourhandle"
                  />
                </div>
              </div>
            </div>            {/* Skills & Additional Info Section */}
            <div className="mb-16">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl mr-4 flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">Skills & Experience</h3>
                  <p className="text-white/70">Tell us about your capabilities</p>
                </div>
              </div>
              
              <div className="space-y-8">
                <div className="group">
                  <label className="text-sm font-semibold text-white/90 mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Skills (comma-separated) *
                  </label>
                  <input
                    type="text"
                    name="skills"
                    value={Array.isArray(formData.skills) ? formData.skills.join(', ') : ''}
                    onChange={handleInputChange}
                    required
                    className="w-full px-6 py-4 rounded-2xl border-2 border-white/20 focus:border-green-400 focus:ring-4 focus:ring-green-400/30 transition-all duration-300 bg-white/10 backdrop-blur-sm text-white placeholder-white/50"
                    placeholder="Leadership, Marketing, Social Media, Public Speaking, Event Management"
                  />
                </div>

                <div className="group">
                  <label className="text-sm font-semibold text-white/90 mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v6a2 2 0 01-2 2H10a2 2 0 01-2-2V6" />
                    </svg>
                    Previous Experience
                  </label>
                  <textarea
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-6 py-4 rounded-2xl border-2 border-white/20 focus:border-green-400 focus:ring-4 focus:ring-green-400/30 transition-all duration-300 bg-white/10 backdrop-blur-sm resize-none text-white placeholder-white/50"
                    placeholder="Describe your leadership experience, projects, or relevant background..."
                  />
                </div>

                <div className="group">
                  <label className="text-sm font-semibold text-white/90 mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 9l2 2 4-4" />
                    </svg>
                    When can you start? *
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-6 py-4 rounded-2xl border-2 border-white/20 focus:border-green-400 focus:ring-4 focus:ring-green-400/30 transition-all duration-300 bg-white/10 backdrop-blur-sm text-white"
                  />
                </div>
              </div>
            </div>            {/* Motivation & Experience Section */}
            <div className="mb-16">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-600 rounded-xl mr-4 flex items-center justify-center shadow-lg">
                  <img 
                    src="https://cdn.iconscout.com/icon/premium/png-256-thumb/motivation-1-1164020.png" 
                    alt="Motivation Icon" 
                    className="w-6 h-6 brightness-0 invert"
                  />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">Tell Us About Yourself</h3>
                  <p className="text-white/70">Share your story and aspirations</p>
                </div>
              </div>
              
              <div className="space-y-8">                <div className="group">
                  <label className="text-sm font-semibold text-white/90 mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    Why do you want to become a Campus Ambassador? *
                  </label>
                  <textarea
                    name="motivation"
                    value={formData.motivation}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className={`w-full px-6 py-4 rounded-2xl border-2 ${
                      missingFields.includes('motivation')
                        ? 'border-red-500 focus:border-red-400 focus:ring-4 focus:ring-red-400/30'
                        : 'border-white/20 focus:border-pink-400 focus:ring-4 focus:ring-pink-400/30'
                    } transition-all duration-300 bg-white/10 backdrop-blur-sm resize-none text-white placeholder-white/50`}                    
                    placeholder="Share your motivation and what excites you about this opportunity..."
                  />
                  {missingFields.includes('motivation') && (
                    <p className="mt-2 text-red-400 text-sm">This field is required</p>
                  )}
                </div>

                <div className="group">
                  <label className="text-sm font-semibold text-white/90 mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Why Internexis specifically? *
                  </label>
                  <textarea
                    name="whyInternexis"
                    value={formData.whyInternexis}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className={`w-full px-6 py-4 rounded-2xl border-2 ${
                      missingFields.includes('whyInternexis')
                        ? 'border-red-500 focus:border-red-400 focus:ring-4 focus:ring-red-400/30'
                        : 'border-white/20 focus:border-pink-400 focus:ring-4 focus:ring-pink-400/30'
                    } transition-all duration-300 bg-white/10 backdrop-blur-sm resize-none text-white placeholder-white/50`}
                    placeholder="Tell us why you chose Internexis specifically and what you know about our organization..."
                  />
                  {missingFields.includes('whyInternexis') && (
                    <p className="mt-2 text-red-400 text-sm">This field is required</p>
                  )}
                </div>

                <div className="group">
                  <label className="text-sm font-semibold text-white/90 mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Time Availability (hours per week) *
                  </label><select
                    name="availabilityHours"
                    value={formData.availabilityHours}
                    onChange={handleInputChange}
                    required
                    className="w-full px-6 py-4 rounded-2xl border-2 border-white/20 focus:border-pink-400 focus:ring-4 focus:ring-pink-400/30 transition-all duration-300 bg-white/10 backdrop-blur-sm text-white"
                  >
                    <option value="" className="text-gray-800">Select availability</option>
                    <option value="5-10 hours" className="text-gray-800">5-10 hours per week</option>
                    <option value="10-15 hours" className="text-gray-800">10-15 hours per week</option>
                    <option value="15-20 hours" className="text-gray-800">15-20 hours per week</option>
                    <option value="20+ hours" className="text-gray-800">20+ hours per week</option>
                  </select>
                </div>                <div className="group">
                  <label className="text-sm font-semibold text-white/90 mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    How did you hear about us? *
                  </label>
                  <input
                    type="text"
                    name="referralSource"
                    value={formData.referralSource}
                    onChange={handleInputChange}
                    required
                    className="w-full px-6 py-4 rounded-2xl border-2 border-white/20 focus:border-pink-400 focus:ring-4 focus:ring-pink-400/30 transition-all duration-300 bg-white/10 backdrop-blur-sm text-white placeholder-white/50"
                    placeholder="Social media, friend, website, etc."
                  />
                </div>
              </div>
            </div>            {/* Additional Information Section */}
            <div className="mb-16">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-600 rounded-xl mr-4 flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">Additional Information</h3>
                  <p className="text-white/70">Optional details to support your application</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group">
                  <label className="text-sm font-semibold text-white/90 mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Additional Information (Optional)
                  </label>
                  <textarea
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-6 py-4 rounded-2xl border-2 border-white/20 focus:border-pink-400 focus:ring-4 focus:ring-pink-400/30 transition-all duration-300 bg-white/10 backdrop-blur-sm resize-none text-white placeholder-white/50"
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
                className={`group relative px-16 py-6 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-bold text-xl rounded-3xl shadow-2xl transition-all duration-500 transform ${
                  isSubmitting 
                    ? 'opacity-70 cursor-not-allowed scale-95' 
                    : 'hover:scale-105 hover:shadow-3xl active:scale-95'
                } overflow-hidden border-2 border-white/20`}
              >
                <span className="absolute top-0 left-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                <span className="relative flex items-center justify-center">
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-4 h-7 w-7 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting Application...
                    </>
                  ) : (
                    <>
                      <svg className="w-7 h-7 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Submit Application
                    </>
                  )}
                </span>
              </button>
              
              <p className="mt-8 text-white/80 text-lg font-medium">
                <span className="inline-flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Your information is secure and encrypted
                </span>
              </p>
              <p className="mt-2 text-white/60 text-sm">
                Applications are typically reviewed within 24-48 hours
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;
