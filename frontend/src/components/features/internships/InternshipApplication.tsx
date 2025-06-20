import React, { useState } from "react";

const InternshipApplication: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    university: "",
    course: "",
    yearOfStudy: "",
    cgpa: "",
    skills: "",
    experience: "",
    portfolioUrl: "",
    linkedinUrl: "",
    githubUrl: "",
    coverLetter: "",
    resumeUrl: "",
    referralCode: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [referralCodeValid, setReferralCodeValid] = useState<boolean | null>(
    null
  );

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Reset referral code validation when changed
    if (name === "referralCode") {
      setReferralCodeValid(null);
    }
  };

  const validateReferralCode = async () => {
    if (!formData.referralCode.trim()) {
      setReferralCodeValid(null);
      return;
    }

    // Simulate referral code validation for demo purposes
    try {
      // Mock validation - in a real app, this would be an API call
      const isValidCode = /^[A-Z]{3}\d{3}$/.test(formData.referralCode); // Format: ABC123
      setReferralCodeValid(isValidCode);
    } catch (error) {
      console.error("Error validating referral code:", error);
      setReferralCodeValid(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      // Simulate form submission for demo purposes
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
      
      // Generate a mock application ID
      const applicationId = `APP${Date.now().toString().slice(-6)}`;
      
      setMessage({
        type: "success",
        text: `Application submitted successfully! Your application ID is: ${applicationId}. We'll contact you within 48 hours.`
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
        skills: "",
        experience: "",
        portfolioUrl: "",
        linkedinUrl: "",
        githubUrl: "",
        coverLetter: "",
        resumeUrl: "",
        referralCode: "",
      });
      setReferralCodeValid(null);
    } catch (error) {
      console.error("Error submitting application:", error);
      setMessage({
        type: "error",
        text: "Failed to submit application. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 pt-24 pb-16 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/30 to-cyan-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-indigo-400/25 to-blue-400/25 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute top-3/4 left-1/3 w-72 h-72 bg-gradient-to-br from-pink-400/20 to-rose-400/20 rounded-full blur-3xl animate-pulse delay-3000"></div>
      </div>

      {/* Floating Animation Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-4 h-4 bg-blue-400/60 rounded-full animate-bounce delay-100"></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-purple-400/60 rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-80 left-1/3 w-2 h-2 bg-pink-400/60 rounded-full animate-bounce delay-500"></div>
        <div className="absolute bottom-40 right-20 w-5 h-5 bg-indigo-400/60 rounded-full animate-bounce delay-700"></div>
        <div className="absolute bottom-80 left-16 w-3 h-3 bg-cyan-400/60 rounded-full animate-bounce delay-900"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Enhanced Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-full mb-8 shadow-2xl animate-pulse">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Apply for
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
                {" "}
                Internship
              </span>
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8 rounded-full"></div>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              🚀 Take the next step in your career journey. Join thousands of
              students who have transformed their careers with us!
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
              <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-medium">
                ✨ Quick Application
              </span>
              <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full font-medium">
                🎯 Fast Response
              </span>
              <span className="px-4 py-2 bg-pink-100 text-pink-700 rounded-full font-medium">
                💼 Career Growth
              </span>
            </div>
          </div>

          {/* Enhanced Application Form */}
          <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20 relative overflow-hidden group hover:shadow-3xl transition-all duration-500">
            {/* Form Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            {/* Enhanced Message Display */}
            {message && (
              <div
                className={`mb-8 p-6 rounded-2xl border-2 relative z-10 transform animate-in slide-in-from-top duration-500 ${
                  message.type === "success"
                    ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-300 text-green-800"
                    : "bg-gradient-to-r from-red-50 to-pink-50 border-red-300 text-red-800"
                } shadow-lg`}
              >
                <div className="flex items-center">
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                      message.type === "success" ? "bg-green-200" : "bg-red-200"
                    }`}
                  >
                    {message.type === "success" ? (
                      <svg
                        className="h-6 w-6 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-6 w-6 text-red-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    )}
                  </div>
                  <div className="font-semibold text-lg">{message.text}</div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-12 relative z-10">
              {" "}
              {/* Enhanced Personal Information */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                      Personal Information
                    </h3>
                    <p className="text-blue-600 font-medium">
                      Let's get to know you better! ✨
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-8 bg-white/70 p-4 rounded-lg border border-blue-100">
                  <span className="text-red-500 text-lg">★</span> Required
                  fields - We only need your basic contact info!
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="transform hover:scale-105 transition-transform duration-200">
                    <label className="block text-sm font-bold text-gray-800 mb-3">
                      First Name <span className="text-red-500 text-lg">★</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-6 py-4 border-2 border-blue-200 rounded-xl focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition-all duration-300 bg-white/80 hover:bg-white hover:border-blue-300 text-lg font-medium placeholder-gray-400"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div className="transform hover:scale-105 transition-transform duration-200">
                    <label className="block text-sm font-bold text-gray-800 mb-3">
                      Last Name <span className="text-red-500 text-lg">★</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-6 py-4 border-2 border-blue-200 rounded-xl focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition-all duration-300 bg-white/80 hover:bg-white hover:border-blue-300 text-lg font-medium placeholder-gray-400"
                      placeholder="Enter your last name"
                    />
                  </div>
                  <div className="transform hover:scale-105 transition-transform duration-200">
                    <label className="block text-sm font-bold text-gray-800 mb-3">
                      Email Address{" "}
                      <span className="text-red-500 text-lg">★</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-6 py-4 border-2 border-blue-200 rounded-xl focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition-all duration-300 bg-white/80 hover:bg-white hover:border-blue-300 text-lg font-medium placeholder-gray-400"
                      placeholder="your.email@university.edu"
                    />
                  </div>
                  <div className="transform hover:scale-105 transition-transform duration-200">
                    <label className="block text-sm font-bold text-gray-800 mb-3">
                      Phone Number{" "}
                      <span className="text-red-500 text-lg">★</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-6 py-4 border-2 border-blue-200 rounded-xl focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition-all duration-300 bg-white/80 hover:bg-white hover:border-blue-300 text-lg font-medium placeholder-gray-400"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                </div>
              </div>
              {/* Enhanced Academic Information */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl border-2 border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors">
                      Academic Information
                    </h3>
                    <p className="text-purple-600 font-medium">
                      📚 Optional but helpful for better understanding
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-8 bg-white/70 p-4 rounded-lg border border-purple-100">
                  🎓 This information helps us understand your background better
                  but is completely optional!
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="transform hover:scale-105 transition-transform duration-200">
                    <label className="block text-sm font-bold text-gray-800 mb-3">
                      University/College
                    </label>
                    <input
                      type="text"
                      name="university"
                      value={formData.university}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 border-2 border-purple-200 rounded-xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-300 bg-white/80 hover:bg-white hover:border-purple-300 text-lg font-medium placeholder-gray-400"
                      placeholder="Your university name"
                    />
                  </div>
                  <div className="transform hover:scale-105 transition-transform duration-200">
                    <label className="block text-sm font-bold text-gray-800 mb-3">
                      Course/Branch
                    </label>
                    <input
                      type="text"
                      name="course"
                      value={formData.course}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 border-2 border-purple-200 rounded-xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-300 bg-white/80 hover:bg-white hover:border-purple-300 text-lg font-medium placeholder-gray-400"
                      placeholder="e.g., Computer Science Engineering"
                    />
                  </div>
                  <div className="transform hover:scale-105 transition-transform duration-200">
                    <label className="block text-sm font-bold text-gray-800 mb-3">
                      Year of Study
                    </label>
                    <select
                      name="yearOfStudy"
                      value={formData.yearOfStudy}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 border-2 border-purple-200 rounded-xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-300 bg-white/80 hover:bg-white hover:border-purple-300 text-lg font-medium text-gray-700"
                    >
                      <option value="">Select your year</option>
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                      <option value="Final Year">Final Year</option>
                      <option value="Masters">Masters</option>
                    </select>
                  </div>
                  <div className="transform hover:scale-105 transition-transform duration-200">
                    <label className="block text-sm font-bold text-gray-800 mb-3">
                      CGPA/Percentage
                    </label>
                    <input
                      type="text"
                      name="cgpa"
                      value={formData.cgpa}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 border-2 border-purple-200 rounded-xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-300 bg-white/80 hover:bg-white hover:border-purple-300 text-lg font-medium placeholder-gray-400"
                      placeholder="e.g., 8.5 CGPA or 85%"
                    />
                  </div>
                </div>
              </div>{" "}
              {/* Enhanced Technical Information */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-2xl border-2 border-emerald-200 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                      Technical Information
                    </h3>
                    <p className="text-emerald-600 font-medium">
                      💻 Show us your tech superpowers!
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-8 bg-white/70 p-4 rounded-lg border border-emerald-100">
                  ⚡ Share your technical skills and experience to help us
                  understand your capabilities - totally optional!
                </p>
                <div className="space-y-8">
                  <div className="transform hover:scale-105 transition-transform duration-200">
                    <label className="block text-sm font-bold text-gray-800 mb-3">
                      Skills & Technologies 🚀
                    </label>
                    <textarea
                      name="skills"
                      value={formData.skills}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-6 py-4 border-2 border-emerald-200 rounded-xl focus:ring-4 focus:ring-emerald-300 focus:border-emerald-500 transition-all duration-300 bg-white/80 hover:bg-white hover:border-emerald-300 text-lg font-medium placeholder-gray-400 resize-none"
                      placeholder="List your technical skills (e.g., JavaScript, React, Python, Machine Learning, etc.)"
                    />
                  </div>
                  <div className="transform hover:scale-105 transition-transform duration-200">
                    <label className="block text-sm font-bold text-gray-800 mb-3">
                      Previous Experience 🌟
                    </label>
                    <textarea
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-6 py-4 border-2 border-emerald-200 rounded-xl focus:ring-4 focus:ring-emerald-300 focus:border-emerald-500 transition-all duration-300 bg-white/80 hover:bg-white hover:border-emerald-300 text-lg font-medium placeholder-gray-400 resize-none"
                      placeholder="Describe any relevant projects, internships, hackathons, or work experience that showcases your abilities"
                    />
                  </div>
                </div>
              </div>{" "}
              {/* Enhanced Portfolio & Links */}
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-8 rounded-2xl border-2 border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-amber-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 group-hover:text-orange-700 transition-colors">
                      Portfolio & Links
                    </h3>
                    <p className="text-orange-600 font-medium">
                      🔗 Showcase your amazing work!
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-8 bg-white/70 p-4 rounded-lg border border-orange-100">
                  🎨 Share your online presence and work samples to showcase
                  your abilities - optional but impressive!
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="transform hover:scale-105 transition-transform duration-200">
                    <label className="block text-sm font-bold text-gray-800 mb-3">
                      Portfolio URL 🎯
                    </label>
                    <input
                      type="url"
                      name="portfolioUrl"
                      value={formData.portfolioUrl}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 border-2 border-orange-200 rounded-xl focus:ring-4 focus:ring-orange-300 focus:border-orange-500 transition-all duration-300 bg-white/80 hover:bg-white hover:border-orange-300 text-lg font-medium placeholder-gray-400"
                      placeholder="https://yourportfolio.com"
                    />
                  </div>
                  <div className="transform hover:scale-105 transition-transform duration-200">
                    <label className="block text-sm font-bold text-gray-800 mb-3">
                      LinkedIn Profile 💼
                    </label>
                    <input
                      type="url"
                      name="linkedinUrl"
                      value={formData.linkedinUrl}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 border-2 border-orange-200 rounded-xl focus:ring-4 focus:ring-orange-300 focus:border-orange-500 transition-all duration-300 bg-white/80 hover:bg-white hover:border-orange-300 text-lg font-medium placeholder-gray-400"
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>
                  <div className="transform hover:scale-105 transition-transform duration-200">
                    <label className="block text-sm font-bold text-gray-800 mb-3">
                      GitHub Profile ⚡
                    </label>
                    <input
                      type="url"
                      name="githubUrl"
                      value={formData.githubUrl}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 border-2 border-orange-200 rounded-xl focus:ring-4 focus:ring-orange-300 focus:border-orange-500 transition-all duration-300 bg-white/80 hover:bg-white hover:border-orange-300 text-lg font-medium placeholder-gray-400"
                      placeholder="https://github.com/yourusername"
                    />
                  </div>
                  <div className="transform hover:scale-105 transition-transform duration-200">
                    <label className="block text-sm font-bold text-gray-800 mb-3">
                      Resume URL 📄
                    </label>
                    <input
                      type="url"
                      name="resumeUrl"
                      value={formData.resumeUrl}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 border-2 border-orange-200 rounded-xl focus:ring-4 focus:ring-orange-300 focus:border-orange-500 transition-all duration-300 bg-white/80 hover:bg-white hover:border-orange-300 text-lg font-medium placeholder-gray-400"
                      placeholder="Link to your resume (Google Drive, Dropbox, etc.)"
                    />
                  </div>
                </div>
              </div>{" "}
              {/* Enhanced Referral Code */}
              <div className="bg-gradient-to-br from-cyan-50 to-sky-50 p-8 rounded-2xl border-2 border-cyan-200 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-600 to-sky-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 group-hover:text-cyan-700 transition-colors">
                      Referral Information
                    </h3>
                    <p className="text-cyan-600 font-medium">
                      🤝 Help your campus ambassador earn rewards!
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-8 bg-white/70 p-4 rounded-lg border border-cyan-100">
                  🎁 Got a referral code from a campus ambassador? Enter it here
                  to help them earn rewards - completely optional!
                </p>
                <div className="max-w-md">
                  <label className="block text-sm font-bold text-gray-800 mb-3">
                    Campus Ambassador Referral Code 🏆
                  </label>
                  <div className="flex gap-3 items-center">
                    <input
                      type="text"
                      name="referralCode"
                      value={formData.referralCode}
                      onChange={handleInputChange}
                      onBlur={validateReferralCode}
                      className={`flex-1 px-6 py-4 border-2 rounded-xl focus:ring-4 transition-all duration-300 text-lg font-medium placeholder-gray-400 ${
                        referralCodeValid === true
                          ? "border-green-500 bg-green-50 focus:ring-green-300 focus:border-green-500"
                          : referralCodeValid === false
                          ? "border-red-500 bg-red-50 focus:ring-red-300 focus:border-red-500"
                          : "border-cyan-200 bg-white/80 hover:bg-white hover:border-cyan-300 focus:ring-cyan-300 focus:border-cyan-500"
                      }`}
                      placeholder="Enter referral code (if any)"
                    />
                    {referralCodeValid === true && (
                      <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl text-green-600 font-bold text-xl">
                        ✓
                      </div>
                    )}
                    {referralCodeValid === false && (
                      <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-xl text-red-600 font-bold text-xl">
                        ✗
                      </div>
                    )}
                  </div>
                  {referralCodeValid === false && (
                    <p className="text-sm text-red-600 mt-3 p-3 bg-red-50 rounded-lg border border-red-200">
                      ❌ Invalid referral code - please check and try again
                    </p>
                  )}
                  {referralCodeValid === true && (
                    <p className="text-sm text-green-600 mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                      🎉 Valid referral code! You'll help your campus ambassador
                      earn rewards.
                    </p>
                  )}
                </div>
              </div>{" "}
              {/* Enhanced Cover Letter */}
              <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-8 rounded-2xl border-2 border-rose-200 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-rose-600 to-pink-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 group-hover:text-rose-700 transition-colors">
                      Cover Letter
                    </h3>
                    <p className="text-rose-600 font-medium">
                      💝 Tell us your story!
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-8 bg-white/70 p-4 rounded-lg border border-rose-100">
                  ✨ Tell us about yourself and why you're excited to join our
                  team - optional but we'd love to hear from you!
                </p>
                <div className="transform hover:scale-105 transition-transform duration-200">
                  <label className="block text-sm font-bold text-gray-800 mb-3">
                    Why do you want to intern with Internexis Technologies? 🚀
                  </label>
                  <textarea
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-6 py-4 border-2 border-rose-200 rounded-xl focus:ring-4 focus:ring-rose-300 focus:border-rose-500 transition-all duration-300 bg-white/80 hover:bg-white hover:border-rose-300 text-lg font-medium placeholder-gray-400 resize-none"
                    placeholder="Tell us about your interests, goals, passion for technology, and why you'd be a great fit for our team. Share your story and what excites you about this opportunity!"
                  />
                </div>
              </div>{" "}
              {/* Enhanced Submit Button */}
              <div className="text-center pt-12">
                <div className="relative inline-block">
                  {/* Animated background for button */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur-xl opacity-70 animate-pulse"></div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="relative px-16 py-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-xl group overflow-hidden"
                  >
                    {/* Button content with animated background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <span className="relative z-10 flex items-center justify-center">
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-6 w-6 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Submitting Application...
                        </>
                      ) : (
                        <>
                          <span className="mr-3">🚀</span>
                          Submit Application
                          <span className="ml-3">✨</span>
                        </>
                      )}
                    </span>
                  </button>
                </div>
                <div className="mt-8 max-w-2xl mx-auto">
                  <p className="text-sm text-gray-600 bg-white/80 p-6 rounded-xl border border-gray-200 shadow-sm">
                    <span className="inline-flex items-center text-blue-600 font-semibold mb-2">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                      Privacy & Terms
                    </span>
                    <br />
                    By submitting this form, you agree to our terms and
                    conditions. Only the fields marked with{" "}
                    <span className="text-red-500 font-bold">★</span> are
                    required. Your information is secure and will only be used
                    for application processing.
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternshipApplication;
