import React, { useState } from "react";

interface FormData {
  fullName: string;
  email: string;
  mobileNumber: string;
  collegeName: string;
  collegeCity: string;
  state: string;
  course: string;
  branch: string;
  yearOfStudy: string;
  domain: string[];
  internshipDuration: string;
  utrNumber: string;
}

const initialFormData: FormData = {
  fullName: "",
  email: "",
  mobileNumber: "",
  collegeName: "",
  collegeCity: "",
  state: "",
  course: "",
  branch: "",
  yearOfStudy: "",
  domain: [],
  internshipDuration: "",
  utrNumber: "",
};

const steps = [
  { title: "Personal Details", subtitle: "Tell us about yourself" },
  { title: "Academic Info", subtitle: "Your educational background" },
  { title: "Program Details", subtitle: "Choose your domain & duration" },
  { title: "Payment & Submit", subtitle: "Complete your application" },
];

const InternshipApplication: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Indian states list
  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", 
    "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", 
    "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", 
    "Uttarakhand", "West Bengal", "Delhi", "Jammu and Kashmir", "Ladakh", "Puducherry"
  ];

  // Available domains
  const domains = [
    "Web Development", "AI/ML", "Python Development", "Android Development", 
    "Data Science", "Cybersecurity", "Cloud Computing", "Digital Marketing",
    "UI/UX Design", "Blockchain", "DevOps", "IoT"
  ];

  const validateStep = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (currentStep === 0) {
      if (!formData.fullName.trim()) newErrors.fullName = "Full name is required.";
      if (!formData.email.trim()) newErrors.email = "Email is required.";
      else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) newErrors.email = "Invalid email format.";
      if (!formData.mobileNumber.trim()) newErrors.mobileNumber = "Mobile number is required.";
      else if (!/^[6-9]\d{9}$/.test(formData.mobileNumber)) newErrors.mobileNumber = "Invalid Indian mobile number.";
    }
    
    if (currentStep === 1) {
      if (!formData.collegeName.trim()) newErrors.collegeName = "College name is required.";
      if (!formData.collegeCity.trim()) newErrors.collegeCity = "College city is required.";
      if (!formData.state.trim()) newErrors.state = "State is required.";
      if (!formData.course.trim()) newErrors.course = "Course is required.";
      if (!formData.branch.trim()) newErrors.branch = "Branch is required.";
      if (!formData.yearOfStudy.trim()) newErrors.yearOfStudy = "Year of study is required.";
    }
    
    if (currentStep === 2) {
      if (formData.domain.length === 0) newErrors.domain = "Please select at least one domain.";
      if (!formData.internshipDuration.trim()) newErrors.internshipDuration = "Internship duration is required.";
    }
    
    if (currentStep === 3) {
      if (!formData.utrNumber.trim()) newErrors.utrNumber = "UTR number is required.";
      else if (!/^[0-9]{12}$/.test(formData.utrNumber)) newErrors.utrNumber = "UTR number must be 12 digits.";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleDomainChange = (domain: string) => {
    setFormData((prev) => ({
      ...prev,
      domain: prev.domain.includes(domain)
        ? prev.domain.filter(d => d !== domain)
        : [...prev.domain, domain]
    }));
    setErrors((prev) => ({ ...prev, domain: "" }));
  };

  const handleNext = () => {
    if (validateStep()) setCurrentStep((s) => s + 1);
  };

  const handleBack = () => {
    setCurrentStep((s) => s - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;
    
    setSubmitting(true);
    
    // Log form data to console
    console.log("=== Internship Application Submitted ===");
    console.log("Personal Details:");
    console.log(`- Full Name: ${formData.fullName}`);
    console.log(`- Email: ${formData.email}`);
    console.log(`- Mobile: ${formData.mobileNumber}`);
    console.log("\nAcademic Details:");
    console.log(`- College: ${formData.collegeName}`);
    console.log(`- City: ${formData.collegeCity}`);
    console.log(`- State: ${formData.state}`);
    console.log(`- Course: ${formData.course}`);
    console.log(`- Branch: ${formData.branch}`);
    console.log(`- Year: ${formData.yearOfStudy}`);
    console.log("\nProgram Details:");
    console.log(`- Domain(s): ${formData.domain.join(", ")}`);
    console.log(`- Duration: ${formData.internshipDuration}`);
    console.log("\nPayment:");
    console.log(`- UTR Number: ${formData.utrNumber}`);
    console.log("=====================================");
    
    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
    }, 1500);
  };
  return (
    <div className="min-h-screen relative overflow-hidden">      {/* Enhanced Multi-layer Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-blue-50 to-purple-100"></div>
      <div className="absolute inset-0 bg-gradient-to-tl from-pink-50/50 via-transparent to-emerald-50/50"></div>
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.08'%3E%3Ccircle cx='40' cy='40' r='3'/%3E%3Ccircle cx='20' cy='20' r='2'/%3E%3Ccircle cx='60' cy='60' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      {/* Enhanced Floating Elements with Responsive Positioning */}
      <div className="absolute top-16 sm:top-20 left-4 sm:left-10 w-12 sm:w-20 h-12 sm:h-20 bg-gradient-to-r from-violet-400 via-purple-500 to-indigo-500 rounded-full opacity-20 animate-pulse shadow-2xl"></div>
      <div className="absolute top-32 sm:top-40 right-4 sm:right-20 w-10 sm:w-16 h-10 sm:h-16 bg-gradient-to-r from-pink-400 via-rose-500 to-red-500 rounded-full opacity-25 animate-bounce shadow-xl"></div>
      <div className="absolute bottom-16 sm:bottom-20 left-6 sm:left-20 w-8 sm:w-12 h-8 sm:h-12 bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 rounded-full opacity-30 animate-pulse shadow-lg"></div>
      <div className="absolute bottom-32 sm:bottom-40 right-6 sm:right-10 w-10 sm:w-14 h-10 sm:h-14 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 rounded-full opacity-25 animate-bounce shadow-xl"></div>
      
      {/* Additional Mobile-Optimized Floating Elements */}
      <div className="absolute top-1/4 left-1/4 w-6 sm:w-8 h-6 sm:h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-15 animate-ping"></div>
      <div className="absolute top-3/4 right-1/4 w-4 sm:w-6 h-4 sm:h-6 bg-gradient-to-r from-fuchsia-400 to-pink-500 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute top-1/2 left-1/12 w-5 sm:w-7 h-5 sm:h-7 bg-gradient-to-r from-lime-400 to-green-500 rounded-full opacity-18 animate-bounce delay-75"></div>
      <div className="absolute top-1/3 right-1/12 w-6 sm:w-9 h-6 sm:h-9 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full opacity-22 animate-pulse delay-150"></div>      <div className="relative z-10 pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 px-3 sm:px-4 lg:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Header Section */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="relative mb-6 sm:mb-8">
              <div className="w-20 sm:w-24 lg:w-28 h-20 sm:h-24 lg:h-28 mx-auto bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 rounded-3xl sm:rounded-4xl flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-500 hover:scale-110">
                <div className="w-16 sm:w-20 lg:w-24 h-16 sm:h-20 lg:h-24 bg-white rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-inner">
                  <svg className="w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
              </div>
              <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white text-xs sm:text-sm font-bold px-2 sm:px-3 py-1 rounded-full animate-bounce shadow-lg">
                🔥 Hot!
              </div>
              <div className="absolute -bottom-1 sm:-bottom-2 -left-1 sm:-left-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse shadow-lg">
                New
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-gray-900 leading-tight">
                Launch Your
                <span className="block bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 bg-clip-text text-transparent animate-pulse">
                  Dream Career
                </span>
                <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent font-bold mt-2">
                  Today! 🚀
                </span>
              </h1>
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Join <span className="font-black text-purple-600 bg-purple-100 px-2 py-1 rounded-lg">10,000+</span> successful students who transformed their potential into 
                <span className="font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> professional excellence</span> through our industry-leading virtual internship programs.
              </p>
            </div>
          </div>{/* Enhanced Progress Steps */}
          <div className="mb-12 sm:mb-16">
            <div className="bg-white/90 backdrop-blur-lg rounded-3xl sm:rounded-4xl p-6 sm:p-8 lg:p-10 shadow-2xl border border-white/40 relative overflow-hidden">
              {/* Animated background patterns */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-purple-50/50 to-pink-50/50 rounded-3xl sm:rounded-4xl"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-cyan-500"></div>
              
              <div className="relative z-10">
                <div className="flex flex-col lg:flex-row justify-between items-center space-y-8 lg:space-y-0">
                  {steps.map((step, idx) => (
                    <div key={idx} className="flex items-center w-full lg:w-auto">
                      <div className="flex flex-col items-center relative">
                        <div className={`w-16 sm:w-20 lg:w-24 h-16 sm:h-20 lg:h-24 rounded-full flex items-center justify-center font-black text-lg sm:text-xl lg:text-2xl transition-all duration-500 transform hover:scale-110 ${
                          idx <= currentStep 
                            ? 'bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 text-white shadow-2xl animate-pulse' 
                            : 'bg-gradient-to-r from-gray-200 to-gray-300 text-gray-500 hover:from-gray-300 hover:to-gray-400'
                        }`}>
                          {idx <= currentStep ? (
                            <svg className="w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            idx + 1
                          )}
                        </div>
                        <div className="text-center mt-3 sm:mt-4">
                          <div className={`font-bold text-sm sm:text-base lg:text-lg ${idx <= currentStep ? 'text-purple-600' : 'text-gray-500'}`}>
                            {step.title}
                          </div>
                          <div className="text-xs sm:text-sm text-gray-500 mt-1 max-w-24 sm:max-w-32">{step.subtitle}</div>
                        </div>
                      </div>
                      
                      {idx < steps.length - 1 && (
                        <div className="hidden lg:block flex-1 mx-4 xl:mx-6">
                          <div className={`h-2 rounded-full transition-all duration-500 ${
                            idx < currentStep 
                              ? 'bg-gradient-to-r from-violet-500 via-purple-500 to-blue-500 animate-pulse' 
                              : 'bg-gray-200'
                          }`}></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>          {/* Enhanced Main Form Container */}
          <div className="bg-white/95 backdrop-blur-2xl rounded-3xl sm:rounded-4xl shadow-2xl border border-white/50 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-50/70 via-purple-50/70 to-blue-50/70 rounded-3xl sm:rounded-4xl"></div>
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-violet-500 via-purple-500 to-blue-500"></div>
            
            {success ? (              <div className="relative p-8 sm:p-12 lg:p-16 text-center">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 rounded-3xl sm:rounded-4xl"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-green-100/30 via-emerald-100/30 to-teal-100/30 rounded-3xl sm:rounded-4xl"></div>
                
                <div className="relative z-10">
                  <div className="w-24 sm:w-32 lg:w-40 h-24 sm:h-32 lg:h-40 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto shadow-2xl animate-bounce mb-6 sm:mb-8">
                    <svg className="w-12 sm:w-16 lg:w-20 h-12 sm:h-16 lg:h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>

                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 sm:mb-6">
                    🎉 Application Submitted Successfully!
                  </h2>
                  
                  <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
                    Congratulations! Your internship application has been received. Our expert team will review your 
                    application and contact you within <span className="font-black text-emerald-600 bg-emerald-100 px-2 py-1 rounded-lg">24-48 hours</span>.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 text-white rounded-2xl font-bold hover:from-emerald-700 hover:via-green-700 hover:to-teal-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105">
                      🔥 Join WhatsApp Group
                    </button>
                    <button className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-gray-300 text-gray-700 rounded-2xl font-bold hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl">
                      📄 Download Brochure
                    </button>
                  </div>
                </div>
              </div>
            ) : (              <div className="relative p-6 sm:p-8 md:p-10 lg:p-12">
                {/* Enhanced Form Header */}
                <div className="mb-8 sm:mb-10 text-center relative">
                  <div className="relative inline-flex items-center gap-3 sm:gap-4 bg-gradient-to-r from-violet-50 via-purple-50 to-blue-50 rounded-3xl px-6 sm:px-8 py-4 sm:py-6 mb-4 sm:mb-6 border-2 border-purple-100/80 backdrop-blur-sm shadow-xl">
                    <div className="relative">
                      <div className="w-12 sm:w-14 lg:w-16 h-12 sm:h-14 lg:h-16 bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300">
                        <span className="text-white font-black text-lg sm:text-xl lg:text-2xl">{currentStep + 1}</span>
                      </div>
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full animate-ping"></div>
                    </div>
                    
                    <div className="text-left">
                      <div className="text-lg sm:text-xl lg:text-2xl font-black text-gray-900 mb-1 flex flex-col sm:flex-row items-start sm:items-center gap-2">
                        <span>{steps[currentStep].title}</span>
                        <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-blue-100 to-purple-100 text-purple-800 border border-purple-200 shadow-sm">
                          Step {currentStep + 1} of {steps.length}
                        </span>
                      </div>
                      <div className="text-sm sm:text-base text-gray-600 font-medium mb-2 sm:mb-3">{steps[currentStep].subtitle}</div>
                      
                      <div className="flex items-center gap-2">
                        <div className="text-xs text-gray-500 font-medium">Progress:</div>
                        <div className="flex-1 bg-gray-200 rounded-full h-2 sm:h-3 max-w-[120px] sm:max-w-[150px]">
                          <div 
                            className="bg-gradient-to-r from-violet-500 via-purple-500 to-blue-500 h-2 sm:h-3 rounded-full transition-all duration-700 ease-out shadow-sm"
                            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                          ></div>
                        </div>
                        <div className="text-xs sm:text-sm text-gray-600 font-bold">{Math.round(((currentStep + 1) / steps.length) * 100)}%</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="max-w-md mx-auto">
                    {currentStep === 0 && (
                      <p className="text-sm sm:text-base text-gray-600 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl px-4 py-3 border border-blue-100 shadow-sm">
                        📝 Let's start with your basic information
                      </p>
                    )}
                    {currentStep === 1 && (
                      <p className="text-sm sm:text-base text-gray-600 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl px-4 py-3 border border-purple-100 shadow-sm">
                        🎓 Tell us about your academic background
                      </p>
                    )}
                    {currentStep === 2 && (
                      <p className="text-sm sm:text-base text-gray-600 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl px-4 py-3 border border-indigo-100 shadow-sm">
                        💻 Choose your domain and internship duration
                      </p>
                    )}
                    {currentStep === 3 && (
                      <p className="text-sm sm:text-base text-gray-600 bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl px-4 py-3 border border-emerald-100 shadow-sm">
                        💳 Complete payment and submit your application
                      </p>
                    )}
                  </div>
                </div>                <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                  {/* Step 0: Enhanced Personal Details */}
                  {currentStep === 0 && (
                    <div className="space-y-6 sm:space-y-8">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                        {/* Full Name */}
                        <div className="lg:col-span-2">
                          <label className="flex items-center text-sm sm:text-base font-bold text-gray-800 mb-3 group cursor-pointer">
                            <span className="w-3 h-3 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></span>
                            Full Name <span className="text-red-500 ml-1">*</span>
                            <span className="ml-2 text-xs text-gray-500 font-normal">(as per official documents)</span>
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              name="fullName"
                              value={formData.fullName}
                              onChange={handleChange}
                              className={`w-full border-2 rounded-2xl sm:rounded-3xl px-6 py-4 sm:py-5 text-gray-900 placeholder-gray-500 bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-violet-200/50 focus:border-violet-500 transition-all duration-300 hover:border-violet-300 hover:shadow-xl font-medium text-sm sm:text-base ${
                                errors.fullName ? "border-red-500 bg-red-50/80 shake" : "border-gray-200"
                              }`}
                              placeholder="Enter your full name"
                            />
                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                              <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </div>
                          </div>
                          {errors.fullName && <p className="mt-2 text-sm text-red-600 animate-pulse">{errors.fullName}</p>}
                        </div>

                        {/* Email */}
                        <div>
                          <label className="flex items-center text-sm sm:text-base font-bold text-gray-800 mb-3 group cursor-pointer">
                            <span className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></span>
                            Email Address <span className="text-red-500 ml-1">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              className={`w-full border-2 rounded-2xl sm:rounded-3xl px-6 py-4 sm:py-5 text-gray-900 placeholder-gray-500 bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-emerald-200/50 focus:border-emerald-500 transition-all duration-300 hover:border-emerald-300 hover:shadow-xl font-medium text-sm sm:text-base ${
                                errors.email ? "border-red-500 bg-red-50/80 shake" : "border-gray-200"
                              }`}
                              placeholder="your.email@example.com"
                            />
                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                              <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                              </svg>
                            </div>
                          </div>
                          {errors.email && <p className="mt-2 text-sm text-red-600 animate-pulse">{errors.email}</p>}
                        </div>

                        {/* Mobile Number */}
                        <div>
                          <label className="flex items-center text-sm sm:text-base font-bold text-gray-800 mb-3 group cursor-pointer">
                            <span className="w-3 h-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></span>
                            Mobile Number <span className="text-red-500 ml-1">*</span>
                          </label>
                          <div className="relative">
                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium text-sm sm:text-base">
                              +91
                            </div>
                            <input
                              type="tel"
                              name="mobileNumber"
                              value={formData.mobileNumber}
                              onChange={handleChange}
                              className={`w-full border-2 rounded-2xl sm:rounded-3xl pl-16 pr-12 py-4 sm:py-5 text-gray-900 placeholder-gray-500 bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-pink-200/50 focus:border-pink-500 transition-all duration-300 hover:border-pink-300 hover:shadow-xl font-medium text-sm sm:text-base ${
                                errors.mobileNumber ? "border-red-500 bg-red-50/80 shake" : "border-gray-200"
                              }`}
                              placeholder="Enter 10-digit mobile number"
                              maxLength={10}
                            />
                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                              <svg className="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                            </div>
                          </div>
                          {errors.mobileNumber && <p className="mt-2 text-sm text-red-600 animate-pulse">{errors.mobileNumber}</p>}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 1: Academic Details */}
                  {currentStep === 1 && (
                    <div className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* College Name */}
                        <div className="md:col-span-2">
                          <label className="flex items-center text-sm font-bold text-gray-800 mb-3">
                            <span className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full mr-2"></span>
                            College Name <span className="text-red-500 ml-1">*</span>
                          </label>
                          <input
                            type="text"
                            name="collegeName"
                            value={formData.collegeName}
                            onChange={handleChange}
                            className={`w-full border-2 rounded-2xl px-6 py-4 text-gray-900 placeholder-gray-500 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-indigo-200/50 focus:border-indigo-500 transition-all duration-300 hover:border-indigo-300 hover:shadow-lg font-medium ${
                              errors.collegeName ? "border-red-500 bg-red-50/80" : "border-gray-200"
                            }`}
                            placeholder="Enter your college/university name"
                          />
                          {errors.collegeName && <p className="mt-2 text-sm text-red-600">{errors.collegeName}</p>}
                        </div>

                        {/* College City */}
                        <div>
                          <label className="flex items-center text-sm font-bold text-gray-800 mb-3">
                            <span className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mr-2"></span>
                            College City <span className="text-red-500 ml-1">*</span>
                          </label>
                          <input
                            type="text"
                            name="collegeCity"
                            value={formData.collegeCity}
                            onChange={handleChange}
                            className={`w-full border-2 rounded-2xl px-6 py-4 text-gray-900 placeholder-gray-500 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-orange-200/50 focus:border-orange-500 transition-all duration-300 hover:border-orange-300 hover:shadow-lg font-medium ${
                              errors.collegeCity ? "border-red-500 bg-red-50/80" : "border-gray-200"
                            }`}
                            placeholder="Enter your college city"
                          />
                          {errors.collegeCity && <p className="mt-2 text-sm text-red-600">{errors.collegeCity}</p>}
                        </div>

                        {/* State */}
                        <div>
                          <label className="flex items-center text-sm font-bold text-gray-800 mb-3">
                            <span className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full mr-2"></span>
                            State <span className="text-red-500 ml-1">*</span>
                          </label>
                          <select
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            className={`w-full border-2 rounded-2xl px-6 py-4 text-gray-900 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-cyan-200/50 focus:border-cyan-500 transition-all duration-300 hover:border-cyan-300 hover:shadow-lg font-medium ${
                              errors.state ? "border-red-500 bg-red-50/80" : "border-gray-200"
                            }`}
                          >
                            <option value="">Select your state</option>
                            {indianStates.map((state) => (
                              <option key={state} value={state}>{state}</option>
                            ))}
                          </select>
                          {errors.state && <p className="mt-2 text-sm text-red-600">{errors.state}</p>}
                        </div>

                        {/* Course */}
                        <div>
                          <label className="flex items-center text-sm font-bold text-gray-800 mb-3">
                            <span className="w-2 h-2 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full mr-2"></span>
                            Course <span className="text-red-500 ml-1">*</span>
                          </label>
                          <select
                            name="course"
                            value={formData.course}
                            onChange={handleChange}
                            className={`w-full border-2 rounded-2xl px-6 py-4 text-gray-900 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-yellow-200/50 focus:border-yellow-500 transition-all duration-300 hover:border-yellow-300 hover:shadow-lg font-medium ${
                              errors.course ? "border-red-500 bg-red-50/80" : "border-gray-200"
                            }`}
                          >                            <option value="">Select your course</option>
                            <option value="B.Tech">B.Tech</option>
                            <option value="BCA">BCA</option>
                            <option value="MCA">MCA</option>
                            <option value="B.Sc">B.Sc</option>
                            <option value="M.Sc">M.Sc</option>
                            <option value="BBA">BBA</option>
                            <option value="MBA">MBA</option>
                            <option value="Other">Other</option>
                          </select>
                          {errors.course && <p className="mt-2 text-sm text-red-600">{errors.course}</p>}
                        </div>

                        {/* Branch */}
                        <div>
                          <label className="flex items-center text-sm font-bold text-gray-800 mb-3">
                            <span className="w-2 h-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full mr-2"></span>
                            Branch <span className="text-red-500 ml-1">*</span>
                          </label>
                          <input
                            type="text"
                            name="branch"
                            value={formData.branch}
                            onChange={handleChange}
                            className={`w-full border-2 rounded-2xl px-6 py-4 text-gray-900 placeholder-gray-500 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-pink-200/50 focus:border-pink-500 transition-all duration-300 hover:border-pink-300 hover:shadow-lg font-medium ${
                              errors.branch ? "border-red-500 bg-red-50/80" : "border-gray-200"
                            }`}
                            placeholder="e.g., Computer Science, IT, Electronics"
                          />
                          {errors.branch && <p className="mt-2 text-sm text-red-600">{errors.branch}</p>}
                        </div>

                        {/* Year of Study */}
                        <div>
                          <label className="flex items-center text-sm font-bold text-gray-800 mb-3">
                            <span className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full mr-2"></span>
                            Year of Study <span className="text-red-500 ml-1">*</span>
                          </label>
                          <select
                            name="yearOfStudy"
                            value={formData.yearOfStudy}
                            onChange={handleChange}
                            className={`w-full border-2 rounded-2xl px-6 py-4 text-gray-900 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-emerald-200/50 focus:border-emerald-500 transition-all duration-300 hover:border-emerald-300 hover:shadow-lg font-medium ${
                              errors.yearOfStudy ? "border-red-500 bg-red-50/80" : "border-gray-200"
                            }`}
                          >
                            <option value="">Select your year</option>
                            <option value="1st Year">1st Year</option>
                            <option value="2nd Year">2nd Year</option>
                            <option value="3rd Year">3rd Year</option>
                            <option value="4th Year">4th Year</option>
                          </select>
                          {errors.yearOfStudy && <p className="mt-2 text-sm text-red-600">{errors.yearOfStudy}</p>}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Program Details */}
                  {currentStep === 2 && (
                    <div className="space-y-8">
                      {/* Domain Selection */}
                      <div>
                        <label className="flex items-center text-sm font-bold text-gray-800 mb-3">
                          <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full mr-2"></span>
                          Select Domain(s) <span className="text-red-500 ml-1">*</span>
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {domains.map((domain) => (
                            <div
                              key={domain}
                              onClick={() => handleDomainChange(domain)}
                              className={`p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                                formData.domain.includes(domain)
                                  ? "border-purple-500 bg-purple-50 text-purple-800"
                                  : "border-gray-200 bg-white hover:border-purple-300"
                              }`}
                            >
                              <div className="flex items-center space-x-3">
                                <div className={`w-4 h-4 rounded-full border-2 ${
                                  formData.domain.includes(domain)
                                    ? "bg-purple-500 border-purple-500"
                                    : "border-gray-300"
                                }`}>
                                  {formData.domain.includes(domain) && (
                                    <svg className="w-full h-full text-white" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                  )}
                                </div>
                                <span className="font-medium text-sm">{domain}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                        {errors.domain && <p className="mt-2 text-sm text-red-600">{errors.domain}</p>}
                      </div>

                      {/* Internship Duration */}
                      <div>
                        <label className="flex items-center text-sm font-bold text-gray-800 mb-3">
                          <span className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mr-2"></span>
                          Internship Duration <span className="text-red-500 ml-1">*</span>
                        </label>                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div
                            onClick={() => setFormData(prev => ({ ...prev, internshipDuration: '1 Month' }))}
                            className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                              formData.internshipDuration === '1 Month'
                                ? "border-orange-500 bg-orange-50 text-orange-800"
                                : "border-gray-200 bg-white hover:border-orange-300"
                            }`}
                          >
                            <h3 className="font-bold text-lg mb-2">1 Month</h3>
                            <p className="text-sm text-gray-600">Fast-track program</p>
                            <p className="text-2xl font-bold text-orange-600 mt-2">₹99</p>
                            <p className="text-xs text-gray-500">one-time</p>
                          </div>
                          <div
                            onClick={() => setFormData(prev => ({ ...prev, internshipDuration: '2 Months' }))}
                            className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                              formData.internshipDuration === '2 Months'
                                ? "border-orange-500 bg-orange-50 text-orange-800"
                                : "border-gray-200 bg-white hover:border-orange-300"
                            }`}
                          >
                            <h3 className="font-bold text-lg mb-2">2 Months</h3>
                            <p className="text-sm text-gray-600">Comprehensive program</p>
                            <p className="text-2xl font-bold text-orange-600 mt-2">₹199</p>
                            <p className="text-xs text-gray-500">one-time</p>
                          </div>
                          <div
                            onClick={() => setFormData(prev => ({ ...prev, internshipDuration: '3 Months' }))}
                            className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                              formData.internshipDuration === '3 Months'
                                ? "border-orange-500 bg-orange-50 text-orange-800"
                                : "border-gray-200 bg-white hover:border-orange-300"
                            }`}
                          >
                            <h3 className="font-bold text-lg mb-2">3 Months</h3>
                            <p className="text-sm text-gray-600">Complete program</p>
                            <p className="text-2xl font-bold text-orange-600 mt-2">₹499</p>
                            <p className="text-xs text-gray-500">one-time</p>
                          </div>
                        </div>
                        {errors.internshipDuration && <p className="mt-2 text-sm text-red-600">{errors.internshipDuration}</p>}
                      </div>
                    </div>
                  )}

                  {/* Step 3: Payment & Submit */}
                  {currentStep === 3 && (
                    <div className="space-y-8">
                      {/* Payment QR Code */}
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 border-2 border-green-200/50 text-center">
                        <h3 className="text-xl font-bold text-green-800 mb-4">Complete Your Payment</h3>
                        
                        {/* QR Code Image */}
                        <div className="flex justify-center mb-6">
                          <div className="bg-white p-4 rounded-2xl shadow-lg">                            <img 
                              src="https://iili.io/FzJUEHg.jpg" 
                              alt="Payment QR Code" 
                              className="w-48 h-48 object-contain"
                              onError={(e) => {
                                // Fallback SVG if image doesn't exist
                                (e.target as HTMLImageElement).style.display = 'none';
                                const fallbackDiv = document.createElement('div');
                                fallbackDiv.innerHTML = `
                                  <svg width="192" height="192" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="w-48 h-48">
                                    <rect width="200" height="200" fill="#FFFFFF" stroke="#D1D5DB" stroke-width="2"/>
                                    <g fill="#000000">
                                      <rect x="20" y="20" width="60" height="60" fill="none" stroke="#000" stroke-width="2"/>
                                      <rect x="30" y="30" width="40" height="40"/>
                                      <rect x="40" y="40" width="20" height="20" fill="#FFF"/>
                                      <rect x="120" y="20" width="60" height="60" fill="none" stroke="#000" stroke-width="2"/>
                                      <rect x="130" y="30" width="40" height="40"/>
                                      <rect x="140" y="40" width="20" height="20" fill="#FFF"/>
                                      <rect x="20" y="120" width="60" height="60" fill="none" stroke="#000" stroke-width="2"/>
                                      <rect x="30" y="130" width="40" height="40"/>
                                      <rect x="40" y="140" width="20" height="20" fill="#FFF"/>
                                      <rect x="20" y="100" width="10" height="10"/>
                                      <rect x="40" y="100" width="10" height="10"/>
                                      <rect x="60" y="100" width="10" height="10"/>
                                      <rect x="100" y="20" width="10" height="10"/>
                                      <rect x="100" y="40" width="10" height="10"/>
                                      <rect x="100" y="60" width="10" height="10"/>
                                      <rect x="100" y="100" width="10" height="10"/>
                                      <rect x="120" y="100" width="10" height="10"/>
                                      <rect x="140" y="100" width="10" height="10"/>
                                      <rect x="160" y="100" width="10" height="10"/>
                                      <rect x="100" y="120" width="10" height="10"/>
                                      <rect x="100" y="140" width="10" height="10"/>
                                      <rect x="100" y="160" width="10" height="10"/>
                                    </g>
                                    <text x="100" y="195" text-anchor="middle" fill="#6B7280" font-family="Arial, sans-serif" font-size="12">Scan QR to Pay</text>
                                  </svg>
                                `;
                                (e.target as HTMLImageElement).parentNode?.appendChild(fallbackDiv);
                              }}
                            />
                          </div>
                        </div>
                        
                        <div className="bg-white rounded-2xl p-6 border border-green-200 mb-6">
                          <h4 className="font-semibold text-gray-800 mb-2">Payment Instructions:</h4>
                          <ol className="text-left text-sm text-gray-600 space-y-1">
                            <li>1. Scan the QR code above with any UPI app</li>                            <li>2. Pay the amount: <span className="font-bold text-green-600">
                              {formData.internshipDuration === '1 Month' ? '₹99' : 
                               formData.internshipDuration === '2 Months' ? '₹199' : 
                               formData.internshipDuration === '3 Months' ? '₹499' : '₹99'}
                            </span></li>
                            <li>3. Copy the UTR/Transaction ID from your payment app</li>
                            <li>4. Enter the UTR number below and submit</li>
                          </ol>
                        </div>
                      </div>

                      {/* UTR Number Input */}
                      <div>
                        <label className="flex items-center text-sm font-bold text-gray-800 mb-3">
                          <span className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mr-2"></span>
                          UTR Number <span className="text-red-500 ml-1">*</span>
                        </label>
                        <input
                          type="text"
                          name="utrNumber"
                          value={formData.utrNumber}
                          onChange={handleChange}
                          className={`w-full border-2 rounded-2xl px-6 py-4 text-gray-900 placeholder-gray-500 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-green-200/50 focus:border-green-500 transition-all duration-300 hover:border-green-300 hover:shadow-lg font-medium ${
                            errors.utrNumber ? "border-red-500 bg-red-50/80" : "border-gray-200"
                          }`}
                          placeholder="Enter 12-digit UTR/Transaction ID"
                          maxLength={12}
                        />
                        {errors.utrNumber && <p className="mt-2 text-sm text-red-600">{errors.utrNumber}</p>}
                        <p className="mt-2 text-sm text-gray-600">
                          💡 UTR number is the 12-digit transaction reference number from your payment app
                        </p>
                      </div>

                      {/* Application Summary */}
                      <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Summary</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="space-y-2">
                            <p><span className="font-medium">Name:</span> {formData.fullName}</p>
                            <p><span className="font-medium">Email:</span> {formData.email}</p>
                            <p><span className="font-medium">Mobile:</span> {formData.mobileNumber}</p>
                            <p><span className="font-medium">College:</span> {formData.collegeName}</p>
                          </div>
                          <div className="space-y-2">
                            <p><span className="font-medium">Course:</span> {formData.course} - {formData.branch}</p>
                            <p><span className="font-medium">Year:</span> {formData.yearOfStudy}</p>
                            <p><span className="font-medium">Domain(s):</span> {formData.domain.join(", ")}</p>
                            <p><span className="font-medium">Duration:</span> {formData.internshipDuration}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}                  {/* Enhanced Navigation Buttons */}
                  <div className="flex flex-col sm:flex-row justify-between items-center pt-6 sm:pt-8 border-t-2 border-gradient-to-r from-violet-100 via-purple-100 to-blue-100 gap-4 sm:gap-0">
                    {currentStep > 0 ? (
                      <button
                        type="button"
                        onClick={handleBack}
                        className="w-full sm:w-auto flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 rounded-2xl border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-bold transition-all duration-300 hover:bg-gray-50 hover:shadow-xl bg-white/90 backdrop-blur-sm transform hover:scale-105 group"
                        disabled={submitting}
                      >
                        <svg className="w-5 h-5 mr-3 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="text-sm sm:text-base">Previous Step</span>
                      </button>
                    ) : (
                      <div></div>
                    )}
                    
                    {currentStep < steps.length - 1 ? (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="w-full sm:w-auto flex items-center justify-center px-8 sm:px-10 py-3 sm:py-4 rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 hover:from-violet-700 hover:via-purple-700 hover:to-blue-700 text-white font-bold transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 group"
                        disabled={submitting}
                      >
                        <span className="text-sm sm:text-base">Continue to Next Step</span>
                        <svg className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="w-full sm:w-auto flex items-center justify-center px-8 sm:px-10 py-3 sm:py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 hover:from-emerald-700 hover:via-green-700 hover:to-teal-700 text-white font-bold transition-all duration-300 shadow-xl hover:shadow-2xl min-w-[200px] transform hover:scale-105 group"
                        disabled={submitting}
                      >
                        {submitting ? (
                          <div className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span className="text-sm sm:text-base">Submitting...</span>
                          </div>
                        ) : (
                          <>
                            <span className="text-sm sm:text-base">🚀 Submit Application</span>
                            <svg className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </form>
              </div>
            )}
          </div>          {/* Enhanced Additional Info Section */}
          {!success && (
            <div className="mt-12 sm:mt-16 lg:mt-20">
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 sm:mb-6">
                  Why Choose Our <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">Internship Program?</span>
                </h2>
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Experience unparalleled growth with industry-leading mentorship, real-world projects, and guaranteed placement support.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
                <div className="group bg-white/90 backdrop-blur-lg rounded-3xl p-6 sm:p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:scale-105 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 rounded-3xl"></div>
                  <div className="relative z-10">
                    <div className="w-14 sm:w-16 lg:w-18 h-14 sm:h-16 lg:h-18 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-3xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-125 transition-transform duration-500 shadow-lg">
                      <svg className="w-7 sm:w-8 lg:w-9 h-7 sm:h-8 lg:h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="font-black text-gray-900 mb-3 text-lg sm:text-xl">Lightning Fast Process</h3>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">Complete application review within 24 hours with priority interview scheduling and instant feedback.</p>
                  </div>
                </div>
                
                <div className="group bg-white/90 backdrop-blur-lg rounded-3xl p-6 sm:p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:scale-105 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-green-50/50 rounded-3xl"></div>
                  <div className="relative z-10">
                    <div className="w-14 sm:w-16 lg:w-18 h-14 sm:h-16 lg:h-18 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 rounded-3xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-125 transition-transform duration-500 shadow-lg">
                      <svg className="w-7 sm:w-8 lg:w-9 h-7 sm:h-8 lg:h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h3 className="font-black text-gray-900 mb-3 text-lg sm:text-xl">Industry Projects</h3>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">Work on real-world projects with Fortune 500 companies and build a portfolio that stands out.</p>
                  </div>
                </div>

                <div className="group bg-white/90 backdrop-blur-lg rounded-3xl p-6 sm:p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:scale-105 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/50 rounded-3xl"></div>
                  <div className="relative z-10">
                    <div className="w-14 sm:w-16 lg:w-18 h-14 sm:h-16 lg:h-18 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 rounded-3xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-125 transition-transform duration-500 shadow-lg">
                      <svg className="w-7 sm:w-8 lg:w-9 h-7 sm:h-8 lg:h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                      </svg>
                    </div>
                    <h3 className="font-black text-gray-900 mb-3 text-lg sm:text-xl">Expert Mentorship</h3>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">1-on-1 guidance from industry veterans with proven track records in top tech companies.</p>
                  </div>
                </div>

                <div className="group bg-white/90 backdrop-blur-lg rounded-3xl p-6 sm:p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:scale-105 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-red-50/50 rounded-3xl"></div>
                  <div className="relative z-10">
                    <div className="w-14 sm:w-16 lg:w-18 h-14 sm:h-16 lg:h-18 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-3xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-125 transition-transform duration-500 shadow-lg">
                      <svg className="w-7 sm:w-8 lg:w-9 h-7 sm:h-8 lg:h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="font-black text-gray-900 mb-3 text-lg sm:text-xl">Placement Guarantee</h3>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">100% placement assistance with our extensive network of hiring partners across India.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InternshipApplication;
