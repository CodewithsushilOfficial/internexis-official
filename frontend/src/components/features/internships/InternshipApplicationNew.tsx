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
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Puducherry",
  ];

  // Available domains
  const domains = [
    "Web Development",
    "AI/ML",
    "Python Development",
    "Android Development",
    "Data Science",
    "Cybersecurity",
    "Cloud Computing",
    "Digital Marketing",
    "UI/UX Design",
    "Blockchain",
    "DevOps",
    "IoT",
  ];

  const validateStep = () => {
    const newErrors: { [key: string]: string } = {};

    if (currentStep === 0) {
      if (!formData.fullName.trim())
        newErrors.fullName = "Full name is required.";
      if (!formData.email.trim()) newErrors.email = "Email is required.";
      else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email))
        newErrors.email = "Invalid email format.";
      if (!formData.mobileNumber.trim())
        newErrors.mobileNumber = "Mobile number is required.";
      else if (!/^[6-9]\d{9}$/.test(formData.mobileNumber))
        newErrors.mobileNumber = "Invalid Indian mobile number.";
    }

    if (currentStep === 1) {
      if (!formData.collegeName.trim())
        newErrors.collegeName = "College name is required.";
      if (!formData.collegeCity.trim())
        newErrors.collegeCity = "College city is required.";
      if (!formData.state.trim()) newErrors.state = "State is required.";
      if (!formData.course.trim()) newErrors.course = "Course is required.";
      if (!formData.branch.trim()) newErrors.branch = "Branch is required.";
      if (!formData.yearOfStudy.trim())
        newErrors.yearOfStudy = "Year of study is required.";
    }

    if (currentStep === 2) {
      if (formData.domain.length === 0)
        newErrors.domain = "Please select at least one domain.";
      if (!formData.internshipDuration.trim())
        newErrors.internshipDuration = "Internship duration is required.";
    }

    if (currentStep === 3) {
      if (!formData.utrNumber.trim())
        newErrors.utrNumber = "UTR number is required.";
      else if (!/^[0-9]{12}$/.test(formData.utrNumber))
        newErrors.utrNumber = "UTR number must be 12 digits.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleDomainChange = (domain: string) => {
    setFormData((prev) => ({
      ...prev,
      domain: prev.domain.includes(domain)
        ? prev.domain.filter((d) => d !== domain)
        : [...prev.domain, domain],
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

    try {
      // Transform form data to match API requirements
      const apiData = {
        name: formData.fullName,
        email: formData.email,
        phone: formData.mobileNumber,
        domain: formData.domain.join(", "), // Join multiple domains with comma
        college: formData.collegeName,
      };

      console.log("Submitting internship application:", apiData);

      // Use the internship service to submit
      const { internshipService } = await import("../../../lib/services");
      const result = await internshipService.submitApplication(apiData);

      if (result.success) {
        console.log("✅ Internship Application Submitted Successfully!");
        console.log("Application ID:", result.data?.id);
        setSuccess(true);
      } else {
        console.error("❌ Submission failed:", result.message);
        setErrors((prev) => ({
          ...prev,
          submit: result.message || "Failed to submit application",
        }));
      }
    } catch (error) {
      console.error("❌ Submission error:", error);
      setErrors((prev) => ({
        ...prev,
        submit: "Failed to submit application. Please try again.",
      }));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"></div>
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* Animated floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-pink-400 to-red-500 rounded-full opacity-20 animate-bounce"></div>
      <div className="absolute bottom-20 left-20 w-12 h-12 bg-gradient-to-r from-green-400 to-teal-500 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute bottom-40 right-10 w-14 h-14 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-25 animate-bounce"></div>

      <div className="relative z-10 pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="relative mb-8">
              <div className="w-24 h-24 mx-auto bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
              </div>
              <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-bounce">
                New!
              </div>
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight">
                Launch Your
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Dream Career
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Join <span className="font-bold text-blue-600">10,000+</span>{" "}
                successful students who transformed their potential into
                <span className="font-semibold">
                  {" "}
                  professional excellence
                </span>{" "}
                through our industry-leading internship programs.
              </p>

              {/* Stats Row */}
              <div className="flex flex-wrap justify-center gap-8 mt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">95%</div>
                  <div className="text-sm text-gray-600">Placement Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">500+</div>
                  <div className="text-sm text-gray-600">Partner Companies</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-600">
                    ₹8.5L
                  </div>
                  <div className="text-sm text-gray-600">Avg. Package</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">4.9/5</div>
                  <div className="text-sm text-gray-600">Student Rating</div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="mb-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
              <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
                {steps.map((step, idx) => (
                  <div key={idx} className="flex items-center w-full lg:w-auto">
                    <div className="flex flex-col items-center relative">
                      <div
                        className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                          idx <= currentStep
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                            : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        {idx + 1}
                      </div>
                      <div className="text-center mt-4">
                        <div
                          className={`font-semibold ${idx <= currentStep ? "text-blue-600" : "text-gray-500"}`}
                        >
                          {step.title}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          {step.subtitle}
                        </div>
                      </div>
                    </div>

                    {idx < steps.length - 1 && (
                      <div className="hidden lg:block flex-1 mx-6">
                        <div
                          className={`h-1 rounded-full transition-all duration-300 ${
                            idx < currentStep
                              ? "bg-gradient-to-r from-blue-600 to-purple-600"
                              : "bg-gray-200"
                          }`}
                        ></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Form Container */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 opacity-10 rounded-3xl"></div>

            {success ? (
              <div className="relative p-12 text-center">
                <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl"></div>

                <div className="relative z-10">
                  <div className="w-32 h-32 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-2xl animate-pulse mb-8">
                    <svg
                      className="w-16 h-16 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>

                  <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
                    🎉 Application Submitted Successfully!
                  </h2>

                  <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    Congratulations! Your internship application has been
                    received. Our expert team will review your application and
                    contact you within{" "}
                    <span className="font-bold text-green-600">
                      24-48 hours
                    </span>
                    .
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg">
                      Join WhatsApp Group
                    </button>
                    <button className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-200">
                      Download Brochure
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative p-8 md:p-12">
                {/* Form Header */}
                <div className="mb-10 text-center relative">
                  <div className="relative inline-flex items-center gap-4 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-3xl px-8 py-6 mb-6 border border-blue-100/50 backdrop-blur-sm shadow-lg">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <span className="text-white font-black text-lg">
                          {currentStep + 1}
                        </span>
                      </div>
                    </div>

                    <div className="text-left">
                      <div className="text-lg font-black text-gray-900 mb-1 flex items-center">
                        {steps[currentStep].title}
                        <span className="ml-2 inline-flex items-center px-2 py-1 rounded-lg text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                          Step {currentStep + 1} of {steps.length}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 font-medium">
                        {steps[currentStep].subtitle}
                      </div>

                      <div className="mt-3 flex items-center gap-2">
                        <div className="text-xs text-gray-500 font-medium">
                          Progress:
                        </div>
                        <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[120px]">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500 ease-out"
                            style={{
                              width: `${((currentStep + 1) / steps.length) * 100}%`,
                            }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-600 font-bold">
                          {Math.round(((currentStep + 1) / steps.length) * 100)}
                          %
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="max-w-md mx-auto">
                    {currentStep === 0 && (
                      <p className="text-sm text-gray-600 bg-blue-50 rounded-xl px-4 py-2 border border-blue-100">
                        📝 Let's start with your basic information
                      </p>
                    )}
                    {currentStep === 1 && (
                      <p className="text-sm text-gray-600 bg-indigo-50 rounded-xl px-4 py-2 border border-indigo-100">
                        🎓 Tell us about your academic background
                      </p>
                    )}
                    {currentStep === 2 && (
                      <p className="text-sm text-gray-600 bg-purple-50 rounded-xl px-4 py-2 border border-purple-100">
                        💻 Choose your domain and internship duration
                      </p>
                    )}
                    {currentStep === 3 && (
                      <p className="text-sm text-gray-600 bg-green-50 rounded-xl px-4 py-2 border border-green-100">
                        💳 Complete payment and submit your application
                      </p>
                    )}
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Step 0: Personal Details */}
                  {currentStep === 0 && (
                    <div className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Full Name */}
                        <div className="md:col-span-2">
                          <label className="flex items-center text-sm font-bold text-gray-800 mb-3">
                            <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-2"></span>
                            Full Name{" "}
                            <span className="text-red-500 ml-1">*</span>
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className={`w-full border-2 rounded-2xl px-6 py-4 text-gray-900 placeholder-gray-500 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-blue-200/50 focus:border-blue-500 transition-all duration-300 hover:border-blue-300 hover:shadow-lg font-medium ${
                              errors.fullName
                                ? "border-red-500 bg-red-50/80"
                                : "border-gray-200"
                            }`}
                            placeholder="Enter your full name"
                          />
                          {errors.fullName && (
                            <p className="mt-2 text-sm text-red-600">
                              {errors.fullName}
                            </p>
                          )}
                        </div>

                        {/* Email */}
                        <div>
                          <label className="flex items-center text-sm font-bold text-gray-800 mb-3">
                            <span className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mr-2"></span>
                            Email Address{" "}
                            <span className="text-red-500 ml-1">*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full border-2 rounded-2xl px-6 py-4 text-gray-900 placeholder-gray-500 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-green-200/50 focus:border-green-500 transition-all duration-300 hover:border-green-300 hover:shadow-lg font-medium ${
                              errors.email
                                ? "border-red-500 bg-red-50/80"
                                : "border-gray-200"
                            }`}
                            placeholder="your.email@example.com"
                          />
                          {errors.email && (
                            <p className="mt-2 text-sm text-red-600">
                              {errors.email}
                            </p>
                          )}
                        </div>

                        {/* Mobile Number */}
                        <div>
                          <label className="flex items-center text-sm font-bold text-gray-800 mb-3">
                            <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-2"></span>
                            Mobile Number{" "}
                            <span className="text-red-500 ml-1">*</span>
                          </label>
                          <input
                            type="tel"
                            name="mobileNumber"
                            value={formData.mobileNumber}
                            onChange={handleChange}
                            className={`w-full border-2 rounded-2xl px-6 py-4 text-gray-900 placeholder-gray-500 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-purple-200/50 focus:border-purple-500 transition-all duration-300 hover:border-purple-300 hover:shadow-lg font-medium ${
                              errors.mobileNumber
                                ? "border-red-500 bg-red-50/80"
                                : "border-gray-200"
                            }`}
                            placeholder="Enter 10-digit mobile number"
                          />
                          {errors.mobileNumber && (
                            <p className="mt-2 text-sm text-red-600">
                              {errors.mobileNumber}
                            </p>
                          )}
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
                            College Name{" "}
                            <span className="text-red-500 ml-1">*</span>
                          </label>
                          <input
                            type="text"
                            name="collegeName"
                            value={formData.collegeName}
                            onChange={handleChange}
                            className={`w-full border-2 rounded-2xl px-6 py-4 text-gray-900 placeholder-gray-500 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-indigo-200/50 focus:border-indigo-500 transition-all duration-300 hover:border-indigo-300 hover:shadow-lg font-medium ${
                              errors.collegeName
                                ? "border-red-500 bg-red-50/80"
                                : "border-gray-200"
                            }`}
                            placeholder="Enter your college/university name"
                          />
                          {errors.collegeName && (
                            <p className="mt-2 text-sm text-red-600">
                              {errors.collegeName}
                            </p>
                          )}
                        </div>

                        {/* College City */}
                        <div>
                          <label className="flex items-center text-sm font-bold text-gray-800 mb-3">
                            <span className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mr-2"></span>
                            College City{" "}
                            <span className="text-red-500 ml-1">*</span>
                          </label>
                          <input
                            type="text"
                            name="collegeCity"
                            value={formData.collegeCity}
                            onChange={handleChange}
                            className={`w-full border-2 rounded-2xl px-6 py-4 text-gray-900 placeholder-gray-500 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-orange-200/50 focus:border-orange-500 transition-all duration-300 hover:border-orange-300 hover:shadow-lg font-medium ${
                              errors.collegeCity
                                ? "border-red-500 bg-red-50/80"
                                : "border-gray-200"
                            }`}
                            placeholder="Enter your college city"
                          />
                          {errors.collegeCity && (
                            <p className="mt-2 text-sm text-red-600">
                              {errors.collegeCity}
                            </p>
                          )}
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
                              errors.state
                                ? "border-red-500 bg-red-50/80"
                                : "border-gray-200"
                            }`}
                          >
                            <option value="">Select your state</option>
                            {indianStates.map((state) => (
                              <option key={state} value={state}>
                                {state}
                              </option>
                            ))}
                          </select>
                          {errors.state && (
                            <p className="mt-2 text-sm text-red-600">
                              {errors.state}
                            </p>
                          )}
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
                              errors.course
                                ? "border-red-500 bg-red-50/80"
                                : "border-gray-200"
                            }`}
                          >
                            <option value="">Select your course</option>
                            <option value="B.Tech">B.Tech</option>
                            <option value="BCA">BCA</option>
                            <option value="MCA">MCA</option>
                            <option value="B.Sc">B.Sc</option>
                            <option value="M.Sc">M.Sc</option>
                            <option value="BBA">BBA</option>
                            <option value="MBA">MBA</option>
                            <option value="B.Com">B.Com</option>
                            <option value="M.Com">M.Com</option>
                            <option value="Other">Other</option>
                          </select>
                          {errors.course && (
                            <p className="mt-2 text-sm text-red-600">
                              {errors.course}
                            </p>
                          )}
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
                              errors.branch
                                ? "border-red-500 bg-red-50/80"
                                : "border-gray-200"
                            }`}
                            placeholder="e.g., Computer Science, IT, Electronics"
                          />
                          {errors.branch && (
                            <p className="mt-2 text-sm text-red-600">
                              {errors.branch}
                            </p>
                          )}
                        </div>

                        {/* Year of Study */}
                        <div>
                          <label className="flex items-center text-sm font-bold text-gray-800 mb-3">
                            <span className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full mr-2"></span>
                            Year of Study{" "}
                            <span className="text-red-500 ml-1">*</span>
                          </label>
                          <select
                            name="yearOfStudy"
                            value={formData.yearOfStudy}
                            onChange={handleChange}
                            className={`w-full border-2 rounded-2xl px-6 py-4 text-gray-900 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-emerald-200/50 focus:border-emerald-500 transition-all duration-300 hover:border-emerald-300 hover:shadow-lg font-medium ${
                              errors.yearOfStudy
                                ? "border-red-500 bg-red-50/80"
                                : "border-gray-200"
                            }`}
                          >
                            <option value="">Select your year</option>
                            <option value="1st Year">1st Year</option>
                            <option value="2nd Year">2nd Year</option>
                            <option value="3rd Year">3rd Year</option>
                            <option value="4th Year">4th Year</option>
                          </select>
                          {errors.yearOfStudy && (
                            <p className="mt-2 text-sm text-red-600">
                              {errors.yearOfStudy}
                            </p>
                          )}
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
                          Select Domain(s){" "}
                          <span className="text-red-500 ml-1">*</span>
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
                                <div
                                  className={`w-4 h-4 rounded-full border-2 ${
                                    formData.domain.includes(domain)
                                      ? "bg-purple-500 border-purple-500"
                                      : "border-gray-300"
                                  }`}
                                >
                                  {formData.domain.includes(domain) && (
                                    <svg
                                      className="w-full h-full text-white"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  )}
                                </div>
                                <span className="font-medium text-sm">
                                  {domain}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                        {errors.domain && (
                          <p className="mt-2 text-sm text-red-600">
                            {errors.domain}
                          </p>
                        )}
                      </div>

                      {/* Internship Duration */}
                      <div>
                        <label className="flex items-center text-sm font-bold text-gray-800 mb-3">
                          <span className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mr-2"></span>
                          Internship Duration{" "}
                          <span className="text-red-500 ml-1">*</span>
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                internshipDuration: "1 Month",
                              }))
                            }
                            className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                              formData.internshipDuration === "1 Month"
                                ? "border-orange-500 bg-orange-50 text-orange-800"
                                : "border-gray-200 bg-white hover:border-orange-300"
                            }`}
                          >
                            <h3 className="font-bold text-lg mb-2">1 Month</h3>
                            <p className="text-sm text-gray-600">
                              Fast-track program
                            </p>
                            <p className="text-2xl font-bold text-orange-600 mt-2">
                              ₹999
                            </p>
                          </div>
                          <div
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                internshipDuration: "2 Months",
                              }))
                            }
                            className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                              formData.internshipDuration === "2 Months"
                                ? "border-orange-500 bg-orange-50 text-orange-800"
                                : "border-gray-200 bg-white hover:border-orange-300"
                            }`}
                          >
                            <h3 className="font-bold text-lg mb-2">2 Months</h3>
                            <p className="text-sm text-gray-600">
                              Comprehensive program
                            </p>
                            <p className="text-2xl font-bold text-orange-600 mt-2">
                              ₹1499
                            </p>
                          </div>
                        </div>
                        {errors.internshipDuration && (
                          <p className="mt-2 text-sm text-red-600">
                            {errors.internshipDuration}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Step 3: Payment & Submit */}
                  {currentStep === 3 && (
                    <div className="space-y-8">
                      {/* Payment QR Code */}
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 border-2 border-green-200/50 text-center">
                        <h3 className="text-xl font-bold text-green-800 mb-4">
                          Complete Your Payment
                        </h3>

                        {/* QR Code Image */}
                        <div className="flex justify-center mb-6">
                          <div className="bg-white p-4 rounded-2xl shadow-lg">
                            <img
                              src="/assets/qr-code.png"
                              alt="Payment QR Code"
                              className="w-48 h-48 object-contain"
                              onError={(e) => {
                                // Fallback if image doesn't exist
                                (e.target as HTMLImageElement).src =
                                  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRkZGRkZGIiBzdHJva2U9IiNEMUQ1REIiIHN0cm9rZS13aWR0aD0iMiIvPgo8dGV4dCB4PSIxMDAiIHk9IjEwNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzZCNzI4MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0Ij5RUiBDb2RlPC90ZXh0Pgo8L3N2Zz4=";
                              }}
                            />
                          </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 border border-green-200 mb-6">
                          <h4 className="font-semibold text-gray-800 mb-2">
                            Payment Instructions:
                          </h4>
                          <ol className="text-left text-sm text-gray-600 space-y-1">
                            <li>1. Scan the QR code above with any UPI app</li>
                            <li>
                              2. Pay the amount:{" "}
                              <span className="font-bold text-green-600">
                                {formData.internshipDuration === "1 Month"
                                  ? "₹999"
                                  : formData.internshipDuration === "2 Months"
                                    ? "₹1499"
                                    : "₹999"}
                              </span>
                            </li>
                            <li>
                              3. Copy the UTR/Transaction ID from your payment
                              app
                            </li>
                            <li>4. Enter the UTR number below and submit</li>
                          </ol>
                        </div>
                      </div>

                      {/* UTR Number Input */}
                      <div>
                        <label className="flex items-center text-sm font-bold text-gray-800 mb-3">
                          <span className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mr-2"></span>
                          UTR Number{" "}
                          <span className="text-red-500 ml-1">*</span>
                        </label>
                        <input
                          type="text"
                          name="utrNumber"
                          value={formData.utrNumber}
                          onChange={handleChange}
                          className={`w-full border-2 rounded-2xl px-6 py-4 text-gray-900 placeholder-gray-500 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-green-200/50 focus:border-green-500 transition-all duration-300 hover:border-green-300 hover:shadow-lg font-medium ${
                            errors.utrNumber
                              ? "border-red-500 bg-red-50/80"
                              : "border-gray-200"
                          }`}
                          placeholder="Enter 12-digit UTR/Transaction ID"
                          maxLength={12}
                        />
                        {errors.utrNumber && (
                          <p className="mt-2 text-sm text-red-600">
                            {errors.utrNumber}
                          </p>
                        )}
                        <p className="mt-2 text-sm text-gray-600">
                          💡 UTR number is the 12-digit transaction reference
                          number from your payment app
                        </p>
                      </div>

                      {/* Application Summary */}
                      <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          Application Summary
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="space-y-2">
                            <p>
                              <span className="font-medium">Name:</span>{" "}
                              {formData.fullName}
                            </p>
                            <p>
                              <span className="font-medium">Email:</span>{" "}
                              {formData.email}
                            </p>
                            <p>
                              <span className="font-medium">Mobile:</span>{" "}
                              {formData.mobileNumber}
                            </p>
                            <p>
                              <span className="font-medium">College:</span>{" "}
                              {formData.collegeName}
                            </p>
                          </div>
                          <div className="space-y-2">
                            <p>
                              <span className="font-medium">Course:</span>{" "}
                              {formData.course} - {formData.branch}
                            </p>
                            <p>
                              <span className="font-medium">Year:</span>{" "}
                              {formData.yearOfStudy}
                            </p>
                            <p>
                              <span className="font-medium">Domain(s):</span>{" "}
                              {formData.domain.join(", ")}
                            </p>
                            <p>
                              <span className="font-medium">Duration:</span>{" "}
                              {formData.internshipDuration}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between items-center pt-8 border-t-2 border-gray-100">
                    {currentStep > 0 ? (
                      <button
                        type="button"
                        onClick={handleBack}
                        className="flex items-center px-8 py-4 rounded-2xl border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-bold transition-all duration-300 hover:bg-gray-50 hover:shadow-lg bg-white/80 backdrop-blur-sm"
                        disabled={submitting}
                      >
                        <svg
                          className="w-5 h-5 mr-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                        Previous Step
                      </button>
                    ) : (
                      <div></div>
                    )}

                    {currentStep < steps.length - 1 ? (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="flex items-center px-10 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-bold transition-all duration-300 shadow-xl hover:shadow-2xl"
                        disabled={submitting}
                      >
                        <span>Continue to Next Step</span>
                        <svg
                          className="w-5 h-5 ml-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="flex items-center px-10 py-4 rounded-2xl bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 hover:from-green-700 hover:via-emerald-700 hover:to-teal-700 text-white font-bold transition-all duration-300 shadow-xl hover:shadow-2xl min-w-[200px] justify-center"
                        disabled={submitting}
                      >
                        {submitting ? (
                          <div className="flex items-center">
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                            <span>Submitting...</span>
                          </div>
                        ) : (
                          <>
                            <span>🚀 Submit Application</span>
                            <svg
                              className="w-5 h-5 ml-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                              />
                            </svg>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Enhanced Additional Info Section */}
          {!success && (
            <div className="mt-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Why Choose Our{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Internship Program?
                  </span>
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Experience unparalleled growth with industry-leading
                  mentorship, real-world projects, and guaranteed placement
                  support.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-7 h-7 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    Lightning Fast Process
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Complete application review within 24 hours with priority
                    interview scheduling and instant feedback.
                  </p>
                </div>

                <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-7 h-7 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    Industry Projects
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Work on real-world projects with Fortune 500 companies and
                    build a portfolio that stands out.
                  </p>
                </div>

                <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-7 h-7 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    Expert Mentorship
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    1-on-1 guidance from industry veterans with proven track
                    records in top tech companies.
                  </p>
                </div>

                <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-7 h-7 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    Placement Guarantee
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    100% placement assistance with our extensive network of
                    hiring partners across India.
                  </p>
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
